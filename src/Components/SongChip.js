import {
  StyleSheet, TouchableOpacity,
  View
} from 'react-native';
import React from 'react'
import {Text, Avatar, IconButton} from 'react-native-paper';
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
  }
)

const songToTrack = (song) => {
  console.log(JSON.stringify(song));
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
  return (
    <TouchableOpacity style={styles.container}
                      onPress={() => player.playList([songToTrack(props.song)])}>
      <View style={styles.info}>
        <Avatar.Text
          style={{
            backgroundColor: '#ff4500',
            marginHorizontal: 10,
          }}
          label={props.song.title.charAt(0)}
        />
        <Text style={styles.name}>{props.song.title}</Text>
      </View>
      <IconButton icon='dots-vertical'
                  onPress={() => {
                    props.navigation.navigate('SongScreen', {
                      songId: props.song.id
                    });
                  }}
      />
    </TouchableOpacity>
  )
}

export default SongChip;
