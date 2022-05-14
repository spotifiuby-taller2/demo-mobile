import React, {useEffect, useState} from 'react';
import {View, Text} from "react-native";
import {IconButton, ProgressBar} from "react-native-paper";
import TrackPlayer, {Capability, State, Event, usePlaybackState, useTrackPlayerEvents, useProgress} from "react-native-track-player";

const track = {
  url: 'https://firebasestorage.googleapis.com/v0/b/fir-firebase-acc6b.appspot.com/o/c33a901d-ce0c-4d76-a1c1-52dde342d07b?alt=media&token=14fa0c43-d859-4d7f-b1b7-e411eaba5037', // Load media from the network
  title: 'Test song',
  artist: 'test artist',
};

const setUpTrackPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
  console.log("Track player set up correctly")
}

const NowPlayingBar = () => {

  useEffect(() => {
    setUpTrackPlayer()
      .then(() => TrackPlayer.add([track]))
      .then(() => console.log('queue set'));
    return () => {
      TrackPlayer.destroy();
    }
  }, []);

  const playerState = usePlaybackState();
  const isPlaying = playerState === State.Playing;
  const [currentTrack, setCurrentTrack] = useState({});
  const { position, _, duration } = useProgress()

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentTrack(track);
    }
  });

  return (
    <View>
      {
        isPlaying ?
          (<IconButton icon='pause' onPress={() => {
            TrackPlayer.pause();
          }} />) :
          (<IconButton icon='play' onPress={() => {
            TrackPlayer.play();
          }}/>)
      }
      <Text>{currentTrack?.title ?? ''}</Text>
      <ProgressBar progress={(position ?? 0)/(duration ?? 1) || 0} indeterminate={false}/>
    </View>
  )
}

export default NowPlayingBar;
