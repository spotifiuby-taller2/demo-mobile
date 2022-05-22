import {IconButton} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {addFavouriteSong, getFavouriteSongs, removeFavouriteSong} from "../Services/MediaService";
import {useAuthUser} from "../context/AuthContext";

const FavouriteIconButton = ({songId}) => {
  const [isFavourite, setIsFavourite] = useState(undefined);
  const {userState} = useAuthUser();

  const handle = (newIsFav) => {
    const call = newIsFav ? addFavouriteSong : removeFavouriteSong;
    call(songId, userState.uid).then(_ => setIsFavourite(newIsFav));
  }

  useEffect(() => {
    console.log(songId);
    if (!songId) {
      return;
    }
    getFavouriteSongs(userState.uid)
      .then(r => {console.log(JSON.stringify(r)); return r;})
      .then(r => setIsFavourite(r.songs.map(s => s.id).includes(songId)))
      .catch(e => console.log(JSON.stringify(e)));
  }, [songId])

  return (
    isFavourite ? (
      <IconButton icon='heart' onPress={() => handle(false)}/>
    ) : (
      <IconButton icon='heart-outline' onPress={() => handle(true)} disabled={isFavourite === undefined}/>
    )
  )
}

export default FavouriteIconButton;
