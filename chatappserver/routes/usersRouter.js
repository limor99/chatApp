const { request } = require('express');
const express = require('express');
const router = express.Router();

const usersBL = require('../models/users/usersBL');

const checkAuth = require('../middlelwares/checkAuth');


router.route('/login').post(async function(req, res){
    let user = req.body;
    let response = await usersBL.login(user);

    if(response.success){
        res.status(200).json(response);
    }
    else{
        res.json(response);
    }
   
})

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
 
module.exports = router;

