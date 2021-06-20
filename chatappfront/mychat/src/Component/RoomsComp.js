import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import userUtil from '../Utils/usersUtil';

function RoomsComp(props) {
    const [rooms, setRooms] = useState('');
    const [chosenRoom, setChosenRoom] = useState('');

    const history = useHistory();

    const enterRoom = async () =>{
      let resp = await userUtil.isLogin();
      if(resp.success){
        history.push(`rooms/${chosenRoom}`);
      }
      else{
        history.push('/');
      }
      
    }

    //for now the rooms is hard coded
    useEffect(() => {
        let roomArr = [{id: 1, name: 'react'}, {id: 2, name: 'angular'}, {id: 3, name: 'vue'}];
        setRooms(roomArr);
    }, [])

    return (
      <div>
          <h3>Hello {sessionStorage.username}, Please choose Room for chat</h3>

          <select name="rooms" onChange={e => setChosenRoom(e.target.value)}>
          {
            rooms !== '' ? 
            rooms.map(room =>{
                return <option  key={room.id} value={room.name}>{room.name}</option>
            })
            :
            ''
          }
          </select>
          <br/>
          {
              chosenRoom !== '' ?
                <button onClick={() =>enterRoom()}>Join {chosenRoom} room</button>
                :
                ''
          }
        </div>
    );
  }
  
  export default RoomsComp;