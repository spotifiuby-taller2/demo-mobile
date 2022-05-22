import React, {useEffect, useState} from 'react';
import {getAllSongs} from "../Services/MediaService";
import SongList from "../Components/SongList";

const SongListScreen = ({navigation}) => {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      getAllSongs().then(setAllSongs);
    });
  }, [navigation]);

  return <SongList songList={allSongs} navigation={navigation}/>;
}

export default SongListScreen;
