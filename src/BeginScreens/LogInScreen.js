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


export default LogInScreen = ({navigation}) =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailError,setEmailError] = useState(null);
    const [passwordError,setPasswordError] = useState(null);
    const [securePassword, setSecurePassword] = useState(true);

    let handleSignIn = async () =>{

      if (validate()) {
          return;
      }

      await fetch(constants.USERS_HOST + constants.SIGN_IN_URL,
          {
            method: 'POST',
            headers: constants.JSON_HEADER,
            body: JSON.stringify({
              email: email,
              password: getSHAOf( getSHAOf(password) ),
              link: "mobile",
              firebase: false
          })

      } ).then( (response) => {
          if (response.error !== undefined) {
              alert(response.error);
          }
          else{
            console.log(response);
          }
      } );
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
                <Button 
                    mode='text' 
                    onPress={()=>{navigation.navigate('NavigatorlogInScreen')}}
                    style={{width: 100}}
                    >
                    <Text>ATRAS</Text>
                </Button>
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