import {app} from '../Firebase/firebase';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const storage = getStorage(app);

//video and music
const uploadFile = (file, url) => {
  const fileRef = ref(storage, url);
  return uploadBytes(fileRef, file)
    .then(() => getDownloadURL(fileRef));
}

//image
const uploadImage = async (file, name) => {
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
  let storageRef = ref(storage, name);
  uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
}

export {uploadFile, uploadImage};
