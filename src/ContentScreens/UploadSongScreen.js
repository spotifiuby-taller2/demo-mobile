import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react'
import {validateFieldNotBlank} from '../others/utils';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import FilePicker from '../Components/FilePicker';
import {uploadFile} from '../Services/CloudStorageService';
import {createSong} from '../Services/MediaService';

const UploadSongScreen = ({navigation}) => {
  const [title, setTitle] = useState({value: '', error: null});
  const [description, setDescription] = useState();
  const [authors, setAuthors] = useState();
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
  input: {
    marginBottom: 5, marginTop: 5, backgroundColor: 'white', height: 60
  }, container: {
    flex: 1, backgroundColor: '#f5fcff', paddingLeft: 15, paddingRight: 15, marginTop: 30
  }, title: {textAlign: 'center', fontSize: 25, marginBottom: 35}, button: {
    backgroundColor: 'skyblue',
    paddingTop: 15,
    paddingBottom: 15,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10
  }, buttonText: {textAlign: 'center', fontSize: 13},
})
export default UploadSongScreen;
