import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react'
import {Avatar, Text} from 'react-native-paper';
import ProfilePicture from './ProfilePicture'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


/*user must be {name: '', surname: ''}*/

const UserChip = props => {
  return (
    <TouchableOpacity style={styles.chip} onPress={() => {
      props.navigation.navigate('ProfileScreen', {uid: props.user.id, usingList: true})
    }}>
      <View style={{flexDirection: 'row'}}>
          <ProfilePicture
                    uid={props.user.id}
                    name={props.user.name}
                    surname={props.user.surname}
                    pictureSize={56}
                    photoUrl={props.user.photoUrl}
                    disabled={true}
                    defaultImage={{margin: 13}}
                    profilePicture={{margin: 13}}
                  />

          <View style={{flexDirection: 'column', marginTop: 15}}>
            <Text style={styles.name}>{props.user.name} {props.user.surname}</Text>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name={props.user.isArtist? 'account-music': 'headphones'}
                size={30}
                color='#388AD6'/>
              {
                props.user.isVerified && props.user.isArtist &&
                  (
                    <>
                      <Avatar.Icon icon="check-decagram" size={30} color={'green'} style={styles.icon}/>
                      <Text style={{color: 'black', paddingTop: 5}}>{'Artista verificado'}</Text>
                    </>)
                
              }
            </View>
          </View>
          
          
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create(
  {
    chip: {
      backgroundColor: 'lightblue',
      marginTop: 5,
      height: 80,
      borderRadius: 10,
    },
    name: {
      fontSize: 19,
      color: 'darkblue',
      paddingLeft: 5
    },
    email: {
      color: 'black',
      paddingLeft: 5
    },
    icon: {
      backgroundColor: 'transparent'
    },
    picture: {
      marginStart: 150,
    }
  }
)
export default UserChip;
