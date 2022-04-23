import { 
    StyleSheet
  } from 'react-native';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreens/HomeScreen';
import ProfileScreen from '../HomeScreens/ProfileScreen';
import UserListScreen from '../HomeScreens/UserListScreen';
import ArtistListScreen from '../HomeScreens/ArtistsListScreen';
import FavoriteArtistListScreen from '../HomeScreens/FavoriteArtistsListScreen';
import 'react-native-gesture-handler'
import {useAuthUser} from '../context/AuthContext'
import Menu from './Menu';
import ContentScreen from "../HomeScreens/ContentScreen";
import ArtistsListTab from "../Components/ArtistsListTab";

const HomeStack = createNativeStackNavigator();

export default HomeNavStack = () =>{

    const {userState} = useAuthUser();
    
    /*Todas las pantallas de la Home van aca*/
    return(
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name='Menu' component={Menu} />
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
            <HomeStack.Screen name='ProfileScreen' component={ProfileScreen} initialParams={{uid: userState.uid}}/>
            <HomeStack.Screen name='ArtistsListTab' component={ArtistsListTab} />
            <HomeStack.Screen name='ContentScreen' component={ContentScreen} />
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
