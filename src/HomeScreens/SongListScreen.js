import React from 'react';
import {ScrollView, View} from "react-native";
import {containerStyle} from "../styles/genericStyles";
import SongChip from "../Components/SongChip";

const SongListScreen = ({navigation, route}) => (
  <View style={containerStyle}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {
          route.params.songList.map((song, id) => {
            return (
              <SongChip id={id}
                        key={id}
                        song={song}
                        navigation={navigation}/>
            )
          })
        }
      </View>
    </ScrollView>
  </View>
);

export default SongListScreen;
