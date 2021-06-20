import React, {useState, useEffect, useRef} from 'react';

import socketIOClient from "socket.io-client";
import { useHistory } from 'react-router-dom';

import './RoomChatComp.css';

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
      setText('');
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

    const AlwaysScrollToBottom = () => {
      const elementRef = useRef();
      useEffect(() => elementRef.current.scrollIntoView());
      return <div ref={elementRef} />;
    };

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
            <div className='chat'>

              {
                  messages.length !== 0 ?
                  messages.map((msg, index) =>{
                      return <div key={index} className={msg.username ==='Admin' ? 'adminMsg' : msg.username === username ? 'userMsg' : 'otherMsg'}>
                                <div>{msg.username} &nbsp; {msg.time} </div>
                                <div className='msgText'>{msg.text}</div>
                                {(msg.username === 'Admin' || msg.username !== username) ? '' : msg.read ? 
                                  <img alt='read message' src='/blueDoubleCheck.PNG'/>
                                   : ''}
                            </div>
                  })
                  :
                  ''
              }
              <AlwaysScrollToBottom />
            </div>
            <div className='sendTxt'>
              <input  className='txt' type='text' onChange={e => setText(e.target.value)} value={text}></input>
              <button onClick={sendMsg}>send</button>
            </div>
          </div>
          
          <br/>
          <button onClick={leaveChat}>Leave Chat</button>

        </div>
    );
  }
  
  export default RoomChatComp;