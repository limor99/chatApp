import React, {useEffect} from 'react';
import Login from '../src/Component/LoginComp';
import CreateAccount from '../src/Component/CreateAccountComp';
import Rooms from '../src/Component/RoomsComp';
import RoomChat from '../src/Component/RoomChatComp';


import { Route, Switch } from 'react-router-dom';


import './App.css';

function App() {
  return (
    <div className="App">
      {console.log('APP')}
      <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/createAccount" component={CreateAccount}/>
          <Route path="/rooms/:roomName" component={RoomChat}/>
          <Route path="/rooms" component={Rooms}/>
      </Switch>
    </div>

    
  );
}

export default App;
