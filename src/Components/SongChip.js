import {
  StyleSheet,
  View
} from 'react-native';
import React from 'react'
import {Text, Avatar, IconButton} from 'react-native-paper';

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
  }
)

const SongChip = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}
            onPress={() => console.log('test')}>
        <Avatar.Text
          style={{
            backgroundColor: '#ff4500',
            marginHorizontal: 10,
          }}
          label={props.song.title}
        />
        <Text style={styles.name}>{props.song.title}</Text>
      </View>
      <IconButton icon='dots-vertical'
                  onPress={() => {
                    props.navigation.navigate('SongScreen', {
                      songId: props.song.id
                    });
                  }}
      />
    </View>
  )
}

export default SongChip;
