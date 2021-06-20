import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

const joinGroup = () =>{
    const socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
    let msg;
    socket.on("message", data => {
        msg = data;
        return data;
      });
}

export default {joinGroup}

