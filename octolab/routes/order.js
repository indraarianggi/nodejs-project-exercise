const express = require('express');
const multer = require('multer');
const {ensureAuthenticated} = require('../helpers/auth');
const {savedImage, deleteImage} = require('../helpers/helper');
const Order = require('../models/order');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination : 'public/images/payment_proof',
    filename    : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const uploader = multer({storage});

router.get('/confirm', ensureAuthenticated, (req, res) => {
    res.render('order/confirm', {layout: 'user.dashboard.handlebars'});
});

router.post('/confirm', ensureAuthenticated, uploader.single('image'), (req, res) => {
    let orderCode = req.body.orderCode;
    
    let image = '';
    image = savedImage(req.file.path);

    Order.findOne({orderCode: orderCode})
        .then(order => {
            if(order.user == req.user.id) {
                if(order.price) {
                    const payment = {
                        status  : true,
                        amount  : req.body.amount,
                        name    : req.body.bankAccount,
                        bank    : req.body.bank,
                        proof   : image
                    }
        
                    order.payment = payment;
                    order.invoice1 = req.body.invoice1;
                    order.status = 2; // status menjadi menunggu film sampai di OctoLab
        
                    order.save()
                        .then(order => {
                            req.flash('success', `Payment confirmation for "${order.orderCode}" was successful`);
                            res.redirect('/user/order');
                        });
                } else {
                    // hapus image yang sudah terlanjur terupload
                    deleteImage(image);

                    req.flash('error', `You can't confirm payment. The order price for "${order.orderCode}" has not been confirmed by OctoLab.`);
                    res.redirect('/order/confirm');
                }
            } else {
                // hapus image yang sudah terlanjur terupload
                deleteImage(image);
                
                req.flash('error', `You don't have an order with code "${order.orderCode}".`);
                res.redirect('/order/confirm');
            }
        });
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
            // periksa user apakah pemilik order
            if(req.user.id == order.user) {
                res.render('order/detail', {order: order, layout: 'user.dashboard.handlebars'});
            } else {
                req.flash('error', 'Failed to see order details. Access denied.')
                res.redirect('/user/order');
            }
        });
    
})

module.exports = router;
