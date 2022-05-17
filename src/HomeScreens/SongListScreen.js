import React, {useEffect, useState} from 'react';
import {getToGateway} from "../others/utils";
import constants from "../others/constants";
import {SafeAreaView, ScrollView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import SongChip from "../Components/SongChip";


const SongListScreen = ({navigation}) => {
    const [songList, setSongList] = useState([]);

    useEffect(() => {
        function getAllSongs() {
            getToGateway(constants.MEDIA_HOST + constants.SONGS_URL)
                .then((response) => {
                if (response.error !== undefined) {
                    alert(response.error);
                    return;
                }

                setSongList(response);
            });
        }

        navigation.addListener('focus',
            ()=>{
                getAllSongs();
            });
    }, [navigation]);

    return (
        <View style={containerStyle}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {
                            songList.map( (song, id) => {
                                return (
                                    <SongChip id={id}
                                              key={id}
                                              song={song}
                                              navigation={navigation}/>
                                )})
                        }
                    </View>
                </ScrollView>
        </View>
    )
}

export {
    SongListScreen
}
