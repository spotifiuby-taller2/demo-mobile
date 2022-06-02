import React from 'react'
import Top3List from '../Components/Top3List'
import constants from '../others/constants'
import {ScrollView} from "react-native";
import TopList from "../Components/TopList";
import genre from "../data/Genre"

const ContentScreen = ({navigation}) => {

  return (
    <ScrollView style={{backgroundColor: '#f5fcff'}}>
      <Top3List
        title='Canciones'
        endpoint={constants.MEDIA_HOST + constants.SONGS_URL + "?"}
        navigation={navigation}
        open='SongListScreen'
        songList={true}
      />

      <Top3List
        title='Albumes'
        endpoint={constants.MEDIA_HOST + constants.ALBUM_URL + "?"}
        navigation={navigation}
        open='AlbumListScreen'
        albumList={true}
      />

      <TopList
      title={'Generos'}
      navigation={navigation}
      data={Object.values(genre)}
      max={3}
      genreList={true}
      open='GenreListScreen'
      />

    </ScrollView>
  );
}

export default ContentScreen;
