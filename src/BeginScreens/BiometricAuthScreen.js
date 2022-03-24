import * as LocalAuthentication from 'expo-local-authentication';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Screen } from "react-native-screens";
import constants from "../others/constants";

export function BiometricAuthScreen({navigation}) {
    const [facialRecognitionAvailable, setFacialRecognitionAvailable] = React.useState(false);
    const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState();

    const checkSupportedAuthentication = async () => {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types && types.length) {
            setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
            setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
        }
    };

    const authenticate = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const results = await LocalAuthentication.authenticateAsync();

            console.log(results);

            if (results.success) {
                setResult('SUCCESS');
            } else if (results.error === 'unknown') {
                setResult('DISABLED');
            } else if (
                results.error === 'user_cancel' ||
                results.error === 'system_cancel' ||
                results.error === 'app_cancel'
            ) {
                setResult('CANCELLED');
            }
        } catch (error) {
            setResult(error.message);
        }

        setLoading(false);

        fetch(constants.USERS_HOST + constants.BIOMETRIC_AUTH_URL,
            {
                method: 'POST',
                headers: constants.JSON_HEADER,
                body: JSON.stringify({
                  auth: result,
                  link: "mobile"
              })
        })
        .then(response=>response.json())
        .then(res => 
            {
                console.log(res);
                navigation.navigate('NavigatorlogInScreen')
            })
        .catch(err => alert(err))    ;

    }

    React.useEffect(() => {
        checkSupportedAuthentication().then(r => {});
    }, []);


    let resultMessage;

    switch (result) {
        case 'CANCELLED':
            resultMessage = 'Authentication process has been cancelled';
            break;
        case 'DISABLED':
            resultMessage = 'Biometric authentication has been disabled';
            break;
        case 'ERROR':
            resultMessage = 'There was an error in authentication';
            break;
        case 'SUCCESS':
            resultMessage = 'Successfully authenticated';
            break;
        default:
            resultMessage = '';
            break;
    }

    let description;

    if (facialRecognitionAvailable && fingerprintAvailable) {
        description = 'AAAAA Authenticate with Face ID, touch ID or iris ID';
    } else if (facialRecognitionAvailable) {
        description = 'AAAAA Authenticate with Face ID or touch ID';
    } else if (facialRecognitionAvailable) {
        description = 'AAAAA Authenticate with Face ID';
    } else if (fingerprintAvailable) {
        description = 'nnnnn Authenticate with touch ID ';
    } else {
        description = 'No biometric authentication methods available';
        navigation.navigate('NavigatorlogInScreen');
    }

    /* Based on :
    * https://dev.to/bionicjulia/biometric-authentication-in-react-native-with-expo-3l20
    * */
    return (

        <Screen>
            <Text style={styles.text}>
                {description}
            </Text>

                <Button onPress={authenticate} mode='text'>
                    Auntenticar usuario
                </Button>

            <Text style={styles.text}>{resultMessage}</Text>
        </Screen>
    );
}

const styles = StyleSheet.create(
    { 
       text: {textAlign: 'center',fontSize: 20, paddingTop: 70},
    }
 )