/**
 * Dijalankan sekali pada tahap pengembangan (development).
 * Untuk menyiapkan data awal.
 */

var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop');

var products = [
    new Product({
        imagePath: 'http://i.ebayimg.com/00/s/MjQ1WDMwMA==/z/hSIAAOSwPhdU1ZOI/$_35.JPG?set_id=2',
        title: 'Nikon FM2',
        description: 'Great camera! This NIKON FM2 SLR film camera comes with a 50mm 1:18 NIKON Lens Series. Only used a couple of times. Used on the TV show GLEE. Great condition! Good luck!',
        price: 239.99
    }),
    new Product({
        imagePath: 'https://s1.bukalapak.com/img/661703062/w-1000/Ricoh_GX500_4.JPG',
        title: 'Ricoh 500GX',
        description: 'The Ricoh 500 GX is a handy rangefinder camera with fixed lens made in Taiwan by Ricoh. Its special feature is an easy-to-use multi-exposure facility.',
        price: 46.15
    }),
    new Product({
        imagePath: 'http://vintagecameralab.com/wp-content/uploads/canon-ae-1_021.jpg',
        title: 'Canon AE-1',
        description: 'The Canon AE-1 was one of the very first affordable SLRs with automatic exposure available to the public.',
        price: 134.62
    }),
    new Product({
        imagePath: 'http://picua.org/img/2017-10/02/lmuwjwabzga2ho1mlir254c2q.png',
        title: 'Fujicolor Industrial 400',
        description: 'Fuji Industrial 400 is a colour negative film only usually found in Japan. It offers exceptional sharpness and colour reproduction, accurately reproducing natural skin tones. With fine grain, natural looking results, even under mixed daylight conditions.',
        price: 5
    }),
    new Product({
        imagePath: 'https://i.ebayimg.com/images/g/SZQAAOSwNSxU9sJN/s-l300.jpg',
        title: 'Kodak ColorPlus 200',
        description: 'This are rolls of 35mm Color Plus 200 Negative Film from Kodak. Color Plus yields pleasing results under a variety of lighting scenarios. The film is characterized by a very sharp image with fine grain, natural color saturation and wide exposure latitude. This is a general purpose color negative film that can be used for landscape or portraits.',
        price: 3.84
    }),
    new Product({
        imagePath: 'https://www.londondrugs.com/dw/image/v2/AAJI_PRD/on/demandware.static/-/Sites-londondrugs-master/default/dw4ab243c4/products/L5440847/large/L5440847.JPG?sw=556&sh=680&sm=fit',
        title: 'Ilford HP5 Plus 400',
        description: 'HP5 PLUS is a high speed, medium contrast film making it especially suitable for action and press photography and also an excellent choice for general purpose photography.',
        price: 8.49
    })
];


var done = 0;
// simpan ke database
for (var i=0; i<products.length; i++) {
    products[i].save((err, result) => {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}