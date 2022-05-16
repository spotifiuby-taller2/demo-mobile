import {SafeAreaView, ScrollView, StyleSheet, View,} from 'react-native';
import React, {useEffect, useState} from 'react'
import constants from '../others/constants'
import {getToGateway} from "../others/utils";
import UserChip from '../Components/UserChip';
import {Searchbar} from "react-native-paper";
import {containerStyle} from "../styles/genericStyles";

export default UserListScreen = ({navigation}) => {

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={{marginBottom: 10}}/>
            <ScrollView showsVerticalScrollIndicator={true}>
              {
                usersList
                  .filter(filterUsers(text))
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
      backgroundColor: '#f5fcff',
      paddingTop: 5
    }
  }
)