import { initializeApp } from 'firebase/app'
import {getAuth, updateProfile, signOut} from 'firebase/auth'
import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
import {postToGateway} from "../others/utils";
import constants from '../others/constants';




const firebaseConfigDev = {
    apiKey: "AIzaSyDlFbw1n3eqg7ogdwGuiTetV6isK4Uhqno",
    authDomain: "fir-firebase-acc6b.firebaseapp.com",
    projectId: "fir-firebase-acc6b",
    storageBucket: "fir-firebase-acc6b.appspot.com",
    messagingSenderId: "296878360901",
    appId: "1:296878360901:web:7987ce42ec0a406b1f162c"
  };

      const firebaseConfigProd = {
    apiKey: "AIzaSyCnDa9J7DKKtNv5crxZ4NrRGcW5c7nZTAg",
    authDomain: "fir-firebase-2-9eb22.firebaseapp.com",
    projectId: "fir-firebase-2-9eb22",
    storageBucket: "fir-firebase-2-9eb22.appspot.com",
    messagingSenderId: "701624425016",
    appId: "1:701624425016:web:6cb2157c5a2c0a34e1a4cd"
  };

/*const firebaseConfig = (__DEV__)
                       ? firebaseConfigDev
                       : firebaseConfigProd; */

const firebaseConfig = firebaseConfigDev;
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app);




// storage
const uploadImage = async (file, uid, setImage)=>{

    const url = `images/${uid}.png`
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", file, true);
      xhr.send(null);
    });

    let storageRef = ref(storage, url);
    const snapshot =  await uploadBytes(storageRef, blob); 

    const photoURL = await getDownloadURL(storageRef);

    updateProfile(auth.currentUser,{photoURL});
    const requestBody={
      redirectTo: constants.USERS_HOST 
          + constants.PROFILE_PHOTO_URL
          + "?" + constants.USER_ID_QUERY_PARAM + uid
          + "&" + constants.PHOTO_URL_QUERY_PARAM + photoURL
    };

    postToGateway(requestBody,'PATCH')
      .then(res => {setImage(photoURL)})

}

const getCurrentUser =() =>{
    return auth.currentUser;
}

export {auth, uploadImage,signOut,getCurrentUser,firebaseConfig};