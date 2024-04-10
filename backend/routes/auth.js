//import the express 
const express = require('express');

//import the user schemas file 
const User = require('../schema/User');

// import the express validator to enter the valid value by the user
const { body, validationResult } = require('express-validator');

//import the bcrypt , bcrypt is help us to secure the password  
var bcrypt = require('bcryptjs');

//import the jsonwebtocken 
var jwt = require('jsonwebtoken');

//import the express router to route the page
const router = express.Router();

//import fetchdata file
const fetchdata= require('../middleware/fetchdata');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

//router.post is use to post the data on the server(for use to post methode)

//route:1 Authenticate a user using: post "api/auth/createuser" no login required
router.post('/createuser', [
    body('name', 'enter name').notEmpty(), //use express validator name is not empty
    body('emails', 'enter a valid emails').isEmail(),
    /* body('contact', 'enter a valid contact').isLength({ min: 10 }).isLength({ max: 10 }), */
    body('password', 'enter password atleast minimum 8 characters').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() }); //400 is bad request
    }
    try {
        let user = await User.findOne({ emails: req.body.emails });
        if (user) {
          const success=false;
            return res.status(400).json({success, errors: "sorry this user already exist with this emails" });
        }
        const salt = await bcrypt.genSalt(10); //return promise so use await ,
        const secpassword = await bcrypt.hash(req.body.password, salt); // use await bcs it return promise
        user = await User.create({
            name: req.body.name,
            emails: req.body.emails,
            /* contact: req.body.contact, */
            password: secpassword
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
      const  success=true;
        res.json({success, auth_token });
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Interna; server error");
    }

})
//route:2 user login require using: post "api/auth/login" no logined required
router.post('/loginuser', [
    body('emails', 'enter a valid emails').isEmail(),
    body('password', 'enter password atleast minimum 8 characters').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //400 is bad request
    }

    const { emails, password } = req.body;
    try {
        let user = await User.findOne({ emails });
        console.log(user);
        if (!user) {
          const  success=false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }
        const compPassword = await bcrypt.compare(password, user.password);
        console.log(compPassword);
        if (!compPassword) {
          const  success=false;
           return res.status(400).json({success, error: "Please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
      const  success=true;
        res.json({ success, auth_token });
    } catch (error) {
        console.log(error.massage);
       return res.status(500).send("Intrnal server error");
    }
})

//route:3 get logedin user details using: post "api/auth/fetchdata" login required
router.post('/fetchuser',fetchdata, async (req, res) => {
    try {
        const user_id=req.user.id;
        const user=await User.findById(user_id).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.massage);
       return res.status(500).send("Intrnal server error2");
    }

})

router.post('/forgot-password',[body('emails', 'enter a valid emails').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() }); //400 is bad request
    }
   console.log(req.body)
   const  {emails}= req.body;
   if(!emails){
    return res.status(400).json({massage: "enter your email" });
   }
   
})


module.exports = router;