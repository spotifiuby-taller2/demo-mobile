import { 
    StyleSheet, 
    View, 
    Image,
    SafeAreaView,
    ScrollView
  } from 'react-native';
  
  import React, {useState} from 'react'
  import imagenCromiun from '../../assets/cromiun.png'
  import { TextInput, Button, Text, Title } from 'react-native-paper'
  import { getSHAOf } from "../others/utils"
  import constants from "../others/constants"
  
  
  
  export default SignUpScreen = ({navigation}) =>{

      const [mail,setMail] = useState('');
      const [password,setPassword] = useState('');
      const [mailError,setMailError] = useState(null);
      const [passwordError,setPasswordError] = useState(null);
      const [securePassword, setSecurePassword] = useState(true);

      let sendPostRequest = async () =>{

        if (! validate()) {
          return;
        }
        
        console.log("1");
        console.log(mail);
        console.log("2");
        console.log(password);

        await fetch(constants.USERS_HOST + constants.SIGN_UP_URL,
            {
              method: 'POST',
              headers: constants.JSON_HEADER,
              body: JSON.stringify({
                email: mail,
                password: await getSHAOf( await getSHAOf(password) ),
                link: "mobile"
            } )
  
        })
        .then((res) => res.json())
        .then((response)=>{console.log(response)})
        .catch((err)=>{console.log(err)})
      }

      let validate = () =>{
      
        if ( password === '' ) setPasswordError('Campo "Contraseña" debe ser completado')
        if ( mail === '' ) setMailError('Campo "Mail" debe ser completado')
        
        if (password.length < 8 ) 
          setPasswordError('La Contraseña debe tener como minimo 8 caracteres')
        
        else if (password.length > 16 ) 
          setPasswordError('La Contraseña debe tener como maximo 8 caracteres')
        
        else if (
          !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)
        ){
          setPasswordError('Minimo 1 caracter en mayuscula, 1 caracter en minuscula y 1 numero')
        }
        
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
          setMailError('No tiene formato de mail')
        
        if ((passwordError === null) && (mailError === null)){
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
                      style={{width: 100}}
                      mode='text' 
                      onPress={()=>{navigation.navigate('NavigatorlogInScreen')}}>
                      <Text>ATRAS</Text>
                  </Button>
                  <Image source={imagenCromiun} style={styles.image}></Image>
                  <Title style={styles.title}>Registrarse en My App</Title>
                  <Text>Ingrese sus datos</Text>

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
                    right={<TextInput.Icon name="eye" onPress={()=>{setSecurePassword(! securePassword)}}/>}
                    />
                  
                  {passwordError &&(
                  <Text style={{color: 'red'}}>Campo 'Contraseña' es requerido</Text>
                ) }
                   
                  <Button mode='contained' style={styles.button} onPress={sendPostRequest}>
                      <Text style={styles.buttonText}>Iniciar</Text>
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
