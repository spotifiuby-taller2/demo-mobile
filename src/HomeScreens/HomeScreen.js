import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState, useRef} from 'react'
import { useAuthUser } from '../context/AuthContext';
import {getToGateway, postToGateway} from "../others/utils";
import constants from "../others/constants";
import {containerStyle} from "../styles/genericStyles";
import SongChip from "../Components/SongChip";
import * as Notifications from 'expo-notifications';

const HomeScreen = ({navigation}) => {
  const [songs, setSongs] = useState([]);

  const {userState} = useAuthUser();

  const {signOut} = useAuthUser();

    const getFavoriteSongs = async () => {
        await getToGateway(constants.MEDIA_HOST + constants.FAVORITE_SONGS
            + "?"
            + constants.USER_ID_QUERY_PARAM
            + userState.uid)
            .then( (response) => {
                if (response.error !== undefined) {
                    alert(response.error);
                    return;
                }

                setSongs(response.songs);
            } );
    }

  useEffect( () => {
      (async () => {
          await getFavoriteSongs();
      })();

      return () => {
      };
  }, []);

  useEffect( () => {
      navigation.addListener('focus', async () => {
          await getFavoriteSongs();
      }, [navigation]);

      const subcriptionNotificationReceived = Notifications.addNotificationReceivedListener(
          async notification=> {
              const {type, params, screenName} = notification.request.content.data;
              const body = {
                idEmissor: params.idEmissor,
                idReceptor: params.idReceptor,
                redirectTo: constants.USERS_HOST + constants.NOTIFICATION_LIST_URL
              }

              await postToGateway(body, 'POST')
                .then(res => {
                  if ( res.error !== undefined && res.error !== constants.DUPLICATE_NOTIFICATION_ERROR  ){
                    alert(res.error);
                  }
                })
         });

    const subcriptionNotificationClicked = Notifications.addNotificationResponseReceivedListener(notification => {
      const {type, params, screenName} = notification.notification.request.content.data;

      navigation.navigate(screenName, params);
    });

    return () => {
      subcriptionNotificationClicked.remove();
      subcriptionNotificationReceived.remove();
    };
  }, [navigation]);


    return (
        <View style={containerStyle}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {
                        (songs !== undefined) && (Array.isArray(songs)) && (
                            songs.map( (song, id) => {
                                return (
                                    <SongChip id={id}
                                              key={id}
                                              song={song}
                                              navigation={navigation}/>
                                )
                            } ) )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

    const styles = StyleSheet.create(
      { input: {
          borderWidth: 2,
          marginBottom: 15,
          marginTop: 15,
          backgroundColor: '#f5fcff',
          height: 50
         },
        container: {
          flex:1,
          backgroundColor: '#f5fcff',
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 30
         },
         title: {textAlign: 'center',fontSize: 25, marginBottom: 35},
         button: {
           backgroundColor: 'skyblue',
           paddingTop: 15,
           paddingBottom:15,
           width: 100,
           alignSelf: 'center',
           marginTop: 30,
           marginBottom:30,
           borderRadius: 10},
         buttonText: {textAlign: 'center', fontSize: 13},
         forgotPasswordButton: {textAlign: 'center', fontSize: 13, color: 'skyblue'},
         image:{
           height: 170,
           width: 170,
           alignSelf: 'center',
           marginTop: 50,
           marginBottom: 80
         }}
   );


    export {
        HomeScreen
    }
