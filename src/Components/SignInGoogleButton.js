import { 
    StyleSheet,
    View,
    Text

} from 'react-native';
  
import React, {useState} from 'react'
import { Button } from 'react-native-paper'
import * as Google from 'expo-google-app-auth';
import {IOS_KEY, ANDROID_KEY} from "@env"
import constants from '../others/constants'



export default SignInWithGoogle = () =>{

    
     let handleSignInWithGoogle = async () => {
        let result;
        try {
            result = await Google.logInAsync({ //return an object with result token and user
            iosClientId: IOS_KEY, //From app.json
            androidClientId: ANDROID_KEY, //From app.json
          });
        
        } catch ({ message }) {
          alert('login: Error:' + message);
        }

        if (result.type === 'success') {         

            fetch(constants.USERS_HOST + constants.SIGN_IN_URL,
                {
                  method: 'POST',
                  headers: constants.JSON_HEADER,
                  body: JSON.stringify({
                      token: result,
                      link: "mobile",
                      firebase: true
                  })

            })
            .then((res) => res.json())
            .then((response)=>{
                    
                console.log(response);
            })
            .catch((err)=>{alert(err)});
            
        } else {
          alert("No pudo autenticarse al usuario con Google");
        }
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
  
