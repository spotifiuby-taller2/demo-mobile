import {SafeAreaView, ScrollView, StyleSheet, View,} from 'react-native';
import React, {useEffect, useState} from 'react'
import constants from '../others/constants'
import {getToGateway} from "../others/utils";
import UserChip from '../Components/UserChip';
import {containerStyle} from "../styles/genericStyles";
import {useAuthUser} from '../context/AuthContext';
import {Searchbar} from "react-native-paper";

export default FavoriteArtistListScreen = ({navigation}) => {

  const [usersList, setList] = useState([]);
  const [text, setText] = useState('')
  const {userState} = useAuthUser();

  useEffect(() => {
    function getAllUsers() {

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
      () => {
        getAllUsers();
      });

  }, [navigation]);

  const filterArtists = text => {
    text = text.toLowerCase();
    console.log(text)
    return a => a.name.toLowerCase().includes(text) || a.surname.toLowerCase().includes(text);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Searchbar onChangeText={setText}
                   placeholder={"Buscar artistas favoritos"}
                   inputStyle={{}}
                   containerStyle={{}}
                   inputContainerStyle={{}}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={{marginBottom: 10}}/>
            <ScrollView showsVerticalScrollIndicator={true}>
              {
                usersList
                  .filter(filterArtists(text))
                  .map((user, id) => {
                    return (
                      <UserChip id={id} key={id} user={user} navigation={navigation}/>
                    )
                  })
              }
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      ...containerStyle,
      backgroundColor: 'steelblue',
      paddingTop: 5
    }
  }
)
