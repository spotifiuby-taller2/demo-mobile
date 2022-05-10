import {SafeAreaView, ScrollView, View} from "react-native";
import { Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import {getToGateway} from "../others/utils";
import * as constants from "../others/constants";
import {useRoute} from "@react-navigation/native";
import {titleStyle} from "../styles/genericStyles";
import {contentTitleStyle} from "../styles/contentStyle";
import SongChip from "../Components/SongChip";

const SongScreen = ({navigation}) => {
    const [songId, setSongId] = useState("");

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [artists, setArtsts] = useState([]);

    const [subscription, setSubscription] = useState("");

    const [author, setAuthor] = useState("");

    const [genre, setGenre] = useState("");

    const [link, setLink] = useState("");

    const route = useRoute();

    useEffect( () => {
        async function getSong() {
            const song = await getToGateway(constants.MEDIA_HOST + constants.SONGS_URL
                                                           + "/"
                                                           + route.params
                                                                  .id);

            if (song.error !== undefined) {
                alert("No se pudo mostrar la canción");
                return;
            }

            setSongId(song.id);
            setTitle(song.title);
            setDescription(song.description);
            setDescription(song.artists);
            setDescription(song.author);
            setDescription(song.subscription);
            setDescription(song.genre);
            setDescription(song.links);
        }

        navigation.addListener('focus', async () => {
                await getSong();
            }, [navigation]);
    }, [] );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text>{"\n\n\n"}
        </Text>

        <Text style={contentTitleStyle}>{title}
        </Text>

        <View> {
                    artists.map( (song, id) => {
                        return (
                            <Text style={contentTitleStyle}>{title}
                            </Text>
                        )})
                }
        </View>

        </ScrollView>
    )
}

export {
    SongScreen
}
