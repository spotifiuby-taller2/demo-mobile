import {
  StyleSheet, TouchableOpacity,
  View, Image,
} from 'react-native';
import React from 'react'
import {Text, IconButton} from 'react-native-paper';

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: 'lightblue',
      marginTop: 5,
      height: 80,
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10,
    },
    info: {
      flexDirection: 'row',
      flex: 20,
      flexGrow: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    textInfo: {
      flexShrink: 1,
    },
    title: {
      fontSize: 19,
      color: 'black',
    },
    artist: {
      fontSize: 16,
      color: '#565656',
    },
    artwork: {
      height: 60,
      width: 60,
      marginHorizontal: 10,
      borderRadius: 10,
    },
  }
)

const PlayableListItem = (props) => (
  <TouchableOpacity style={styles.container}
                    onPress={() => props.play()}>
    <View style={styles.info}>
      <Image style={styles.artwork} source={props.track.artwork}/>
      <View style={styles.textInfo}>
        <Text numberOfLines={1} style={styles.title}>{props.track.title}</Text>
        <Text numberOfLines={1} style={styles.artist}>{props.track.artist}</Text>
      </View>
    </View>
    <IconButton icon='dots-vertical'
                style={{flex: 1}}
                onPress={() => {
                  props.navigation.navigate('SongScreen', {
                    songId: props.track.id
                  });
                }}
    />
  </TouchableOpacity>
);

export default PlayableListItem;
