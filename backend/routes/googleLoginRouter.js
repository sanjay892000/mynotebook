const express = require('express');
require('dotenv').config();
const passport = require("passport");
const userdb = require('../schema/GoogleLoginUser');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const router = express.Router();
const clientid = process.env.CLIENT_ID;
const secretid = process.env.SECRET_ID;



passport.use(
  new OAuth2Strategy({
    clientID: clientid,
    clientSecret: secretid,
    callbackURL: "/api/auth/google/callback",
    scope: ["profile", "email"]
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      try {
        let user = await userdb.findOne({ googleId: profile.id });

        if (!user) {
          user = new userdb({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
          });

          await user.save();
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)
passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
});


// initial google ouath login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:3000/",
  failureRedirect: "http://localhost:3000/login"
}))
router.get("/getuser", async (req, res) => {

  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user })
  } else {
    res.status(400).json({ message: "Not Authorized" })
  }
})

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect("http://localhost:3000");
  })
})

module.exports = router;