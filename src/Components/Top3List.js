import {StyleSheet, View, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react'
import {Button, Text} from 'react-native-paper';
import { getToGateway } from '../others/utils';
import constants from '../others/constants'
import UserChip from './UserChip';
import SongList from './SongList';
import { useFocusEffect } from '@react-navigation/native';


/*user must be {name: '', surname: '', email:''}*/

const Top3List = props => {

    const [list, setList] = useState([]);
    const [render, setRender] = useState(false);


    useFocusEffect(
        useCallback(()=>{

        getToGateway(props.endpoint 
                + constants.LIMIT_3_PARAM)
            .then(res => 
                {
                    if (res.error !== undefined) {
                        alert(res.error);
                    } else {
                        setRender(true);
                        if ( props.userList )
                            setList(res.list)

                        else if (props.songList){
                            setList(res)
                        } 
                    }
                })

        

    }),[]);

    if ( ! render ){
        return(
            <View>

            </View>
        )
    }
    return (
        <View>
            {
                list.length !== 0 && (
                    <>
                        <Text style={styles.title}>{props.title}</Text>
                        {
                            props.userList && (
                                list.map((user, id)=>{
                                    return(<UserChip id={id} key={id} user={user} navigation={props.navigation}/>)
                                }))
                        }
                        {
                            props.songList && (
                                <SongList songList={list} navigation={props.navigation}/>
                            )
                        }
                        <Button
                            mode='text'
                            style={styles.button}
                            onPress={()=>{props.navigation.navigate(props.open)}}>
                                <Text style={{color: 'steelblue'}}>Ver mas</Text>
                        </Button>
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create(
  {
    title: {
        alignSelf: 'center',
        fontSize: 18,
        marginBottom: 13,
        marginTop: 26,
        color: 'steelblue'
    },
    button:{
        alignSelf: 'center',
        fontSize: 15,
        
    },
  }
)
export default Top3List;