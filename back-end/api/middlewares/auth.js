const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()
const salt = process.env.SALT;
module.exports = (req, res, next)=>{
    console.log(req.headers)
    try{
        const decode = jwt.verify(req.headers.authorization.split(" ")[1], salt);
        req.userData = decode;
        next();
    }
    catch (error){
        res.status(500).json({
            Message : "Auth Error"
        });
    }
};