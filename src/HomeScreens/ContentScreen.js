import React, {useEffect, useState} from 'react'
import {Avatar} from "react-native-paper";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SongListScreen} from "./SongListScreen";
import {AlbumListScreen} from "./AlbumListScreen";

export default ContentScreen = ({navigation}) => {
    const ContentTab = createBottomTabNavigator();

    return (
        <ContentTab.Navigator screenOptions={{headerShown: false}}>
            <ContentTab.Screen
                name="Canciones"
                component={SongListScreen}
                options={{
                    tabBarIcon: () => (< Avatar.Icon size={30} icon='music' />)
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
