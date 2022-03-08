import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import React, {useState} from 'react'
import imagenCromiun from '../../assets/cromiun.png'
import { InputOutline } from 'react-native-input-outline';



export default LogInScreen = ({navigation}) =>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [usernameError,setUsernameError] = useState(null);
    const [passwordError,setPasswordError] = useState(null);

    let sendPostRequest = async () =>{

      if (validate()) {
          return;
      }

      await fetch("endpoint/login",
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: {username},
              password: {password},
          })

      }).then((response)=>{console.log(response)})
      .catch((err)=>{console.log(err)})
    }

    let validate = () =>{
      
      if ( username === '' ) setUsernameError('Campo "Nombre de Usuario" debe ser completado')
      if ( password === '' ) setPasswordError('Campo "Contraseña" debe ser completado')

      if (( usernameError === null ) && (passwordError === null)){
          return true;
      }
      
      return false;
    }

    return(
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <TouchableOpacity onPress={()=>{navigation.navigate('NavigatorlogInScreen')}}>
                  <View>
                    <Text>ATRAS</Text>
                  </View>
                </TouchableOpacity>
                <Image source={imagenCromiun} style={styles.image}></Image>
                <Text style={styles.title}>Iniciar sesión en My App</Text>
                
                <InputOutline
                    name='Username'
                    placeholder='Nombre de Usuario*'
                    value={username}
                    style={styles.input}
                    onChangeText={(newText) => {setUsername(newText); setUsernameError(null);}}
                    error={usernameError}
                    errorFontSize={8}
                 />

                <InputOutline
                    name='Password'
                    placeholder='Contraseña*'
                    value={password}
                    style={styles.input}
                    onChangeText={(newText) => {setPassword(newText); setPasswordError(null);}}
                    secureTextEntry={true}
                    error={passwordError}
                    errorFontSize={8}
                 />

                <TouchableHighlight style={styles.button} onPress={sendPostRequest}>
                    <Text style={styles.buttonText}>Iniciar</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    style={{backgroundColor:'#f5fcff'}} 
                    onPress={()=>{navigation.navigate('ForgotPasswordScreen')}}>
                    
                    <Text style={styles.forgotPasswordButton}>¿Olvido su contraseña?</Text>
                </TouchableHighlight>
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