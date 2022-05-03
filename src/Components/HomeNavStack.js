import { 
    StyleSheet
  } from 'react-native';
import React, {useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreens/HomeScreen';
import ProfileScreen from '../HomeScreens/ProfileScreen';
import 'react-native-gesture-handler'
import {useAuthUser} from '../context/AuthContext'
import Menu from './Menu';
import ContentScreen from "../HomeScreens/ContentScreen";
import ArtistsListTab from "../Components/ArtistsListTab";
import { getToGateway } from '../others/utils';
import constants from '../others/constants'
import EditProfileScreen from '../HomeScreens/EditProfileScreen';
import ChatScreen from '../HomeScreens/ChatScreen';

const HomeStack = createNativeStackNavigator();

export default HomeNavStack = () =>{

    const {userState, setUserType} = useAuthUser();


    useEffect(()=>{

      if ( userState.userType !== null )
        return;

        function getUserType(){

          return getToGateway(constants.USERS_HOST + constants.PROFILE_USER_TYPE_URL
                        + "?"
                        + constants.USER_ID_QUERY_PARAM
                        + userState.uid);
        }
        getUserType()
          .then(res => setUserType(res.status));

        
    },[])
    
    /*Todas las pantallas de la Home van aca*/
    return(
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name='Menu' component={Menu} />
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
            <HomeStack.Screen name='ProfileScreen' component={ProfileScreen} initialParams={{uid: userState.uid}}/>
            <HomeStack.Screen name='ArtistsListTab' component={ArtistsListTab} />
            <HomeStack.Screen name='ContentScreen' component={ContentScreen} />
            <HomeStack.Screen name='EditProfileScreen' component={EditProfileScreen}/>
            <HomeStack.Screen name='ChatScreen' component={ChatScreen}/>
        </HomeStack.Navigator>
    )
}

      const styles = StyleSheet.create(
        { input: {
            borderWidth: 2, 
            marginBottom: 15,
            marginTop: 15,
            backgroundColor: '#f5fcff',
            height: 50
           },
          container: {
            flex:1,
            backgroundColor: '#f5fcff',
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 30
           },
           title: {textAlign: 'center',fontSize: 25, marginBottom: 35},
           button: {
             backgroundColor: 'skyblue', 
             paddingTop: 15, 
             paddingBottom:15, 
             width: 100, 
             alignSelf: 'center', 
             marginTop: 30, 
             marginBottom:30,
             borderRadius: 10},
           buttonText: {textAlign: 'center', fontSize: 13},
           forgotPasswordButton: {textAlign: 'center', fontSize: 13, color: 'skyblue'},
           image:{
             height: 170,
             width: 170,
             alignSelf: 'center',
             marginTop: 50,
             marginBottom: 80
           }}
     )
