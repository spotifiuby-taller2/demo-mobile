import { 
    StyleSheet, 
    View, 
    Image,
    SafeAreaView,
    ScrollView
  } from 'react-native';
  
import React, {useState} from 'react'
import imageSpotifiuby from '../../assets/SpotifiubyIcon.png'
import { Button, Text, Title, IconButton } from 'react-native-paper'
import constants from "../others/constants"
import { useRoute } from '@react-navigation/native';
import { requestLocation } from "../others/utils"
import { useAuthUser } from '../context/AuthContext';
import { auth } from "../Firebase/firebase";
const firebaseAuth = require("firebase/auth");


  
  
  export default RequestExternalUserATypeScreen = ({navigation}) =>{

      const route = useRoute();
      const {signIn} = useAuthUser();

      const [isArtist, setIsArtist] = useState(false);
      const [isListener, setIsListener] = useState(false);
      const [userTypeError, setUserTypeError] = useState(null);

      let handleSend = () =>{

        let params = route.params;
        let body = params.body;
        
        validate();

        if ( isListener ){
          const locaction = requestLocation(body.email);
          body['latitude'] = locaction.latitude;
          body['longitude'] = locaction.longitude;
        }

        body['isListener'] = isListener;
        body['isArtist'] = isArtist;

        // El manejo de errores se puede reciclar de backoffice
        fetch(constants.USERS_HOST + constants.SIGN_IN_URL,
            {
              method: 'POST',
              headers: constants.JSON_HEADER,
              body: JSON.stringify(body)
  
          })
          .then((res) => res.json())
          .then((response)=>{
            if (response.error === undefined){

              if ( body.signin === 'biometric' ){
                firebaseAuth.signInWithEmailAndPassword(
                  auth,
                  body.email,
                  body.password)
                  .then(res=> {params['id'] = res.user.uid; goTONextScreen(params);})
                  .catch(err=>alert(err));
                ;
              }
              else{
                goTONextScreen(params);
              }
              
            }
            else{
              alert(response.error);
            }
            })
          .catch((err)=>{alert(err)});
      }

      let goTONextScreen =(params)=>{
        if ( ! isListener){
          signIn(params.id);
        }else
        {
          navigation.navigate('RequestMusicalPreferencesScreen', params);
        }
      }
      

      let validate = () =>{

        if ( ! isArtist && ! isListener ){
            setUserTypeError("Elija el tipo de usuario que desee ser")
        }
      }
  
      return(
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                  <Image source={imageSpotifiuby} style={styles.image}></Image>
                  <Title style={styles.title}></Title>
                  <Text style={{alignSelf: 'center', marginBottom: 40}}>Como esta ingresando de manera externa por primera vez solicitamos que seleccione el tipo de usuario que desea ser.</Text>

                  <Title style={{fontSize: 17, marginTop: 20}}>Tipo de usuario:</Title>

                  <View style={{flexDirection:'row' , marginTop: 10, paddingRight: 100}}>
                      <View style={{flexDirection:'row', marginRight: 70}}>
                        <Title style={{fontSize: 14}}>Listener</Title>
                        <IconButton
                              icon="headphones"
                              color={isListener?'skyblue':'grey'}
                              size={50}
                              onPress={()=>{setIsListener(! isListener); isArtist? setIsArtist(false): null;setUserTypeError(null);}}
                            />
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Title style={{fontSize: 14}}>Artista</Title>
                        <IconButton
                              icon='account'
                              color={isArtist?'skyblue':'grey'}
                              size={50}
                              onPress={()=>{setIsArtist(! isArtist); isListener? setIsListener(false): null;setUserTypeError(null);}}
                            />
                      </View>
                  </View>
                  {userTypeError &&(
                    <Text style={{color: 'red'}}>{userTypeError}</Text>
                  ) }
                  
                   
                  <Button mode='contained' style={styles.button} onPress={handleSend}>
                      <Text style={styles.buttonText}>Enviar</Text>
                  </Button>
  
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      )
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
          forgotPasswordButton: {textAlign: 'center', fontSize: 13, color: 'skyblue'},
          image:{height:  150, width: 150, borderRadius: 200, resizeMode: 'contain', paddingTop: 200, marginLeft: 84}}
    )