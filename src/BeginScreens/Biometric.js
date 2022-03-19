import * as LocalAuthentication from 'expo-local-authentication';
import * as React from 'react';

import { Button, Text } from 'react-native-paper';
import { Screen } from "react-native-screens";

export function BiometricAuthScreen() {
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
            setResult(EResult.ERROR);
        }

        setLoading(false);
    };

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


            console.log(description);
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
    }

    /* Based on :
    * https://dev.to/bionicjulia/biometric-authentication-in-react-native-with-expo-3l20
    * */
    return (

        <Screen>
            <Text>
                {`
                
                
                
                ${description}`}
            </Text>

                <Button onPress={authenticate}>
                    Authenticate
                </Button>

            <Text>{resultMessage}</Text>
        </Screen>
    );
}