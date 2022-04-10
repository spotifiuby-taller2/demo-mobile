import { 
    StyleSheet, 
    View, 
    Image,
    SafeAreaView,
    ScrollView
  } from 'react-native';
  
  import React, {useState} from 'react'
  import imageSpotifiuby from '../../assets/SpotifiubyIcon.png'
  import { TextInput, Button, Text, Title } from 'react-native-paper'
  import constants from "../others/constants"
  import { useRoute } from '@react-navigation/native';


  
  
  export default PINScreen = ({navigation}) =>{

      const route = useRoute();
      const [pin,setPin] = useState('');
      const [pinError,setPinError] = useState(null);

      let handleSignUp = () =>{

        fetch(constants.USERS_HOST + constants.SIGN_UP_END_URL + `/${route.params.id}/${pin}`,
            {
              headers: constants.JSON_HEADER
  
          })
          .then((res) => res.json())
          .then((response)=>{
              checkResponse(response);
            })
          .catch((err)=>{alert(err)});
      }
      

      let checkResponse = (res) =>{
        if (res.error === undefined){

          if ( ! route.params.isListener){
            navigation.navigate('SignInScreen',
            {
              email: route.params.email,
              password: route.params.password
            });
          }else
          {
            navigation.navigate('RequestMusicalPreferencesScreen',
            {
              email: route.params.email,
              password: route.params.password
            });
          }
          
        }
        else{
          alert(res.error);
        }
      }
  
      return(
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                  <Image source={imageSpotifiuby} style={styles.image}></Image>
                  <Title style={styles.title}>Ingrese PIN de validación</Title>
                  <Text style={styles.description}>Hemos enviado un PIN a su telefono por mensaje a su cuenta Whatssap. Ingrese PIN para poder confirmar que es usted</Text>

                  <TextInput
                    name='PIN'
                    label='PIN*'
                    value={pin}
                    onChangeText={(newText) => {setPin(newText); setPinError(null);}}
                    mode='outlined'
                    error={pinError!==null}
                    style={styles.input}/>
                  
                  {pinError &&(
                    <Text style={{color: 'red'}}>{pinError}</Text>
                  ) }

                  <Button mode='contained' style={styles.button} onPress={handleSignUp}>
                      <Text style={styles.buttonText}>Enviar PIN</Text>
                  </Button>
  
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      )
    }
  
    const styles = StyleSheet.create(
       { input: {
           marginBottom: 15,
           marginTop: 15,
           backgroundColor: '#f5fcff',
           height: 60,
           width: 210,
           alignSelf: 'center',
           fontSize: 40,
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
            width: 150, 
            alignSelf: 'center', 
            marginTop: 30, 
            marginBottom:30,
            borderRadius: 10},
          description: {textAlign: 'center', fontSize: 13},
          buttonText: {textAlign: 'center', fontSize: 13},
          image:{height:  150, width: 150, borderRadius: 200, resizeMode: 'contain', paddingTop: 200, marginLeft: 84}}
    )