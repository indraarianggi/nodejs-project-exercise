// import dependencies
const express = require('express');


// instance dari express Router
const router = express.Router();

// router
router.get('/', function(req, res, next) {
    res.render('pages/landing-page');
});

router.get('/seminar', function(req, res, next) {
    res.render('pages/seminar');
});

router.get('/workshop', function(req, res, next) {
    res.render('pages/workshop');
});

router.get('/space', function(req, res, next) {
    res.render('pages/booking-space');
});


module.exports = router;
