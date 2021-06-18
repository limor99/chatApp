import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';

import usersUtil from '../Utils/usersUtil';
import socketUtil from '../Utils/socketUtil';

function RoomsComp(props) {
    const [rooms, setRooms] = useState('');
    const [chosenRoom, setChosenRoom] = useState('');

    const history = useHistory();

    const enterRoom = () =>{
        //alert(chosenRoom);
      //  let msg = socketUtil.joinGroup();
      //  alert('msg'  +msg);
     /*   history.push({
            pathname: `rooms/${chosenRoom}`,
            state: { msg: msg }
        });
       */
        history.push(`rooms/${chosenRoom}`)
            
    }

    //for now the rooms is hard coded
   useEffect(() => {
        let roomArr = [{id: 1, name: 'react'}, {id: 2, name: 'angular'}, {id: 3, name: 'vue'}];
        setRooms(roomArr);
    }, [])
    

    return (
        
      <div className='App'>
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