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

const UploadSongScreen = () => {
  const [title, setTitle] = useState({value: '', error: null});
  const [description, setDescription] = useState();
  const [artists, setArtists] = useState([]);
  // TODO: genre and subscription optional fields
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
        artists: artists.map(a => a.id),
        description,
        author: artists.map(a => `${a.name} ${a.surname}`).join(', '),
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
                      renderElement={artist => (<Text>{`${artist.name} ${artist.surname}`}</Text>)}
                      getAllElements={() => getArtists().then(b => b.users)}
                      elementFilter={filterArtist}
                      elementCallback={{
                        add: artist => setArtists([...artists, artist]),
                        remove: artist => setArtists(artists.filter(a => a.id !== artist.id)),
                        clear: () => setArtists([]),
                      }}
      />
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
