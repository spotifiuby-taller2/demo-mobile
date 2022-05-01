import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react'
import {validateFieldNotBlank} from '../others/utils';
import {buttonStyle, buttonTextStyle, titleStyle, containerStyle} from '../styles/genericStyles';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import FilePicker from '../Components/FilePicker';
import {uploadFile} from '../Services/CloudStorageService';
import {createSong} from '../Services/MediaService';
import {getArtists} from '../Services/UsersService';
import MultiSelection from "../Components/MultiSelection";

const UploadSongScreen = ({navigation}) => {
  const [title, setTitle] = useState({value: '', error: null});
  const [description, setDescription] = useState();
  const [authors, setAuthors] = useState();
  const [artists, setArtists] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  // TODO: genre and subscription optional fields
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllArtists = async () => {
      await getArtists()
        .then(body => setAllArtists(body.users))
        .catch(e => {
          console.log(`Error fetching artists: ${JSON.stringify(e)}`);
          alert(`Error fetching artists: ${JSON.stringify(e)}`);
        });
    }
    getAllArtists();
  }, []);

  const validateFile = () => {
    if (file === null || file === undefined) {
      alert('Debe seleccionar un archivo');
      return false;
    }
    return true;
  }
  const getArtistsToDisplay = text => {
    return allArtists.filter(a => text === undefined || a.name.includes(text) || a.surname.includes(text))
        .filter(a => !artists.map(ar => ar.id).includes(a.id))
  }
  const fieldsAreValid = () => {
    return validateFile() && validateFieldNotBlank('Titulo', title, setTitle);
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
      const fileUrl = await file.contentPromise.then(uploadFile);
      const song = await createSong({
        title: title.value,
        link: fileUrl,
        artists: ['dummyArtistId'],
        description,
        author: authors,
      });
      console.log(`Song created: ${JSON.stringify(song)}`);
      alert('Song created!');
      // TODO: navigate to song list?
    } catch (err) {
      console.log(JSON.stringify(err));
      alert('There was an error creating the song, please try again');
    }
    setIsLoading(false);
  }

  return (<View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Title style={styles.title}>Subir nueva canción</Title>
      <FilePicker title={'Elegir canción'} mimeType={'audio/*'} icon={'file-music'}
                  setFileCallback={handleDocumentPick}/>
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
      <MultiSelection selectedElements={artists}
                      addElementCallback={artist => setArtists([...artists, artist])}
                      renderElement={artist => (<Text>{artist.name}</Text>)}
                      clearElementsCallback={() => setArtists([])}
                      getElementsToDisplay={getArtistsToDisplay}
                      removeElementCallback={artist => setArtists(artists.filter(a => a.id !== artist.id))}
      />
      <TextInput
        name='Autor/es'
        label='Autor/es'
        value={authors}
        onChangeText={newText => setAuthors(newText)}
        mode='outlined'/>
      <Button mode='contained'
              style={styles.button}
              onPress={handleUpload}
              loading={isLoading}
              disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Subiendo...' : 'Subir'}</Text>
      </Button>
    </ScrollView>
  </View>);
}

const styles = StyleSheet.create({
  container: containerStyle,
  title: titleStyle,
  button: {
    ...buttonStyle,
    width: 200,
  },
  buttonText: buttonTextStyle,
})
export default UploadSongScreen;
