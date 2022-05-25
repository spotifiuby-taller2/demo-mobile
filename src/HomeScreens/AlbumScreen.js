import React, {useEffect, useState} from "react";
import SongList from "../Components/SongList";
import {getAlbum} from "../Services/MediaService";
import {Image, View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import LoaderScreen from "../Components/LoaderScreen";
import defaultArtwork from "../../assets/album-placeholder.png";
import FavouriteAlbumIconButton from "../Components/FavouriteAlbumIconButton";
import { ScrollView } from "react-native-gesture-handler";

const AlbumScreen = ({navigation, route}) => {
  const albumId = route.params.albumId;
  const [album, setAlbum] = useState();

  useEffect(()=>{
    
  }, []);

  useEffect(() => {
    getAlbum(albumId).then(a => {
      setAlbum(a); 
      navigation.setOptions({ headerShown: true, headerTitle: a.title });
    });
  }, [])

  if (album === undefined) {
    return <LoaderScreen/>;
  }

  return (
    
    <View style={styles.container}>
      <ScrollView>
      <Image source={album.link ? {uri: album.link} : defaultArtwork} style={styles.artwork}/>
      <Text style={styles.title}>{album.title}</Text>
      
        <SongList navigation={navigation}
                  songList={album.songs ?? []}/>
      
      

      <Text>{"\n\n"}
      </Text>

      <FavouriteAlbumIconButton style={{alignSelf: 'center'}}
                                size={90}
                                albumId={route.params.albumId}/>
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

export default AlbumScreen;
