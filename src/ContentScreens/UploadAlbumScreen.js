import {ScrollView, View} from "react-native";
import {Button, Text, TextInput, Title} from "react-native-paper";
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
import {createAlbum} from "../Services/MediaService";
import {getArtists} from '../Services/UsersService';
import {validateFieldNotBlank} from "../others/utils";
import GenreDropDown from "../Components/GenreDropDown";
import SubscriptionDropDown from "../Components/SubscriptionDropDown";
import MultiSelectWithCheckBox from "../Components/MultiSelectWithChechBox";

const UploadAlbumScreen = ({navigation}) => {
  const [title, setTitle] = useState({value: '', error: null});
  const [genre, setGenre] = useState({value: '', error: null});
  const [subscription, setSubscription] = useState({value: '', error: null});
  const [artists, setArtists] = useState({value: [], error: null});
  const [songs, setSongs] = useState({value: [], error: null});
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();

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
    return ok;
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
        songs: [],
        link: fileUrl
      });
      console.log(`Album created: ${JSON.stringify(album)}`);
      alert('Album created!');
    } catch (err) {
      console.log(JSON.stringify(err));
      alert('There was an error creating the album, please try again');
    }
    setIsLoading(false);
  }

  return (<View style={containerStyle}>
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
      <SubscriptionDropDown
        name='Suscripción'
        value={subscription.value}
        setValue={newSubscription => setSubscription({value: newSubscription, error: null})}
      />
      {subscription.error && (<Text style={{color: 'red'}}>{subscription.error}</Text>)}

      <View style={spacerStyle}/>
      <MultiSelectWithCheckBox
        name='Artistas'
        getAllElements={() => getArtists().then(b => b.users)}
        value={artists.value}
        setValue={newArtists => setArtists(newArtists)}
      />
      {artists.error && (<Text style={{color: 'red'}}>{artists.error}</Text>)}

      <View style={spacerStyle}/>
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
