import React, {useEffect, useState} from "react";
import SongList from "../Components/SongList";
import {getPlaylist, setPlaylistStatus} from "../Services/MediaService";
import {Image, View, StyleSheet} from "react-native";
import {Button, RadioButton, Text} from "react-native-paper";
import LoaderScreen from "../Components/LoaderScreen";
import defaultArtwork from "../../assets/album-placeholder.png";
import { ScrollView } from "react-native-gesture-handler";
import {buttonStyle, buttonTextStyle} from "../styles/genericStyles";
import {BlankLine} from "../ContentScreens/BlankLine";

const PlaylistScreen = ({navigation, route}) => {
  const playlistId = route.params.playlistId;
  const [playlist, setPlaylist] = useState();
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    getPlaylist(playlistId).then(p => {
      setPlaylist(p);

      setIsPublic(p.isCollaborative);

      navigation.setOptions({ headerShown: true, headerTitle: p.title });
    });
  }, [])

  const handleStatusChange = async () => {
    const data = {
      id: playlistId,
      isPublic: ! isPublic,
    }

    await setPlaylistStatus(data)
        .then(res => {
          setIsPublic(! isPublic);
        } )
        .catch(err => {
              alert(err.error.toString());
            }
        );
  }

  if (playlist === undefined) {
    return <LoaderScreen/>;
  }

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={{
          textAlign: 'left',
          padding: 15,
          fontSize: 25}}>{'Canciones'}</Text>

        <Image source={playlist.artwork ? {uri: playlist.artwork} : defaultArtwork} style={styles.artwork}/>
        <SongList navigation={navigation} songList={playlist.songs ?? []}/>

        <BlankLine/>

        <Button mode='contained'
                style={styles.button}
                onPress={handleStatusChange}>
          {
            (isPublic) ?
                <Text style={buttonTextStyle}>{'Hacer privada'}</Text>
                :
                <Text style={buttonTextStyle}>{'Hacer pública'}</Text>
          }
        </Button>
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
    button: {
...buttonStyle,
      width: 200,
}
});

export default PlaylistScreen;
