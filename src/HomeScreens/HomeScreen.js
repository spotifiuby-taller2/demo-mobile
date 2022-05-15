import {SafeAreaView, View, ScrollView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react'
import { useAuthUser } from '../context/AuthContext';
import {getToGateway} from "../others/utils";
import constants from "../others/constants";
import {containerStyle} from "../styles/genericStyles";
import SongChip from "../Components/SongChip";
import {Text} from "react-native-paper";

const HomeScreen = ( {navigation} ) => {
    const [songs, setSongs] = useState([]);
    const {userState} = useAuthUser();
    const songsRef = useRef();

    useEffect(() => {
        function getFavoriteSongs() {
            getToGateway(constants.MEDIA_HOST + constants.FAVORITE_SONGS
                                              + "?userId="
                                              + userState.uid)
                .then((response) => {
                    if (response.error !== undefined) {
                        alert(response.error);
                        return;
                    }

                    setSongs(response);
                });

            songsRef.current = songs;
        }

        navigation.addListener('focus',
            () => {
                getFavoriteSongs();
            });
    }, [navigation, songs, setSongs]);

    return (
        <View style={containerStyle} ref={songsRef}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {
                        (songsRef.current !== undefined) && (
                            songsRef.current.map( (song, id) => {
                                return (
                                    <SongChip id={id}
                                              key={id}
                                              song={song}
                                              navigation={navigation}/>
                                )
                            } ) )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export {
    HomeScreen
}
