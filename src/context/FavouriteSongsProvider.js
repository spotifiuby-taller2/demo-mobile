import React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {addFavouriteSong, getFavouriteSongs, removeFavouriteSong} from "../Services/MediaService";
import {useAuthUser} from "./AuthContext";

export const FavouriteSongsContext = createContext(undefined);

export const FavouriteSongsProvider = ({children}) => {
  const {userState} = useAuthUser();
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const refreshFavourites = () => {
    getFavouriteSongs(userState.uid)
      .then(r => setFavouriteSongs(r.songs))
      .then(() => setIsReady(true))
      .catch(e => console.log(JSON.stringify(e)));
  }

  const toggleFavourite = (songId) => {
    setIsReady(false);
    const call = isFavourite(songId) ? removeFavouriteSong : addFavouriteSong;
    return call(songId, userState.uid)
      .then(refreshFavourites);
  }

  const isFavourite = (songId) => favouriteSongs.map(s => s.id).includes(songId);

  useEffect(refreshFavourites, []);

  return (
    <FavouriteSongsContext.Provider value={{favouriteSongs, isReady, isFavourite, refreshFavourites, toggleFavourite}}>
      {children}
    </FavouriteSongsContext.Provider>
  )
};

export const useFavouriteSongs = () => useContext(FavouriteSongsContext);
