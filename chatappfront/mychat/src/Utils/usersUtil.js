import axios from 'axios';
const usersUrl = "http://localhost:5000/api/users/";

const createAccount = async (createdUser) =>{
    let resp = await axios.post(`${usersUrl}createAccount`, createdUser);
    return resp.data;
}

const login = async (userLogin) =>{
    console.log(userLogin)    
    let resp = await axios.post(`${usersUrl}login`, userLogin);
//console.log(resp)
    return resp.data;

}

export default {login, createAccount};