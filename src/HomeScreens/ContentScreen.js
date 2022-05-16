import React from 'react'
import {SongListScreen} from "./SongListScreen";
import {AlbumListScreen} from "./AlbumListScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Avatar} from "react-native-paper";

import {
  StyleSheet, 
  View,
  ScrollView,
  SafeAreaView
} from 'react-native';

import {BottomNavigation, Text} from "react-native-paper";
import {
    buttonStyle,
    buttonTextStyle,
    containerStyle,
    imageStyle,
    inputStyle,
    titleStyle
} from "../styles/genericStyles";

import UploadSongScreen from "../ContentScreens/UploadSongScreen";
import UploadAlbumScreen from '../ContentScreens/UploadAlbumScreen';

export default ContentScreen = ({navigation}) => {
    const ContentTab = createBottomTabNavigator();

    return (
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
}
