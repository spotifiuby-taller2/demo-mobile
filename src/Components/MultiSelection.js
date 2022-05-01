import {
  View,
  ScrollView,
} from 'react-native';
import {containerStyle} from '../styles/genericStyles';
import React, {useState} from 'react'
import {Button, Chip, Searchbar} from "react-native-paper";

const MultiSelection = props => {
  const [elements, setElements] = useState([]);

  const getElementsToDisplay = (text) => {
    let elementsToDisplay = props.getElementsToDisplay(text);
    console.log(JSON.stringify(elementsToDisplay));
    setElements(elementsToDisplay);
  }

  function renderSelectedChip(element, id) {
    return (
      <Chip key={id}
            onClose={props.removeElementCallback ? () => props.removeElementCallback(element) : undefined}
      >
        {props.renderElement(element)}
      </Chip>
    )
  }

  function renderDisplayedChip(element, id) {
    return (
      <Chip key={id}
            onPress={() => props.addElementCallback(element)}
      >
        {props.renderElement(element)}
      </Chip>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}
                style={containerStyle}>
      <Searchbar placeHolder={'Search artists'} onChangeText={text => getElementsToDisplay(text)}/>

      {/* Scrollview height cannot be adapted directly */}
      <View style={{"max-height": 125}}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {elements.map(renderDisplayedChip)}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={true}
                  useReference={props.selectedElements}>
        {
          props.selectedElements.map(renderSelectedChip)
        }
      </ScrollView>

      <Button onPress={props.clearElementsCallback}>Limpiar
      </Button>
    </ScrollView>
  )
}

export default MultiSelection;
