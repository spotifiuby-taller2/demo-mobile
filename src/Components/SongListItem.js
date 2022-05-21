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
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10,
    },
    info: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    name: {
      fontSize: 19,
      color: 'black',
    },
    artwork: {
      height: 60,
      width: 60,
      marginHorizontal: 10,
      borderRadius: 10,
    },
  }
)

const SongListItem = (props) => (
  <TouchableOpacity style={styles.container}
                    onPress={() => props.play()}>
    <View style={styles.info}>
      <Image style={styles.artwork} source={props.track.artwork}/>
      <Text style={styles.name}>{props.track.title}</Text>
    </View>
    <IconButton icon='dots-vertical'
                onPress={() => {
                  props.navigation.navigate('SongScreen', {
                    songId: props.track.id
                  });
                }}
    />
  </TouchableOpacity>
);

export default SongListItem;
