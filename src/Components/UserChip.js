import {StyleSheet, View} from 'react-native';
import React from 'react'
import {Avatar, Chip, Text} from 'react-native-paper';

/*user must be {name: '', surname: '', email:''}*/

const UserChip = props => {
  return (
    <Chip style={styles.chip} onPress={() => {
      props.navigation.navigate('ProfileScreen', {uid: props.user.id})
    }}>
      <View style={{
        flexDirection: 'row',
        flexWrap: "wrap",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 110
      }}>
        <View style={{flexDirection: 'column', paddingRight: 10, paddingTop: 55, height: 110}}>
          <Avatar.Text
            size={56}
            style={{backgroundColor: 'steelblue'}}
            label={`${props.user.name.charAt(0)}${props.user.surname.charAt(0)}`}
          />
        </View>
        <View style={{flexDirection: 'column', paddingLeft: 10, paddingTop: 55, height: 110}}>
          <Text style={styles.name}>{props.user.name} {props.user.surname}</Text>
          <Text style={styles.email}>{props.user.email}</Text>
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
    }
  }
)
export default UserChip;
