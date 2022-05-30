import {app} from '../Firebase/firebase';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

const storage = getStorage(app);

//video and music
const uploadFile = (file, name) => {
  const fileRef = ref(storage, name);
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
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
}

export {uploadFile, uploadImage};
