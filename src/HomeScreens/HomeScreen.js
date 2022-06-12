import React, {useEffect} from 'react'
import {useAuthUser} from '../context/AuthContext';
import {postToGateway} from "../others/utils";
import constants from "../others/constants";
import * as Notifications from 'expo-notifications';
import Top3List from '../Components/Top3List';
import {Text} from 'react-native';
import {ScrollView} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({navigation}) => {


  const {userState} = useAuthUser();

  useEffect(() => {
    const subcriptionNotificationReceived = Notifications.addNotificationReceivedListener(
      async notification => {
        const {params} = notification.request.content.data;
        const body = {
          idEmissor: params.idEmissor,
          idReceptor: params.idReceptor,
          redirectTo: constants.USERS_HOST + constants.NOTIFICATION_LIST_URL
        }

        await postToGateway(body, 'POST')
          .then(res => {
            if (res.error !== undefined && res.error !== constants.DUPLICATE_NOTIFICATION_ERROR) {
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
        <ScrollView style={{backgroundColor: '#f5fcff'}}>
            <Text style={{alignSelf: 'center', fontSize: 20, color: '#388AD6', margin: 20}}>
                Bienvenido {userState.username}
            </Text>

            <Top3List
                title='Canciones favoritas'
                endpoint={constants.MEDIA_HOST + constants.FAVORITE_SONGS
                + "?"
                + constants.USER_ID_QUERY_PARAM
                + userState.uid
                + "&"}
                navigation={navigation}
                open='FavoriteSongListScreen'
                songList={true}
            />

            <Top3List
                title='Albumes favoritos'
                endpoint={constants.MEDIA_HOST + constants.FAVORITE_ALBUMS
                + "?"
                + constants.USER_ID_QUERY_PARAM
                + userState.uid
                + "&"}
                navigation={navigation}
                open='FavoriteAlbumListScreen'
                albumList={true}
            />
        </ScrollView>
    );
}

export {
  HomeScreen
}
