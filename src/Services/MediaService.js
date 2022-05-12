import {requestToGateway} from '../others/utils';
import constants from '../others/constants';

const createSong = song => {
  console.log(`Song: ${JSON.stringify(song)}`);
  return requestToGateway('POST', `${constants.MEDIA_HOST}${constants.SONGS_URL}`, song)
    .then(response => {
      if (response.status !== 200) {
        console.log(`Response error with status ${response.status}`)
        throw response;
      }
      return response.json();
    });
}

const createAlbum = album => {
  return requestToGateway('POST', `${constants.MEDIA_HOST}${constants.ALBUMS_URL}`, album)
    .then(response => {
      if (response.status !== 200) {
        console.log(`Response error with status ${response.status}`)
        throw response;
      }
      return response.json();
    });
}


const getSongsByArtist = (artistId) => {
  return requestToGateway('GET', `${constants.MEDIA_HOST}${constants.SONGS_URL}?artist=${artistId}`)
    .then(response => {
      if (response.status !== 200) {
        console.log(`Response error with status ${response.status}`)
        throw response;
      }
      return response.json();
    });
}

export {createSong, createAlbum, getSongsByArtist};
