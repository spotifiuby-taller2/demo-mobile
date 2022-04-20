import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArtistsListScreen from '../HomeScreens/ArtistsListScreen';
import FavoriteArtistsListScreen from "../HomeScreens/FavoriteArtistsListScreen"
import React from 'react'
import { Avatar } from 'react-native-paper';

const ArtistsTab = createBottomTabNavigator();

export default HomeNavStack = ({navigation}) => {
  return (
    <ArtistsTab.Navigator screenOptions={{headerShown: false}}>
      <ArtistsTab.Screen 
          name="Artistas" 
          component={ArtistsListScreen}
          options={{
            tabBarIcon: ({size, color}) => (< Avatar.Icon size={24} icon='star'/>)
        }} />
      <ArtistsTab.Screen name="Favoritos" component={FavoriteArtistsListScreen} />
    </ArtistsTab.Navigator>
  );
}