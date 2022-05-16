import {initializeApp} from 'firebase/app'
import {getAuth, updateProfile, signOut} from 'firebase/auth'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {postToGateway} from "../others/utils";
import constants from '../others/constants';
import {addDoc, collection, orderBy, initializeFirestore, onSnapshot} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCnDa9J7DKKtNv5crxZ4NrRGcW5c7nZTAg",
  authDomain: "fir-firebase-2-9eb22.firebaseapp.com",
  projectId: "fir-firebase-2-9eb22",
  storageBucket: "fir-firebase-2-9eb22.appspot.com",
  messagingSenderId: "701624425016",
  appId: "1:701624425016:web:6cb2157c5a2c0a34e1a4cd"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app);
const db = initializeFirestore(app, {useFetchStreams: false, experimentalForceLongPolling: true});


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
  const snapshot = await uploadBytes(storageRef, blob);

  const photoURL = await getDownloadURL(storageRef);

  updateProfile(auth.currentUser, {photoURL});
  const requestBody = {
    redirectTo: constants.USERS_HOST
      + constants.PROFILE_PHOTO_URL
      + "?" + constants.USER_ID_QUERY_PARAM + uid
      + "&" + constants.PHOTO_URL_QUERY_PARAM + photoURL
  };

  postToGateway(requestBody, 'PATCH')
    .then(res => {
      setImage(photoURL)
    })

}

const getCurrentUser = () => {
  return auth.currentUser;
}

const addDocIntoCollection = async (collectionName, newDoc) => {
  try {
    await addDoc(collection(db, collectionName), newDoc).then(r => console.log(JSON.stringify(r)));
  } catch (err) {
    alert(err);
  }
}

const getSnapshot = async (collectionName) => {

  const snapshot = onSnapshot(collection(db, collectionName),
    (querySnapshot) => {
      return querySnapshot
    });

  return snapshot;

}

export {
  auth,
  uploadImage,
  signOut,
  getCurrentUser,
  firebaseConfig,
  db,
  addDocIntoCollection,
  getSnapshot,
  orderBy
};
