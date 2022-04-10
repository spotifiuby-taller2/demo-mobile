import { 
    StyleSheet, 
    View, 
    Image,
    SafeAreaView,
    ScrollView
  } from 'react-native';
  
import React, {useState} from 'react'
import imageSpotifiuby from '../../assets/SpotifiubyIcon.png'
import { Button, Text, Title } from 'react-native-paper'
import { useRoute } from '@react-navigation/native';
import MusicalPreferenceCheckbox from '../Components/MusicalPreferenceCheckbox';
import { useAuthUser } from '../context/AuthContext';


  
  
  export default RequestMusicalPreferencesScreen = ({navigation}) =>{

      const route = useRoute();
      const {signIn} = useAuthUser();


      let handleSend = () =>{
        
        if ( route.params.body.signin === "email-password" ){
            
            navigation.navigate('SignInScreen',{
              email: route.params.email,
              password: route.params.password
            })
          }else{
            signIn(route.params.id);
          }
      }

  
      return(
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                  <Image source={imageSpotifiuby} style={styles.image}></Image>
                  <Title style={styles.title}>Ingrese sus Intereses Musicales</Title>
                  <Text style={styles.description}>Solicitamos que nos envie sus intereses musicales para poder conocer un poco mas de usted</Text>
                  
                  <View style={{flexDirection:'row'}}>
                        <View style={styles.row} >
                          <MusicalPreferenceCheckbox name='Metal'  />
                          <MusicalPreferenceCheckbox name='Rap' />
                          <MusicalPreferenceCheckbox name='Pop' />
                        </View>
                        <View style={styles.row}>
                          <MusicalPreferenceCheckbox name='Jazz' />
                          <MusicalPreferenceCheckbox name='Reggeaton' />
                          <MusicalPreferenceCheckbox name='Rock' />
                        </View>
                        <View style={styles.row}>
                          <MusicalPreferenceCheckbox name='Electronica'/>
                          <MusicalPreferenceCheckbox name='Indie' />
                          <MusicalPreferenceCheckbox name='Clasica' />
                        </View>
                        <View style={styles.row}>
                          
                          <MusicalPreferenceCheckbox name='Blues' />
                          <MusicalPreferenceCheckbox name='Punk' />
                          <MusicalPreferenceCheckbox name='Salsa'/>
                        </View>
                  </View>
            
                  

                  <Button 
                    mode='contained' 
                    style={styles.button}
                    onPress={handleSend}>
                      <Text style={styles.buttonText}>Enviar</Text>
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
          image:{height:  150, width: 150, borderRadius: 200, resizeMode: 'contain', paddingTop: 200, marginLeft: 84},
          row: { marginBottom: 30, alignSelf: 'center', flexDirection:'column',marginRight:30}}
    )