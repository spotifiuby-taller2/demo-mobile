import { 
    StyleSheet,
    View,
    Text

} from 'react-native';
  
import React, {useState, useEffect} from 'react'
import { Button } from 'react-native-paper'
import constants from "../others/constants"
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
const utils = require("../others/utils");
import { auth } from "../Firebase/firebase";
const firebaseAuth = require("firebase/auth");
import { useAuthUser } from '../context/AuthContext';
import {postToGateway} from "../others/utils";

  
export default SignInWithBiometricButton = (props) =>{

      const [loading, setLoading] = useState(false);
      const [result, setResult] = useState();
      const {signIn} = useAuthUser();


      /*
      -- casos: 
        *) el usuario ingresa por primera vez, si no existe ID 
                ==> se crea y la envia al backend donde se guarda
        *) el usuario vuelve a ingresar, si existe ID 
                ==> la envia al backend en el request.
                    ==>si el backend dice Ok, entonces entrar
                    ==>si el backend dice No Ok, ???
      
      */

      const setBiometricId = async () =>{
        const biometricId = await SecureStore.getItemAsync('secure_biometricId');
        if( ! biometricId){
            const uuid = uuidv4();
            await SecureStore.setItemAsync('secure_biometricId', JSON.stringify(uuid));
        }
      }


      const handleAuthWithBiometric = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const results = await LocalAuthentication.authenticateAsync();

            if (results.success) {
                setResult('SUCCESS');
                setBiometricId();

            } else if (results.error === 'unknown') {
                setResult('DISABLED');
                alert("Error en ingreso biométrico.");
            } else if (
                results.error === 'user_cancel' ||
                results.error === 'system_cancel' ||
                results.error === 'app_cancel'
            ) {
                setResult('CANCELLED');
                alert("Error en ingreso biométrico.");
            }
        } catch (error) {
            setResult(error.message);
            alert("Error en ingreso biométrico.");
        }

        setLoading(false);

        if (result !== 'SUCCESS') {
            alert("Error en ingreso biométrico.");
            return;
        }

        const biometricId = await SecureStore.getItemAsync('secure_biometricId');

        const {email, password} = utils.getBiometricalMailAndPassword(biometricId);

        const hashedPassword =utils.getSHAOf(utils.getSHAOf(password));

        const response = await firebaseAuth.signInWithEmailAndPassword(
                auth,
                email,
                hashedPassword)
                .catch(err=>{
                    if ( err.message !== "Firebase: Error (auth/user-not-found)."){
                        alert(err.message);
                    }
                });
        
        if ( response === undefined ){
            sendCreateUserWithBiometricRequest(email,hashedPassword);
        }
        else{
            sendSignInUserWithBiometricRequest(email, hashedPassword,response);
        }

      }

      const sendSignInUserWithBiometricRequest = (email, password,response)=>{
        
        const idToken = response._tokenResponse.idToken;

        const body = {
            email: email,
            password: password,
            idToken: idToken,
            signin: 'biometric',
            link: "mobile",
            redirectTo: constants.USERS_HOST + constants.SIGN_IN_URL
        };

        postToGateway(body)
        .then(res => 
            {
                if (res.error === undefined){
                    signIn(response._tokenResponse.idToken,
                           response.user.uid);
                }
                else{
                    alert(res.error);
                }
            });
      }

      const sendCreateUserWithBiometricRequest = (email, password) => {
        let requestBody = {
            email: email,
            password: password,
            signin: 'biometric',
        }

        props.navigation.navigate('RequestExternalUserATypeScreen', {body: requestBody});
      }

      return(
        <View>
          <Button
            icon='fingerprint'
            mode="contained"
            color='purple'
            style={{marginBottom: 10, borderRadius: 20}}
            onPress={handleAuthWithBiometric}
            >
            
            <Text>Ingresar con biometria</Text>
          </Button>
        </View>
      )
    }
  
