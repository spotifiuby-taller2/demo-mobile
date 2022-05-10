import { 
    StyleSheet, 
    View
  } from 'react-native';
import React from 'react'
import { Text, Chip, Avatar } from 'react-native-paper';
import {chipStyle, nameStyle} from "../styles/listStyles";

const styles = StyleSheet.create( {
    chip: chipStyle,
    name: nameStyle
} )

export default SongChip = (props) => {
  return(
      <Chip style={styles.chip} onPress={ () => {
          props.navigation
               .navigate('SongScreen', {id: props.song
                                                 .id})
          } }>

          <View style={{flexDirection:'row', flexWrap: "wrap"}}>
                  <View style={{flexDirection:'column',}}>
                      <Text style={styles.name}>{props.song
                                                      .title}</Text>
                  </View>

          </View>

      </Chip>
  )
}
