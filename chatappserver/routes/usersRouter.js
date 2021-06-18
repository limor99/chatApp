const { request } = require('express');
const express = require('express');
const router = express.Router();

const usersBL = require('../models/users/usersBL');

const checkAuth = require('../middlelwares/checkAuth');

/*

router.route('/').get(async function(req, res){
    let data  = await usersBL.getAllUsers();
    res.send(data);
})

router.route('/:id').get(async function(req, res){
    
})
*/
router.route('/login').post(async function(req, res){
    let user = req.body;
    let response = await usersBL.login(user);

    if(response.success){
        console.log('login success:' +req.headers);
        res.status(200).json(response);
    }
    else{
        //res.status(401).json(response);
        res.json(response);
    }
   
})
/*
router.route('/add').post(async function(req, res){
    let user = req.body;
    let newUserId = await usersBL.addNewUser(user);

    if(newUserId){
        let response = {
            success : true,
            id: newUserId,
            msg : `User ${user.username} added` 
        }
        res.status(200).json(response);
    }
    else{
        let response = {
            success : false,
            msg : `An error ocuured while try to save new user: ${user.username}` 
        }
        res.json(response);

    }
})
*/
router.route("/createAccount").post(async function(req, res){
    let userCreated = req.body;

    let response = await usersBL.createAccount(userCreated);

    if(response.success){
        res.status(200).json(response);
    }
    else{
        res.json(response);
    }
    
})
/*
router.route('/:id').delete(async function(req, res){
    let id = req.params.id;

    let isDeleted = await usersBL.deleteUser(id);

    if(isDeleted){
        let response = {
            success : true,
            msg : `User ${id} deleted` 
        }
        res.status(200).json(response);
    }
    else{
        let response = {
            success : false,
            msg : `An error ocuured while try to delete user: ${id}` 
        }
        res.json(response);

    }
})

router.route('/').put(async function(req, res){
    let updatedUser = req.body;
  
    let isUpdated = await usersBL.updateUser(updatedUser);

    if(isUpdated){
        let response = {
            success : true,
            msg : `User ${updatedUser.id} updated` 
        }
        res.status(200).json(response);
    }
    else{
        let response = {
            success : false,
            msg : `An error ocuured while try to update user: ${updatedUser.id}` 
        }
        res.json(response);

    }
})

*/
 
module.exports = router;

