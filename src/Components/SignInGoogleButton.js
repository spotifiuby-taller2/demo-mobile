import { 
    StyleSheet,
    View,
    Text

} from 'react-native';
  
import React from 'react'
import { Button } from 'react-native-paper'
import * as Google from 'expo-google-app-auth';
import {IOS_KEY, ANDROID_KEY, WEB_KEY, ANDROID_STANDALONE_KEY} from "@env"
import constants from '../others/constants'
import { useAuthUser } from '../context/AuthContext';

const {getAuth,signInWithCredential, GoogleAuthProvider} = require("firebase/auth");



export default SignInWithGoogle = (props) =>{
     
     const {signIn} = useAuthUser();


     let handleSignInWithGoogle = async () => {
        let result;
        let isArtist = false;
        let isListener = false;

        try {
            result = await Google.logInAsync({ //return an object with result token and user
            iosClientId: IOS_KEY, //From app.json
            androidClientId: ANDROID_KEY, //From app.json
            webClientId: WEB_KEY,
            androidStandaloneAppClientId: ANDROID_STANDALONE_KEY
          });
        
        } catch ({ message }) {
          alert('login: Error:' + message);
        }

         if (result.type !== 'success') {
             alert("No pudo autenticarse al usuario con Google");
             return;
         }

        const credential = GoogleAuthProvider.credential(result.idToken,
                                                          result.accessToken);

        const auth = getAuth();

        const response = await signInWithCredential(auth, credential)
            .catch(err => alert(err));

        if (response.user === undefined) {
             alert("No pudo autenticarse al usuario con Google");
             return;

         }

         const resquestBody = {
              token: response._tokenResponse.idToken,
              email: response._tokenResponse.email,
              name: response._tokenResponse.firstName,
              surname: response._tokenResponse.lastName,
              link: "mobile",
              signin: "google",
              isArtist: isArtist,
              isListener: isListener
          };
        
         if ( response._tokenResponse.isNewUser !== undefined ){
            props.navigation.navigate('RequestExternalUserATypeScreen',{body: resquestBody, id: response.user.uid});
            return;
         }
         

        fetch(constants.USERS_HOST + constants.SIGN_IN_URL,
            {
              method: 'POST',
              headers: constants.JSON_HEADER,
              body: JSON.stringify(resquestBody)

        })
        .then((res) => res.json())
        .then((res)=>{
          if(res.error === undefined){
            signIn(response.user.uid);
          }
        })
        .catch((err)=>{alert(err)});
      };


      return(
          <View>      
            <Button
              icon='google'
              mode="contained"
              onPress={handleSignInWithGoogle}
              style={{marginBottom: 10, marginTop: 30}}>
              
              <Text>Ingrese con Google</Text>
            </Button>
          </View>
      );
    }
  
