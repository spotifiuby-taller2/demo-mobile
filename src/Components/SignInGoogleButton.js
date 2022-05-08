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
import {postToGateway} from "../others/utils";

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
        
        const requestBody = {
              token: response._tokenResponse.idToken,
              email: response._tokenResponse.email,
              name: response._tokenResponse.firstName,
              surname: response._tokenResponse.lastName,
              link: "mobile",
              signin: "google",
              isArtist: isArtist,
              isListener: isListener,
              redirectTo: constants.USERS_HOST + constants.SIGN_IN_URL
          };

          if ( response._tokenResponse.isNewUser !== undefined ){
            props.navigation.navigate('RequestExternalUserATypeScreen',{body: requestBody, id: response.user.uid, token: response._tokenResponse.idToken});
         }
         else{
            postToGateway(requestBody).then((res)=>{
              if(res.error === undefined){
                signIn(response._tokenResponse.idToken,response.user.uid);
              } else {
                  alert(res.error);
              }
            });
         }
        
      };


      return(
          <View>      
            <Button
              icon='google'
              mode="contained"
              onPress={handleSignInWithGoogle}
              style={{marginBottom: 10, marginTop: 30, borderRadius: 20}}>
              
              <Text>Ingrese con Google</Text>
            </Button>
          </View>
      );
    }
  
