const express = require('express');
const multer = require('multer');
const {ensureAuthenticated} = require('../helpers/auth');
const {savedImage, deleteImage} = require('../helpers/helper');
const Order = require('../models/order');

const router = express.Router();

router.get('/confirm', ensureAuthenticated, (req, res) => {
    res.render('order/confirm', {layout: 'user.dashboard.handlebars'});
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('order/add', {layout: 'user.dashboard.handlebars'});
});

router.post('/add', ensureAuthenticated, (req, res) => {
    let numFilm = req.body.numFilm;
    let detailFilms = req.body.detailFilm;
    let detailQuantities = req.body.detailQuantity;
    let detailInstructions = req.body.detailInstruction;
    let detailNotes = req.body.detailNote;

    let details = [];
    if(numFilm == 1) {
        content = {
            detailFilm          : detailFilms,
            detailQuantity      : detailQuantities,
            detailInstruction   : detailInstructions,
            detailNote          : detailNotes
        }

        details.push(content);
    } else {
        let n = detailFilms.length;
        for(i=0;i<n;i++) {
            content = {
                detailFilm          : detailFilms[i],
                detailQuantity      : detailQuantities[i],
                detailInstruction   : detailInstructions[i],
                detailNote          : detailNotes[i]
            }

            details.push(content);
        }
    }

    let sendBack;
    let allowPost;

    if(req.body.sendBack) {
        sendBack = true;
    } else {
        sendBack = false
    }
    if(req.body.allowPost) {
        allowPost = true;
    } else {
        allowPost = false;
    }

    let note = req.body.note;
    
    Order.countDocuments({}, function(err, count) {
        let code = `OL${count+1}`;

        const newOrder = {
            orderCode   : code,
            user        : req.user.id,
            details     : details,
            status      : 0,
            sendBack    : sendBack,
            allowPost   : allowPost,
            note        : note
        }
        
        new Order(newOrder)
            .save()
            .then(order => {
                req.flash('success', 'Order created successfully.')
                res.redirect('/user/order');
            });
    });

});

router.get('/detail/:id', ensureAuthenticated, (req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            res.render('order/detail', {order: order, layout: 'user.dashboard.handlebars'});
        });
    
})

module.exports = router;
