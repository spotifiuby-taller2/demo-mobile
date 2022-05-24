import React, {useCallback, useEffect, useState} from 'react';
import {getFavouriteSongs} from "../Services/MediaService";
import SongList from "../Components/SongList";
import usePlayerAction from "../Hooks/usePlayerAction";
import {useAuthUser} from "../context/AuthContext";
import {useFocusEffect} from "@react-navigation/native";
import {songToTrack} from "../others/utils";

const FavoriteSongListScreen = ({navigation}) => {
  const {userState} = useAuthUser();
  const [songs, setSongs] = useState([]);
  const player = usePlayerAction();


  useEffect(()=>{
    navigation.setOptions({ headerShown: true, headerTitle: 'Canciones favoritas' });
  }, []);

  useFocusEffect(useCallback(() => {
    getFavouriteSongs(userState.uid)
      .then(res => {
        setSongs(res);
        player.initialize(res.map(songToTrack));
      });
  }, [navigation]))

  return <SongList songList={songs} navigation={navigation}/>;
}

export default FavoriteSongListScreen;