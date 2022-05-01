import {requestToGateway} from '../others/utils';
import {USERS_HOST} from '../others/constants';


const getArtists = () => {
  return requestToGateway('GET', `${USERS_HOST}/users/artistlist`)
    .then(response => {
      if (response.status !== 200) {
        console.log(`Response error with status ${response.status}`)
        throw response;
      }
      return response.json();
    });
}

export {getArtists};
