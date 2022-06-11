import React, {useEffect, useState} from "react";
import SongList from "../Components/SongList";
import {getAlbum, getPlaylist} from "../Services/MediaService";
import {Image, View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import LoaderScreen from "../Components/LoaderScreen";
import defaultArtwork from "../../assets/album-placeholder.png";
import FavouriteAlbumIconButton from "../Components/FavouriteAlbumIconButton";
import { ScrollView } from "react-native-gesture-handler";

const PlaylistScreen = ({navigation, route}) => {
  const playlistId = route.params.playlistId;
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    getPlaylist(playlistId).then(p => {
      setPlaylist(p);
      navigation.setOptions({ headerShown: true, headerTitle: p.title });
    });
  }, [])

  if (playlist === undefined) {
    return <LoaderScreen/>;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={playlist.artwork ? {uri: playlist.artwork} : defaultArtwork} style={styles.artwork}/>
        <Text style={styles.title}>{playlist.title}</Text>
        <Text>{playlist.description}</Text>

        <SongList navigation={navigation}
                  songList={playlist.songs ?? []}/>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#f5fcff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
  },
  artwork: {
    marginTop: 20,
    resizeMode: 'contain',
    flex: 1,
  },
});

export default PlaylistScreen;
