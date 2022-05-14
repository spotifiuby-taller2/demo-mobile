import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import {IconButton, ProgressBar} from "react-native-paper";
import TrackPlayer, {
  State,
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  useProgress,
} from "react-native-track-player";
import TextTicker from "react-native-text-ticker";
import SwipeableView from "./SwipeableView";

const NowPlayingBar = ({goToPlayer}) => {

  const playerState = usePlaybackState();
  const isPlaying = playerState === State.Playing;
  const [currentTrack, setCurrentTrack] = useState({});
  const { position, _, duration } = useProgress()
  // TODO: fetch fav state for track id
  const [isFav, setIsFav] = useState(false);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentTrack(track);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.horizontalLayout}>
        <SwipeableView
          style={styles.songInfoArea}
          onPress={() => goToPlayer()}
          onSwipeLeft={() => TrackPlayer.skipToNext()}
          onSwipeRight={() => TrackPlayer.skipToPrevious()}
        >
          <Image style={styles.artwork} source={{uri: currentTrack.artwork}}/>
          <View style={styles.songInfo}>
            <TextTicker style={{fontSize: 18, fontWeight: 'bold'}} scroll={false}>
              {currentTrack?.title ?? ''}
            </TextTicker>
            <Text style={{fontSize: 16}}>{currentTrack?.artist ?? ''}</Text>
          </View>
        </SwipeableView>
        <View style={styles.buttonArea}>
          {
            // TODO: set fav song
            isFav ? (
              <IconButton icon='heart' onPress={() => setIsFav(false)}/>
            ) : (
              <IconButton icon='heart-outline' onPress={() => setIsFav(true)}/>
            )
          }
          {
            isPlaying ?
              (<IconButton icon='pause' onPress={() => {
                TrackPlayer.pause();
              }} />) :
              (<IconButton icon='play' onPress={() => {
                TrackPlayer.play();
              }}/>)
          }
        </View>
      </View>
      <ProgressBar style={styles.progressBar}
                   progress={(position ?? 0)/(duration ?? 1) || 0}
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
