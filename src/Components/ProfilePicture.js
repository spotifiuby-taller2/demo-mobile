import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import {updateProfilePhoto} from '../Firebase/firebase';
import {useAuthUser} from '../context/AuthContext';
import constants from "../others/constants";
import {postToGateway} from "../others/utils";
import {uploadImage} from "../Services/CloudStorageService"


const ProfilePicture = (props) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const {userState} = useAuthUser();


  useEffect(() => {
    if (props.photoUrl) {
      setSelectedImage(props.photoUrl)
    } else {
      setSelectedImage(null);
    }
  }, []);

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      }
    )
    if (!result.cancelled) {
      const name = `${props.uid}.png`
      const photoURL = await uploadImage(result.uri, name);
      updateProfilePhoto(photoURL);
      const requestBody = {
        redirectTo: constants.USERS_HOST
          + constants.PROFILE_PHOTO_URL
          + "?" + constants.USER_ID_QUERY_PARAM + props.uid,
          photoURL: photoURL
      };
      postToGateway(requestBody, 'PATCH')
        .then(res => setSelectedImage(photoURL));
    }
  }

  return (
    <TouchableOpacity
      onPress={pickImage}
      mode='outlined'
      style={styles.button}
      disabled={((props.uid !== userState.uid) || (props.disabled))}
    >
      {(selectedImage === null) ?
        (<Avatar.Text
          style={styles.avatar}
          size={props.pictureSize}
          label={`${props.name.charAt(0)}${props.surname.charAt(0)}`}
        />)
        : (<Avatar.Image
          style={styles.avatar}
          size={props.pictureSize}
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

export default ProfilePicture;