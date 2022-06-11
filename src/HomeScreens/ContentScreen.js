import React from 'react'
import Top3List from '../Components/Top3List'
import constants from '../others/constants'
import {ScrollView} from "react-native";
import TopList from "../Components/TopList";
import genre from "../data/Genre"
import GenreChip from "../Components/GenreChip";

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
        title='Álbumes'
        endpoint={constants.MEDIA_HOST + constants.ALBUM_URL + "?"}
        navigation={navigation}
        open='AlbumListScreen'
        albumList={true}
      />

      <TopList
      title={'Géneros'}
      navigation={navigation}
      data={Object.values(genre)}
      max={3}
      renderDataItem={(genre, id) => {
        return (<GenreChip id={id} key={id} genre={genre} navigation={navigation}/>)
      }}
      open='GenreListScreen'
      />

    </ScrollView>
  );
}

export default ContentScreen;
