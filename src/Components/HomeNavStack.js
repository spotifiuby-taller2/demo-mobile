import { 
    StyleSheet
  } from 'react-native';
import React, {useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from '../HomeScreens/HomeScreen';
import ProfileScreen from '../HomeScreens/ProfileScreen';
import 'react-native-gesture-handler'
import {useAuthUser} from '../context/AuthContext'
import Menu from './Menu';
import ContentScreen from "../HomeScreens/ContentScreen";
import ArtistsListTab from "../Components/ArtistsListTab";
import { getToGateway } from '../others/utils';
import constants from '../others/constants'
import {SongScreen} from "../HomeScreens/SongScreen";

const HomeStack = createNativeStackNavigator();

export default HomeNavStack = () =>{

    const {userState, setUserType} = useAuthUser();


    useEffect(()=>{

      if ( userState.userType !== null )
        return;

        function getUserType(){

          return getToGateway(constants.USERS_HOST + constants.PROFILE_USER_TYPE_URL
                        + "?"
                        + constants.USER_ID_QUERY_PARAM
                        + userState.uid);
        }
        getUserType()
          .then(res => setUserType(res.status));

        
    },[])
    
    /*Todas las pantallas de la Home van aca*/
    return(
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name='Menu' component={Menu} />
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
            <HomeStack.Screen name='ProfileScreen' component={ProfileScreen} initialParams={{uid: userState.uid}}/>
            <HomeStack.Screen name='ArtistsListTab' component={ArtistsListTab} />
            <HomeStack.Screen name='ContentScreen' component={ContentScreen} />
            <HomeStack.Screen name='SongScreen' component={SongScreen} />
        </HomeStack.Navigator>
    )
}
