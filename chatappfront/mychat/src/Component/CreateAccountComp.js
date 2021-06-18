import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import usersUtil from '../Utils/usersUtil';
//import './CreateAccountComp.css';


function CreateAccountComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const history = useHistory();

    const createAccount = async (e) =>{
        e.preventDefault();
        let createdUser = {
            username: username,
            password: password
        }

        let resp = await usersUtil.createAccount(createdUser);

        if(resp.success){
            history.push({
                pathname: '/',
                state: { msg: resp.msg }
            });

        }
        else{
            setMsg(resp.msg);
        }
    }
    return (
        <div className='App'>
            <h1>Create your Account</h1>
            {msg}
            <div className='createAccountForm'>
                <form onSubmit={e => createAccount(e)}>
                    <input type="text" className='roundedField' value={username} name="username" placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input><br/>
                    <input type="text" className='roundedField' value={password} name="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input><br/>
                    <input type="submit" value='Create account' className='roundedBtn'/>
                    <br/>
                    
            </form>
         </div>
         
            
        </div>
    )
}

export default CreateAccountComp
