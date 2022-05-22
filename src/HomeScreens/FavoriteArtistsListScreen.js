import {FlatList, SafeAreaView, StyleSheet, View,} from 'react-native';
import React, {useEffect, useState} from 'react'
import constants from '../others/constants'
import {getToGateway} from "../others/utils";
import UserChip from '../Components/UserChip';
import {containerStyle} from "../styles/genericStyles";
import {useAuthUser} from '../context/AuthContext';
import {Searchbar} from "react-native-paper";

const FavoriteArtistListScreen = ({navigation}) => {

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

    return navigation.addListener('focus',
      () => {
        getAllUsers();
      });

  }, [navigation]);

  const filterArtists = text => {
    text = text.toLowerCase();
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
        <View>
          <View style={{marginBottom: 10}}/>
          {
            <FlatList
              data={usersList.filter(filterArtists(text))}
              renderItem={({item, id}) => <UserChip id={id} key={id} user={item} navigation={navigation}/>}
            />
          }
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      ...containerStyle,
      backgroundColor: '#f5fcff',
      paddingTop: 5
    }
  }
)

export default FavoriteArtistListScreen;
