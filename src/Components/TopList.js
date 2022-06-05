import {Button, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import GenreChip from "./GenreChip";
import React from 'react'

const TopList = props => {

  return (
    <View style={{backgroundColor: '#f5fcff', flex:1, flexGrow: 1}}>
      <Text style={styles.title}>{props.title}</Text>
      {
        props.genreList &&
        (
          props.data.slice(0, props.max).map((genre, id) => {
            return (<GenreChip id={id} key={id} genre={genre} navigation={props.navigation}/>)
          }))
      }
      <Button
        mode='text'
        style={styles.button}
        onPress={() => {
          props.navigation.navigate(props.open)
        }}>
        <Text style={{color: 'steelblue'}}>Ver mas</Text>
      </Button>
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
    button: {
      alignSelf: 'center',
      fontSize: 15,
      flex: 1
    },
  }
)

export default TopList;