import React from 'react'
import {StyleSheet, View, Image} from "react-native";
import {IconButton, Text} from "react-native-paper";
import usePlayer from "../Hooks/usePlayer";
import TextTicker from "react-native-text-ticker";

const FullScreenPlayer = ({navigation}) => {
  const player = usePlayer();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <IconButton icon='chevron-down' size={32} onPress={() => navigation.goBack()}/>
        <Text style={{fontSize: 20}}>{player.currentTrack.album || 'Unknown album'}</Text>
      </View>
      <View style={styles.artworkContainer}>
        <Image style={styles.artwork} source={{uri: player.currentTrack.artwork}} />
      </View>
      <View style={styles.bottom}>
        <TextTicker style={{fontSize: 24, fontWeight: 'bold'}} scroll={false}>
          {player.currentTrack?.title ?? ''}
        </TextTicker>
        <Text style={{fontSize: 22}}>{player.currentTrack?.artist ?? ''}</Text>
        <View style={styles.musicControl}>
          <IconButton icon='skip-previous' size={50} disabled={player.isLoading} onPress={() => {
            player.skipToPrevious();
          }}/>
          {
            player.isPlaying ?
              (<IconButton icon='pause' size={50} disabled={player.isLoading} onPress={() => {
                player.pause();
              }}/>) :
              (<IconButton icon='play' size={50} disabled={player.isLoading} onPress={() => {
                player.play();
              }}/>)
          }
          <IconButton icon='skip-next' size={50} disabled={player.isLoading} onPress={() => {
            player.skipToNext();
          }}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow:1,
  },
  topBar: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  artworkContainer: {
    flex: 7,
  },
  artwork: {
    resizeMode: 'contain',
    ...StyleSheet.absoluteFillObject,
  },
  bottom: {
    flex: 4,
  },
  musicControl: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default FullScreenPlayer;
