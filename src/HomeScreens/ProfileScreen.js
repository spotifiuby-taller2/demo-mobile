import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react'
import {Button, Chip, Text, Avatar} from 'react-native-paper'
import {useRoute} from '@react-navigation/native';
import constants from '../others/constants'
import {getToGateway} from "../others/utils";
import ProfilePicture from '../Components/ProfilePicture';
import FollowArtistButton from '../Components/FollowArtistButton';
import {useAuthUser} from '../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoaderScreen from "./../Components/LoaderScreen";
import Top3List from './../Components/Top3List';
import subscription from "../data/Subscription";


const ProfileScreen = ({navigation}) => {

  const route = useRoute();
  const {userState} = useAuthUser();
  const [renderButton, setRenderButton] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const [nFollowers, setNFollowers] = useState(null);

  const initialState = {
    id: '',
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
    pushNotificationToken: '',
    isVerified: false,
    verificationVideoUrl: '',
    nFollowers: null,
    subscription: 'free'
  }

  const [profile, setProfile] = useState(initialState);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!nameChanged) {
      if (route.params?.usingList)
        navigation.setOptions({headerShown: true, headerTitle: 'Perfil'});
      if (isMounted)
        setNameChanged(true);
    }

    function getProfile(userId) {
      getToGateway(constants.USERS_HOST + constants.PROFILE_URL
        + "?"
        + constants.USER_ID_QUERY_PARAM
        + userId)
        .then(res => {
          if (res.error !== undefined) {
            alert(res.error);
          } else {
            const newState = {
              id: res.id,
              name: res.name,
              surname: res.surname,
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
              others: res.others,
              reggeaton: res.reggeaton,
              rap: res.rap,
              photoUrl: res.photoUrl,
              pushNotificationToken: res.pushNotificationToken,
              isVerified: res.isVerified,
              verificationVideoUrl: res.verificationVideoUrl,
              nFollowers: res.nFollowers,
              subscription: res.subscription
            };
            if (isMounted) {
              setProfile(newState);
              setNFollowers(res.nFollowers);
              setRenderButton(true);
              setInitialized(true);
            }
          }
        })
    }

    const unsubscribeFocus = navigation.addListener('focus',
      () => {
        if (isMounted) setRenderButton(false);
        getProfile(route.params.uid);
      });

    const unsubscribeBlur = navigation.addListener('blur',
      () => {
        if (isMounted) setInitialized(false);
      });

    return () => {
      isMounted = false;
      unsubscribeFocus();
      unsubscribeBlur();
    }
  }, [navigation]);


  const followArtist = () => {
    setNFollowers(nFollowers + 1);
  }

  const unFollowArtist = () => {
    setNFollowers(nFollowers - 1);
  }

  if (!initialized) {
    return <LoaderScreen/>;
  }

  return (
    <View style={profile.isArtist ? styles.containerArtist : styles.containerListener}>
      <SafeAreaView>
        <ScrollView>
          <View>

            {
              (userState.uid === profile.id) &&

              (
                <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Button
                      mode='text'
                      onPress={() => {
                        navigation.navigate('EditProfileScreen', {profile: profile})
                      }}>
                      <MaterialCommunityIcons
                        name='account-edit'
                        size={35}
                        color='#388AD6'/>
                    </Button>

                    {
                      (userState.uid === profile.id && profile.isArtist && !profile.isVerified &&
                        (profile.verificationVideoUrl === undefined || profile.verificationVideoUrl === null || profile.verificationVideoUrl.length === 0)) &&
                      (<Button
                        mode='text'
                        color='#fdfcff'
                        onPress={() => {
                          navigation.navigate('VerificationAccountScreen')
                        }}>
                        <MaterialCommunityIcons
                          name='account-check'
                          size={35}
                          color='#388AD6'/>
                      </Button>)
                    }
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Button
                      mode='text'
                      onPress={() => {
                        navigation.navigate('NotificationListScreen')
                      }}>
                      <MaterialCommunityIcons
                        name='bell'
                        size={32}
                        color='#388AD6'/>
                    </Button>
                  </View>
                </View>
              )
            }

            {
              (userState.uid !== profile.id) &&

              (
                <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                  <Button
                    mode='text'
                    color='#fdfcff'
                    style={{width: 80, alignSelf: 'center'}}
                    onPress={() => {
                      navigation.navigate('ChatScreen',
                        {
                          idEmissor: userState.uid,
                          idReceptor: profile.id,
                          nameReceptor: profile.name,
                          surnameReceptor: profile.surname,
                          nameEmissor: userState.name,
                          surnameEmissor: userState.surname,
                          pushNotificationToken: profile.pushNotificationToken,
                          photoUrl: profile.photoUrl
                        })
                    }}>
                    <MaterialCommunityIcons
                      name='chat'
                      size={45}
                      color='#388AD6'/>

                  </Button>
                </View>
              )
            }

            {
              renderButton && (
                <ProfilePicture
                  uid={profile.id}
                  name={profile.name}
                  surname={profile.surname}
                  pictureSize={175}
                  photoUrl={profile.photoUrl}
                  disabled={true}
                  defaultStyle={styles.defaultImage}
                  Imagestyle={styles.profilePicture}
                />
              )
            }

            <Text style={styles.name}>{profile.name} {profile.surname}</Text>

            {
              profile.isArtist && profile.isVerified && (
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Avatar.Icon icon="check-decagram" color={'green'} size={30}/>
                      <Text style={styles.usertype}>{'Artista verificado'}</Text>
                  </View>
              )
            }

            {
              (profile.isArtist && (
                <Text style={{
                  fontSize: 20,
                  alignSelf: 'center',
                  color: 'steelblue'
                }}>{nFollowers} Seguidores</Text>
              ))
            }

            {profile.isListener &&
              (
                <>
                  <Text style={{...styles.text, marginTop: 26}}>Suscripción: {subscription[profile.subscription].label}</Text>
                  <Text style={styles.text}>Intereses Musicales</Text>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
                    {profile.metal && (<Chip style={styles.chip}><Text> Metal</Text></Chip>)}
                    {profile.rock && (<Chip style={styles.chip}>Rock</Chip>)}
                    {profile.salsa && (<Chip style={styles.chip}><Text> Salsa</Text></Chip>)}
                    {profile.blues && (<Chip style={styles.chip}><Text> Blues</Text></Chip>)}
                    {profile.reggeaton && (<Chip style={styles.chip}><Text>Reggaeton</Text></Chip>)}
                    {profile.jazz && (<Chip style={styles.chip}><Text> Jazz</Text></Chip>)}
                    {profile.punk && (<Chip style={styles.chip}><Text> Punk</Text></Chip>)}
                    {profile.rap && (<Chip style={styles.chip}><Text> Rap</Text></Chip>)}
                    {profile.pop && (<Chip style={styles.chip}><Text> Pop</Text></Chip>)}
                    {profile.indie && (<Chip style={styles.chip}><Text> Indie</Text></Chip>)}
                    {profile.classic && (<Chip style={styles.chip}><Text> Clásica</Text></Chip>)}
                    {profile.electronic && (<Chip style={styles.chip}><Text>Electronica</Text></Chip>)}
                    {profile.others && (<Chip style={styles.chip}><Text> Otros</Text></Chip>)}
                  </View>
                </>
              )
            }
            {
              renderButton && profile.id !== userState.uid && (
                <FollowArtistButton
                  openAsListener={(userState.userType === constants.LISTENER)
                    && (profile.isArtist)}
                  idListener={userState.uid}
                  idArtist={profile.id}
                  follow={followArtist}
                  unFollow={unFollowArtist}/>
              )
            }

            {
              (userState.uid === profile.id && profile.isArtist) &&

              (
                <View>
                  <Button
                    mode='contained'
                    style={{
                      backgroundColor: 'skyblue',
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginTop: 15,
                      marginBottom: 30
                    }}
                    onPress={() => {
                      navigation.navigate('CreateContentScreen')
                    }}>
                    <MaterialCommunityIcons
                      name='plus'
                      size={50}
                      color='darkblue'
                      styles={{alignSelf: 'center'}}/>
                  </Button>

                </View>
              )
            }
            {
              profile.id === userState.uid && profile.isListener && renderButton &&
              (
                <Top3List
                  title='Artistas Favoritos'
                  endpoint={constants.USERS_HOST + constants.APP_FAV_ARTIST_LIST_URL + "?"
                    + constants.USER_ID_QUERY_PARAM + profile.id + "&"}
                  navigation={navigation}
                  open='FavoriteArtistsListScreen'
                  userList={true}/>
              )
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    containerArtist: {
      flex: 1,
      backgroundColor: '#B0E0E6'
    },
    containerListener: {
      flex: 1,
      backgroundColor: '#f5fcff'
    },
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
    usertype: {
      alignSelf: 'center',
      color: 'purple',
      fontSize: 23,
      marginBottom: 15
    },
    chip: {
      backgroundColor: 'lightblue',
      width: 95,
      marginRight: 8,
      marginStart: 10,
      marginEnd: 10,
      marginBottom: 10,
      marginTop: 0
    },
    mucialPref: {
      alignSelf: 'center'
    },
    text: {
      alignSelf: 'center',
      fontSize: 18,
      marginBottom: 13,
      color: 'steelblue'
    },
    icon: {
      backgroundColor: 'transparent',
      paddingTop: 5
    },
    defaultImage: {
      marginTop: 40,
      marginBottom: 50,
      alignSelf: 'center',
    },
    profilePicture: {
      marginTop: 40,
      marginBottom: 50,
      alignSelf: 'center',
    }
  }
)

export default ProfileScreen;
