import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'





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

const firebaseConfig = (__DEV__)
                       ? firebaseConfigDev
                       : firebaseConfigProd;
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth, firebaseConfig};

