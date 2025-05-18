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
        return res.status(400).json({
            success: false,
            message: errors.array()
        }); //400 is bad request
    }
    try {
        let user = await User.findOne({ emails: req.body.emails });
        if (user) {
            return res.status(400).json({ success: false, errors: "sorry this user already exist with this emails" });
        }
        const salt = await bcrypt.genSalt(10); //return promise so use await ,
        const secpassword = await bcrypt.hash(req.body.password, salt); // use await bcs it return promise
        user = await User.create({
            name: req.body.name,
            emails: req.body.emails,
            password: secpassword
        })
        res.json({ success: true, message: "account created successfully" });
    } catch (error) {
        console.log(error.massage);
        res.status(500).send({
            success: false,
            message: "Intrnal server error"
        });
    }

})
//route:2 user login require using: post "api/auth/login" no logined required
router.post('/loginuser', [
    body('emails', 'enter a valid emails').isEmail(),
    body('password', 'enter password atleast minimum 8 characters').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()
        }); //400 is bad request
    }

    const { emails, password } = req.body;
    try {
        let user = await User.findOne({ emails });
        console.log(user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid email or password"  //400 is bad request
            });
        }
        const compPassword = await bcrypt.compare(password, user.password);
        console.log(compPassword);
        if (!compPassword) {
            return res.status(400).json({ success: false, message: "invalid email or password" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        res.json({
            success: true,
            auth_token,
            message: "login successfully"
        });
    } catch (error) {
        console.log(error.massage);
        return res.status(500).send({
            success: false,
            message: "Intrnal server error"
        });
    }
})

//route:3 get logedin user details using: post "api/auth/fetchdata" login required
router.post('/fetchuser', fetchdata, async (req, res) => {
    try {
        console.log(req.user.id)
        const user = await User.findById(req.user.id).select("-password");
        console.log(user)
        res.status(200).send({
            success: true,
            message: "user details",
            user
        });
    } catch (error) {
        console.log(error.massage);
        return res.status(500).send({
            success: false,
            message: "Intrnal server error"
        });
    }
});


router.post('/forgot-password', [body('emails', 'enter a valid emails').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mynotebook.gov.in@gmail.com',
            pass: 'fdsypytrczpbqihp'
        }
    });
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()
        }); //400 is bad request
    }
    const { emails } = req.body;
    if (!emails) {
        return res.status(400).json({
            success: false,
            message: "please enter your email"
        });
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
                from: "mynotebook.gov.in@gmail.com",
                to: emails,
                subject: "myNoteBook-Reset your password ",
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>myNoteBook</title>
                        <style>
                                body {
                                    margin: 0;
                                    padding: 0;
                                    font-family: Arial, sans-serif;
                                    background-color: #d2dce1;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    background-color: #ffffff;
                                }
                                .header {
                                    background-color: #01111a;
                                    color: #ffffff;
                                    padding: 20px;
                                    text-align: center;
                                }
                                .content {
                                    padding: 20px;
                                }
                                .awesome{
                                    color: red;
                                }
                                .button {
                                    display: block;
                                    width: 150px;
                                    margin: 20px auto;
                                    padding: 10px;
                                    background-color: #075186;
                                    color: #ffffff;
                                    text-align: center;
                                    text-decoration: none;
                                    border-radius: 4px;
                                }
                                .footer {
                                    background-color: #f4f4f4;
                                    padding: 20px;
                                }
                            </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Welcome to myNoteBook</h1>
                
                                <div class="content">
                                    <p>Hii ${userName},</p>
                                    <h4>Make something <span class="awesome">Awesome</span></h4>
                                    <p style="color: red;">This is valid only for 5 minutes</p>
                                    <a
                                        href="https://mynoteb00kapp.netlify.app/new-password/${user.id}/${auth_token}"
                                        class="button">Reset password</a>
                                </div>
                            </div>
                            <p>myNoteBook is made from the pain of writing all the
                                things in a notebook which is very hectic. So we made an
                                online web platform where you can create, edit, upload,
                                delete your notes/information privately and securely
                                without any disturbance. You can also access your notes
                                anywhere in your world, at any time. So don't forget to
                                create a note because creating anything is always
                                important.</p>
                
                            <div class="footer">
                                <p style="text-align: center;">© 2024 myNoteBook. All rights
                                    reserved.</p>
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
            res.json({
                success: true,
                message: "message send successfully",
            });
        }
        else {
            console.log("massage not send")
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Intrnal server error"
        });
    }

})

router.get('/new-password/:id/:auth_token', async (req, res) => {
    const { id, auth_token } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).send({
                success: false, message: "User not found"
            });
        }
        const token = jwt.verify(auth_token, JWT_SECRET)
        if (!token) {
            return res.status(401).send({ success: false, message: "something went wrong! try again" });
        }
        res.send({
            success: true,
            message: "user found",
            user_id: id,
            auth_token: auth_token
        });
    } catch (error) {
        console.log(error.massage);
        return res.status(500).send({
            success: false,
            message: "Intrnal server error"
        });
    }

});

router.post('/update-password/:id/:auth_token', [body('password', 'enter password atleast minimum 8 characters').isLength({ min: 8 })], async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()
        }); //400 is bad request
    }
    try {
        const salt = await bcrypt.genSalt(10); //return promise so use await ,
        const secpassword = await bcrypt.hash(password, salt);
        // use await bcs it return promise
        await User.findByIdAndUpdate({ _id: id }, { password: secpassword });
        const data = {
            user: {
                id: id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        res.json({
            success: true,
            auth_token,
            message: "password updated successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Intrnal server error"
        });
    }

})


module.exports = router;