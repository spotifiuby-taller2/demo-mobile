import {
  StyleSheet, TouchableOpacity,
  View, Image,
} from 'react-native';
import React from 'react'
import {Text, IconButton} from 'react-native-paper';
import usePlayer from "../Hooks/usePlayer";

const defaultArtwork = require('../../assets/music-placeholder.png');

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: 'lightblue',
      marginTop: 5,
      height: 80,
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10,
    },
    info: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    name: {
      fontSize: 19,
      color: 'black',
    },
    artwork: {
      height: 60,
      width: 60,
      marginHorizontal: 10,
      borderRadius: 10,
    },
  }
)

const songToTrack = (song) => {
  return {
    id: song.id,
    url: song.link,
    title: song.title,
    artist: song.artist,
    artwork: song.artwork ? {uri: song.artwork } : defaultArtwork,
  }
}

const SongChip = (props) => {
  const player = usePlayer();
  const track = songToTrack(props.song);
  return (
    <TouchableOpacity style={styles.container}
                      onPress={() => player.playList([track])}>
      <View style={styles.info}>
        <Image style={styles.artwork} source={track.artwork}/>
        <Text style={styles.name}>{track.title}</Text>
      </View>
      <IconButton icon='dots-vertical'
                  onPress={() => {
                    props.navigation.navigate('SongScreen', {
                      songId: track.id
                    });
                  }}
      />
    </TouchableOpacity>
  )
}

export default SongChip;
