import { 
    StyleSheet, 
    View
  } from 'react-native';
import React from 'react'
import { Text, Chip, Avatar } from 'react-native-paper';
import { useAuthUser } from '../context/AuthContext';


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

/* marginBottom, the height of the chip, and the content of the <Text> are interdependant on each other. */
  export default ArtistChip = (props) => {
        return(
            <Chip style={styles.chip} onPress={ () => {
                props.navigation.navigate('ProfileScreen',{uid: props.user.id})}}>
                <View style={{flexDirection:'row'}}>
                        <Avatar.Text 
                            style={{marginRight: 16,
                                    marginBottom: -30,
                                    backgroundColor: '#ff4500'}}
                            label={`${props.user.username.charAt(0)}`}
                            />

                        <View>
                            <Text style={styles.name}>{"\n"}
                                {props.user.username}</Text>
                        </View>
                </View>
            </Chip>
        )
 }
