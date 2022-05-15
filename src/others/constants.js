import {REACT_APP_USERS_HOST_DEV,
        REACT_APP_USERS_HOST_PROD,
        REACT_APP_SERVICES_HOST_DEV,
        REACT_APP_MEDIA_HOST_DEV,
        REACT_APP_MEDIA_HOST_PROD,
        REACT_APP_SERVICES_HOST_PROD} from "@env";

/* Backend hosts */
const USERS_HOST = (__DEV__)
                    ? REACT_APP_USERS_HOST_DEV
                    : REACT_APP_USERS_HOST_PROD;

const MEDIA_HOST = (__DEV__) ? REACT_APP_MEDIA_HOST_DEV : REACT_APP_MEDIA_HOST_PROD;

/* Backends paths */
const SIGN_UP_URL = "/signup";
const SIGN_IN_URL = "/signin";
const SIGN_UP_END_URL = SIGN_UP_URL + "/end";
const FORGOT_PASSWORD_URL = "/forgotpassword";
const USERS_URL = "/users";
const SONGS_URL = "/songs";
const ALBUMS_URL = "/albums";
const PROFILE_URL = USERS_URL + "/profile";
const PROFILE_PHOTO_URL = PROFILE_URL + "/photo";
const PROFILE_USER_BASIC_INFO_URL= PROFILE_URL + "/basicinfo";
const PROFILE_VERIFICATION_VIDEO_URL= PROFILE_URL + "/verification/video";
const MUSICAL_PREF_URL = PROFILE_URL + "/musicalpref";
const EDIT_PROFILE_URL = USERS_URL + "/editprodile";
const USER_ID_QUERY_PARAM = "userId=";
const LISTENER_ID_QUERY_PARAM = "idListener=";
const ARTIST_ID_QUERY_PARAM = "idArtist=";
const PHOTO_URL_QUERY_PARAM = "photoUrl=";
const USERS_LIST_URL = USERS_URL + "/list";
const APP_USERS_LIST_URL = USERS_URL + "/applist";
const APP_ARTIST_LIST_URL = USERS_URL + "/artistlist";
const ARTIST_QUERY = USERS_URL + "/artist";
const EMISSOR_PARAM = "idEmissor=";
const RECEIVER_PARAM = "idReceptor=";
const ARTIST_NAME_PARAM = "name=";
const APP_FAV_ARTIST_LIST_URL = USERS_URL + "/favartistlist";
const REDIRECT_URL = "/redirect";
const APP_FAV_ARTIST_URL = USERS_URL + "/favartist";
const PUSH_NOTIFICATION_TOKEN_URL = PROFILE_URL + "/pushnotificationtoken";
const NOTIFICATION_LIST_URL = USERS_URL + "/notificationlist"



const SERVICES_HOST = (__DEV__)
                      ? REACT_APP_SERVICES_HOST_DEV
                      : REACT_APP_SERVICES_HOST_PROD;

const JSON_HEADER = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

/* Constants */
const MIN_LENGTH_PASSWORD = 10;

const MY_API_KEY="13a6bcee5bd256b05e451bde47f45a68e8bee660777f349f15f493b2873999de";

const LISTENER = "listener";
const ARTIST = "artist";

const DUPLICATE_NOTIFICATION_ERROR = 'SequelizeUniqueConstraintError: llave duplicada viola restricción de unicidad «notifications_pkey»';


module.exports = {
  USERS_HOST,
  MEDIA_HOST,
  SIGN_UP_URL,
  SIGN_IN_URL,
  FORGOT_PASSWORD_URL,
  JSON_HEADER,
  SIGN_UP_END_URL,
  MIN_LENGTH_PASSWORD,
  MUSICAL_PREF_URL,
  USERS_URL,
  SONGS_URL,
  ALBUMS_URL,
  PROFILE_URL,
  USER_ID_QUERY_PARAM,
  USERS_LIST_URL,
  APP_USERS_LIST_URL,
  SERVICES_HOST,
  MY_API_KEY,
  REDIRECT_URL,
  APP_ARTIST_LIST_URL,
  PROFILE_PHOTO_URL,
  PHOTO_URL_QUERY_PARAM,
  APP_FAV_ARTIST_LIST_URL,
  APP_FAV_ARTIST_URL,
  ARTIST_ID_QUERY_PARAM,
  LISTENER_ID_QUERY_PARAM,
  PROFILE_USER_BASIC_INFO_URL,
  LISTENER,
  EDIT_PROFILE_URL,
  ARTIST,
  ARTIST_QUERY,
  ARTIST_NAME_PARAM,
  PUSH_NOTIFICATION_TOKEN_URL,
  NOTIFICATION_LIST_URL,
  EMISSOR_PARAM,
  RECEIVER_PARAM,
  DUPLICATE_NOTIFICATION_ERROR,
  PROFILE_VERIFICATION_VIDEO_URL
}
