import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react'
import constants from '../others/constants'
import {getToGateway} from "../others/utils";
import UserChip from '../Components/UserChip';
import {Searchbar} from "react-native-paper";
import {containerStyle} from "../styles/genericStyles";

const UserListScreen = ({navigation}) => {

  const [usersList, setList] = useState([]);
  const [text, setText] = useState('')

  useEffect(() => {
    function getAllUsers() {

      getToGateway(constants.USERS_HOST + constants.APP_USERS_LIST_URL,
        "").then(res => {
        if (res.error !== undefined) {
          alert(res.error);
        } else {
          setList(res.users);
        }
      });
    }

    getAllUsers();
  }, []);


  const filterUsers = text => {
    text = text.toLowerCase();
    return u => u.name.toLowerCase().includes(text) || u.surname.toLowerCase().includes(text);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Searchbar onChangeText={setText}
                   placeholder={"Buscar usuarios"}
                   inputStyle={{}}
                   containerStyle={{}}
                   inputContainerStyle={{}}
        />
          <View>
            <View style={{marginBottom: 10}}/>
              {
                <FlatList
                  data={usersList.filter(filterUsers(text))}
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
      backgroundColor: 'steelblue',
      paddingTop: 5
    }
  }
)

export default UserListScreen;