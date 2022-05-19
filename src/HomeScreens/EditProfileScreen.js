import { 
    StyleSheet, 
    View,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
import React, { useReducer } from 'react'
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

        case 'email':
        return{
          ...state,
          email: action.value
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


const EditProfileScreen = ({navigation}) =>{


      const route = useRoute();
      const [profile, dispatch] = useReducer(reducer ,route.params.profile);

      let saveProfile = ()=>{
        
        let requestBody={
          redirectTo: constants.USERS_HOST + constants.EDIT_PROFILE_URL
             + "?" + constants.USER_ID_QUERY_PARAM + profile.id
        };

        if ( route.params.profile.name !== profile.name ){
          requestBody['name'] = profile.name;
        }

        if ( route.params.profile.surname !== profile.surname ){
          requestBody['surname'] = profile.surname;
        }

        if ( route.params.metal !== profile.metal ){
          requestBody['metal'] = profile.metal;
        }
        if ( route.params.rock !== profile.rock ){
          requestBody['rock'] = profile.metal;
        }
        if ( route.params.pop !== profile.pop ){
          requestBody['pop'] = profile.pop;
        }
        if ( route.params.punk !== profile.punk ){
          requestBody['punk'] = profile.punk;
        }
        if ( route.params.blues !== profile.blues ){
          requestBody['blues'] = profile.blues;
        }
        if ( route.params.salsa !== profile.salsa ){
          requestBody['salsa'] = profile.salsa;
        }
        if ( route.params.jazz !== profile.jazz ){
          requestBody['jazz'] = profile.jazz;
        }
        if ( route.params.classic !== profile.classic ){
          requestBody['classic'] = profile.classic;
        }
        if ( route.params.electronic !== profile.electronic ){
          requestBody['electronic'] = profile.electronic;
        }
        if ( route.params.reggeaton !== profile.reggeaton ){
          requestBody['reggeaton'] = profile.reggeaton;
        }
        if ( route.params.indie !== profile.indie ){
          requestBody['indie'] = profile.indie;
        }
        if ( route.params.rap !== profile.rap ){
          requestBody['rap'] = profile.rap;
        }
        if ( route.params.others !== profile.others ){
          requestBody['other'] = profile.others;
        }
        

        postToGateway(requestBody,'PATCH')
          .then(res => {
            if( res.error === undefined ){
              alert(res.status);
              navigation.goBack();
            }
          })
      }

        return(
          <View style={profile.isArtist? styles.containerArtist : styles.containerListener}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <ProfilePicture
                  uid={profile.id}
                  name={profile.name} 
                  surname={profile.surname}
                  style={styles.avatar}
                  photoUrl={profile.photoUrl}
                  pictureSize={175}
                  disabled={false}
                  />

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <EditProfileTextInput 
                        label='Nombre'
                        name='name'
                        input={profile.name}
                        execute={dispatch}
                        styles={styles.name}/>
                    
                    <EditProfileTextInput 
                        label='Apellido'
                        name='surname'
                        input={profile.surname}
                        execute={dispatch}
                        styles={styles.name}/>

                </View>

                {profile.isListener && 
                      (
                      <>
                      <Text style={styles.text}>Intereses Musicales</Text>
                      <View style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap: 'wrap'}}>
                        <Chip 
                            style={profile.metal? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'metal'})} }
                            >
                                <Text>     Metal</Text>
                        </Chip>
                        <Chip 
                            style={profile.rock? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'rock'})} }
                            >
                                <Text>      Rock</Text>
                        </Chip>
                        <Chip 
                            style={profile.salsa? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'salsa'})} }
                            >
                                <Text>      Salsa</Text>
                        </Chip>
                        <Chip 
                            style={profile.blues? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'blues'})} }
                            >
                                <Text>     Blues</Text>
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
                                <Text>      Jazz</Text>
                        </Chip>
                        <Chip 
                            style={profile.punk? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'punk'})} }
                            >
                                <Text>      Punk</Text>
                        </Chip>
                        <Chip 
                            style={profile.rap? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'rap'})} }
                            >
                                <Text>      Rap</Text>
                        </Chip>
                        <Chip 
                            style={profile.pop? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'pop'})} }
                            >
                                <Text>      Pop</Text>
                        </Chip>
                        <Chip 
                            style={profile.indie? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'indie'})} }
                            >
                                <Text>     Indie</Text>
                        </Chip>
                        <Chip 
                            style={profile.classic? styles.chipSelected: styles.chipUnselected}
                            onPress={()=>{dispatch({type: 'classic'})} }
                            >
                                <Text>    Clásica</Text>
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
                                <Text>     Otros</Text>
                        </Chip>
                      </View>
                      </>)
                }
                
                <View>
                  <Button
                    mode='contained'
                    color='skyblue'
                    style={{width: 120, alignSelf: 'center', margin: 30}}
                    onPress={saveProfile}>
                    <Text>Guardar</Text>
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
    containerArtist: {
      flex: 1,
      backgroundColor: '#B0E0E6' 
    },
    containerListener: {
        flex: 1,
        backgroundColor: '#f5fcff'},
    avatar: {
      marginTop: 30,
      alignSelf: 'center',
      marginBottom: 50
    },
    name: {
      width: 144, 
      fontSize: 17, 
      height: 80, 
      alignSelf: 'center', 
      backgroundColor: '#f5fcff', 
      marginBottom: 10,
      marginRight: 7, 
      marginLeft: 7},

      email: {
        alignSelf: 'center',
        fontSize: 17,
        marginBottom: 10,
        color: 'darkblue'
    },
    phone: {
      width: 144, 
      fontSize: 17, 
      height: 50, 
      alignSelf: 'center', 
      backgroundColor: '#f5fcff', 
      marginBottom: 10,
      marginRight: 7, 
      marginLeft: 7},

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

export default EditProfileScreen;