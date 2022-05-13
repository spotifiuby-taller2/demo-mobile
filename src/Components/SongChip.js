import { 
    StyleSheet, 
    View
  } from 'react-native';
import React from 'react'
import { Text, Chip, Avatar } from 'react-native-paper';
import {chipStyle, nameStyle} from "../styles/listStyles";

const styles = StyleSheet.create(
    {
        chip:{
            backgroundColor: 'lightblue',
            marginTop: 5,
            height: 80,
        },
        name:{
            fontSize: 19,
            color: 'black',

        }
    }
)

export default SongChip = (props) => {
  return(
    <Chip style={styles.chip} onPress={ () => {
        props.navigation.navigate('SongScreen',{songId: props.song
                                                         .id})}}>
        <View style={{flexDirection:'row'}}>
            <Avatar.Text
                style={{marginRight: 16,
                    marginBottom: -30,
                    backgroundColor: '#ff4500'}}
                label={`${props.song
                               .title}`}
            />

            <View>
                <Text style={styles.name}>{"\n"}
                    {props.song
                          .title}</Text>
            </View>
        </View>

        <View>
        <Text style={styles.name}>{"\n"}</Text>
        </View>
    </Chip>
  )
}
