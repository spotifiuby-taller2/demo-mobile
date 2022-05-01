import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Text, TextInput, Title} from "react-native-paper";
import React, {useState} from "react";
import FilePicker from "../Components/FilePicker";
import {uploadFile} from "../Services/CloudStorageService";
import {createAlbum, createSong} from "../Services/MediaService";
import {validateFieldNotBlank} from "../others/utils";
import GenreDropDown from "../Components/GenreDropDown";
import SubscriptionDropDown from "../Components/SubscriptionDropDown";

const UploadAlbumScreen = ({navigation}) => {
  const [title, setTitle] = useState({value: '', error: null});
  const [genre, setGenre] = useState({value: '', error: null});
  const [subscription, setSubscription] = useState({value: '', error: null});
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
    if(!validateFieldNotBlank('Título', title, setTitle)) ok = false;
    if(!validateFieldNotBlank('Género', genre, setGenre)) ok = false;
    if(!validateFieldNotBlank('Suscripción', subscription, setSubscription)) ok = false;
    return ok;
  }

  const handleUpload = async () => {
    if (!fieldsAreValid()) {
      return;
    }
    let fileUrl;
    if(file !== undefined && file != null){
      fileUrl = await file.contentPromise.then(uploadFile);
    }
    setIsLoading(true);
    try {
      const album = await createAlbum({
        title: title.value,
        genre:genre.value,
        subscription:subscription.value,
        artists: ['dummyArtistId'],
        songs : [],
        link: fileUrl
      });
      console.log(`Album created: ${JSON.stringify(album)}`);
      alert('Album created!');
      // TODO: navigate to song list?
    } catch (err) {
      console.log(JSON.stringify(err));
      alert('There was an error creating the album, please try again');
    }
    setIsLoading(false);
  }

  return (<View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Title style={styles.title}>Subir nuevo album</Title>

      <TextInput
        name='Título'
        label='Título*'
        value={title.value}
        onChangeText={newText => setTitle({value: newText, error: null})}
        mode='outlined'
        error={title.error !== null}
        style={styles.input}/>
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

      <FilePicker title={'Elegir foto de portada'} mimeType={'image/*'} icon={'camera'}
                  setFileCallback={handleDocumentPick}/>

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
  },
  container: {
    flex: 1, backgroundColor: '#f5fcff', paddingLeft: 15, paddingRight: 15, marginTop: 30
  },
  title: {textAlign: 'center', fontSize: 25, marginBottom: 35},
  button: {
    backgroundColor: 'skyblue',
    paddingTop: 15,
    paddingBottom: 15,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10
  },
  buttonText: {textAlign: 'center', fontSize: 13},
})

export default UploadAlbumScreen;
