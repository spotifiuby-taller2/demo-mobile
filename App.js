import 'react-native-gesture-handler'
import React, {useEffect, useReducer, useMemo} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/AuthScreens/SignInScreen'
import SignUpScreen from './src/AuthScreens/SignUpScreen'
import NavigationLogInScreen from './src/AuthScreens/NavigationLogInScreen';
import ForgotPasswordScreen from './src/AuthScreens/ForgotPasswordScreen'
import HomeScreen from './src/HomeScreens/HomeScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from './src/context/AuthContext';
import * as SecureStore from 'expo-secure-store';


const AuthStack = createNativeStackNavigator();

const initialState = ()=>{
  return{
      userToken: null,
      isSignOut: false
  }
};

const reducer = (state = initialState(), action = {})=>{

  switch(action.type){
      case 'RESTORE_TOKEN':
      return{
          ...state,
          userToken: action.token
      };
      case 'SIGN_IN':
      return{
          ...state,
          userToken: action.token,
          isSignOut: false
      }
      
      case 'SIGN_OUT':
      return{
          ...state,
          userToken: null,
          isSignOut: true
      }
  }
  return state;
};

export default function App() {

  const [state, dispatch] = useReducer(reducer, reducer());

  useEffect(()=>{
    const bootstrapAsync = async ()=>{

        let userToken;

    try{
        userToken = await SecureStore.getItemAsync('authToken');
    }
    catch(err){
        alert(err);
        return;
    }
    console.log("token:")
    console.log(userToken);

    dispatch({type: 'RESTORE_TOKEN', token: userToken});
    }

    bootstrapAsync();
  },[]);

  const authContext = useMemo(()=>{
    return ({
        state,
        signIn: async (token)=>
            {
            let userToken;

            try{
                userToken = await SecureStore.getItemAsync('authToken');

                if (! userToken){
                    await SecureStore.setItemAsync('authToken', token);
                    userToken = await SecureStore.getItemAsync('authToken');
                }
            }
            catch(err){
                alert(err);
                return;
            }
            console.log(userToken);
            dispatch({type: 'SIGN_IN', token: userToken});
            },
        signOut: async ()=>{
            dispatch({type: 'SIGN_OUT'});
            await SecureStore.deleteItemAsync('authToken');
        }
    });
    
  },[]);

  return (
    <AuthContext.Provider value={authContext}>
    <PaperProvider>
        <NavigationContainer>
          <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <>
            {
              ( ! state.userToken )? (
                <>
                  <AuthStack.Screen name='NavigatorlogInScreen' component={NavigationLogInScreen}/>
                  <AuthStack.Screen name='SignInScreen' component={SignInScreen} initialParams={{email: '', password: ''}} options={{ animationTypeForReplace: state.isSignOut ? 'pop' : 'push'}}/>
                  <AuthStack.Screen name='SignUpScreen' component={SignUpScreen}/>
                  <AuthStack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
                </>
                
              ):(
                <AuthStack.Screen name='HomeScreen' component={HomeScreen}/>
              )
            }
            </>
          </AuthStack.Navigator>
        </NavigationContainer>
        </PaperProvider>
      </AuthContext.Provider>
  );
};