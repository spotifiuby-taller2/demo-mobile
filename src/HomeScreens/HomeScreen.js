import React, {useCallback, useEffect, useState} from 'react'
import {useAuthUser} from '../context/AuthContext';
import {postToGateway, songToTrack} from "../others/utils";
import constants from "../others/constants";
import * as Notifications from 'expo-notifications';
import SongList from "../Components/SongList";
import {getFavouriteSongs} from "../Services/MediaService";
import usePlayerAction from "../Hooks/usePlayerAction";
import {useFocusEffect} from "@react-navigation/native";

const HomeScreen = ({navigation}) => {
  const [songs, setSongs] = useState([]);
  const player = usePlayerAction();

  const {userState} = useAuthUser();

  useFocusEffect(useCallback(() => {
    getFavouriteSongs(userState.uid)
      .then(r => {
        setSongs(r.songs);
        player.initialize(r.songs.map(songToTrack));
      });
  }, [navigation]))

  useEffect(() => {
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
