import React from 'react';
import {TextInput} from 'react-native-paper';





export default EditProfileTextInput = (props) =>{    

    return(
        <TextInput
            mode='flat'
            name={props.name}
            label={props.label}
            value={props.input}
            onChangeText={ (text)=> {props.execute({type: props.name, value: text})}}
            activeOutlineColor='#f5fcff'
            theme={{colors: {text: 'darkblue' }}}
            style={{width: 144, fontSize: 30, height: 80, alignSelf: 'center', backgroundColor: '#f5fcff', marginBottom: 10,marginRight: 7, marginLeft: 7}}
            />
    )


}