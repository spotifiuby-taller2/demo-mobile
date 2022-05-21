import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  State,
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  useProgress,
} from "react-native-track-player";

const playList = async (list, start) => {
  await TrackPlayer.reset();
  await TrackPlayer.add(list);
  await TrackPlayer.skip(start);
  await TrackPlayer.play();
}

const usePlayer = () => {

  const playerState = usePlaybackState();
  const isPlaying = playerState === State.Playing;
  const isLoading = playerState === State.Connecting || playerState === State.Buffering;
  const [currentTrack, setCurrentTrack] = useState({});
  const {position, duration} = useProgress()
  // TODO: fetch fav state for track id
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    TrackPlayer.getCurrentTrack()
      .then(trackIndex => TrackPlayer.getTrack(trackIndex))
      .then(track => setCurrentTrack(track));
  }, [playerState]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentTrack(track);
    }
  });

  return {
    isPlaying,
    isLoading,
    currentTrack,
    position,
    duration,
    isFav,
    setIsFav,
    play: () => TrackPlayer.play(),
    pause: () => TrackPlayer.pause(),
    skipToNext: () => TrackPlayer.skipToNext(),
    skipToPrevious: () => TrackPlayer.skipToPrevious(),
    seekTo: (s) => TrackPlayer.seekTo(s),
    playList,
  };
}

export default usePlayer;
