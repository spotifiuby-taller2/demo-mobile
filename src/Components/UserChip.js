import { 
    StyleSheet, 
    View
  } from 'react-native';
import React from 'react'
import { Text, Chip, Avatar } from 'react-native-paper';
import { useAuthUser } from '../context/AuthContext';

/*user must be {name: '', surname: '', email:''}*/
    
  export default UserChip = (props) =>{
        return(
            <Chip style={styles.chip} onPress={ () => {
                props.navigation.navigate('ProfileScreen',{uid: props.user.id})}}>
                <View style={{flexDirection:'row', flexWrap: "wrap"}}>
                        <Avatar.Text 
                            style={{marginRight: 15, backgroundColor: '#ff4500'}}
                            label={`${props.user.name.charAt(0)}${props.user.surname.charAt(0)}`}
                            />

                        <View style={{flexDirection:'column',}}>
                            <Text style={styles.name}>{props.user.name} {props.user.surname}</Text>
                            <Text style={styles.email}>{props.user.email}</Text>
                        </View>

                </View>
                
            </Chip>
        )
      }
  
  
      const styles = StyleSheet.create(
        { 
           chip:{
             backgroundColor: 'darkblue',
             marginTop: 5,
             height: 110
             ,
           },
           name:{
             fontSize: 19,
             color: 'gold',
            
          },
           email: {
             color: 'white',
           }
          }
     )