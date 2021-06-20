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

