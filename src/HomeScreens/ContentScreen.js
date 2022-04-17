import {
    StyleSheet,
    View,
} from 'react-native';
import React, {useEffect, useState} from 'react'
import {BottomNavigation, Text} from "react-native-paper";
import {
    buttonStyle,
    buttonTextStyle,
    containerStyle,
    imageStyle,
    inputStyle,
    titleStyle
} from "../styles/genericStyles";

import ListComponent from "./ListComponent";
import {getToGateway} from "../others/utils";
import constants from '../others/constants'

const MusicRoute = ({navigation},
                    userList) => {
    return ListComponent(userList,
                        "ProfileScreen",
                        {navigation});
};

const AlbumsRoute = () => null;

//const MusicRoute = () => <Text>Música</Text>;

export default ContentScreen = ({navigation}) => {
    const [index, setIndex] = useState(1);

    const [routes] = useState([
        {
            key: 'music',
            title: 'Canciones',
            icon: 'music'
        },
        {
            key: 'albums',
            title: 'Álbumes',
            icon: 'album'
        }
    ]);

    const [userList, setUserList] = useState([]);

    useEffect(()  => {
        function getAllSongs() {
            getToGateway(constants.MEDIA_HOST + constants.SONGS_URL,
                "").then((response) => {
                if (response.error !== undefined) {
                    alert(response.error);
                    return;
                }

                setUserList(response);
            });
        }

        getAllSongs();
    }, []);

    const renderScene = BottomNavigation.SceneMap({
        music: MusicRoute({navigation},
                          userList),
        albums: AlbumsRoute,
    });

    return(
        <View style={styles.container}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </View>
    )
}

const styles = StyleSheet.create(
    { input: inputStyle,
        container: containerStyle,
        title: titleStyle,
        button: buttonStyle,
        buttonText: buttonTextStyle,
        image: imageStyle
    }
)