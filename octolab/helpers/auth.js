module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        
        req.flash('error', 'You have not logged, please log in first');
        res.redirect('/user/login');
    }
}
