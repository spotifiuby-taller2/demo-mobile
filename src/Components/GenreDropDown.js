import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
const genreData = require('../data/genre.json');

const GenreDropDown = (props) => {
  const [genre, setGenre] = useState({value: '', error: null});
  const [showDropDown, setShowDropDown] = useState(false);

  const setValues = (value) => {
    setGenre(value);
    props.setValue(value);
  }

  return (
    <DropDown
      label='Género*'
      mode={'outlined'}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={genre.value}
      setValue={newGenre => setValues({value: newGenre, error: null})}
      list={genreData}
    />
  );
}

export default GenreDropDown;
