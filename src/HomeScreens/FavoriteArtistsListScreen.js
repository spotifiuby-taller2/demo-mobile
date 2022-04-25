import {
    View,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react'
import constants from '../others/constants'
import {getToGateway} from "../others/utils";
import UserChip from '../Components/UserChip';
import {containerStyle} from "../styles/genericStyles";
import { useAuthUser } from '../context/AuthContext';

export default FavoriteArtistListScreen = ({navigation}) =>{

    const [usersList, setList] = useState([]);
    const {userState} = useAuthUser();

    useEffect(()=>{
        function getAllUsers(){

            getToGateway(constants.USERS_HOST + constants.APP_FAV_ARTIST_LIST_URL
                + "?" + constants.USER_ID_QUERY_PARAM + userState.uid,
                "").then(res => {
                if (res.error !== undefined) {
                    alert(res.error);
                } else {
                    setList(res.users);
                }
            });
        }

        navigation.addListener('focus',
            ()=>{
                getAllUsers();
            });

    },[navigation]);

    return(
        <View style={containerStyle}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {
                            usersList.map( (user, id)=>{
                                return (
                                    <UserChip id={id} key={id} user={user} navigation={navigation}/>
                                )})
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
