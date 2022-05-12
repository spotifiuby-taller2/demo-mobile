import { 
    StyleSheet
  } from 'react-native';
import React, {useState, useEffect} from 'react'
import HomeScreen from '../HomeScreens/HomeScreen';
import ProfileScreen from '../HomeScreens/ProfileScreen';
import UserListScreen from '../HomeScreens/UserListScreen';
import 'react-native-gesture-handler'
import {useAuthUser} from '../context/AuthContext'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ArtistsListTab from "./ArtistsListTab"
import { checkAuthTokenExpirationTime } from '../others/utils'
    
const Drawer = createDrawerNavigator();

export default Menu = () =>{

    const {userState, signOut} = useAuthUser();
    const [isSignIn, setIsSignIn] = useState(true);

    useEffect(()=>{
        if( ! isSignIn )
          signOut();

    },[isSignIn]);

    
    /* Todas las pantallas del menu se agregan Aca*/
    return(
        <Drawer.Navigator
          screenListeners={{
            focus: async (e) => {
              if ( ! await checkAuthTokenExpirationTime()){
                  alert("Su token de sesión expiro.");
                  setIsSignIn(false);
              }
            },
          }}>
            <Drawer.Screen name='Inicio' component={HomeScreen} />
            <Drawer.Screen name='Perfil' component={ProfileScreen} initialParams={{uid: userState.uid}}/>
            <Drawer.Screen name='Usuarios' component={UserListScreen} />
            <Drawer.Screen name='Artistas' component={ArtistsListTab} />
        </Drawer.Navigator>
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