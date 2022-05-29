import React, {useEffect, useState} from 'react';
import {getAllSongs} from "../Services/MediaService";
import SongList from "../Components/SongList";
import LoaderScreen from '../Components/LoaderScreen'


const SongListScreen = ({navigation}) => {
  const [allSongs, setAllSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    navigation.setOptions({ headerShown: true, headerTitle: 'Canciones' });
  }, []);

  // TODO Warning: es asimétrico respecto de Favorite Song List Screen
  useEffect(() => {
    return navigation.addListener('focus', async () => {
      getAllSongs().then(setAllSongs).then(res => setLoading(false));
    });
  }, [navigation]);

  if (loading) {
    return <LoaderScreen/>;
  }
  return <SongList songList={allSongs} navigation={navigation}/>;
}

export default SongListScreen;
