import React from 'react'
import Top3List from '../Components/Top3List'
import {View,} from 'react-native';
import constants from '../others/constants'


const ContentScreen = ({navigation}) => {

  return (
    <View style={{backgroundColor: '#f5fcff', flex: 1, flexGrow: 1}}>
        <Top3List
          title='Canciones'
          endpoint={constants.MEDIA_HOST + constants.SONGS_URL + "?"}
          navigation={navigation}
          open='SongListScreen'
          songList={true}
          />
    </View>
        
  );
}

export default ContentScreen;
