//import 'expo-dev-client';
import 'react-native-gesture-handler'
import TrackPlayer, {Capability} from 'react-native-track-player';
import React, {useEffect, useReducer, useMemo} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadSongScreen from './src/ContentScreens/UploadSongScreen';
import SignInScreen from './src/AuthScreens/SignInScreen'
import SignUpScreen from './src/AuthScreens/SignUpScreen'
import NavigationLogInScreen from './src/AuthScreens/NavigationLogInScreen';
import ForgotPasswordScreen from './src/AuthScreens/ForgotPasswordScreen'
import PINScreen from './src/AuthScreens/PINScreen';
import RequestExternalUserATypeScreen from './src/AuthScreens/RequestExternalUserATypeScreen';
import RequestMusicalPreferencesScreen from './src/AuthScreens/RequestMusicalPreferencesScreen';
import HomeNavStack from './src/Components/HomeNavStack';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from './src/context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { auth, signOut} from './src/Firebase/firebase';

const AuthStack = createNativeStackNavigator();

const initialState = ()=>{
  return{
      uid: null,
      userToken: null,
      isSignOut: true,
      userType: null
  }
};

const setupTrackPlayer = async () => {
  await TrackPlayer.setupPlayer();
  /*
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
      Capability.SeekTo,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
   */
}

const reducer = (state = initialState(), action = {})=>{

  switch(action.type){
      case 'RESTORE_TOKEN':
      return{
          ...state,
          uid: action.uid,
          userToken: action.token,
      };
      case 'SIGN_IN':
      return{
          ...state,
          uid: action.uid,
          userToken: action.token,
          isSignOut: false
      }

      case 'SIGN_OUT':
      return{
          ...state,
          uid: null,
          userToken: null,
          isSignOut: true,
          userType: null
      }

      case 'SET_USER_TYPE':
      return{
        ...state,
        userType: action.userType
      }
  }
  return state;
};

export default function App() {

  const [userState, dispatch] = useReducer(reducer, reducer());

  useEffect(() => {
    setupTrackPlayer();
    return () => TrackPlayer.destroy();
  }, []);

  useEffect(()=>{
    const bootstrapAsync = async ()=>{

        let userToken;
        let userId;

    try{
        userToken = await SecureStore.getItemAsync('authToken');
        userId = await SecureStore.getItemAsync('uid');
    }
    catch(err){
        alert(err);
        return;
    }

    if ( userToken === null  ){
      authContext.signOut();
    }
    else{
      dispatch({type: 'RESTORE_TOKEN', token: userToken, uid: userId});
    }
  }

    bootstrapAsync();
  },[]);

  const authContext = useMemo(()=>{
    return ({
      userState,
        signIn: async (token, uid)=>
            {
            let userToken;
            let userId;

            try{
                userToken = await SecureStore.getItemAsync('authToken');

                if (! userToken){
                    await SecureStore.setItemAsync('authToken', token);
                    userToken = await SecureStore.getItemAsync('authToken');
                    await SecureStore.setItemAsync('uid', uid);
                    userId = await SecureStore.getItemAsync('uid');
                    await SecureStore.setItemAsync('tokenTimestamp', JSON.stringify(Date.now()));
                }
            }
            catch(err){
                alert(err);
                return;
            }
            dispatch({type: 'SIGN_IN', token: userToken, uid: userId});
            },
        signOut: async ()=>{
            await SecureStore.deleteItemAsync('authToken');
            await SecureStore.deleteItemAsync('uid');
            await SecureStore.deleteItemAsync('tokenTimestamp');
            await signOut(auth);
            dispatch({type: 'SIGN_OUT'});
        },
        setUserType: (userType)=>{
          dispatch({type: 'SET_USER_TYPE', userType: userType})
        }
    });

  },[userState]);

  return (
    <AuthContext.Provider value={authContext}>
    <PaperProvider>
        <NavigationContainer>
          <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <>
            {
              ( userState.userToken === null )? (
                <>
                  <AuthStack.Screen name='SignInScreen' component={SignInScreen} initialParams={{email: '', password: ''}} options={{ animationTypeForReplace: userState.isSignOut ? 'pop' : 'push'}}/>
                  <AuthStack.Screen name='SignUpScreen' component={SignUpScreen}/>
                  <AuthStack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
                  <AuthStack.Screen name='PINScreen' component={PINScreen}/>
                  <AuthStack.Screen name='RequestMusicalPreferencesScreen' component={RequestMusicalPreferencesScreen}/>
                  <AuthStack.Screen name='RequestExternalUserATypeScreen' component={RequestExternalUserATypeScreen}/>
                </>

              ):(
                <AuthStack.Screen name='HomeNavStack' component={HomeNavStack}/>
              )
            }
              { /* <AuthStack.Screen name='UploadSong' component={UploadSongScreen}/> */ }
            </>
          </AuthStack.Navigator>
        </NavigationContainer>
        </PaperProvider>
      </AuthContext.Provider>
  );
};
