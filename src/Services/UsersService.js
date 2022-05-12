import {requestToGateway} from '../others/utils';
import constants from '../others/constants';


const getArtists = () => {
  return requestToGateway('GET', constants.USERS_HOST + constants.APP_ARTIST_LIST_URL)
    .then(response => {
      if (response.status !== 200) {
        console.log(`Response error with status ${response.status}`)
        throw response;
      }
      return response.json();
    });
}

export {getArtists};
