const express =require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const gUser = require('./models/gUser');
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
function(accessToken, refreshToken, profile, cb){
    gUser.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
));

module.exports = passport;