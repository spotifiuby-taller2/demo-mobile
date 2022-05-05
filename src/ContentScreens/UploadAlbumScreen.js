import {ScrollView, View} from "react-native";
import {Button, Divider, Text, TextInput, Title} from "react-native-paper";
import React, {useState} from "react";
import {
  buttonStyle,
  buttonTextStyle,
  containerStyle,
  inputStyle,
  spacerStyle,
  titleStyle
} from '../styles/genericStyles';
import FilePicker from "../Components/FilePicker";
import {uploadFile} from "../Services/CloudStorageService";
import {createAlbum, getSongsByArtist} from "../Services/MediaService";
import {getArtists} from '../Services/UsersService';
import {validateFieldNotBlank} from "../others/utils";
import GenreDropDown from "../Components/GenreDropDown";
import SubscriptionDropDown from "../Components/SubscriptionDropDown";
import {useAuthUser} from "../context/AuthContext";
import MultiSelection from "../Components/MultiSelection";

const UploadAlbumScreen = ({navigation}) => {
  const [title, setTitle] = useState({value: '', error: null});
  const [genre, setGenre] = useState({value: '', error: null});
  const [subscription, setSubscription] = useState({value: '', error: null});
  const [artists, setArtists] = useState({value: [], error: null});
  const [songs, setSongs] = useState({value: [], error: null});
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const {userState, setUserType} = useAuthUser();

  const handleDocumentPick = (doc) => {
    if (title.value === '') {
      const name = doc.name.split('.')[0];
      setTitle({value: name, error: null});
    }
    setFile(doc);
  }

  const fieldsAreValid = () => {
    let ok = true;
    if (!validateFieldNotBlank('Título', title, setTitle)) ok = false;
    if (!validateFieldNotBlank('Género', genre, setGenre)) ok = false;
    if (!validateFieldNotBlank('Suscripción', subscription, setSubscription)) ok = false;
    if (!validateFieldNotBlank('Artistas', artists, setArtists)) ok = false;
    if (!validateFieldNotBlank('Canciones', songs, setSongs)) ok = false;
    return ok;
  }

  const filterSong = text => {
    text = text.toLowerCase();
    return s => s.title.toLowerCase().includes(text);
  }

  const filterArtist = text => {
    text = text.toLowerCase();
    return a => a.name.toLowerCase().includes(text) || a.surname.toLowerCase().includes(text);
  }

  const handleUpload = async () => {
    if (!fieldsAreValid()) {
      return;
    }
    let fileUrl;
    if (file !== undefined && file != null) {
      fileUrl = await file.contentPromise.then(uploadFile);
    }
    setIsLoading(true);
    try {
      const album = await createAlbum({
        title: title.value,
        genre: genre.value,
        subscription: subscription.value,
        artists: artists.value,
        songs: songs.value.map(s => s.id),
        link: fileUrl
      });
      console.log(`Album created: ${JSON.stringify(album)}`);
      alert('Album creado!');
    } catch (err) {
      console.log(JSON.stringify(err));
      alert('Ha ocurrido un error inesperado al crear el álbum, por favor intente más tarde');
    }
    setIsLoading(false);
  }

  return (
    <View style={containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title style={titleStyle}>Subir nuevo album</Title>

        <TextInput
          name='Título'
          label='Título*'
          value={title.value}
          onChangeText={newText => setTitle({value: newText, error: null})}
          mode='outlined'
          error={title.error !== null}
          style={inputStyle}
        />
        {title.error && (<Text style={{color: 'red'}}>{title.error}</Text>)}
        <GenreDropDown
          name='Género'
          value={genre.value}
          setValue={newGenre => setGenre({value: newGenre, error: null})}
        />
        {genre.error && (<Text style={{color: 'red'}}>{genre.error}</Text>)}
        <View style={{marginBottom: 5}}/>
        <SubscriptionDropDown
          name='Suscripción'
          value={subscription.value}
          setValue={newSubscription => setSubscription({value: newSubscription, error: null})}
        />
        {subscription.error && (<Text style={{color: 'red'}}>{subscription.error}</Text>)}
        <View style={{marginBottom: 5}}/>
        <MultiSelection selectedElements={artists.value}
                        placeholder={"Buscar artistas"}
                        renderElement={artist => (<Text>{`${artist.name} ${artist.surname}`}</Text>)}
                        getAllElements={() => getArtists().then(b => b.users)}
                        elementFilter={filterArtist}
                        elementCallback={{
                          add: artist => setArtists({value: [...artists.value, artist], error: null}),
                          remove: artist => setArtists({
                            value: artists.value.filter(a => a.id !== artist.id),
                            error: null
                          }),
                          clear: () => setArtists({value: [], error: null}),
                        }}
        />
        {artists.error && (<Text style={{color: 'red'}}>{artists.error}</Text>)}
        <View style={{marginBottom: 5}}/>
        <MultiSelection selectedElements={songs.value}
                        placeholder={"Buscar canciones"}
                        renderElement={song => (<Text>{`${song.title}`}</Text>)}
                        getAllElements={() => getSongsByArtist(userState.uid)}
                        elementFilter={filterSong}
                        elementCallback={{
                          add: song => setSongs({value: [...songs.value, song], error: null}),
                          remove: song => setSongs({value: songs.value.filter(s => s.id !== song.id), error: null}),
                          clear: () => setSongs({value: [], error: null}),
                        }}
        />
        {songs.error && (<Text style={{color: 'red'}}>{songs.error}</Text>)}
        <View style={{marginBottom: 5}}/>
        <FilePicker title={'Elegir foto de portada'} mimeType={'image/*'} icon={'camera'}
                    setFileCallback={handleDocumentPick}/>

        <Button mode='contained'
                style={buttonStyle}
                onPress={handleUpload}
                loading={isLoading}
                disabled={isLoading}>
          <Text style={buttonTextStyle}>{isLoading ? 'Subiendo...' : 'Subir'}</Text>
        </Button>
      </ScrollView>
    </View>);
}

export default UploadAlbumScreen;
