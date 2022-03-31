import imagenCromiun from '../../assets/cromiun.png';
import {  
    Text, 
    View, 
    Image, 
  } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react'
import constants from '../others/constants';




export default NavigationLogInScreen = ({navigation}) =>{
  
    return(
      <View style={styles.container}>
        <View>
          <Image source={imagenCromiun} style={styles.image}>
          </Image>
        </View>
        <Text>
          {constants.USERS_HOST}
        </Text>
        <View style={styles.containerTexts}>
          <Button
            mode='text'
            style={styles.button} 
            onPress={()=>{navigation.navigate('SignInScreen')}}>
              <Text style={styles.text}>Iniciar Sesión</Text>
          </Button>

          <Button
            mode='text' 
            style={styles.button} 
            onPress={()=>{navigation.navigate('SignUpScreen')}}>
              <Text style={styles.text}>Registrarse</Text>
          </Button>

          <Button
            mode='text'
            style={styles.button} 
            onPress={()=>{navigation.navigate('ForgotPasswordScreen')}}>
              <Text style={styles.text}>¿Olvido su contraseña?</Text>
          </Button>
        </View>
      </View>
    )
  
  }



  const styles = {
    image: {height: 150, width: 150, borderRadius: 200, resizeMode: 'contain', paddingTop: 200},
    container: {flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: '#f5fcff'},
    text: {fontSize: 20, color: 'skyblue'},
    containerTexts: {flex: 1, justifyContent: 'center',alignItems: 'center'},
    button: {padding: 10}
  }