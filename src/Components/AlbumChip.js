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

export default AlbumChip = (props) => {
  return(
      <Chip style={styles.chip} onPress={
          ()=>{props.navigation
                    .navigate('ProfileScreen',{uid: props.album
                                                         .artists})
          } }>

          <View style={{flexDirection:'row', flexWrap: "wrap"}}>
                  <View style={{flexDirection:'column',}}>
                      <Text style={styles.name}>{props.album
                                                      .title}</Text>
                  </View>

          </View>

      </Chip>
  )
}
