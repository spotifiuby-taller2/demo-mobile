import {ScrollView, View} from "react-native";
import {Button, Text} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import {getToGateway} from "../others/utils";
import * as constants from "../others/constants";
import {useRoute} from "@react-navigation/native";
import * as styles from "../styles/contentStyle";
import ArtistChip from "../Components/ArtistChip";
import {TouchableOpacity} from "react-native-gesture-handler";

const SongScreen = ({navigation}) => {
    const [songId, setSongId] = useState("");

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [artists, setArtsts] = useState([]);

    const [author, setAuthor] = useState("");

    const [subscription, setSubscription] = useState("");

    const [genre, setGenre] = useState("");

    const [link, setLink] = useState("");

    const route = useRoute();

    useEffect( () => {
        async function getSong() {
            const song = await getToGateway(constants.MEDIA_HOST + constants.SONGS_URL
                                                           + "/"
                                                           + route.params
                                                                  .songId);

            if (song.error !== undefined) {
                alert("No se pudo mostrar la canción.");
                return;
            }

            setSongId(song.id);
            setTitle(song.title);
            setDescription(song.description);
            setArtsts(song.artists);
            setAuthor(song.author);
            setSubscription(song.subscription);
            setGenre(song.genre);
            setLink(song.links);
        }

        navigation.addListener('focus', async () => {
                await getSong();
            }, [navigation]);
    }, [] );

    const agregarAFavoritos = () => {

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text>{"\n\n\n"}
            </Text>

            <Text style={styles.contentTitleStyle}>{title}
            </Text>

            <Text style={styles.contentTextStyle}>Artistas
            </Text>

            {
                artists.map((user) => {
                        return (
                            <ArtistChip id={user.id}
                                      key={user.id}
                                      user={user}
                                      navigation={navigation}/>
                        )
                    })
            }

            <Text>{"\n\n"}
            </Text>

            <TouchableOpacity
                onPress={ () => {
                    agregarAFavoritos()
                } }
                style={styles.contentButtonStyle}>
                <Text style={styles.emojiStyle}>❤</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

export {
    SongScreen
}
