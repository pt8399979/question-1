const jwt = require('jsonwebtoken');
const User = require('./User')
const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        if(!user){
            throw new Error();
        }
        req.token = token;
        req.User = user;
        next();

    }
    catch(e){
        res.status(401).send({error: 'Please authentication.'})
    }
};


module.exports =auth;