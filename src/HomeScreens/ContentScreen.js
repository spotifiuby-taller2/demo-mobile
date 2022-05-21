import React from 'react'
import SongListScreen from "./SongListScreen";
import AlbumListScreen from "./AlbumListScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Avatar} from "react-native-paper";

const ContentTab = createBottomTabNavigator();

const ContentScreen = () => (
  <ContentTab.Navigator screenOptions={{headerShown: false}}>
    <ContentTab.Screen
      name="Canciones"
      component={SongListScreen}
      options={{
        tabBarIcon: () => (< Avatar.Icon size={30} icon='music'/>)
      }}
    />

    <ContentTab.Screen
      name="Álbumes"
      component={AlbumListScreen}
      options={{
        tabBarIcon: () => (< Avatar.Icon size={30} icon='album'/>)
      }}
    />
  </ContentTab.Navigator>
);

export default ContentScreen;
