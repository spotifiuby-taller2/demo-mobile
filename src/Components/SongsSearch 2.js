import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react'
import {containerStyle} from "../styles/genericStyles";
import {Button, Chip, TextInput} from "react-native-paper";

const SongsSearch = (props) => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [queryName, setQueryName] = useState([]);

  const addToSongsList = (song) => {
    // For updating arrays in hooks
    // Do no use push
    // Do not use syntactic sugar concatenation ([a] + [b])
    setSelectedSongs(selectedList => [...selectedList, song]);
  }

  const getSongsByName = () => {
    if (queryName === undefined && queryName === '') {
      setSongs(this.props.allArtistSongs);
      return;
    }
    setSongs(this.props.filter(s => s.title.includes(queryName)));
  }

  const cleanSong = () => {
    setSelectedSongs([]);
  }

  const renderSong = (song) => {
    return (
      <View>
        <Chip id={id} key={song.title} style={userButtonStyle} onPress={() => addToSongsList(song)}>
          <Text>{`${song.title}`}</Text>
          <Text>{`${song.description}`}</Text>
        </Chip>
      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={containerStyle}>
      <TextInput
        onChangeText={(text) => setQueryName(text)}>
      </TextInput>
      <Button onPress={getSongsByName}>{"Buscar"}</Button>
      <Text>{"\n"}</Text>
      {/* Scrollview height cannot be adapted directly */}
      <View style={{height: 125}}>
        <ScrollView showsVerticalScrollIndicator={true} useReference={songs}>
          {songs.map((song, id) => renderSong(song))}
        </ScrollView>
      </View>
      <Text>{"\n Canciones elegidos \n"}</Text>
      <View style={{height: 125}}>
        <ScrollView showsVerticalScrollIndicator={true} useReference={selectedSongs}>
          {
            selectedSongs.map((song, id) => {
              return (
                <Chip id={id}
                      key={song.id}
                      style={userButtonStyle}>
                  <Text>{song.title}</Text>
                </Chip>
              )
            })
          }
        </ScrollView>
      </View>
      <Text>{"\n"}
      </Text>
      <Button onPress={() => cleanSong()}>Limpiar canciones</Button>
    </ScrollView>
  )
}

const userButtonStyle = {
  backgroundColor: 'lightblue',
  width: 200,
  marginBottom: 10,
  marginTop: 0,
};

export default SongsSearch;
