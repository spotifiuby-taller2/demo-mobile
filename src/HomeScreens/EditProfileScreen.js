import { 
    StyleSheet, 
    View,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
import React, { useReducer, useState } from 'react'
import { Text, Chip, Button } from 'react-native-paper'
import { useRoute } from '@react-navigation/native';
import constants from '../others/constants'
import {postToGateway} from "../others/utils";
import ProfilePicture from '../Components/ProfilePicture';
import EditProfileTextInput from '../Components/EditProfileTextInput';


const reducer = (state, action = {})=>{

    switch(action.type){
        case 'name':
        return{
            ...state,
            name: action.value,
        };
        case 'surname':
        return{
            ...state,
            surname: action.value,
        }
  
        case 'phoneNumber':
        return{
          ...state,
          phoneNumber: action.value
        }

        case 'metal':
        return{
          ...state,
          metal: (! state.metal)
        }
        case 'rock':
        return{
          ...state,
          rock: (! state.rock)
        }
        case 'salsa':
        return{
          ...state,
          salsa: (! state.salsa)
        }
        case 'pop':
        return{
          ...state,
          pop: (! state.pop)
        }
        case 'punk':
        return{
          ...state,
          punk: (! state.punk)
        }
        case 'blues':
        return{
          ...state,
          blues: (! state.blues)
        }
        case 'jazz':
        return{
          ...state,
          jazz: (! state.jazz)
        }
        case 'rap':
        return{
          ...state,
          rap: (! state.rap)
        }
        case 'indie':
        return{
          ...state,
          indie: (! state.indie)
        }
        case 'classic':
        return{
          ...state,
          classic: (! state.classic)
        }
        case 'reggeaton':
        return{
          ...state,
          reggeaton: (! state.reggeaton)
        }
        case 'electronic':
        return{
          ...state,
          electronic: (! state.electronic)
        }
        case 'others':
        return{
          ...state,
          others: (! state.others)
        }
    }
    return state;
  };


  export default EditProfileScreen = ({navigation}) =>{


      const route = useRoute();
      const [profile, dispatch] = useReducer(reducer ,route.params.profile);

      let saveProfile = ()=>{
        requestBody={
          redirectTo: constants.USERS_HOST + constants.EDIT_PROFILE_URL
        };

        if ( route.params.profile.name !== profile.name ){
          requestBody['name'] = profile.name;
        }

        if ( route.params.profile.surname !== profile.surname ){
          requestBody['surname'] = profile.surname;
        }

        if ( route.params.profile.phoneNumber !== profile.phoneNumber ){
          requestBody['phoneNumber'] = profile.phoneNumber;
        }

        if ( route.params.metal !== profile.metal ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.rock !== profile.rock ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.pop !== profile.pop ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.punk !== profile.punk ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.blues !== profile.blues ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.salsa !== profile.salsa ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.jazz !== profile.jazz ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.classic !== profile.classic ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.electronic !== profile.electronic ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.reggeaton !== profile.reggeaton ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.indie !== profile.indie ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.rap !== profile.rap ){
          requestBody['updateMusicalPref'] = true;
        }
        if ( route.params.others !== profile.others ){
          requestBody['updateMusicalPref'] = true;
        }
        
        requestBody['metal'] = profile.metal;
        requestBody['rock'] = profile.rock;
        requestBody['jazz'] = profile.jazz;
        requestBody['pop'] = profile.pop;
        requestBody['punk'] = profile.punk;
        requestBody['salsa'] = profile.salsa;
        requestBody['rap'] = profile.rap;
        requestBody['indie'] = profile.indie;
        requestBody['electronic'] = profile.electronic;
        requestBody['blues'] = profile.blues;
        requestBody['classic'] = profile.classic;
        requestBody['reggeaton'] = profile.reggeaton;
        requestBody['others'] = profile.others;


        postToGateway(requestBody,'PATCH')
          .then(res => {
            if( res.error === undefined ){
              alert(res.status);
              navigation.goBack();
            }
          })

      }

      

        return(
          <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <ProfilePicture
                  uid={route.params.uid}
                  name={profile.name} 
                  surname={profile.surname}
                  style={styles.avatar}
                  />

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <EditProfileTextInput 
                        label='Nombre'
                        name='name'
                        input={profile.name}
                        execute={dispatch}/>
                    
                    <EditProfileTextInput 
                        label='Apellido'
                        name='surname'
                        input={profile.surname}
                        execute={dispatch}/>

                </View>
                
                <Text style={styles.usertype}>{(profile.isArtist)? 'Artista': 'Oyente'}</Text>
                <Text style={styles.email}>{profile.email}</Text>
                <EditProfileTextInput 
                    label='Telefono'
                    name='phoneNumber'
                    input={profile.phoneNumber}
                    execute={dispatch}/>

                {profile.isListener && 
                      (
                      <>
                      <Text style={styles.text}>Intereses Musicales</Text>
                      <View style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap: 'wrap'}}>
                        <Chip 
                            style={profile.metal? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'metal'})} }
                            >
                                <Text>Metal</Text>
                        </Chip>
                        <Chip 
                            style={profile.rock? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'rock'})} }
                            >
                                <Text>Rock</Text>
                        </Chip>
                        <Chip 
                            style={profile.salsa? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'salsa'})} }
                            >
                                <Text>Salsa</Text>
                        </Chip>
                        <Chip 
                            style={profile.blues? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'blues'})} }
                            >
                                <Text>Blues</Text>
                        </Chip>
                        <Chip 
                            style={profile.reggeaton? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'reggeaton'})} }
                            >
                                <Text>Reggeaton</Text>
                        </Chip>
                        <Chip 
                            style={profile.jazz? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'jazz'})} }
                            >
                                <Text>Jazz</Text>
                        </Chip>
                        <Chip 
                            style={profile.punk? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'punk'})} }
                            >
                                <Text>Punk</Text>
                        </Chip>
                        <Chip 
                            style={profile.rap? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'rap'})} }
                            >
                                <Text>Rap</Text>
                        </Chip>
                        <Chip 
                            style={profile.pop? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'pop'})} }
                            >
                                <Text>Pop</Text>
                        </Chip>
                        <Chip 
                            style={profile.indie? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'indie'})} }
                            >
                                <Text>Indie</Text>
                        </Chip>
                        <Chip 
                            style={profile.classic? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'classic'})} }
                            >
                                <Text>Clásica</Text>
                        </Chip>
                        <Chip 
                            style={profile.electronic? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'electronic'})} }
                            >
                                <Text>Electronica</Text>
                        </Chip>
                        <Chip 
                            style={profile.others? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'others'})} }
                            >
                                <Text>Otros</Text>
                        </Chip>
                      </View>
                      </>)
                }
                
                <View>
                  <Button
                    color='#fdfcff'
                    style={{width: 160, alignItems: 'center'}}
                    onPress={saveProfile}>
                    <Text>
                        Guardar Cambios
                    </Text>
                  </Button>
                </View>
                

              </View>
              </ScrollView>
          </SafeAreaView>
        </View>
        )
      }
  
const styles =StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#f5fcff'},
    avatar: {
      marginTop: 30,
      alignSelf: 'center',
      marginBottom: 50
    },
    name: {
      alignSelf: 'center',
      fontSize: 29,
      marginBottom: 5,
      color: 'darkblue'
    },
    email: {
      alignSelf: 'center',
      fontSize: 17,
      marginBottom: 10
    },
    phone: {
      alignSelf: 'center',
      fontSize: 17,
      marginBottom: 10
    },
    usertype:{
      alignSelf: 'center',
      color: 'purple',
      fontSize: 23,
      marginBottom: 15
    },
    chipSelected:{
      backgroundColor: 'lightblue',
      width: 95,
      marginRight: 8,
      marginStart: 10,
      marginEnd: 10,
      marginBottom: 10,
      marginTop: 0,
    },
    chipUnselected:{
        backgroundColor: '#adb8e6',
        width: 95,
        marginRight: 8,
        marginStart: 10,
        marginEnd: 10,
        marginBottom: 10,
        marginTop: 0,
      },
    mucialPref: {
      alignSelf: 'center'
    },
    text: {
      alignSelf: 'center',
      fontSize: 18,
      marginBottom: 13,
      marginTop: 26,
      color:'steelblue'
    }
  }
)