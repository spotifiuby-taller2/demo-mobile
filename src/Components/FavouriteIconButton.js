import {IconButton} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {addFavouriteSong, getFavouriteSongs, removeFavouriteSong} from "../Services/MediaService";
import {useAuthUser} from "../context/AuthContext";

const FavouriteIconButton = ({songId, size, style}) => {
  const [isFavourite, setIsFavourite] = useState(undefined);
  const {userState} = useAuthUser();

  const handle = (newIsFav) => {
    const call = newIsFav ? addFavouriteSong : removeFavouriteSong;
    call(songId, userState.uid).then(_ => setIsFavourite(newIsFav));
  }

  useEffect(() => {
    if (!songId) {
      return;
    }
    getFavouriteSongs(userState.uid)
      .then(r => setIsFavourite(r.map(s => s.id).includes(songId)))
      .catch(e => console.log(JSON.stringify(e)));
  });

  return (
    isFavourite ? (
      <IconButton style={style} size={size} icon='heart' onPress={() => handle(false)}/>
    ) : (
      <IconButton style={style} size={size} icon='heart-outline' onPress={() => handle(true)} disabled={isFavourite === undefined}/>
    )
  );
}

export default FavouriteIconButton;
