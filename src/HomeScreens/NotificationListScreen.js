import {
    View,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
import { Button, Text } from 'react-native-paper';
import React, {useEffect, useState} from 'react'
import constants from '../others/constants'
import {getToGateway, postToGateway} from "../others/utils";
import {useAuthUser} from '../context/AuthContext';


export default NotificationListScreen = ({navigation}) =>{

    const [notificationsList, setList] = useState([]);
    const {userState} = useAuthUser();

    useEffect(()=>{
        
        function getNotifications(){

            getToGateway(constants.USERS_HOST + constants.NOTIFICATION_LIST_URL
                + "?" + constants.EMISSOR_PARAM + userState.uid,
                "").then(res => {
                if (res.error !== undefined) {
                    alert(res.error);
                } else {
                    setList(res.notifications);
                }
            });
        }

        navigation.addListener('focus',
            ()=>{
                getNotifications();
            });
        
        },[navigation]);

    const openChat = (notification)=>{

        const body = {
            redirectTo: constants.USERS_HOST + constants.NOTIFICATION_LIST_URL
                + "?" + constants.EMISSOR_PARAM + notification.idEmissor + "&"
                + constants.RECEIVER_PARAM + notification.idReceptor
        }
        postToGateway(body, 'DELETE')
            .then(res => {
                if ( res.error === undefined ){
                    navigation.navigate('ChatScreen', notification);
                }
            })
    }

    return(
        <View>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {
                            notificationsList.map( (notification, id)=>{
                                return (
                                    <Button
                                        id={id}
                                        key={id}
                                        mode='contained'
                                        onPress={()=>{openChat(notification)}}
                                        style={{width: 330, height: 60,borderRadius: 15, alignContent: 'center', backgroundColor: 'lightblue', margin: 10}}>
                                            <Text>{notification.nameReceptor} {notification.surnameReceptor} te ha enviado un mensaje.</Text>
                                    </Button>
                                )})
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}