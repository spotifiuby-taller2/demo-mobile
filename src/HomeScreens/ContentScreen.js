import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView
} from 'react-native';
import React from 'react'
import {BottomNavigation, Text} from "react-native-paper";
import {
    buttonStyle,
    buttonTextStyle,
    containerStyle,
    imageStyle,
    inputStyle,
    titleStyle
} from "../styles/genericStyles";
import UploadSongScreen from "../ContentScreens/UploadSongScreen";

const MusicRoute = () => <UploadSongScreen/>;

const AlbumsRoute = () => <Text>Albums</Text>;

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

      return(
        <View style={styles.container}>
            <BottomNavigation
                navigationState={{ index, routes }}
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
