var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var User = require('../user/User');

var jwt = require('jsonwebtoken');
var config = require('../config');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {
    // encrypt the password
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }, 
    function(err, user) {
        if (err) return res.status(500).send("There was a problem registering the user");

        // success => create a token
        var token = jwt.sign(
            { id: user._id },
            config.secret,
            { expiresIn: 86400 } // 24 hours
        );

        res.status(200).send({ auth: true, token: token });
    });

});

// get user id based on the token from register endpoint.
router.get('/me', function(req, res) {
    // get token from headers of HTTP request
    // The default name for a token in the headers of an HTTP request is x-access-token
    var token = req.headers['x-access-token'];
    
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    // decodes the token making it possible to view the original payload
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // find user by id from decoded token
        User.findById(decoded.id, {password: 0}, function(err, user){
            if (err) return res.status(500).send("There was a problem finding the user.");

            if (!user) return res.status(404).send('No user found');

            res.status(200).send(user);
        })
    });
});


module.exports = router;