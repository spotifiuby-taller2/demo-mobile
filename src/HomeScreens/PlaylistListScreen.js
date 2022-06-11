import React, {useEffect, useState} from 'react';
import {songToTrack} from "../others/utils";
import {FlatList, SafeAreaView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import PlayableListItem from "../Components/PlayableListItem";
import defaultArtwork from "../../assets/album-placeholder.png";
import usePlayerAction from "../Hooks/usePlayerAction";
import {getPublicPlaylists} from "../Services/MediaService";
import LoaderScreen from '../Components/LoaderScreen';
import {Searchbar} from "react-native-paper";

const PlaylistListScreen = ({navigation}) => {
  const [playlistList, setPlaylistList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('')
  const player = usePlayerAction();

  useEffect(() => {
    getPublicPlaylists().then(playlists => {
      setPlaylistList(playlists);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({headerShown: true, headerTitle: 'Playlists'});
  }, []);


  const toPlayable = playlist => {
    return {
      title: playlist.title,
      artwork: playlist.artwork ? {uri: playlist.artwork} : defaultArtwork,
    };
  };

  const filterPlaylist = filterText => {
    filterText = filterText.toLowerCase();
    return a => a.title.toLowerCase().includes(filterText);
  }

  if (loading) {
    return <LoaderScreen/>;
  }
  return (
    <View style={{...containerStyle, marginTop: 10}}>
      <SafeAreaView>
        <Searchbar onChangeText={setText}
                   placeholder={"Buscar playlists"}
                   inputStyle={{}}
                   containerStyle={{}}
                   inputContainerStyle={{}}
        />
        <View>
          <View style={{marginBottom: 10}}/>
          {
            <FlatList
              data={playlistList.filter(filterPlaylist(text))}
              renderItem={({item, index}) => <PlayableListItem id={index}
                                                               key={index}
                                                               playableItem={toPlayable(item)}
                                                               play={() => player.playList(item.songs.map(songToTrack), 0)}
                                                               moreInfoCallback={() => {
                                                                 navigation.navigate('PlaylistScreen', {
                                                                   playlistId: item.id
                                                                 });
                                                               }}
              />
              }
            />
          }
        </View>
      </SafeAreaView>
    </View>
  );
}

export default PlaylistListScreen;
