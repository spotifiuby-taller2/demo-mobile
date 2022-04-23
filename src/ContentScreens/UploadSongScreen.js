import {StyleSheet, View, ScrollView} from "react-native";
import React, {useState} from 'react'
import {validateFieldNotBlank} from "../others/utils";
import {Button, Text, TextInput, Title} from "react-native-paper";
import FilePicker from "../Components/FilePicker";

const UploadSongScreen = ({navigation}) => {
  const [title, setTitle] = useState({value: '', error: null});
  const [documentPickerResponse, setDocumentPickerResponse] = useState();

  const fieldsAreValid = () => {
    return validateFieldNotBlank('Titulo', title, setTitle);
  }
  const handleDocumentPick = (doc) => {
    setDocumentPickerResponse(doc);
  }
  const handleUpload = () => {
    if (!fieldsAreValid()) {
      return;
    }
    console.log(JSON.stringify(documentPickerResponse));
    alert(`test: ${JSON.stringify(documentPickerResponse)}`);
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
        onChangeText={(newText) => {
          setTitle({value: newText, error: null})
        }}
        mode='outlined'
        error={title.error !== null}/>
      {title.error && (<Text style={{color: 'red'}}>{title.error}</Text>)}
      <Button mode='contained' style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Subir</Text>
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
    width: 100,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10
  }, buttonText: {textAlign: 'center', fontSize: 13},
})
export default UploadSongScreen;
