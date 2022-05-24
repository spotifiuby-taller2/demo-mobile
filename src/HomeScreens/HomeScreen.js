import React, {useCallback, useEffect} from 'react'
import {postToGateway, songToTrack} from "../others/utils";
import constants from "../others/constants";
import * as Notifications from 'expo-notifications';
import SongList from "../Components/SongList";
import usePlayerAction from "../Hooks/usePlayerAction";
import {useFocusEffect} from "@react-navigation/native";
import {useFavouriteSongs} from "../context/FavouriteSongsProvider";

const HomeScreen = ({navigation}) => {
  const {favouriteSongs} = useFavouriteSongs();
  const player = usePlayerAction();

  useFocusEffect(useCallback(() => {
    player.initialize(favouriteSongs.map(songToTrack));
  }, []))

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

  return <SongList songList={favouriteSongs} navigation={navigation}/>
}

export {
  HomeScreen
}
