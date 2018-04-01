// import dependencies
var express = require('express');


// instance dari express Router
var router = express.Router();

// router
router.get('/', function(req, res, next) {
    res.render('pages/landing-page');
});


module.exports = router;
