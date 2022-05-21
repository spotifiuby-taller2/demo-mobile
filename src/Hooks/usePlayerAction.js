import TrackPlayer from "react-native-track-player";

const playList = async (list, start) => {
  await TrackPlayer.reset();
  await TrackPlayer.add(list);
  await TrackPlayer.skip(start);
  await TrackPlayer.play();
}

const usePlayerAction = () => ({
  play: () => TrackPlayer.play(),
  pause: () => TrackPlayer.pause(),
  skipToNext: () => TrackPlayer.skipToNext(),
  skipToPrevious: () => TrackPlayer.skipToPrevious(),
  seekTo: (s) => TrackPlayer.seekTo(s),
  playList,
});

export default usePlayerAction;
