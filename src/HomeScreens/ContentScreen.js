import React from 'react'
import Top3List from '../Components/Top3List'
import constants from '../others/constants'
import {ScrollView} from "react-native-gesture-handler";


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
    </ScrollView>
  );
}

export default ContentScreen;
