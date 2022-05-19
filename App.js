import 'expo-dev-client';
import 'react-native-gesture-handler'
import React, {useEffect, useReducer, useMemo} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/AuthScreens/SignInScreen'
import SignUpScreen from './src/AuthScreens/SignUpScreen'
import ForgotPasswordScreen from './src/AuthScreens/ForgotPasswordScreen'
import PINScreen from './src/AuthScreens/PINScreen';
import RequestExternalUserATypeScreen from './src/AuthScreens/RequestExternalUserATypeScreen';
import RequestMusicalPreferencesScreen from './src/AuthScreens/RequestMusicalPreferencesScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthContext} from './src/context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import {auth, signOut} from './src/Firebase/firebase';
import PlayerComponent from "./src/Components/PlayerComponent";
import constants from './src/others/constants'
import Menu from "./src/Components/Menu";

const AuthStack = createNativeStackNavigator();

const initialState = () => {
  return {
    uid: null,
    userToken: null,
    isSignOut: true,
    userType: null,
    name: null,
    surname: null
  }
};

const reducer = (state = initialState(), action = {}) => {

  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        uid: action.uid,
        userToken: action.token,
      };
    case 'SIGN_IN':
      return {
        ...state,
        uid: action.uid,
        userToken: action.token,
        isSignOut: false
      }

    case 'SIGN_OUT':
      return {
        ...state,
        uid: null,
        userToken: null,
        isSignOut: true,
        userType: null
      }
    case 'SET_USER_BASIC_INFO':
      return {
        ...state,
        name: action.userName,
        surname: action.userSurname,
        userType: action.userType
      }
  }
  return state;
};

export default function App() {

  const [userState, dispatch] = useReducer(reducer, reducer());

  useEffect(() => {
    const bootstrapAsync = async () => {

      let userToken;
      let userId;

      try {
        userToken = await SecureStore.getItemAsync(constants.SS_TOKEN_LABEL);
        userId = await SecureStore.getItemAsync(constants.SS_ID_LABEL);
      } catch (err) {
        alert(err);
        return;
      }

      if (userToken === null) {
        await authContext.signOut();
      } else {
        dispatch({type: 'RESTORE_TOKEN', token: userToken, uid: userId});
      }
    }

    bootstrapAsync().then();
  }, []);

  const authContext = useMemo(() => {
    return ({
      userState,
      signIn: async (token, uid) => {
        let userToken;
        let userId;


        try {
          userToken = await SecureStore.getItemAsync(constants.SS_TOKEN_LABEL);
          if (!userToken) {
            await SecureStore.setItemAsync(constants.SS_TOKEN_LABEL, token);
            userToken = await SecureStore.getItemAsync(constants.SS_TOKEN_LABEL);
            await SecureStore.setItemAsync(constants.SS_ID_LABEL, uid);
            userId = await SecureStore.getItemAsync(constants.SS_ID_LABEL);
            await SecureStore.setItemAsync(constants.SS_TIMESTAMP_LABEL, JSON.stringify(Date.now()));
          }
        } catch (err) {
          alert(err);
          return;
        }
        dispatch({type: 'SIGN_IN', token: userToken, uid: userId});
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync(constants.SS_TOKEN_LABEL);
        await SecureStore.deleteItemAsync(constants.SS_ID_LABEL);
        await SecureStore.deleteItemAsync(constants.SS_TIMESTAMP_LABEL);
        await signOut(auth);
        dispatch({type: 'SIGN_OUT'});
      },
      setUserBasicInfo: (userType, userName, userSurname) => {
        dispatch({type: 'SET_USER_BASIC_INFO', userType: userType, userName: userName, userSurname: userSurname})
      }
    });

  }, [userState]);

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider>
        <NavigationContainer>
          <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <>
              {
                (userState.userToken === null) ? (
                  <>
                    <AuthStack.Screen name='SignInScreen' component={SignInScreen}
                                      initialParams={{email: '', password: ''}}
                                      options={{animationTypeForReplace: userState.isSignOut ? 'pop' : 'push'}}/>
                    <AuthStack.Screen name='SignUpScreen' component={SignUpScreen}/>
                    <AuthStack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
                    <AuthStack.Screen name='PINScreen' component={PINScreen}/>
                    <AuthStack.Screen name='RequestMusicalPreferencesScreen'
                                      component={RequestMusicalPreferencesScreen}/>
                    <AuthStack.Screen name='RequestExternalUserATypeScreen' component={RequestExternalUserATypeScreen}/>
                  </>

                ) : (
                  <AuthStack.Screen name='PlayerComponent' component={PlayerComponent}/>
                )
              }
            </>
          </AuthStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
};
