import React, {useState, useEffect} from 'react';

import socketIOClient, { Manager } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import usersUtil from '../Utils/usersUtil';
import socketUtil from '../Utils/socketUtil';

import './RoomChatComp.css';

import moment from 'moment';

//import image from '../../public/blueDoubleCheck.PNG'


const ENDPOINT = "http://localhost:5000";
let socket;


function RoomChatComp(props) {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState(sessionStorage.username);
    const [roomName, setRoomName] = useState(props.match.params.roomName);
    const [roomUsers, setRoomUsers] = useState([]);
    

    const history = useHistory();

    const leaveChat = () =>{
      if(socket){
        socket.disconnect();
      }
      sessionStorage.clear();
      history.push('/');//to login page


    }
   
    const sendMsg = () =>{
      socket.emit('chatMessage', text);
    }

    const checkMsgsAsRead = (msg) => {
      msg.read = true;
      socket.emit('readMsgs', msg);
    }

    useEffect(() => {
      
      socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

      // Join chatroom
      socket.emit('joinRoom', { username, roomName });

      //Get room and users
      socket.on('roomUsers',  ({ room, users}) =>{
        setRoomUsers(users);
      })
          
      //Message from server
      socket.on('message', message =>{
        messages.push(message);
        let newMessages = [...messages]
        setMessages(newMessages);
       
        if(message.username !== 'Admin' && message.username !== sessionStorage.username){
          if(!document.hidden){
            checkMsgsAsRead(message);
          };

          document.addEventListener("visibilitychange", function() {
            if (document.visibilityState === 'visible') {
              if(!message.read){
                checkMsgsAsRead(message);
              }
            }
          });
        }
      })

      socket.on('checkedAsRead', message =>{
        let updatedMessages = [...messages];
        updatedMessages.forEach(um => {
          if(um.username === username && !um.read){
            um.read = true;
          }
        });

        setMessages(updatedMessages);
      })

      return () =>{
        if(socket) socket.disconnect();
        sessionStorage.clear();
        history.push('/');//to login page
      }
    }, []);

    return (
        
      <div className='App'>
          hello {sessionStorage.username}, you are in room {props.match.params.roomName}

          <div className='roomUsers'>
            in room: 
            {
                roomUsers.length !== 0  ?
                roomUsers.map(ru =>{
                  return <div key={ru.id}>{ru.username}</div>
                })
                :
                ''
            }

          </div>

          <div className='chatBox'>
              {
                  messages.length != 0 ?
                  messages.map((msg, index) =>{
                      return <div key={index} className='msg'>{msg.username} | {msg.text} | {msg.time} | 
                                {(msg.username === 'Admin' || msg.username !== username) ? '' : msg.read ? 
                                  <img src='/blueDoubleCheck.PNG'/>
                                   : ''}
                            </div>
                  })
                  :
                  ''
              }

          </div>
          <input type='text' onChange={e => setText(e.target.value)} value={text}></input>
          <button onClick={sendMsg}>send</button>
          <br/>
          <button onClick={leaveChat}>Leave Chat</button>

        </div>
    );
  }
  
  export default RoomChatComp;