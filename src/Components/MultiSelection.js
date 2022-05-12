import {ScrollView, View,} from 'react-native';
import {containerStyle, inputStyle} from '../styles/genericStyles';
import React, {useEffect, useState} from 'react'
import {Button, Chip, Divider, Searchbar, Text} from "react-native-paper";

const MultiSelection = props => {
  const [allElements, setAllElements] = useState([]);
  const [text, setText] = useState('')

  useEffect(() => {
    const fetchAllElements = async () => {
      await props.getAllElements()
        .then(elements => setAllElements(elements))
        .catch(e => {
          console.log(`Error fetching elements: ${JSON.stringify(e)}`);
          alert(`Error fetching elements: ${JSON.stringify(e)}`);
        });
    }
    fetchAllElements();
  }, []);

  const elementShouldBeDisplayed = (text) => {
    return e => props.elementFilter(text)(e) && !props.selectedElements.map(el => el.id).includes(e.id);
  }

  function renderSelectedChip(element, id) {
    return (
      <Chip key={id}
            onClose={props.elementCallback.remove ? () => props.elementCallback.remove(element) : undefined}
            style={{backgroundColor: 'palegreen'}}
      >
        {props.renderElement(element)}
      </Chip>
    )
  }

  function renderDisplayedChip(element, id) {
    return (
      <Chip key={id} onPress={() => {
        props.elementCallback.add(element);
      }}>
        {props.renderElement(element)}
      </Chip>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Searchbar onChangeText={setText}
                 placeholder={props.placeholder}
                 inputStyle={{}}
                 containerStyle={{}}
                 inputContainerStyle={{}}
      />

      {/* Scrollview height cannot be adapted directly */}
      <View style={{'max-height': 125, marginTop: 10, marginBottom: 5}}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {allElements.filter(elementShouldBeDisplayed(text)).slice(0,5).map(renderDisplayedChip)}
        </ScrollView>
      </View>
      {props.selectedElements.length > 0 && (<Divider style={{margin: 10}}/>)}
      <ScrollView showsVerticalScrollIndicator={true}
                  useReference={props.selectedElements}>
        {props.selectedElements.map(renderSelectedChip)}
      </ScrollView>
      {props.selectedElements.length > 0 && (<Button onPress={props.elementCallback.clear}>Limpiar</Button>)}
    </ScrollView>
  )
}

export default MultiSelection;
