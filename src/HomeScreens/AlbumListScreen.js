import React, {useEffect, useState} from 'react';
import {getToGateway, songToTrack} from "../others/utils";
import constants from "../others/constants";
import {ScrollView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import PlayableListItem from "../Components/PlayableListItem";
import usePlayer from "../Hooks/usePlayer";
import defaultArtwork from "../../assets/album-placeholder.png";

const toPlayable = album => {
  return {
    title: album.title,
    artwork: album.link ? {uri: album.link} : defaultArtwork,
    artist: album.artist ?? 'Unknown artist',
  };
};

const AlbumListScreen = ({navigation}) => {
  const [albumList, setAlbumList] = useState([]);

  const player = usePlayer();

  useEffect(() => {
    const getEveryAlbum = () => {
      getToGateway(constants.MEDIA_HOST + constants.ALBUM_URL,
        "").then((response) => {
        if (response.error !== undefined) {
          alert(response.error);
          return;
        }
        return response;
      })
        .then(albums => setAlbumList(albums));
    }
    getEveryAlbum();
  }, []);

  return (
    <View style={containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {
            albumList.map((album, id) => {
              return (
                <PlayableListItem id={id}
                                  key={id}
                                  playableItem={toPlayable(album)}
                                  play={() => player.playList(album.songs.map(songToTrack), 0)}
                                  moreInfoCallback={() => console.log('more info')}/>

              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export {
  AlbumListScreen
}
