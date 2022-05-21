import React, {useContext, useState} from 'react'
import SongListScreen from "./SongListScreen";
import {AlbumListScreen} from "./AlbumListScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Avatar} from "react-native-paper";
import {useEffect} from "@types/react";
import {getAllSongs} from "../Services/MediaService";

const ContentScreen = ({navigation}) => {
  const ContentTab = createBottomTabNavigator();
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    getAllSongs().then(setAllSongs);
  }, []);

  return (
    <ContentTab.Navigator screenOptions={{headerShown: false}}>
      <ContentTab.Screen
        name="Canciones"
        component={SongListScreen}
        initialParams={{songList: allSongs}}
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
}

export default ContentScreen;
