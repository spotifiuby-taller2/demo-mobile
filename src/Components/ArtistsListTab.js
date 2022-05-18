import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArtistsListScreen from '../HomeScreens/ArtistsListScreen';
import FavoriteArtistsListScreen from "../HomeScreens/FavoriteArtistsListScreen"
import React from 'react'
import { Avatar } from 'react-native-paper';

const ArtistsTab = createBottomTabNavigator();

const ArtistsListTab = ({navigation}) => {
  return (
    <ArtistsTab.Navigator screenOptions={{headerShown: false}}>
      <ArtistsTab.Screen 
          name="Ver artistas"
          component={ArtistsListScreen}
          options={{
            tabBarIcon: () => (< Avatar.Icon size={30} icon='account' />)
          }}
          />
          
      <ArtistsTab.Screen 
          name="Ver favoritos"
          component={FavoriteArtistsListScreen}
          options={{
            tabBarIcon: () => (< Avatar.Icon size={30} icon='star'/>)
          }} 
          />
    </ArtistsTab.Navigator>
  );
}

export default ArtistsListTab;