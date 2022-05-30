import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react'
import {Text, Button} from 'react-native-paper';
import {getToGateway, songToTrack} from '../others/utils';
import constants from '../others/constants'
import UserChip from './UserChip';
import {useFocusEffect} from '@react-navigation/native';
import usePlayerAction from "../Hooks/usePlayerAction";
import PlayableListItem from "../Components/PlayableListItem";

import defaultArtwork from "../../assets/album-placeholder.png";


/*user must be {name: '', surname: '', email:''}*/

const Top3List = props => {

  const [list, setList] = useState([]);
  const [render, setRender] = useState(false);
  const player = usePlayerAction();

  const toPlayable = album => {
    return {
      title: album.title,
      artwork: album.link ? {uri: album.link} : defaultArtwork,
      artist: album.artistNames ?? 'Unknown artists',
    };
  };


  useFocusEffect(
    useCallback(() => {

      getToGateway(props.endpoint
        + constants.LIMIT_3_PARAM)
        .then(res => {
          if (res.error !== undefined) {
            alert(res.error);
          } else {
            setRender(true);
            if (props.userList)
              setList(res.list)

            else {
              setList(res)
            }
          }
        })


    }, []));

  if (!render) {
    return (
      <View>

      </View>
    )
  }
  return (
    <View style={{backgroundColor: '#f5fcff'}}>
      {
        list.length !== 0 && (
          <View style={{flex: 1, flexGrow: 1}}>
            <Text style={styles.title}>{props.title}</Text>
            {
              props.userList && (
                list.map((user, id) => {
                  return (<UserChip id={id} key={id} user={user} navigation={props.navigation}/>)
                })
              )
            }
            {
              props.songList && (
                list.map(songToTrack).map((track, id) => {
                  return (
                    <PlayableListItem id={id}
                                      key={id}
                                      playableItem={track}
                                      play={() => player.playList(list, id)}
                                      moreInfoCallback={() => {
                                        props.navigation.navigate('SongScreen', {songId: track.id});
                                      }}
                    />
                  )
                })
              )
            }
            {
              props.albumList && (
                list.map((album, id) => {
                  return (<PlayableListItem id={id}
                                            key={id}
                                            playableItem={toPlayable(album)}
                                            play={() => player.playList(album.songs.map(songToTrack), 0)}
                                            moreInfoCallback={() => {
                                              props.navigation.navigate('AlbumScreen', {albumId: album.id});
                                            }}
                  />)
                })
              )
            }
            <Button
              mode='text'
              style={styles.button}
              onPress={() => {
                props.navigation.navigate(props.open)
              }}>
              <Text style={{color: 'steelblue'}}>Ver mas</Text>
            </Button>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create(
  {
    title: {
      alignSelf: 'center',
      fontSize: 18,
      marginBottom: 13,
      marginTop: 26,
      color: 'steelblue'
    },
    button: {
      alignSelf: 'center',
      fontSize: 15,
      flex: 1
    },
  }
)
export default Top3List;
