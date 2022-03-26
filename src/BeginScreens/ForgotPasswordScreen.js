import { 
    StyleSheet, 
    View, 
    Image,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
  
import React, {useState} from 'react'
import imagenCromiun from '../../assets/cromiun.png'
import { TextInput, Button, Text, Title } from 'react-native-paper'
import constants from "../others/constants";

  
export default ForgotPasswordScreen = ({navigation}) =>{
  
      const [email,setEmail] = useState('');
      const [emailError,setEmailError] = useState(null);

      let validate = () =>{
      
        if ( email === '' ) setEmailError('Campo "Mail" debe ser completado')
        
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
          setEmailError('No tiene formato de mail')
        
        if (emailError === null){
            return true;
        }
        
        return false;
      }
  
      let handleForgotPassword = async () =>{

        if (! validate()) {
          return;
        }
  
        console.log(constants.USERS_HOST + constants.FORGOT_PASSWORD_URL);
        fetch(constants.USERS_HOST + constants.FORGOT_PASSWORD_URL,
            {
              method: 'POST',
              headers: constants.JSON_HEADER,
              body: JSON.stringify({
                email: email,
                link: 'mobile'
            })
  
        })
        .then((response) => response.json())
        .then((response)=>{console.log(response)})
        .catch((err)=>{console.log(err)})
      }
  
      return(
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                  <Button
                    mode='text'
                    style={{width: 100}}
                    onPress={()=>{navigation.navigate('NavigatorlogInScreen')}}>
                      <Text>ATRAS</Text>
                  </Button>
                  <Image source={imagenCromiun} style={styles.image}></Image>
                  <Title style={styles.title}>¿Ha olvidado su contraseña?</Title>
                  
                  <TextInput
                      name='mail'
                      label='Mail*'
                      mode='outlined'
                      value={email}
                      onChangeText={(text) =>{setEmail(text);setEmailError(null);}}
                      error={emailError!==null}
                   />
                   {emailError &&(
                      <Text style={{color: 'red'}}>{emailError}</Text>
                    )}

                  <Button mode='contained' style={styles.button} onPress={handleForgotPassword}>
                      <Text style={styles.buttonText}>Enviar</Text>
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