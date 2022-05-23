import {StyleSheet, View} from 'react-native';
import React from 'react'
import {Avatar, Chip, Text} from 'react-native-paper';
import ProfilePicture from './ProfilePicture'

/*user must be {name: '', surname: ''}*/

const UserChip = props => {
  return (
    <Chip style={styles.chip} onPress={() => {
      props.navigation.navigate('ProfileScreen', {uid: props.user.id, usingList: true})
    }}>
      <View style={{
        flexDirection: 'row',
        flexWrap: "wrap",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 110
      }}>
          <ProfilePicture
                    uid={props.user.id}
                    name={props.user.name}
                    surname={props.user.surname}
                    pictureSize={56}
                    photoUrl={props.user.photoUrl}
                    disabled={true}
                    defaultImage={{marginTop: 100}}
                    profilePicture={{marginTop: 7}}
                  />

          <View style={{flexDirection: 'column'}}>
            <Text style={styles.name}>{props.user.name} {props.user.surname}</Text>
            {
              props.user.isVerified && props.user.isArtist &&
              <View style={{flexDirection: 'row'}}>
                <Avatar.Icon icon="check-decagram" size={30} color={'green'} style={styles.icon}/>
                <Text style={{color: 'black', paddingTop: 5}}>{'Artista verificado'}</Text>
              </View>
            }
          </View>
        </View>
    </Chip>
  )
}

const styles = StyleSheet.create(
  {
    chip: {
      backgroundColor: 'skyblue',
      marginTop: 5,
      height: 110,
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
