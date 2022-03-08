import 'react-native-gesture-handler'
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
} from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import imagenCromiun from './assets/cromiun.png';
import LogInScreen from './Screens/BeginScreens/LogInScreen'
import SignUpScreen from './Screens/BeginScreens/SignUpScreen'
import ForgotPasswordScreen from './Screens/BeginScreens/ForgotPasswordScreen'

const Stack = createNativeStackNavigator();


const NavigationLogInScreen = ({navigation}) =>{

  return(
    <View style={styles.container}>
      <View>
        <Image source={imagenCromiun} style={styles.image}>
        </Image>
      </View>
      <View style={styles.containerTexts}>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('LogInScreen')}}>
          <Text style={styles.text}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('SignUpScreen')}}>
          <Text style={styles.text}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('ForgotPasswordScreen')}}>
          <Text style={styles.text}>¿Olvido su contraseña?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='NavigatorlogInScreen' component={NavigationLogInScreen}/>
          <Stack.Screen name='LogInScreen' component={LogInScreen}/>
          <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
          <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = {
  image: {height: 150, width: 150, borderRadius: 200, resizeMode: 'contain', paddingTop: 200},
  container: {flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: '#f5fcff'},
  text: {fontSize: 20, color: 'skyblue'},
  containerTexts: {flex: 1, justifyContent: 'center',alignItems: 'center'},
  button: {padding: 10}
}