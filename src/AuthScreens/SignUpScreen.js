import { 
    StyleSheet, 
    View, 
    Image,
    SafeAreaView,
    ScrollView
  } from 'react-native';
  
  import React, {useState} from 'react'
  import imageSpotifiuby from '../../assets/SpotifiubyIcon.png'
  import { TextInput, Button, Text, Title } from 'react-native-paper'
  import { getSHAOf } from "../others/utils"
  import constants from "../others/constants"

  
  
  export default SignUpScreen = ({navigation}) =>{

      const [email,setEmail] = useState('');
      const [password,setPassword] = useState('');
      const [emailError,setEmailError] = useState(null);
      const [passwordError,setPasswordError] = useState(null);
      const [securePassword, setSecurePassword] = useState(true);

      let handleSignUp = () =>{

        if (! validate()) {
          return;
        }

        // El manejo de errores se puede reciclar de backoffice
        fetch(constants.USERS_HOST + constants.SIGN_UP_URL,
            {
              method: 'POST',
              headers: constants.JSON_HEADER,
              body: JSON.stringify({
                email: email,
                password: getSHAOf( getSHAOf(password) ),
                link: "mobile",
                isExternal: false
            } )
  
          })
          .then((res) => res.json())
          .then((response)=>{
              checkResponse(response);
            })
          .catch((err)=>{alert(err)});
      }
      

      let checkResponse = (res) =>{
        if (res.error === undefined){
          alert("Mail de confirmación enviado. Solo podra ingresar si confirma que es usted.");
          navigation.navigate('SignInScreen',
            {
              email: email,
              password: password
            });
        }
        else{
          alert(response.error);
        }
      }

      let validate = () =>{

        let isValid = true;
      
        if ( password === '' ){ 
          setPasswordError('Campo "Contraseña" debe ser completado');
          isValid = false;
        }
        if ( email === '' ) {
          setEmailError('Campo "Mail" debe ser completado');
          isValid=false;
        }
        
        if (password.length < constants.MIN_LENGTH_PASSWORD ) {
          setPasswordError('La Contraseña debe tener como minimo 8 caracteres');
          isValid = false;
        }
        
        else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)){
          setPasswordError('Minimo 1 caracter en mayuscula, 1 caracter en minuscula y 1 numero');
          isValid = false;
        }
        
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          setEmailError('No tiene formato de mail');
          isValid = false;
        }

        
        return isValid;
      }
  
      return(
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                  <Image source={imageSpotifiuby} style={styles.image}></Image>
                  <Title style={styles.title}>Registrarse en Spotifiuby</Title>
                  <Text>Ingrese sus datos</Text>

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
                    right={<TextInput.Icon name="eye" onPress={()=>{setSecurePassword(! securePassword)}}/>}
                    />
                  
                  {passwordError &&(
                  <Text style={{color: 'red'}}>{passwordError}</Text>
                ) }
                   
                  <Button mode='contained' style={styles.button} onPress={handleSignUp}>
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
          image:{height:  150, width: 150, borderRadius: 200, resizeMode: 'contain', paddingTop: 200, marginLeft: 84}}
    )
