import React, {useState} from 'react';
import DropDown from 'react-native-paper-dropdown';
const genreData = require('../data/genre.json');

const GenreDropDown = (props) => {
  const [genre, setGenre] = useState( '');
  const [showDropDown, setShowDropDown] = useState(false);

  const setValues = (value) => {
    setGenre(value);
    props.setValue(value);
  }

  return (
    <DropDown
      label={'Género*'}
      mode={'outlined'}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={genre}
      setValue={newGenre => setValues(newGenre)}
      list={genreData}
    />
  );
}

export default GenreDropDown;
