import React, {useEffect, useState} from 'react';
import {getToGateway} from "../others/utils";
import constants from "../others/constants";
import {SafeAreaView, ScrollView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import AlbumChip from "../Components/AlbumChip";

const AlbumListScreen = ({navigation}) => {
    const [albumList, setAlbumList] = useState([]);

    useEffect(() => {
        function getEveryAlbum() {
            getToGateway(constants.MEDIA_HOST + constants.ALBUM_URL,
                "").then((response) => {
                if (response.error !== undefined) {
                    alert(response.error);
                    return;
                }

                console.log(response);

                setAlbumList(response);
            });
        }

        navigation.addListener('focus',
            ()=>{
                getEveryAlbum();
            });

    }, [navigation]);

    return (
        <View style={containerStyle}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {
                            albumList.map( (album, id) => {
                                return (
                                    <AlbumChip id={id}
                                              key={id}
                                              album={album}
                                              navigation={navigation}/>
                                )})
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default AlbumListScreen
