import React, {useEffect, useState} from 'react';
import {getAllSongs} from "../Services/MediaService";
import SongList from "../Components/SongList";
import {getToGateway} from "../others/utils";
import * as constants from "../others/constants";

const SongListScreen = ({navigation}) => {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    getAllSongs().then(setAllSongs);
  }, []);

  useEffect( () => {
    navigation.addListener('focus', async () => {
      getAllSongs().then(setAllSongs);
    }, [navigation]);
  }, [navigation] );

  return <SongList songList={allSongs} navigation={navigation}/>;
}

export default SongListScreen;
