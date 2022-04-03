import {REACT_APP_USERS_HOST_DEV, REACT_APP_USERS_HOST_PROD} from "@env"


/* Backend hosts */
const USERS_HOST =(__DEV__)? REACT_APP_USERS_HOST_DEV:REACT_APP_USERS_HOST_PROD;

/* Backends paths */
const SIGN_UP_URL = "/signup";
const SIGN_IN_URL = "/signin";
const SIGN_UP_END_URL = SIGN_UP_URL + "/end";
const FORGOT_PASSWORD_URL = "/forgotpassword";

const JSON_HEADER = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

/* Constants */

const MIN_LENGTH_PASSWORD = 8;

module.exports = {
  USERS_HOST,
  SIGN_UP_URL,
  SIGN_IN_URL,
  FORGOT_PASSWORD_URL,
  JSON_HEADER,
  SIGN_UP_END_URL,
  MIN_LENGTH_PASSWORD
}