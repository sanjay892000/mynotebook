//import the jsonwebtocken 
require('dotenv').config();
var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const fetchdata = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({
            success: false,
            message: "Please authenticate using a valid token"
         })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Please authenticate using a valid token"
        });
    }
}

module.exports = fetchdata;