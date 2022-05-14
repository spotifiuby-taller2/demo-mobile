import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import {IconButton, ProgressBar} from "react-native-paper";
import TextTicker from "react-native-text-ticker";
import SwipeableView from "./SwipeableView";
import usePlayer from "../Hooks/usePlayer";

const NowPlayingBar = ({goToPlayer}) => {

  const player = usePlayer();
  return (
    <View style={styles.container}>
      <View style={styles.horizontalLayout}>
        <SwipeableView
          style={styles.songInfoArea}
          onPress={() => goToPlayer()}
          onSwipeLeft={() => player.skipToNext()}
          onSwipeRight={() => player.skipToPrevious()}
        >
          <Image style={styles.artwork} source={{uri: player.currentTrack.artwork}}/>
          <View style={styles.songInfo}>
            <TextTicker style={{fontSize: 18, fontWeight: 'bold'}} scroll={false}>
              {player.currentTrack?.title ?? ''}
            </TextTicker>
            <Text style={{fontSize: 16}}>{player.currentTrack?.artist ?? ''}</Text>
          </View>
        </SwipeableView>
        <View style={styles.buttonArea}>
          {
            // TODO: set fav song
            player.isFav ? (
              <IconButton icon='heart' onPress={() => player.setIsFav(false)}/>
            ) : (
              <IconButton icon='heart-outline' onPress={() => player.setIsFav(true)}/>
            )
          }
          {
            player.isPlaying ?
              (<IconButton icon='pause' disabled={player.isLoading} onPress={() => {
                player.pause();
              }} />) :
              (<IconButton icon='play' disabled={player.isLoading} onPress={() => {
                player.play();
              }}/>)
          }
        </View>
      </View>
      <ProgressBar style={styles.progressBar}
                   progress={(player.position ?? 0)/(player.duration ?? 1) || 0}
                   indeterminate={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  horizontalLayout: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songInfoArea: {
    padding: 5,
    flexDirection: 'row',
    maxWidth: '65%',
  },
  songInfo: {
    paddingLeft: 5,
    alignSelf: 'flex-start',
  },
  progressBar: {
    width: '95%',
    alignSelf: 'center',
  },
  artwork: {
    height: 45,
    width: 45,
  },
  buttonArea: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  }
});

export default NowPlayingBar;
