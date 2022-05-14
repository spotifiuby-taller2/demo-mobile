import React, {useEffect, useState} from 'react'
import HomeScreen from '../HomeScreens/HomeScreen';
import ProfileScreen from '../HomeScreens/ProfileScreen';
import UserListScreen from '../HomeScreens/UserListScreen';
import 'react-native-gesture-handler'
import {useAuthUser} from '../context/AuthContext'
import {createDrawerNavigator} from '@react-navigation/drawer';
import ArtistsListTab from "./ArtistsListTab"
import {checkAuthTokenExpirationTime} from '../others/utils'

const Drawer = createDrawerNavigator();

const Menu = () => {

  const {userState, signOut} = useAuthUser();
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    if (!isSignIn)
      signOut();

  }, [isSignIn]);


  /* Todas las pantallas del menu se agregan Aca*/
  return (
    <Drawer.Navigator
      screenListeners={{
        focus: async (e) => {
          if (!await checkAuthTokenExpirationTime()) {
            alert("Su token de sesión expiro.");
            setIsSignIn(false);
          }
        },
      }}>
      <Drawer.Screen name='Inicio' component={HomeScreen}/>
      <Drawer.Screen name='Perfil' component={ProfileScreen} initialParams={{uid: userState.uid}}/>
      <Drawer.Screen name='Usuarios' component={UserListScreen}/>
      <Drawer.Screen name='Artistas' component={ArtistsListTab}/>
    </Drawer.Navigator>
  )
}

export default Menu;