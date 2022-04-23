import React from 'react'
import * as DocumentPicker from 'expo-document-picker';
import {Button} from "react-native-paper";

const handleFilePicker = async (setFileCallback, mimeType) => {
  const file = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true, type: mimeType || '*/*', multiple: false,
  });
  if (file.type === 'cancel') {
    return;
  }
  const fileContent = fetch(file.uri)
    .then(response => response.blob());
  setFileCallback({contentPromise: fileContent, name: file.name, size: file.size});
}

const FilePicker = (props) => {
  return (<Button
    icon={props.icon}
    onPress={() => handleFilePicker(props.setFileCallback, props.mimeType)}
    style={{
      alignSelf: 'center', width: '80%', paddingTop: 5, paddingBottom: 5, marginBottom: 5, backgroundColor: 'skyblue'
    }}
  >
    {props.title}
  </Button>)
}

export default FilePicker;
