import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react'
import constants from '../others/constants'
import {getToGateway} from "../others/utils";
import UserChip from '../Components/UserChip';
import {Searchbar} from "react-native-paper";
import {containerStyle} from "../styles/genericStyles";
import LoaderScreen from '../Components/LoaderScreen';

const UserListScreen = ({navigation}) => {

  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    function getAllUsers() {

      getToGateway(constants.USERS_HOST + constants.APP_USERS_LIST_URL, "")
        .then(res => {
          if (res.error !== undefined) {
            alert(res.error);
          } else {
            setList(res.list);
            setLoading(false);
          }
        });
    }

    return navigation.addListener('focus',
      () => {
        getAllUsers();
      });
    }, []);


  const filterUsers = text => {
    text = text.toLowerCase();
    return u => u.name.toLowerCase().includes(text) || u.surname.toLowerCase().includes(text);
  }

  if (loading) {
    return <LoaderScreen/>;
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
              data={list.filter(filterUsers(text))}
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

export default UserListScreen;