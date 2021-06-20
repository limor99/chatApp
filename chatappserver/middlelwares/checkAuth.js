const jwt = require('jsonwebtoken');

/**
 * This function check if user has autorization
 *  
 */

const checkAuth =  () =>{
    return function(req, resp, next){
        let response = {
            success: false,
            msg: "Authorization failed"
        }

        let authHeader = req.headers.authorization;

        if(authHeader){
            let token = authHeader.split(' ')[1];

            jwt.verify(token, "chatWsKey", (err) =>{
                if(err){
                    resp.json(response);
                }
                else{
                    next();
                }
            })
        }
        else{
            resp.json(response);
        }
    }
}


module.exports = checkAuth;

