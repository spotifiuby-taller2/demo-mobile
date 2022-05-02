import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {Avatar} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage, getCurrentUser } from '../Firebase/firebase';



export default ProfilePicture = (props)=> {

    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(()=>{
        if ( getCurrentUser().photoURL ){
            setSelectedImage(getCurrentUser().photoURL)
        }
        else{
            setSelectedImage(null);
        }
    }, [selectedImage]);

    const pickImage = async  () =>{
        
        let result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4 , 3 ],
                quality: 1
            }
        )
        
        if ( ! result.cancelled  ){
            let url = uploadImage(result.uri, props.uid, setSelectedImage);
        }      
        
    }

    return(
        <TouchableOpacity
            onPress={pickImage}
            mode='outlined'
            style={styles.button}

            >
            {( selectedImage === null )?
                (<Avatar.Text
                    style={styles.avatar}
                    size={175}
                    label={`${props.name.charAt(0)}${props.surname.charAt(0)}`}
                />)
            : (<Avatar.Image
                    style={styles.avatar}
                    size={175}
                    source={{uri: selectedImage}}/>)}
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        button: {
            marginTop: 30,
            marginBottom: 40
        },
        avatar: {
            alignSelf: 'center',
        }
    }
);