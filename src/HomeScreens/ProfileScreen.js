import { 
    StyleSheet, 
    View,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Text, Chip, Button } from 'react-native-paper'
import { useRoute } from '@react-navigation/native';
import constants from '../others/constants'
import {getToGateway} from "../others/utils";
import ProfilePicture from '../Components/ProfilePicture';
import FollowArtistButton from '../Components/FollowArtistButton';
import { useAuthUser } from '../context/AuthContext';


  export default ProfileScreen = ({navigation}) =>{



      const route = useRoute();
      const {userState} = useAuthUser();
      const [renderButton, setRenderButton] =useState(false);
      
      const initialState = {
        id:'',
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        isListener: false,
        isArtist: false,
        latitude: '',
        longitude: '',
        metal: false,
        rock: false,
        salsa: false,
        indie: false,
        electronic: false,
        classic: false,
        pop: false,
        punk: false,
        jazz: false,
        blues: false,
        others: false,
        reggeaton: false,
        rap: false,
        photoUrl: '',
        pushNotificationToken: ''
      }

      const [profile, setProfile] = useState(initialState);

        useEffect(()=>{
          function getProfile(userId) {
            getToGateway(constants.USERS_HOST + constants.PROFILE_URL
                                              + "?"
                                              + constants.USER_ID_QUERY_PARAM
                                              + userId)
          .then(res =>{
              if (res.error !== undefined) {
                  alert(res.error);
              } else {
                  const newState = {
                      id: res.id,
                      name: res.name,
                      surname: res.surname,
                      email: res.email,
                      phoneNumber: res.phoneNumber,
                      isListener: res.isListener,
                      isArtist: res.isArtist,
                      metal: res.metal,
                      rock: res.rock,
                      salsa: res.salsa,
                      indie: res.indie,
                      electronic: res.electronic,
                      classic: res.classic,
                      pop: res.pop,
                      punk: res.punk,
                      jazz: res.jazz,
                      blues: res.blues,
                      others: res.other,
                      reggeaton: res.reggeaton,
                      rap: res.rap,
                      photoUrl: res.photoUrl,
                      pushNotificationToken: res.pushNotificationToken

                  };
                  setProfile(newState);
                  setRenderButton(true);
              }
          })
          }

          navigation.addListener('focus',
            ()=>{
              getProfile(route.params.uid);
            });
          
          

        },[navigation]);

        return(
          <View style={styles.container}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <ProfilePicture
                  uid={profile.id}
                  name={profile.name} 
                  surname={profile.surname}
                  style={styles.avatar}
                  pictureSize={175}
                  />
                <Text style={styles.name}>{profile.name} {profile.surname}</Text>
                <Text style={styles.usertype}>{(profile.isArtist)? 'Artista': 'Oyente'}</Text>
                <Text style={styles.email}>{profile.email}</Text>
                <Text style={styles.phone}>{profile.phoneNumber}</Text>

                {profile.isListener && 
                      (
                      <>
                      <Text style={styles.text}>Intereses Musicales</Text>
                      <View style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap: 'wrap'}}>
                        {profile.metal && (<Chip style={styles.chip}><Text>Metal</Text></Chip>)}
                        {profile.rock && (<Chip style={styles.chip}><Text>Rock</Text></Chip>)}
                        {profile.salsa && (<Chip style={styles.chip}><Text>Salsa</Text></Chip>)}
                        {profile.blues && (<Chip style={styles.chip}><Text>Blues</Text></Chip>)}
                        {profile.reggeaton && (<Chip style={styles.chip}><Text>Reggeaton</Text></Chip>)}
                        {profile.jazz && (<Chip style={styles.chip}><Text>Jazz</Text></Chip>)}
                        {profile.punk && (<Chip style={styles.chip}><Text>Punk</Text></Chip>)}
                        {profile.rap && (<Chip style={styles.chip}><Text>Rap</Text></Chip>)}
                        {profile.pop && (<Chip style={styles.chip}><Text>Pop</Text></Chip>)}
                        {profile.indie && (<Chip style={styles.chip}><Text>Indie</Text></Chip>)}
                        {profile.classic && (<Chip style={styles.chip}><Text>Clásica</Text></Chip>)}
                        {profile.electronic && (<Chip style={styles.chip}><Text>Electronica</Text></Chip>)}
                        {profile.others && (<Chip style={styles.chip}><Text>Otros</Text></Chip>)}
                      </View>
                      </>)
                }
                {
                  renderButton && (
                      <FollowArtistButton
                          openAsListener={(userState.userType === constants.LISTENER) 
                                  && (profile.isArtist) }
                          idListener={userState.uid}
                          idArtist={profile.id}/>
                  )
                }

                { 
                  (userState.uid === profile.id) &&

                  (<Button 
                      mode='contained'
                      color='#fdfcff'
                      style={{width: 177, alignSelf: 'center', marginTop: 30, marginBottom: 15}}
                      onPress={()=>{navigation.navigate('EditProfileScreen', {profile: profile})}}>
                      <Text>Editar Tu Perfil</Text>
                  </Button>)
                }

                {
                  (userState.uid === profile.id && userState.userType === constants.ARTIST) &&

                  (<Button
                      mode='contained'
                      color='#fdfcff'
                      style={{width: 177, alignSelf: 'center', marginTop: 15, marginBottom: 30}}
                      onPress={()=>{navigation.navigate('ContentScreen')}}>
                      <Text>Crear Contenido</Text>
                  </Button>)
                }
                { 
                  (userState.uid !== profile.id) &&

                  (<Button 
                      mode='contained'
                      color='#fdfcff'
                      style={{width: 210, alignSelf: 'center', marginTop: 30, marginBottom: 30}} 
                      onPress={()=>{navigation.navigate('ChatScreen', 
                        {
                          idEmissor: userState.uid,
                          idReceptor: profile.id,
                          nameReceptor:  profile.name,
                          surnameReceptor: profile.surname,
                          nameEmissor: userState.name,
                          surnameEmissor: userState.surname,
                          pushNotificationToken: profile.pushNotificationToken
                        })
                        }}>
                      <Text>Abrir Chat Privado</Text>
                  </Button>)
                
                }
                

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
      marginBottom: 10,
      color: 'darkblue'
    },
    phone: {
      alignSelf: 'center',
      fontSize: 17,
      marginBottom: 10,
      color: 'darkblue'
    },
    usertype:{
      alignSelf: 'center',
      color: 'purple',
      fontSize: 23,
      marginBottom: 15
    },
    chip:{
      backgroundColor: 'lightblue',
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