import React, {useEffect, useState} from 'react';
import {songToTrack} from "../others/utils";
import {FlatList, SafeAreaView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import PlayableListItem from "../Components/PlayableListItem";
import defaultArtwork from "../../assets/album-placeholder.png";
import usePlayerAction from "../Hooks/usePlayerAction";
import {getArtists} from "../Services/UsersService";
import {getAllAlbums} from "../Services/MediaService";
import LoaderScreen from '../Components/LoaderScreen';

const toPlayable = album => {
  return {
    title: album.title,
    artwork: album.link ? {uri: album.link} : defaultArtwork,
    artist: album.artistNames ?? 'Unknown artists',
  };
};

import {Searchbar} from "react-native-paper";

const enrichWithArtistNames = (albums, artists) => albums.map(album => enrichWithArtistName(album, artists));

const enrichWithArtistName = (album, artists) => ({
  ...album,
  artistNames: album.artists
    .map(artistId => artists.find(a => a.id === artistId))
    .map(getUserName)
    .join(', '),
});

const getUserName = user => `${user.name} ${user.surname}`

const AlbumListScreen = ({navigation}) => {
  const [albumList, setAlbumList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('')
  const player = usePlayerAction();

  useEffect(() => {
    const getAlbumsWithArtists = async () => {
      const allAlbums = getAllAlbums();
      const artists = await getArtists().then(r => r.list);
      return allAlbums.then(albums => enrichWithArtistNames(albums, artists));
    }
    getAlbumsWithArtists().then(albums => {
      setAlbumList(albums);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({headerShown: true, headerTitle: 'Álbumes'});
  }, []);

  
  const toPlayable = album => {
    return {
      title: album.title,
      artwork: album.link ? {uri: album.link} : defaultArtwork,
      artist: album.artistNames ?? 'Unknown artists',
    };
  };

  const filterAlbum = filterText => {
    filterText = filterText.toLowerCase();
    return s => s.title.toLowerCase().includes(filterText) || s.artistNames.toLowerCase().includes(filterText);
  }

  if (loading) {
    return <LoaderScreen/>;
  }
  return (
    <View style={{...containerStyle, marginTop: 10}}>
      <SafeAreaView>
        <Searchbar onChangeText={setText}
                   placeholder={"Buscar albumes"}
                   inputStyle={{}}
                   containerStyle={{}}
                   inputContainerStyle={{}}
        />
        <View>
          <View style={{marginBottom: 10}}/>
          {
            <FlatList
              data={albumList.filter(filterAlbum(text))}
              renderItem={({item, index}) => <PlayableListItem id={index}
                                                               key={index}
                                                               playableItem={toPlayable(item)}
                                                               play={() => player.playList(item.songs.map(songToTrack), 0)}
                                                               moreInfoCallback={() => {
                                                                 navigation.navigate('AlbumScreen', {
                                                                   albumId: item.id
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

export default AlbumListScreen;
