import { 
    StyleSheet, 
    View,
    ScrollView,
    SafeAreaView,
  } from 'react-native';

import React, {useEffect, useState} from 'react'
import { Title, Text,Button, Chip, Avatar } from 'react-native-paper';
import constants from '../others/constants'
import ProfileScreen from './ProfileScreen';
import {getToGateway} from "../others/utils";
import UserChip from '../Components/UserChip';
    
  export default UserListScreen = ({navigation}) =>{
        
        const [usersList, setList] = useState([]);

        useEffect(() => {
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
                      <UserChip id={id} key={id} user={user} navigation={navigation}/>
                  }
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
           }
          }
     )