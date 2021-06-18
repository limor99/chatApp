import React, {useState, useEffect} from 'react';

import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import usersUtil from '../Utils/usersUtil';
import socketUtil from '../Utils/socketUtil';

import './RoomComp.css';

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
      //console.log(text)
      //Emit message to server
      
      
      socket.emit('chatMessage', text);
      
    
      
       
    }

    useEffect(() => {
      
      socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

      // Join chatroom
      socket.emit('joinRoom', { username, roomName });

      //Get room and users
      socket.on('roomUsers',  ({ room, users}) =>{
        console.log('users ', {users});
        setRoomUsers(users);
      })
          
      //Message from server
      socket.on('message', message =>{
        console.log('from server' + message.text);
       // messages.push(message);
        console.log('messages after push' + messages);
        setMessages(messages => [ ...messages, message ]);
        
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
              {console.log('nnnn', {messages})}
              {
                  messages.length != 0 ?
                  messages.map((msg, index) =>{
                      return <div key={index} className='msg'>{msg.username} | {msg.text} | {msg.time}</div>
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