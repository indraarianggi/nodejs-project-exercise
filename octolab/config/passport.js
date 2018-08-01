const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(profile);

    // remove size from profile photo url
    const imageurl = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
    
    const newUser = {
        googleID    : profile.id,
        name        : `${profile.name.givenName} ${profile.name.familyName}`,
        email       : profile.emails[0].value,
        image       : imageurl
    }

    // Check for existing user
    User.findOne({
        googleID: profile.id
    }).then(user => {
        if(user) {
            // return user
            done(null, user);
        } else {
            // create new user
            new User(newUser)
                .save()
                .then(user => done(null, user));
        }
    });
}));

// Local Strategy - Signup
passport.use('local.signup', new LocalStrategy({
    // configuration
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    if(req.body.password != req.body.conf_password) {
        return done(null, false, {message: 'Password did not match.'})
    }
    
    User.findOne({email: email})
        .then(user => {
            // user already exist
            if(user) {
                return done(null, false, {message: `User with email ${email} already exist.`});
            }

            // create new user
            const newUser = new User({
                name        : req.body.name,
                email       : email
            });
            
            bcrypt.genSalt(0, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) {
                        console.log(err);
                    } else {
                        newUser.password = hash

                        new User(newUser)
                            .save()
                            .then(user => done(null, user));
                    }
                });
            });
        });
}));

// Local Strategy - Log In
passport.use('local.login', new LocalStrategy({
    // configuration
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email})
        .then(user => {
            if(!user) {
                return done(null, false, {message: `User with email ${email} not found.`});
            }

            if(!user.password) {
                return done(null, false, {message: `User with email ${email} registered using Google account, please continue with Google.`});
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) {
                    console.log(err);
                }

                if(isMatch) {
                    // User exist and password match
                    return done(null, user);
                } else {
                    // Password did not match
                    return done(null, false, {message: 'Password did not match.'});
                }
            });            
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(user => done(null, user));
});
