import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react'
import {validateFieldNotBlank} from '../others/utils';
import {buttonStyle, buttonTextStyle, containerStyle, titleStyle} from '../styles/genericStyles';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import FilePicker from '../Components/FilePicker';
import {uploadFile} from '../Services/CloudStorageService';
import {createSong} from '../Services/MediaService';
import {getArtists} from '../Services/UsersService';
import MultiSelection from "../Components/MultiSelection";
import GenreDropDown from "../Components/GenreDropDown";
import SubscriptionDropDown from "../Components/SubscriptionDropDown";

const UploadSongScreen = () => {
  const [title, setTitle] = useState({value: '', error: null});
  const [description, setDescription] = useState();
  const [artists, setArtists] = useState([]);
  const [genre, setGenre] = useState({value: '', error: null});
  const [subscription, setSubscription] = useState({value: '', error: null});
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setTitle({value: '', error: null});
    setDescription(undefined);
    setArtists([]);
    setGenre({value: '', error: null});
    setSubscription({value: '', error: null});
    setFile(undefined);
    setIsLoading(false);
  }

  const validateFile = () => {
    if (file === null || file === undefined) {
      alert('Debe seleccionar un archivo');
      return false;
    }
    return true;
  }
  const filterArtist = text => {
    text = text.toLowerCase();
    return a => a.name.toLowerCase().includes(text) || a.surname.toLowerCase().includes(text);
  }

  const fieldsAreValid = () => {
    let ok = true;
    if (!validateFile()) ok = false;
    if (!validateFieldNotBlank('Título', title, setTitle)) ok = false;
    return ok;
  }

  const handleDocumentPick = (doc) => {
    if (title.value === '') {
      const name = doc.name.split('.')[0];
      setTitle({value: name, error: null});
    }
    setFile(doc);
  }
  const handleUpload = async () => {
    if (!fieldsAreValid()) {
      return;
    }
    setIsLoading(true);
    try {
      const name = file.name;
      const fileUrl = await file.contentPromise.then(res =>{
        return uploadFile(res, name)
      });
      const song = await createSong({
        title: title.value,
        link: fileUrl,
        artists: artists.map(a => a.id),
        description,
        author: artists.map(a => `${a.name} ${a.surname}`).join(', '),
        genre,
        subscription,
      });
      console.log(`Song created: ${JSON.stringify(song)}`);
      alert('Canción subida!');
    } catch (err) {
      console.log(JSON.stringify(err));
      alert('Ha ocurrido un error inesperado al subir la canción, por favor intente más tarde');
    }
    resetState();
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title style={styles.title}>Nueva Canción</Title>
        <TextInput
          name='Titulo'
          label='Titulo*'
          value={title.value}
          onChangeText={newText => setTitle({value: newText, error: null})}
          mode='outlined'
          error={title.error !== null}/>
        {title.error && (<Text style={{color: 'red'}}>{title.error}</Text>)}
        <TextInput
          name='Descripción'
          label='Descripción'
          value={description}
          onChangeText={newText => setDescription(newText)}
          mode='outlined'/>
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
        <View style={{marginBottom: 5}}/>
        <MultiSelection selectedElements={artists}
                        searchPlaceholder={"Buscar artistas"}
                        buttonText={"Seleccionar artistas"}
                        icon={'account-music'}
                        renderElement={artist => (<Text>{`${artist.name} ${artist.surname}`}</Text>)}
                        getAllElements={() => getArtists().then(b => b.list)}
                        elementFilter={filterArtist}
                        elementCallback={{
                          add: artist => setArtists([...artists, artist]),
                          remove: artist => setArtists(artists.filter(a => a.id !== artist.id)),
                          clear: () => setArtists([]),
                        }}
        />
        <View style={{marginBottom: 5}}/>
        <FilePicker title={`${file ? 'Cambiar' : 'Elegir'} canción`} mimeType={'audio/*'} icon={'file-music'}
                    setFileCallback={handleDocumentPick}/>
        <Button mode='contained'
                style={styles.button}
                onPress={handleUpload}
                loading={isLoading}
                disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Publicando...' : 'Publicar'}</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...containerStyle,
    paddingTop: 30
  },
  title: titleStyle,
  button: {
    ...buttonStyle,
    width: 200,
  },
  buttonText: buttonTextStyle,
})
export default UploadSongScreen;
