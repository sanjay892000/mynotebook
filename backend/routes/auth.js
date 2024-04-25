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
const fetchdata = require('../middleware/fetchdata');
require('dotenv').config();
const nodemailer = require('nodemailer');

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
        return res.status(400).json({ errors: errors.array() }); //400 is bad request
    }
    try {
        let user = await User.findOne({ emails: req.body.emails });
        if (user) {
            const success = false;
            return res.status(400).json({ success, errors: "sorry this user already exist with this emails" });
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
        const success = true;
        res.json({ success, auth_token });
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
            const success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const compPassword = await bcrypt.compare(password, user.password);
        console.log(compPassword);
        if (!compPassword) {
            const success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        const success = true;
        res.json({ success, auth_token });
    } catch (error) {
        console.log(error.massage);
        return res.status(500).send("Intrnal server error");
    }
})

//route:3 get logedin user details using: post "api/auth/fetchdata" login required
router.post('/fetchuser', fetchdata, async (req, res) => {
    try {
        const user_id = req.user.id;
        const user = await User.findById(user_id).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.massage);
        return res.status(500).send("Intrnal server error2");
    }

});


router.post('/forgot-password', [body('emails', 'enter a valid emails').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sanjay892000@gmail.com',
            pass: 'ltunopvpjtmgarie'
        }
    });
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //400 is bad request
    }
    const { emails } = req.body;
    if (!emails) {
        return res.status(400).json({ massage: "enter your email" });
    }
    try {
        
        const user = await User.findOne({ emails: emails });
        const userName = user.name;
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET, { expiresIn: "5m" });
        if (auth_token) {
            const mailOptions = {
                from: "sanjay892000@gmail.com",
                to: emails,
                subject: "myNoteBook reset password",
                /* text: `This link valid only for 5 minutes https://mynotebook-crtdby-sanjay.netlify.app/new-password/${user.id}/${auth_token} `, */
                html:`<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>myNoteBook</title>
                    </head>
                    <body>
                        <div class="main" style="height: auto;
                        width: 100vw;
                        background: #d2dce1;
                        display: flex;
                        flex-direction: column;
                        align-items: center; ">
                            <div class="top-page" style="height: auto;
                            width: 100%;
                            background: #01111a;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-evenly;">
                                <h1 style="color: white;
                                text-align: center;
                                margin: 10px 0px;
                                padding: 5px;">Welcome to myNoteBook <hr></h1>
                                <p style="color: white;
                                text-align: center;
                                margin: 10px 0px;
                                padding: 5px;">Hii ${userName},</p>
                                <h4 style="color: white;
                                text-align: center;
                                margin: 10px 0px;
                                padding: 5px;">Make something<span style="color:red;"> Awesome</span></h4>
                                <p style="color: red;
                                text-align: center;
                                margin: 10px 0px;
                                padding: 5px;">This is valid only for 5 minutes</p>
                                <button style=" height: 50px;
                                width: 150px;
                                color: white;
                                background-color: #075186;
                                border-radius: 4px;
                                cursor: pointer;
                                margin: 10px;"> <a href="https://mynotebook-crtdby-sanjay.netlify.app/new-password/${user.id}/${auth_token}"></a> Reset password</button>
                                <div style="height: auto;
                                width: 100%;
                                background: #ffffff;">
                                <p style="color: rgb(0, 0, 0);
                                text-align: center;
                                margin: 10px 0px;
                                padding: 10px; font-family:arial;" >myNoteBook is made from the pain of writing all the things in
                                    notebook which is very hectic So we mad an online web
                                    platform where you can create, edit, upload, delete your
                                    notes/information privately and securely without any
                                    disturbancee. you can also access your notes anywhere in
                                    your world, at anytime time . So dont forget to Create note
                                    because creating anything is always important.</p></div>
                            </div>
                        </div>
                
                    </body>
                </html>`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return res.status(401).send("message not send");
                }
                else {
                    console.log('Message sent: %s', info.response);
                    return res.status(201).send("message send");
                }
            });
            const success=true;
            res.json({success,message:"message send"});
        }
        else{
            console.log("massage not send")
        }
    }
    catch (error) {
        return res.status(500).send("Intrnal server error2");
    }

})

router.get('/new-password/:id/:auth_token', async (req, res) => {
    const { id, auth_token } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        const token = jwt.verify(auth_token,JWT_SECRET)
        res.send(user,token);
    } catch (error) {
        console.log(error.massage);
        return res.status(500).send("Intrnal server error2");
    }

});

router.post('/update-password/:id/:auth_token', [body('password', 'enter password atleast minimum 8 characters').isLength({ min: 8 })], async (req, res) => {
    const {id}  = req.params;
    const {password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //400 is bad request
    }
    try {
        const salt = await bcrypt.genSalt(10); //return promise so use await ,
        const secpassword = await bcrypt.hash(password, salt);
        // use await bcs it return promise
        const setPassword = await User.findByIdAndUpdate({_id:id},{password:secpassword}) ;
        setPassword.save();
        const data = {
            user: {
                id: id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        const success = true;
        res.json({ success, auth_token });
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Interna; server error");
    }

})


module.exports = router;