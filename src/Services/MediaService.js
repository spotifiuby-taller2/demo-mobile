import {requestToGateway} from '../others/utils';
import constants from '../others/constants';

const getBodyOrThrow = (response) => {
  if (response.status !== 200) {
    console.log(`Response error with status ${response.status}`);
    throw response;
  }
  return response.json();
}

const createSong = song => {
  console.log(`Song: ${JSON.stringify(song)}`);
  return requestToGateway('POST', `${constants.MEDIA_HOST}${constants.SONGS_URL}`, song)
    .then(getBodyOrThrow);
}

const createAlbum = album => {
  return requestToGateway('POST', `${constants.MEDIA_HOST}${constants.ALBUM_URL}`, album)
    .then(getBodyOrThrow);
}

const getSongsByArtist = (artistId) => {
  return requestToGateway('GET', `${constants.MEDIA_HOST}${constants.SONGS_URL}?artist=${artistId}`)
    .then(getBodyOrThrow);
}

const getAllSongs = () => {
  return requestToGateway('GET', constants.MEDIA_HOST + constants.SONGS_URL)
    .then(getBodyOrThrow);
}

export {createSong, createAlbum, getSongsByArtist, getAllSongs};
