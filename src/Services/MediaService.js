import {requestToGateway} from '../others/utils';
import {MEDIA_HOST} from '../others/constants';


const createSong = song => {
  return requestToGateway('POST', `${MEDIA_HOST}/songs`, song)
    .then(response => {
      if (response.status !== 200) {
        console.log(`Response error with status ${response.status}`)
        throw response;
      }
      return response.json();
    });
}

export {createSong};
