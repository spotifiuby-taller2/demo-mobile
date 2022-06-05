import {ScrollView} from "react-native";
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {getToGateway} from "../others/utils";
import * as constants from "../others/constants";
import * as styles from "../styles/contentStyle";
import FavouriteSongIconButton from "../Components/FavouriteSongIconButton";
import UserChip from "../Components/UserChip";

const SongScreen = ({navigation, route}) => {

  const [song, setSong] = useState();

  useEffect(() => {
    const getSong = async () => {
      const song = await getToGateway(constants.MEDIA_HOST + constants.SONGS_URL
        + "/"
        + route.params
          .songId);

      if (song.error !== undefined) {
        console.log(JSON.stringify(song.error));
        return;
      }
      return song;
    }

    getSong().then(s => {setSong(s); navigation.setOptions({ headerShown: true, headerTitle: s.title }); });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>{"\n\n\n"}
      </Text>

      <Text style={styles.contentTitleStyle}>{song?.title}
      </Text>

      <Text style={styles.contentTextStyle}>Artistas
      </Text>

      {
        song?.artists.map((user) => {
          return (
            <UserChip id={user.id}
                        key={user.id}
                        user={user}
                        navigation={navigation}/>
          )
        })
      }

      <Text>{"\n\n"}
      </Text>

      <FavouriteSongIconButton style={{alignSelf: 'center'}} size={90} songId={song?.id}/>

    </ScrollView>
  );
}

export default SongScreen;

