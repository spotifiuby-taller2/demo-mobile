import React from 'react'
import Top3List from '../Components/Top3List'
import {View,} from 'react-native';
import constants from '../others/constants'


const ContentScreen = ({navigation}) => {

  return (
        <Top3List
          title='Canciones'
          endpoint={constants.MEDIA_HOST + constants.SONGS_URL + "?"}
          navigation={navigation}
          open='SongListScreen'
          songList={true}
          />
  );
}

export default ContentScreen;
