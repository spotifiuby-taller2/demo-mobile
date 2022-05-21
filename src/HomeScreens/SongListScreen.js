import React, {useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import SongListItem from "../Components/SongListItem";
import usePlayer from "../Hooks/usePlayer";
import {getAllSongs} from "../Services/MediaService";

const defaultArtwork = require('../../assets/music-placeholder.png');

const songToTrack = (song) => {
  return {
    id: song.id,
    url: song.link,
    title: song.title,
    artist: song.author,
    artwork: song.artwork ? {uri: song.artwork} : defaultArtwork,
  }
}

const SongListScreen = ({navigation}) => {
  const player = usePlayer();
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    getAllSongs().then(songs => songs.map(songToTrack)).then(setAllSongs);
  }, []);

  return (
    <View style={containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {
            allSongs.map((song, id) => {
              return (
                <SongListItem id={id}
                              key={id}
                              song={song}
                              navigation={navigation}
                              play={() => player.playList(allSongs, id)}/>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default SongListScreen;
