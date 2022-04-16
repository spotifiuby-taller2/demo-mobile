import { 
    StyleSheet, 
    View,
    Image,
    ScrollView,
    SafeAreaView,
    Alert
  } from 'react-native';
  import React, {useEffect, useState} from 'react'
  import { Title, Text,Button, Chip, Avatar } from 'react-native-paper';
  import constants from '../others/constants'
  import ProfileScreen from './ProfileScreen';
import {getToGateway} from "../others/utils";
    
  export default UserListScreen = ({navigation}) =>{
        
        const [usersList, setList] = useState([]);

        useEffect(()=>{
            function getAllUsers(){

                getToGateway(constants.USERS_HOST + constants.APP_USERS_LIST_URL,
                             "").then(res => {
                    if (res.error !== undefined) {
                        alert(res.error);
                    } else {
                        setList(res.users);
                    }
                });
            }

            getAllUsers();
        },[]);

    
        return(
          <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                  {
                    usersList.map( (user, id)=>{
                        return (
                        <Chip id={id} key={user.id} style={styles.chip} onPress={()=>{navigation.navigate('ProfileScreen',{uid: user.id})}}>
                          <View style={{flexDirection:'row'}}>
                            <Avatar.Text 
                              style={{marginRight: 30, backgroundColor: '#ff4500'}}
                              label={`${user.name.charAt(0)}${user.surname.charAt(0)}`}
                              />
                            <View >
                              <Text style={styles.name}>{user.name} {user.surname}</Text>
                              <Text style={styles.email}>{user.email}</Text>
                            </View>
                          </View>
                        </Chip>
                    )})
                }
              </View>
              </ScrollView>
          </SafeAreaView>
        </View>
        )
      }
  
  
      const styles = StyleSheet.create(
        { 
          container: {
            flex:1,
            backgroundColor: 'steelblue',
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 30
           },
           chip:{
             backgroundColor: 'darkblue',
             marginTop: 5,
             height: 115
           },
           name:{
             fontSize: 24,
             color: 'white'
           },
           email: {
             color: 'white'
           }
          }
     )