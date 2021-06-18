import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';

import usersUtil from '../Utils/usersUtil';

import './LoginComp.css';


function LoginComp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const userFullName = localStorage.getItem('userFullName');

    const history = useHistory();
    //const dispatch = useDispatch();

    async function login(e) {
    e.preventDefault();
    let userLogin ={
          username: username,
          password: password,
      }

      let resp = await usersUtil.login(userLogin);
      
      if(resp.success){
          sessionStorage.setItem("id", resp.token);
          sessionStorage.setItem("username", resp.username);

          history.push({
            pathname: '/rooms',
            
        });
      }
      else{
          setMsg(resp.message);
      }
    }

    return (
        
      <div className='App loginPage'>
          <h3>Please login</h3>
          <div className='milkDiv loginForm'>
          {msg}
            <form onSubmit={e => login(e)}>
              <input type='text' className='roundedField' value={username} name='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input><br/>
              <input type='text' className='roundedField' value={password} name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input><br/>
              <input type='submit' value='START CHAT' className='roundedBtn'/><br/>

              <Link to='/createAccount'>Create Account</Link><br/>
              
              <br/>
              
            </form>
          </div>
      </div>
    );
  }
  
  export default LoginComp;