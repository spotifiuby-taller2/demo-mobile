import {app} from '../Firebase/firebase';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import * as UUID from "uuid";

const storage = getStorage(app);

const uploadFile = file => {
  const fileRef = ref(storage, UUID.v4());
  return uploadBytes(fileRef, file)
    .then(() => getDownloadURL(fileRef));
}

export {uploadFile};
