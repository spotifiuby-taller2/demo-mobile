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
const {getAuth,signInWithCredential, GoogleAuthProvider} = require("firebase/auth");


export default SignInWithGoogle = () =>{
     let handleSignInWithGoogle = async () => {
        let result;

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

         console.log(result.idToken);

         const response = await signInWithCredential(auth, credential);

         if (response.user === undefined) {
             alert("No pudo autenticarse al usuario con Google");
             return;
         }

         console.log(response);

        fetch(constants.USERS_HOST + constants.SIGN_IN_URL,
            {
              method: 'POST',
              headers: constants.JSON_HEADER,
              body: JSON.stringify({
                  token: response._tokenResponse.idToken,
                  email: response._tokenResponse.email,
                  link: "mobile",
                  signin: "google"
              })

        })
        .then((res) => res.json())
        .then((response)=>{

            console.log(response);
        })
        .catch((err)=>{alert(err)});
      };


      return(
        <View>
          <Button
            icon='google'
            mode="contained"
            onPress={handleSignInWithGoogle}>
            
            <Text>Ingrese con Google</Text>
          </Button>
        </View>
      )
    }
  
