import {REACT_APP_USERS_HOST_DEV, REACT_APP_USERS_HOST_PROD} from "@env"


/* Backend hosts */
const USERS_HOST =(__DEV__)? REACT_APP_USERS_HOST_DEV:REACT_APP_USERS_HOST_PROD;

/* Backends paths */
const SIGN_UP_URL = "/signup";
const SIGN_IN_URL = "/signin";
const SIGN_UP_END_URL = SIGN_UP_URL + "/end";
const FORGOTPASSWORD_URL="/forgotpassword";
const BIOMETRIC_AUTH_URL="/biometricAuth"

const JSON_HEADER = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

module.exports = {
  USERS_HOST,
  SIGN_UP_URL,
  SIGN_IN_URL,
  FORGOTPASSWORD_URL,
  JSON_HEADER,
  SIGN_UP_END_URL
}