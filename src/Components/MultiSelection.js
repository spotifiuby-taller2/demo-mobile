import {
  View,
  ScrollView,
} from 'react-native';
import {containerStyle} from '../styles/genericStyles';
import React, {useEffect, useState} from 'react'
import {Button, Chip, Divider, Searchbar} from "react-native-paper";

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
      >
        {props.renderElement(element)}
      </Chip>
    )
  }

  function renderDisplayedChip(element, id) {
    return (
      <Chip key={id}
            onPress={() => {
              props.elementCallback.add(element);
            }}
      >
        {props.renderElement(element)}
      </Chip>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={containerStyle}>
      <Searchbar onChangeText={setText} placeholder={props.placeholder}/>

      {/* Scrollview height cannot be adapted directly */}
      <View style={{'max-height': 125}}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {allElements.filter(elementShouldBeDisplayed(text)).map(renderDisplayedChip)}
        </ScrollView>
      </View>
      <Divider style={{margin: 5}}/>
      <ScrollView showsVerticalScrollIndicator={true}
                  useReference={props.selectedElements}>
        {props.selectedElements.map(renderSelectedChip)}
      </ScrollView>

      <Button onPress={props.elementCallback.clear}>Limpiar
      </Button>
    </ScrollView>
  )
}

export default MultiSelection;
