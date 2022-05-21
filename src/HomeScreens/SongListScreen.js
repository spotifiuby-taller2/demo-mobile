import React, {useEffect, useState} from 'react';
import {getAllSongs} from "../Services/MediaService";
import SongListComponent from "../Components/SongList";

const SongListScreen = ({navigation}) => {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    getAllSongs().then(setAllSongs);
  }, []);

  return <SongListComponent songList={allSongs} navigation={navigation}/>;
}

export default SongListScreen;
