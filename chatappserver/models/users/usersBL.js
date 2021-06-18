const User = require('./userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

exports.login = async function(user){
    let username = user.username;
    
    let response = {};

    try{
        let existUser = await User.findOne({ username : username});

        //if user not exist
        if(existUser == null){
            response = {
                success: false,
                message: "Authorization failed"
            }

            return response;
        }

        let password = user.password;
        //check if password ok
        let isSamePassword = await bcrypt.compare(password, existUser.password);
        if(!isSamePassword){
            response = {
                success: false,
                message: "Authorization failed"
            }

            return response;

        }

        //Authorize user
        let userId = existUser.id;
        
        const token = jwt.sign({
                id: userId
            },
            "chatWsKey",
           
        )

        response = {
            success: true,
            message: "Authorization successful",
            token,
            username: username,
            
        }

        return response;

    }
    catch(err){
        console.log(`An error occured while try to login: ${err}`);
        response = {
            succeed: false,
            message: "Authorization failed"
        }

        return response;
        
    }
}




/** get all user with their all data from all sources:
 * 1. user collection from db
 * 2. users.json file
 * 3. permission.json file
 */
/*
exports.getAllUsers = async function(){
    let usersData = null;

    try{
        //1. read all users from user.json file
        let users = await userFileDal.readUsersFromFile();
        
        //2. read all users's permissions from permissions.json
        let usersPermissions = await permissionFileDal.readPermissions();
        
        //3. get all users from DB
        let usersFromDB = await User.find({});
        //4. data shaping
        if(users != undefined && usersPermissions != undefined){
            usersData = users.map(user =>{
                let userPermissions = usersPermissions.filter(permission => permission.id === user.id);
                let userFromDB = usersFromDB.filter(u => u.id === user.id);

            return {
                    id: user.id,
                    firstName: user.firstName, 
                    lastName: user.lastName,
                    username : userFromDB[0].username,
                    sessionTimeOut: user.sessionTimeOut,
                    createdDate : user.createdDate,
                    permissions: userPermissions[0].permissions
                }
                
            })
        }
    }
    catch(err){
        console.log(`An Error occured ${err}`);
    }
    finally{
        return usersData;
    }
}
*/


/** get user by id with all his data from files and db */
/*
exports.getUserById = async function(userId){
    let users = null;
    let user = null;
    users = await this.getAllUsers();
    if(users){
        user = users.filter(user => user.id === userId)[0];
    }
    else{
        console.log(`An error occured while try to read user: ${userId} from file`);
    }

    return user;
}
*/

exports.addNewUser = async function(user){
    let isAdded = false;
    let createdUser = null;
    try{
        // 1. add to DB
        let NewUser = new User(user);
        createdUser = await NewUser.save();
        
        
        
    }
    catch(err){
        console.log(`An error occured while try to add new user: ${user.username} to DB and/or to json files: ${err}`);
        
    }
    finally{
        if(isAdded){
            return createdUser.id;
        }
        return null;
    }
}

/**
 * 
 * TODO: change this function
 */

/** update the user collection. this function is call when user update his password in db for the first time
 * after the admin create the username 
 */
exports.createAccount = async function(account){
    let success = false, msg = '';
    
    try{
        let hashPwd = await bcrypt.hash(account.password, saltRounds);

        let newAccount = {
            username: account.username,
            password: hashPwd
        }

        let NewUser = new User(newAccount);
        await NewUser.save();
        success = true;
    }
    catch(err){
        console.log(`An error occured while try add new account for username: ${account.username}`);
        msg = 'An error occured, please try again';
    }
    finally{
        let response = {
            success,
            msg
        }
        return response;
    }

}

