import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableHighlight,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput
  } from 'react-native';
  
  import React, {useRef, useState} from 'react'
  import imagenCromiun from '../../assets/cromiun.png'
  import { InputOutline } from 'react-native-input-outline';
  
  
  
  export default SignUpScreen = ({navigation}) =>{

      const [username,setUsername] = useState('');
      const [mail,setMail] = useState('');
      const [password,setPassword] = useState('');
      const [repeatPassword,setRepeatPassword] = useState('');
      const [usernameError,setUsernameError] = useState(null);
      const [mailError,setMailError] = useState(null);
      const [passwordError,setPasswordError] = useState(null);
      const [repeatPasswordError,setRepeatPasswordError] = useState(null);

      let sendPostRequest = async () =>{

        if (! validate()) {
          return;
        }

        await fetch("endpoint/signup",
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: {username},
                mail: {mail},
                password: {password},
                repeatPassword: {repeatPassword}
            })
  
        }).then((response)=>{console.log(response)})
        .catch((err)=>{console.log(err)})
      }

      let validate = () =>{
      
        if ( username === '' ) setUsernameError('Campo "Nombre de Usuario" debe ser completado')
        if ( password === '' ) setPasswordError('Campo "Contraseña" debe ser completado')
        if ( mail === '' ) setMailError('Campo "Mail" debe ser completado')
        
        if ( repeatPassword === '' ) 
          setRepeatPasswordError('Campo "Repetir Contraseña" debe ser completado')
        
        if (password.length < 8 ) 
          setPasswordError('La Contraseña debe tener como minimo 8 caracteres')
        
        else if (password.length > 16 ) 
          setPasswordError('La Contraseña debe tener como maximo 8 caracteres')
        
        else if (
          !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)
        ){
          setPasswordError('Minimo 1 caracter en mayuscula, 1 caracter en minuscula y 1 numero')
        }

        if ( password !== repeatPassword ){
          setRepeatPasswordError('No coincide con la contraseña ingresada')
        }
        
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
          setMailError('No tiene formato de mail')
        
        if (( usernameError === null ) && (passwordError === null) 
          && (repeatPasswordError === null) && (mailError === null)){
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
                  <Text style={styles.title}>Registrarse en My App</Text>
                  <Text>Ingrese sus datos</Text>

                  <InputOutline
                      placeholder='Nombre del Usuario'
                      value={username}
                      style={styles.input}
                      onChangeText={(text)=>{setUsername(text);setUsernameError(null);}}
                      error={usernameError}
                   />

                   <InputOutline
                      placeholder='Mail'
                      value={mail}
                      style={styles.input}
                      onChangeText={(text)=> {setMail(text);setMailError(null);}}
                      error={mailError}
                   />
  
                  <InputOutline
                      placeholder='Contraseña'
                      value={password}
                      style={styles.input}
                      onChangeText={(text)=>{setPassword(text); setPasswordError(null);}}
                      secureTextEntry={true}
                      error={passwordError}
                   />

                   <InputOutline
                      placeholder='Repetir Contraseña'
                      string={repeatPassword}
                      style={styles.input}
                      onChangeText={(text)=>{setRepeatPassword(text);setRepeatPasswordError(null);}}
                      secureTextEntry={true}
                      error={repeatPasswordError}
                   />
                   
                  <TouchableHighlight style={styles.button} onPress={sendPostRequest}>
                      <Text style={styles.buttonText}>Iniciar</Text>
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
          image:{
            height: 70,
            width: 70,
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 80
          }}
    )
