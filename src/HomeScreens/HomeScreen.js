import {ScrollView, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react'
import {useAuthUser} from '../context/AuthContext';
import {getToGateway} from "../others/utils";
import constants from "../others/constants";
import {containerStyle} from "../styles/genericStyles";
import SongChip from "../Components/SongChip";
import * as Notifications from 'expo-notifications';

const HomeScreen = ({navigation}) => {
  const [songs, setSongs] = useState([]);

  const {userState} = useAuthUser();

  const songsRef = useRef();

  const {signOut} = useAuthUser();

  useEffect(() => {
    function getFavoriteSongs() {
      getToGateway(constants.MEDIA_HOST + constants.FAVORITE_SONGS
        + "?userId="
        + userState.uid)
        .then((response) => {
          if (response.error !== undefined) {
            alert(response.error);
            return;
          }

          setSongs(response);
        })
      songsRef.current = songs;
    }

    navigation.addListener('focus',
      () => {
        getFavoriteSongs();
      });

    const subcriptionNotificationReceived = Notifications.addNotificationReceivedListener(notification => {
      const {type, params, screenName} = notification.request.content.data;
      const body = {
        idEmissor: params.idEmissor,
        idReceptor: params.idReceptor,
        redirectTo: constants.USERS_HOST + constants.NOTIFICATION_LIST_URL
      }

      postToGateway(body, 'POST')
        .then(res => {
          if (res.error !== undefined && res.error !== constants.DUPLICATE_NOTIFICATION_ERROR) {
            alert(res.error);
          }
        })
    })


    const subcriptionNotificationClicked = Notifications.addNotificationResponseReceivedListener(notification => {
      const {type, params, screenName} = notification.notification.request.content.data;

      navigation.navigate(screenName, params);
    });

    return () => {
      subcriptionNotificationClicked.remove();
      subcriptionNotificationReceived.remove();
    };
  }, [])


  return (
    <View style={containerStyle} ref={songsRef}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {
            (songsRef.current !== undefined) && (Array.isArray(songsRef.current)) && (
              songsRef.current.map((song, id) => {
                return (
                  <SongChip id={id}
                            key={id}
                            song={song}
                            navigation={navigation}/>
                )
              }))
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen;

