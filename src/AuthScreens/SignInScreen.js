import { 
  StyleSheet, 
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import React, {useState} from 'react'
import imagenCromiun from '../../assets/cromiun.png'
import { TextInput, Text, Button, Title } from 'react-native-paper'
import constants from '../others/constants'
import { getSHAOf } from "../others/utils"
import SignInWithBiometricButton from '../Components/SignInWithBiometricButton';
import SignInGoogleButton from '../Components/SignInGoogleButton';
import { auth } from "../Firebase/firebase";
import { useRoute } from '@react-navigation/native';
import { useAuthUser } from '../context/AuthContext';
const firebaseAuth = require("firebase/auth");


export default LogInScreen = ({navigation}) =>{

    const route = useRoute();
    const {signIn} = useAuthUser();


    const [email,setEmail] = useState(route.params.email);
    const [password,setPassword] = useState(route.params.password);
    const [emailError,setEmailError] = useState(null);
    const [passwordError,setPasswordError] = useState(null);
    const [securePassword, setSecurePassword] = useState(true);

    let handleSignIn = async () =>{

      if (validate()) {
          return;
      }

      const hashedPassword = getSHAOf( getSHAOf( password ) );

      const fResponse = await firebaseAuth.signInWithEmailAndPassword(
          auth, 
          email, 
          hashedPassword);

      fetch(constants.USERS_HOST + constants.SIGN_IN_URL,
          {
            method: 'POST',
            headers: constants.JSON_HEADER,
            body: JSON.stringify({
              email: email,
              password: hashedPassword,
              idToken: fResponse._tokenResponse.idToken,
              link: "mobile",
              signin: "email-password"
          })

      } )
      .then(response => response.json())
      .then( (response) => {
          if(response.error === undefined){
              signIn(fResponse._tokenResponse.idToken);
          }
      } )
      .catch(err=>alert(err));
    }

    let validate = () =>{
      
      if ( email === '' ) setEmailError('Campo "Mail" debe ser completado')
      if ( password === '' ) setPasswordError('Campo "Contraseña" debe ser completado')

      return (email === '') && (passwordError === null);
    }

    return(
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <Image source={imagenCromiun} style={styles.image}></Image>
                <Title style={styles.title}>Iniciar sesión en My App</Title>
                
                <TextInput
                    name='Mail'
                    label='Mail*'
                    value={email}
                    onChangeText={(newText) => {setEmail(newText); setEmailError(null);}}
                    mode='outlined'
                    error={emailError!==null}/>
                {emailError &&(
                  <Text style={{color: 'red'}}>{emailError}</Text>
                ) }
                
                <TextInput
                    name='Password'
                    label='Contraseña*'
                    value={password}
                    onChangeText={(newText) => {setPassword(newText); setPasswordError(null);}}
                    mode='outlined'
                    error={passwordError!==null}
                    secureTextEntry={securePassword}
                    right={<TextInput.Icon name="eye" onPress={()=>{setSecurePassword(! securePassword)}}/>}/>
                {passwordError &&(
                  <Text style={{color: 'red'}}>{passwordError}</Text>
                ) }
              

                <Button mode='contained' style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Iniciar</Text>
                </Button>

                <Button 
                    mode='text'
                    style={{backgroundColor:'#f5fcff'}} 
                    onPress={()=>{navigation.navigate('ForgotPasswordScreen')}}>
                    
                    <Text style={styles.forgotPasswordButton}>¿Olvido su contraseña?</Text>
                </Button>
                
                <SignInGoogleButton/>
                <SignInWithBiometricButton />

            </View>
            </ScrollView>
        </SafeAreaView>
      </View>
    )
  }

  const styles = StyleSheet.create(
    { input: {
        borderWidth: 2, 
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: '#f5fcff',
        height: 50
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
       image:{
         height: 70,
         width: 70,
         alignSelf: 'center',
         marginTop: 50,
         marginBottom: 80
       }}
 )