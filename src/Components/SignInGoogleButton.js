import {
  View,
  Text

} from 'react-native';

import React, {useEffect} from 'react'
import {Button} from 'react-native-paper'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {IOS_KEY, ANDROID_KEY, WEB_KEY, ANDROID_STANDALONE_KEY} from "@env"
import constants from '../others/constants'
import {useAuthUser} from '../context/AuthContext';
import {postToGateway} from "../others/utils";

const {getAuth, signInWithCredential, GoogleAuthProvider} = require("firebase/auth");

WebBrowser.maybeCompleteAuthSession();

export default SignInWithGoogle = (props) => {

  const {signIn} = useAuthUser();

  const [request, response, promptAsync] = Google.useAuthRequest({ //return an object with result token and user
    iosClientId: IOS_KEY, //From app.json
    androidClientId: ANDROID_KEY, //From app.json
    webClientId: WEB_KEY,
  });

  let handleSignInWithGoogle = async (googleAuth) => {
    let isArtist = false;
    let isListener = false;

    console.log(JSON.stringify(googleAuth));
    const credential = GoogleAuthProvider.credential(googleAuth.idToken, googleAuth.accessToken);
    const auth = getAuth();

    const response = await signInWithCredential(auth, credential)
      .catch(err => alert(err));

    if (response.user === undefined) {
      alert("No pudo autenticarse al usuario con Google");
      return;

    }

    const requestBody = {
      token: response._tokenResponse.idToken,
      email: response._tokenResponse.email,
      name: response._tokenResponse.firstName,
      surname: response._tokenResponse.lastName,
      link: "mobile",
      signin: "google",
      isArtist: isArtist,
      isListener: isListener,
      redirectTo: constants.USERS_HOST + constants.SIGN_IN_URL,
    };

    if (response._tokenResponse.isNewUser !== undefined) {
      props.navigation.navigate('RequestExternalUserATypeScreen', {
        body: requestBody,
        id: response.user.uid,
        token: response._tokenResponse.idToken
      });
    } else {
      postToGateway(requestBody).then((res) => {
        if (res.error === undefined) {
          signIn(response._tokenResponse.idToken, response.user.uid);
        } else {
          alert(res.error);
        }
      });
    }


  };

  useEffect(() => {
    console.log(JSON.stringify(response));
    if (response?.type === 'success') {
      const {authentication} = response;
      handleSignInWithGoogle(authentication);
    }
  }, [response]);

  return (
    <View>
      <Button
        icon='google'
        mode="contained"
        disabled={!request}
        onPress={() => promptAsync()}
        style={{marginBottom: 10, marginTop: 30, borderRadius: 20}}>

        <Text>Ingrese con Google</Text>
      </Button>
    </View>
  );
}

