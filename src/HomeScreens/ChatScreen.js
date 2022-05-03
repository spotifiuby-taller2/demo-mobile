import { 
    StyleSheet, 
    View,
    TouchableOpacity
  } from 'react-native';
import React,{useState, useCallback, useLayoutEffect} from 'react'
import { Text } from 'react-native-paper'
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat'
import { getCurrentUser, addDocIntoCollection, db} from '../Firebase/firebase';
import { useRoute } from '@react-navigation/native';
import { collection, orderBy, query, onSnapshot} from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfilePicture from '../Components/ProfilePicture';
const utils = require("../others/utils");

  
export default ChatScreen = ({navigation}) =>{

        const route = useRoute();
        const [messages, setMessages] = useState([]);
        const {idEmissor, idReceptor, nameReceptor, surnameReceptor} = route.params;


        useLayoutEffect( ()=>{
             function requestMessages(){
                const unsubscribe = onSnapshot(query(collection(db, utils.getChatId(idEmissor, idReceptor)), orderBy('createdAt','desc')),
                    snapshots =>{
                        setMessages(
                            snapshots.docs.map(doc =>({
                                _id: doc.data()._id,
                                createdAt: doc.data().createdAt.toDate(),
                                text: doc.data().text,
                                user:doc.data().user
                            }))
                        )
                    });

                return unsubscribe;
            }

            requestMessages();
        }, [])
        
        const onSend = useCallback((messages = []) => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
            addDocIntoCollection(utils.getChatId(idEmissor,idReceptor), messages[0]);
            ;
          }, []);
        
        const renderSend = (props) =>{
            return(
                <Send
                    {...props}>
                    <View>
                        <MaterialCommunityIcons  
                            name='send-circle' 
                            size={45} 
                            color='#1338be'/>
                    </View>
                </Send>
            )
        }

        const renderTextInputBar = (props) =>{
            return(
                <InputToolbar {...props} placeholder='Mensaje'/>
            );
        }
    
        return(
            <View style={{backgroundColor: '#f5fcff', flex: 1}}>
            <View style={{backgroundColor: 'darkblue', height: 120}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 13}}></View>
                    <ProfilePicture
                        uid={idReceptor}
                        name={nameReceptor} 
                        surname={surnameReceptor}
                        style={styles.avatar}
                        />
                    <Text style={{marginTop: 50, marginLeft: 30, fontSize: 25, color: 'white'}}>
                        {`${nameReceptor} ${surnameReceptor}`}
                    </Text>
                </View>
                
            </View>
            <GiftedChat
                messages={messages}
                backgroundColor
                onSend={messages => onSend(messages)}
                alwaysShowSend
                user={{
                    _id: idEmissor,
                }}
                renderInputToolbar={renderTextInputBar}
                renderSend={renderSend}
                renderBubble={props => {
                    return (
                      <Bubble
                        {...props}
              
                        textStyle={{
                          right: {
                            color: 'white',
                          },
                          left: {
                            color: 'black',
                          },
                        }}
                        wrapperStyle={{
                          left: {
                            backgroundColor: '#4D4DFF',
                          },
                          right: {
                            backgroundColor: "#ADD8E6",
                          },
                        }}
                      />
                    );
                  }}

                
          />
          </View>
        )
      }
  
      const styles =StyleSheet.create(
        {
          avatar: {
            marginTop: 30,
            alignSelf: 'auto',
            marginBottom: 50,
          },
        }
      )