import {StyleSheet, View, SafeAreaView, ScrollView} from "react-native";
import React, {useState} from 'react'
import {validateFieldNotBlank} from "../others/utils";
import {Button, Text, TextInput, Title} from "react-native-paper";

const UploadSongScreen = ({navigation}) => {
  const [title, setTitle] = useState({value: '', error: null});

  const fieldsAreValid = () => {
    return validateFieldNotBlank('Titulo', title, setTitle);
  }

  const handleUpload = () => {
    if (!fieldsAreValid()) {
      return;
    }
    alert(`test: ${title.value}`);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title style={styles.title}>Subir nueva canción</Title>
          <TextInput
            name='Titulo'
            label='Titulo*'
            value={title.value}
            onChangeText={(newText) => {setTitle({value: newText , error: null})}}
            mode='outlined'
            error={title.error !== null}/>
          {title.error &&(
            <Text style={{color: 'red'}}>{title.error}</Text>
          ) }
          <Button mode='contained' style={styles.button} onPress={handleUpload}>
            <Text style={styles.buttonText}>Subir</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(
  { input: {
      marginBottom: 5,
      marginTop: 5,
      backgroundColor: 'white',
      height: 60
    },
    container: {
      flex:1,
      backgroundColor: '#f5fcff',
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 30
    },
    title: {textAlign: 'center',fontSize: 25, marginBottom: 35},
    button: {
      backgroundColor: 'skyblue',
      paddingTop: 15,
      paddingBottom:15,
      width: 100,
      alignSelf: 'center',
      marginTop: 30,
      marginBottom:30,
      borderRadius: 10},
    buttonText: {textAlign: 'center', fontSize: 13},
  }
)
export default UploadSongScreen;
