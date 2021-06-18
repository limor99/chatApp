import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

//const socket = socketIOClient(ENDPOINT);
    
//var socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

const joinGroup = () =>{
    const socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
    let msg;
    socket.on("message", data => {
        console.log(data);
        //console.log(socket.id);
        msg = data;
        return data;
        
      });
     // return msg;
}

export default {joinGroup}

