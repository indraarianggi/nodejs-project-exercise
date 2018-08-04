const fs = require('fs');

module.exports = {
    savedImage: function(path) {
        return path.replace('public', '');
    },

    deleteImage: function(image) {
        let imagePath = `public${image}`;
        fs.unlink(imagePath, function(err) {
            if(err) throw err;
        });
    }
}
