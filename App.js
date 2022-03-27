import 'react-native-gesture-handler'
import React, {setState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/LogInScreens/SignInScreen'
import SignUpScreen from './src/LogInScreens/SignUpScreen'
import NavigationLogInScreen from './src/LogInScreens/NavigationLogInScreen';
import ForgotPasswordScreen from './src/LogInScreens/ForgotPasswordScreen'
import HomeScreen from './src/HomeScreens/HomeScreen';
import { Provider as PaperProvider } from 'react-native-paper';



const AuthStack = createNativeStackNavigator();


export default function App() {

  const [userToken, setUserToken] = setState(null);
  

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          {
            userToken? (
              <>
                <AuthStack.Screen name='NavigatorlogInScreen' component={NavigationLogInScreen}/>
                <AuthStack.Screen name='SignInScreen' component={SignInScreen} initialParams={{email: '', password: ''}}/>
                <AuthStack.Screen name='SignUpScreen' component={SignUpScreen}/>
                <AuthStack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
              </>
              
            ):(
              <AuthStack.Screen name='HomeScreen' component={HomeScreen}/>
            )
          }
        </AuthStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};