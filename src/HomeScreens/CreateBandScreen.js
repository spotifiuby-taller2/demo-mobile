import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {Text, Button, TextInput} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import MultiSelection from "../Components/MultiSelection";
import { getArtists } from "../Services/UsersService";
import FilePicker from "../Components/FilePicker";
import {buttonTextStyle, inputStyle, buttonStyle} from '../styles/genericStyles';
import {validateFieldNotBlank} from "../others/utils";
import { postToGateway } from "../others/utils";
import constants from '../others/constants'



const CreateBandScreen = ({navigation}) => {

    const [artists, setArtists] = useState({value: [], error: null});
    const [file, setFile] = useState(undefined);
    const [name, setName] = useState({value: '', error: null});

    useEffect(()=>{
        navigation.setOptions({ headerShown: true, headerTitle: 'Crear Banda' });
      }, []);

    const filterArtist = text => {
        text = text.toLowerCase();
        return a => a.name.toLowerCase().includes(text) || a.surname.toLowerCase().includes(text);
      }

    const fieldsAreValid = () => {
        let ok = true;
        if (!validateFieldNotBlank('Nombre', name, setName)) ok = false;
        if (!validateFieldNotBlank('Artistas', artists, setArtists)) ok = false;
        return ok;
      }
    
    const resetState = () => {
        setName({value: '', error: null});
        setArtists({value: [], error: null});
        setFile(undefined);
    }

    const handleCreateBand = async () => {
        if (!fieldsAreValid()) {
          return;
        }
        let fileUrlPromise;
        if (file) {
          fileUrlPromise = file.contentPromise.then(res => {
            return uploadFile(res, `artwork-album-${title.value}`);
          });
        }
        try {
          const request = {
            name: name.value,
            members: artists.value.map(a => a.id),
            photoUrl: await fileUrlPromise,
            redirectTo: constants.USERS_HOST + constants.BAND_URL
          };
          postToGateway(request, 'POST')
            .then(res =>{
                if ( res?.error !== undefined ){
                    alert(res.error);
                }
                else{
                    alert(`La banda ${name.value} ha sido creada!`);
                    resetState();
                }
            })
          
        } catch (err) {
          alert('Ha ocurrido un error inesperado al crear el álbum, por favor intente más tarde');
        }
      }
  

    return (
        
        <View style={styles.container}>
        <ScrollView>
            <Text style={styles.title}>
                Agregar Banda
            </Text>
            <Text style={{marginLeft: 20,fontSize: 15}}>Ingrese los datos de la banda</Text>
            <TextInput
                name='Nombre'
                label='Nombre*'
                value={name.value}
                onChangeText={newText => setName({value: newText, error: null})}
                mode='outlined'
                error={name.error !== null}
                style={{...inputStyle, marginTop: 15, marginBottom: 15}}
                />

            <View style={{...styles.button, marginTop: 15, marginBottom: 15}}>
                <MultiSelection selectedElements={artists.value}
                                    searchPlaceholder={"Buscar artistas"}
                                    buttonText={"Seleccionar integrantes"}
                                    icon={'account-music'}
                                    renderElement={artist => (<Text>{`${artist.name} ${artist.surname}`}</Text>)}
                                    getAllElements={() => getArtists().then(b => b.list)}
                                    elementFilter={filterArtist}
                                    elementCallback={{
                                    add: artist => setArtists({value: [...artists.value, artist], error: null}),
                                    remove: artist => setArtists({
                                        value: artists.value.filter(a => a.id !== artist.id),
                                        error: null
                                    }),
                                    clear: () => setArtists({value: [], error: null}),
                                    }}
                    />
            </View>

            <FilePicker title='Elegir foto de portada' mimeType={'image/*'} icon={'camera'}
                    setFileCallback={setFile}/>

            <Button mode='contained'
                    style={styles.uploadButton}
                    onPress={handleCreateBand}>
                <Text style={buttonTextStyle}>Crear banda</Text>
            </Button>
            
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#f5fcff',
  },
  title: {
    flex: 1,
    margin: 30,
    fontSize: 25,
    alignSelf: 'center',
  },
  button: {
    margin: 10,
    flex: 2,
    borderRadius: 5,
  },
  uploadButton: {
    ...buttonStyle,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    width: 160,
  }
});

export default CreateBandScreen;