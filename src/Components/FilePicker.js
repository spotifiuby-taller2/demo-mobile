import React from 'react'
import * as DocumentPicker from 'expo-document-picker';
import {Button} from "react-native-paper";

const handleError = (err) => {
  if (err.type === 'cancel') {
    console.warn('cancelled');
    // User cancelled the picker, exit any dialogs or menus and move on
  } else {
    throw err;
  }
}

const handleFilePicker = async (setFileCallback, mimeType) => {
  try {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true, type: mimeType, multiple: false,
    }).then(file => ({uri: file.uri, name: file.name, size: file.size}));
    setFileCallback(file);
  } catch (e) {
    handleError(e);
  }
}

const FilePicker = (props) => {
  return (<Button
    icon={props.icon}
    onPress={() => handleFilePicker(props.setFileCallback, props.mimeType)}
    style={{alignSelf: 'center', width: '80%', paddingTop: 5, paddingBottom: 5, marginBottom: 5, backgroundColor: 'skyblue'}}
  >
    {props.title}
  </Button>)
}

export default FilePicker;
