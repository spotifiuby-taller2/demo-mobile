import React from 'react'
import {ScrollView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import SongListItem from "./SongListItem";
import usePlayer from "../Hooks/usePlayer";
import defaultArtwork from "../../assets/music-placeholder.png";

const songToTrack = (song) => {
  return {
    id: song.id,
    url: song.link,
    title: song.title,
    artist: song.author,
    artwork: song.artwork ? {uri: song.artwork} : defaultArtwork,
  }
}

const SongList = ({navigation, songList}) => {
  const player = usePlayer();
  const tracks = songList.map(songToTrack);
  return (
    <View style={containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {
            tracks.map((track, id) => {
              return (
                <SongListItem id={id}
                              key={id}
                              track={track}
                              navigation={navigation}
                              play={() => player.playList(songList.map(songToTrack), id)}/>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default SongList;
