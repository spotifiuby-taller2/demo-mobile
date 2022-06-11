import React, {useCallback, useState} from 'react'
import Top3List from '../Components/Top3List'
import constants from '../others/constants'
import {ScrollView} from "react-native";
import TopList from "../Components/TopList";
import genre from "../data/Genre"
import GenreChip from "../Components/GenreChip";
import usePlayerAction from "../Hooks/usePlayerAction";
import {useFocusEffect} from "@react-navigation/native";
import {getPublicPlaylists} from "../Services/MediaService";
import PlayableListItem from "../Components/PlayableListItem";
import {playlistToPlayable, songToTrack} from "../others/utils";
import LoaderScreen from "../Components/LoaderScreen";

const ContentScreen = ({navigation}) => {

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const player = usePlayerAction();

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getPublicPlaylists()
      .then(setPlaylists)
      .then(_ => setLoading(false))
      .catch(e => console.log(JSON.stringify(e)));
  }, []))

  if (loading) {
    return <LoaderScreen/>;
  }

  return (
    <ScrollView style={{backgroundColor: '#f5fcff'}}>
      <Top3List
        title='Canciones'
        endpoint={constants.MEDIA_HOST + constants.SONGS_URL + "?"}
        navigation={navigation}
        open='SongListScreen'
        songList={true}
      />

      <Top3List
        title='Álbumes'
        endpoint={constants.MEDIA_HOST + constants.ALBUM_URL + "?"}
        navigation={navigation}
        open='AlbumListScreen'
        albumList={true}
      />

      <TopList
        title={'Playlists'}
        data={playlists}
        renderDataItem={(playlist, id) => (
          <PlayableListItem id={id}
                            key={id}
                            playableItem={playlistToPlayable(playlist)}
                            play={() => player.playList(playlist.songs.map(songToTrack), 0)}
                            moreInfoCallback={() => navigation.navigate('PlaylistScreen', {playlistId: playlist.id})}

          />)}
        max={3}
        viewMoreCallback={() => navigation.navigate('PlaylistListScreen', {playlists: playlists})}
      />

      <TopList
        title={'Géneros'}
        data={Object.values(genre)}
        max={3}
        renderDataItem={(genre, id) => {
          return <GenreChip id={id} key={id} genre={genre} navigation={navigation}/>
        }}
        viewMoreCallback={() => navigation.navigate('GenreListScreen')}
      />

    </ScrollView>
  );
}

export default ContentScreen;
