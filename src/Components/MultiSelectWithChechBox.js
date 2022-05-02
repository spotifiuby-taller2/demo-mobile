import React, {useEffect, useState} from 'react'
import DropDown from 'react-native-paper-dropdown';

const MultiSelectWithCheckBox = (props) => {

  const [allElements, setAllElements] = useState([]);
  const [filterElements, setFilterElements] = useState([]);
  const [text, setText] = useState("");
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  useEffect(() => {
    const fetchAllElements = async () => {
      await props.getAllElements()
        .then(elements => {
          const formatElements = elements.map(e => {
            return {label: `${e.name} ${e.surname}`, value: e.id};
          });
          setAllElements(formatElements);
        })
        .catch(e => {
          console.log(`Error fetching elements: ${JSON.stringify(e)}`);
          alert(`Error fetching elements: ${JSON.stringify(e)}`);
        });
    }
    fetchAllElements();
  }, []);

  const setValues = (value) => {
    setText(value);
    const list = value.split(",").filter(e => e !== '');
    setFilterElements(list);
    props.setValue({value: list, error: null});
  }

  return (
    <DropDown
      label={'Artistas*'}
      mode={'outlined'}
      visible={showMultiSelectDropDown}
      showDropDown={() => setShowMultiSelectDropDown(true)}
      onDismiss={() => setShowMultiSelectDropDown(false)}
      value={text}
      setValue={newElement => setValues(newElement)}
      list={allElements}
      multiSelect={true}
    />
  );
}

export default MultiSelectWithCheckBox;
