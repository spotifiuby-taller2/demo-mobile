import {ScrollView, View} from "react-native";
import {Avatar, Chip, Text} from "react-native-paper";
import React from "react";

import {
    nameStyle,
    chipStyle,
    avatarStyle
} from "../styles/listStyles";

ListComponent = (usersList) => {
    return <View>
        {
            usersList.map( (user, id)=>{
                return (
                    <Chip id={id} key={user.id} style={chipStyle} onPress={ ()=> {
                        navigation.navigate('ProfileScreen',
                                            {uid: user.id})
                        }
                    }>
                        <View style={{flexDirection:'row'}}>
                            <Avatar.Text
                                style={avatarStyle}
                                label={`${user.name.charAt(0)}${user.surname.charAt(0)}`}
                            />
                            <View >
                                <Text style={nameStyle}>{user.name} {user.surname}</Text>
                            </View>
                        </View>
                    </Chip>
                )})
        }
    </View>
}
