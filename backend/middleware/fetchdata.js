//import the jsonwebtocken 
var jwt = require('jsonwebtoken');

const JWT_SECRET = "sanjaysingh";

const fetchdata = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid user token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        console.log(error.massage); 
        return res.status(401).send("Intrnal server error");
    }
}

module.exports = fetchdata;