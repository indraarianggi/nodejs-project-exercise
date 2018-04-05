// import dependencies
const express = require('express');


// instance dari express Router
const router = express.Router();

// router
router.get('/', function(req, res, next) {
    res.render('pages/landing-page');
});


module.exports = router;
