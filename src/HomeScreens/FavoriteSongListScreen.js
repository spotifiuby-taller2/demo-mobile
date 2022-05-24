import React, {useEffect, useState} from 'react';
import {getFavouriteSongs} from "../Services/MediaService";
import SongList from "../Components/SongList";

const FavoriteSongListScreen = ({navigation}) => {
  const {userState} = useAuthUser();
  const [songs, setSongs] = useState([]);
  const player = usePlayerAction();


  useEffect(()=>{
    navigation.setOptions({ headerShown: true, headerTitle: 'Canciones' });
  }, []);

  useFocusEffect(useCallback(() => {
    getFavouriteSongs(userState.uid)
      .then(res => {
        console.log(res);
        setSongs(res);
        player.initialize(res.map(songToTrack));
      });
  }, [navigation]))

  return <SongList songList={songs} navigation={navigation}/>;
}

export default FavoriteSongListScreen;