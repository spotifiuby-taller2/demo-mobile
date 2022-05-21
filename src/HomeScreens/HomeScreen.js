import React, {useEffect, useState} from 'react'
import {useAuthUser} from '../context/AuthContext';
import {getToGateway, postToGateway} from "../others/utils";
import constants from "../others/constants";
import * as Notifications from 'expo-notifications';
import SongList from "../Components/SongList";

const HomeScreen = ({navigation}) => {
  const [songs, setSongs] = useState([]);

  const {userState} = useAuthUser();

  const getFavoriteSongs = async () => {
    await getToGateway(constants.MEDIA_HOST + constants.FAVORITE_SONGS
      + "?"
      + constants.USER_ID_QUERY_PARAM
      + userState.uid)
      .then((response) => {
        if (response.error !== undefined) {
          alert(response.error);
          return;
        }

        setSongs(response.songs);
      });
  }

  useEffect(() => {
    (async () => {
      await getFavoriteSongs();
    })();

    return () => {
    };
  }, []);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      await getFavoriteSongs();
    }, [navigation]);

    const subcriptionNotificationReceived = Notifications.addNotificationReceivedListener(
      async notification => {
        const {type, params, screenName} = notification.request.content.data;
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

  return <SongList songList={songs} navigation={navigation}/>
}

export {
  HomeScreen
}
