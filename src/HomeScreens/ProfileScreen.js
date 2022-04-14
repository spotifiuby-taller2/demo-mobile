import { 
    StyleSheet, 
    View,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
import React, { useEffect } from 'react'
import { Title, Text,Button } from 'react-native-paper'
    
  export default ProfileScreen = ({uid}) =>{

      /*
        const initialState = {
          name: '',
          surname: '',
          email: '',
          phoneNumber: '',
          isListener: false,
          isArtist: false,
          location: '',
        }


        useEffect(()=>{

          fetch()
          .then
        })*/


        return(
          <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                  <Title style={styles.title}>Perfil</Title>
              </View>
              </ScrollView>
          </SafeAreaView>
        </View>
        )
      }
  
  
      const styles = StyleSheet.create(
        { input: {
            borderWidth: 2, 
            marginBottom: 15,
            marginTop: 15,
            backgroundColor: '#f5fcff',
            height: 50
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
             width: 100, 
             alignSelf: 'center', 
             marginTop: 30, 
             marginBottom:30,
             borderRadius: 10},
           buttonText: {textAlign: 'center', fontSize: 13},
           forgotPasswordButton: {textAlign: 'center', fontSize: 13, color: 'skyblue'},
           image:{
             height: 70,
             width: 70,
             alignSelf: 'center',
             marginTop: 50,
             marginBottom: 80
           }}
     )