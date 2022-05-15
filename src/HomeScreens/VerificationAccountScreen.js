import React, {useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Text, Title} from "react-native-paper";
import FilePicker from "../Components/FilePicker";
import {buttonStyle, buttonTextStyle, containerStyle, titleStyle} from "../styles/genericStyles";
import {uploadVideo} from "../Services/CloudStorageService";
import {useAuthUser} from "../context/AuthContext";
import {uploadVerificationVideo} from '../Services/UsersService'

const VerificationAccountScreen = () => {

  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {userState, setUserType} = useAuthUser();

  const validateFile = () => {
    if (file === null || file === undefined) {
      alert('Debe seleccionar un archivo');
      return false;
    }
    return true;
  }

  const handleDocumentPick = (doc) => {
    setFile(doc);
  }

  const handleUpload = async () => {
    if (!validateFile()) {
      return;
    }
    setIsLoading(true);
    try {
      const fileUrl = await file.contentPromise.then(uploadVideo);
      await uploadVerificationVideo({
        userId: userState.uid,
        verificationVideoUrl: fileUrl,
      });
      alert('Video de verificacion subido!');
    } catch (err) {
      console.log(JSON.stringify(err));
      alert('Ha ocurrido un error inesperado al subir el video de verificacion, por favor intente más tarde');
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title style={styles.title}>Verificar cuenta</Title>
        <FilePicker title={'Elegir video de verificacion'} mimeType={'video/*'} icon={'file-video'}
                    setFileCallback={handleDocumentPick}/>
        <Button mode='contained'
                style={styles.button}
                onPress={handleUpload}
                loading={isLoading}
                disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Subiendo...' : 'Subir'}</Text>
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
  buttonText: buttonTextStyle
});

export default VerificationAccountScreen;