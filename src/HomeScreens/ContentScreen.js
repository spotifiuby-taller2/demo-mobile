import {StyleSheet, View,} from 'react-native';
import React from 'react'
import {BottomNavigation} from "react-native-paper";
import {
  buttonStyle,
  buttonTextStyle,
  containerStyle,
  imageStyle,
  inputStyle,
  titleStyle
} from "../styles/genericStyles";
import UploadSongScreen from "../ContentScreens/UploadSongScreen";
import UploadAlbumScreen from '../ContentScreens/UploadAlbumScreen';


const MusicRoute = () => <UploadSongScreen/>;

const AlbumsRoute = () => <UploadAlbumScreen/>;


const ContentScreen = () => {
  const [index, setIndex] = React.useState(0);

  const routes = [
    {
      key: 'music',
      title: 'Canciones',
      icon: 'music'
    },
    {
      key: 'albums',
      title: 'Álbumes',
      icon: 'album'
    }
  ];

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
  });

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: inputStyle,
  container: containerStyle,
  title: titleStyle,
  button: buttonStyle,
  buttonText: buttonTextStyle,
  image: imageStyle
});

export default ContentScreen;
