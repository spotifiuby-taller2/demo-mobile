import React,{useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Checkbox, Text} from 'react-native-paper'


export default MusicalPreferenceCheckbox = ({name})=>{
    
    const [checked, setChecked] = useState(false);
    return(
        <View style={styles.container}>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                color={checked? 'skyblue':'grey'}
                onPress={()=>{setChecked(! checked)}}
                />
            <Text>{name}</Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    }
})