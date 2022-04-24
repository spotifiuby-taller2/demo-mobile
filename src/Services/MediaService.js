import {postToGateway} from '../others/utils';
import {MEDIA_HOST} from '../others/constants';


const createSong = song => {
  return postToGateway({...song, redirectTo: `${MEDIA_HOST}/songs`});
}
