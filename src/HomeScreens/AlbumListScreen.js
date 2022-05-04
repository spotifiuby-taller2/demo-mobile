import React, {useEffect, useState} from 'react';
import {getToGateway} from "../others/utils";
import constants from "../others/constants";
import {SafeAreaView, ScrollView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import ContentChip from "../Components/SongChip";

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

        getEveryAlbum();
    }, []);

    return (
        <View style={containerStyle}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>

                        {
                            albumList.map( (album, id) => {
                                return (
                                    <ContentChip id={id}
                                              key={id}
                                              song={album}
                                              navigation={navigation}/>
                                )})
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export {
    AlbumListScreen
}
