import {ScrollView, TouchableOpacity} from "react-native";
import {Button, Text} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import {getToGateway, postToGateway} from "../others/utils";
import * as constants from "../others/constants";
import {useRoute} from "@react-navigation/native";
import * as styles from "../styles/contentStyle";
import ArtistChip from "../Components/ArtistChip";
import {useAuthUser} from "../context/AuthContext";

const SongScreen = ({navigation}) => {
    const [hasSong, setHasSong] = useState(false);

    const [songId, setSongId] = useState("");

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [artists, setArtsts] = useState([]);

    const [author, setAuthor] = useState("");

    const [subscription, setSubscription] = useState("");

    const [genre, setGenre] = useState("");

    const [link, setLink] = useState("");

    const route = useRoute();

    const {userState} = useAuthUser();

    useEffect( () => {
        async function checkSongFav() {
            const response = await getToGateway(constants.MEDIA_HOST + constants.CHECK_FAV_SONG
                                            + "?"
                                            + constants.USER_ID_QUERY_PARAM
                                            + userState.uid
                                            + "&"
                                            + constants.SONG_ID_PARAM
                                            + route.params
                                                   .songId);

            if (response.error !== undefined) {
                alert("Hubo un error.");
                return;
            }

            setHasSong(response.hasSong);
        }

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
                await checkSongFav();
            }, [navigation]);
    }, [] );

    const removeFromFavorites = async () => {
        const response = await postToGateway({
                                                songId: songId,
                                                userId: userState.uid,
                                                redirectTo: constants.MEDIA_HOST + constants.UNFAV_SONG
                                            });

        if (response.error !== undefined) {
            alert("No se pudo quitar la canción de favoritos");
        } else {
            setHasSong(false);
        }
    }

    const addToFavorites = async () => {
        const response = await postToGateway({
            songId: songId,
            userId: userState.uid,
            redirectTo: constants.MEDIA_HOST + constants.FAV_SONG
        });

        if (response.error !== undefined) {
            alert("No se pudo agregar la canción a favoritos");
        } else {
            setHasSong(true);
        }
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
                    (hasSong)
                        ? removeFromFavorites().then()
                        : addToFavorites().then()
                } }
                style={ (hasSong)
                        ? styles.pressedContentButtonStyle
                        : styles.contentButtonStyle }>
                <Text style={styles.emojiStyle}>❤</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

export {
    SongScreen
}
