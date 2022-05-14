import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import {IconButton, ProgressBar} from "react-native-paper";
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  useProgress,
  RepeatMode
} from "react-native-track-player";
import TextTicker from "react-native-text-ticker";
import SwipeableView from "./SwipeableView";

// this are examples of a track objects
const tracks = [
  {
    id: 1,
    url: 'https://firebasestorage.googleapis.com/v0/b/fir-firebase-2-9eb22.appspot.com/o/y2mate.com%20-%20Cuando%20me%20acuerdo%20de%20Salta%20Los%20Chalchaleros.mp3?alt=media&token=4f05d90c-509a-4435-8e2f-d361c30c0909',
    title: 'Cuando me acuerdo de Salta',
    artist: 'Los Chalchaleros',
    artwork: 'https://www.cmtv.com.ar/tapas-cd/chalchadel78.jpg',
  },
  {
    id: 2,
    url: 'https://firebasestorage.googleapis.com/v0/b/fir-firebase-2-9eb22.appspot.com/o/Eric%20Clapton-%20Wonderful%20Tonight%20(HQ).mp3?alt=media&token=c1f26352-8c9d-45cd-a22a-b2032c283e38',
    title: 'Wonderful tonight',
    artist: 'Eric Clapton',
    artwork: 'https://i1.sndcdn.com/artworks-000429269373-ogan3j-t500x500.jpg',
  },
  {
    id: 3,
    url: 'https://firebasestorage.googleapis.com/v0/b/fir-firebase-2-9eb22.appspot.com/o/The%20Gambler.mp3?alt=media&token=1d4e203b-e654-4afe-ae4f-04e96959475a',
    title: 'The Gambler',
    artist: 'Kenny Rogers',
    artwork: 'https://upload.wikimedia.org/wikipedia/en/b/be/The_Gambler_-_Kenny_Rogers.jpg',
  }
];

const setUpTrackPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious
    ],
  });
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  console.log("Track player set up correctly")
}

const NowPlayingBar = () => {

  useEffect(() => {
    setUpTrackPlayer()
      .then(() => TrackPlayer.add(tracks))
      .then(() => console.log('queue set'));
    return () => {
      TrackPlayer.destroy();
    }
  }, []);

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
          onPress={() => console.log('Pressed, TODO: go to fullscreen player')}
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
