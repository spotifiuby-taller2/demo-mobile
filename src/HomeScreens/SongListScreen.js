import React, {useEffect, useState} from 'react';
import {getAllSongs} from "../Services/MediaService";
import {FlatList, SafeAreaView, View} from "react-native";
import {Searchbar} from "react-native-paper";
import {containerStyle} from "../styles/genericStyles";
import PlayableListItem from "../Components/PlayableListItem";
import {songToTrack} from "../others/utils";
import usePlayerAction from "../Hooks/usePlayerAction";


const SongListScreen = ({navigation}) => {
  const [allSongs, setAllSongs] = useState([]);
  const [text, setText] = useState('')
  const player = usePlayerAction();

  useEffect(() => {
    navigation.setOptions({headerShown: true, headerTitle: 'Canciones'});
  }, []);

  // TODO Warning: es asimétrico respecto de Favorite Song List Screen
  useEffect(() => {
    return navigation.addListener('focus', async () => {
      getAllSongs().then(setAllSongs);
    });
  }, [navigation]);

  const filterSongs = filterText => {
    filterText = filterText.toLowerCase();
    return s => s.title.toLowerCase().includes(filterText) || s.author.toLowerCase().includes(filterText);
  }

  return (
    <View style={{...containerStyle, marginTop: 10}}>
      <SafeAreaView>
        <Searchbar onChangeText={setText}
                   placeholder={"Buscar canciones"}
                   inputStyle={{}}
                   containerStyle={{}}
                   inputContainerStyle={{}}
        />
        <View>
          <View style={{marginBottom: 10}}/>
          {
            <FlatList
              data={allSongs.filter(filterSongs(text)).map(songToTrack)}
              renderItem={({item, index}) => <PlayableListItem id={index}
                                                            key={index}
                                                            playableItem={item}
                                                            play={() => player.playList(allSongs.filter(filterSongs(text)).map(songToTrack), index)}
                                                            moreInfoCallback={() => {
                                                              navigation.navigate('SongScreen', {
                                                                songId: item.id
                                                              });
                                                            }}
              />
              }
            />
          }
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SongListScreen;
