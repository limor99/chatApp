import axios from 'axios';
const usersUrl = "http://localhost:5000/api/users/";

const createAccount = async (createdUser) =>{
    let resp = await axios.post(`${usersUrl}createAccount`, createdUser);
    return resp.data;
}

const login = async (userLogin) =>{
    let resp = await axios.post(`${usersUrl}login`, userLogin);
    return resp.data;
}

const isLogin = async (userLogin) =>{
    const token = sessionStorage.getItem("id");
    const header = {headers: 
                        {"Authorization" : `Bearer ${token}`}
                    }

    let resp = await axios.post(`${usersUrl}isLogin`, userLogin, header);
    return resp.data;
}

export default {login, createAccount, isLogin};