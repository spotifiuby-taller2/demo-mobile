import React from 'react'
import {ScrollView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import PlayableListItem from "./PlayableListItem";
import usePlayer from "../Hooks/usePlayer";
import {songToTrack} from "../others/utils";

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
                <PlayableListItem id={id}
                                  key={id}
                                  playableItem={track}
                                  play={() => player.playList(tracks, id)}
                                  moreInfoCallback={() => {
                                    navigation.navigate('SongScreen', {
                                      songId: track.id
                                    });
                                  }}
                />
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default SongList;
