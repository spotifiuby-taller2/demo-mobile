import React, {useState} from 'react';
import DropDown from 'react-native-paper-dropdown';
import genre from "../data/Genre"

const GenreDropDown = (props) => {
  const [genreValue, setGenreValue] = useState( '');
  const [showDropDown, setShowDropDown] = useState(false);

  const setValues = (value) => {
    setGenreValue(value);
    props.setValue(value);
  }

  return (
    <DropDown
      label={'Género*'}
      mode={'outlined'}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={genreValue}
      setValue={newGenre => setValues(newGenre)}
      list={Object.values(genre)}
    />
  );
}

export default GenreDropDown;
