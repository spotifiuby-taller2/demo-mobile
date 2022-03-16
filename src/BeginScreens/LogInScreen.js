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



export default LogInScreen = ({navigation}) =>{

    const [mail,setMail] = useState('');
    const [password,setPassword] = useState('');
    const [mailError,setMailError] = useState(null);
    const [passwordError,setPasswordError] = useState(null);
    const [securePassword, setSecurePassword] = useState(true);

    let sendPostRequest = async () =>{

      if (validate()) {
          return;
      }

      /*
      await fetch(constants.USERS_HOST + constants.SIGN_IN_URL,
          {
            method: 'POST',
            headers: constants.JSON_HEADER,
            body: JSON.stringify({
              mail: {mail},
              password: getSHAOf( getSHAOf(password) ),
          })

      }).then((response)=>{console.log(response)})
      .catch((err)=>{console.log(err)})*/
    }

    let validate = () =>{
      
      if ( mail === '' ) setMailError('Campo "Mail" debe ser completado')
      if ( password === '' ) setPasswordError('Campo "Contraseña" debe ser completado')

      if (( mail === null ) && (passwordError === null)){
          return true;
      }
      
      return false;
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
                    value={mail}
                    onChangeText={(newText) => {setMail(newText); setMailError(null);}}
                    mode='outlined'
                    error={mailError!==null}/>
                {mailError &&(
                  <Text style={{color: 'red'}}>Campo 'Mail' es requerido</Text>
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
                  <Text style={{color: 'red'}}>Campo 'Contraseña' es requerido</Text>
                ) }
              

                <Button mode='contained' style={styles.button} onPress={sendPostRequest}>
                    <Text style={styles.buttonText}>Iniciar</Text>
                </Button>

                <Button 
                    mode='text'
                    style={{backgroundColor:'#f5fcff'}} 
                    onPress={()=>{navigation.navigate('ForgotPasswordScreen')}}>
                    
                    <Text style={styles.forgotPasswordButton}>¿Olvido su contraseña?</Text>
                </Button>
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