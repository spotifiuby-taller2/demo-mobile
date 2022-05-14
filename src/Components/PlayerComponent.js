import React, {useEffect} from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FullScreenPlayer from "./FullScreenPlayer";
import HomeNavStack from "./HomeNavStack";
import TrackPlayer, {Capability, RepeatMode} from "react-native-track-player";

const Stack = createNativeStackNavigator();

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

const PlayerComponent = () => {

  useEffect(() => {
    setUpTrackPlayer()
      .then(() => TrackPlayer.add(tracks))
      .then(() => console.log('queue set'));
    return () => {
      TrackPlayer.destroy();
    }
  }, []);

  return (
    <Stack.Navigator mode='modal' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Main' component={HomeNavStack}/>
      <Stack.Screen name='Player' component={FullScreenPlayer}/>
    </Stack.Navigator>
  )
}

export default PlayerComponent;
