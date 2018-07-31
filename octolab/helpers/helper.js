module.exports = {
    encryptPassword: function(password) {
        bcrypt.genSalt(0, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    console.log(err);
                } else {
                    return hash;
                }
            });
        });
    }
}
