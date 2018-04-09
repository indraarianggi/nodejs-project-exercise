// import dependencies
const express = require('express');


// instance dari express Router
const router = express.Router();

// router
router.get('/', function(req, res, next) {
    res.render('pages/landing-page');
});

router.get('/signup', function(req, res, next) {
    res.render('pages/signup');
});

router.get('/signin', function(req, res, next) {
    res.render('pages/signin');
});


module.exports = router;
