var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

// save session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// strategy
passport.use('local.signup', new LocalStrategy(
    {
        // konfigurasi strategi
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // mencari apakah data yang diinputkan sudah ada
        User.findOne({'email': email}, (err, user) => {
            if (err) {
                // jika error
                return done(err);
            }
            if (user) {
                // jika sudah ada data dengan email yang diinputkan
                return done(null, false, {message: 'Email is already in use.'});
            }

            // jika tidak error dan belum ada data dengan email yang diinputkan
            // buat user baru
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            // simpan user baru
            newUser.save((err, result) => {
                if (err) { return done(err); }

                return done(null, newUser);
            })
        });
    }
));