const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
    googleID: {
        type    : String,
        required: false
    },
    name: {
        type    : String,
        required: true
    },
    email: {
        type    : String,
        required: true
    },
    password: {
        type    : String
    },
    telephone: {
        type: String
    },
    address: {
        address : String,
        district: String,
        province: String,
        postal_code : String,
        state   : String
    },
    image: {
        type    : String
    },
    instagram: {
        type    : String
    },
    date: {
        type    : Date,
        default : Date.now
    }
});

// UserSchema.methods.encryptPassword = (password) => {
//     bcrypt.genSalt(0, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//             if(err) {
//                 console.log(err);
//             } else {
//                 return hash;
//             }
//         });
//     });
// }

UserSchema.methods.validatePassword = (inputPass) => {
    bcrypt.compare(inputPass, this.password, (err, isMatch) => {
        if(err) {
            console.log(err);
        } else {
            return isMatch;
        }
    });
}

module.exports = mongoose.model('User', UserSchema);
