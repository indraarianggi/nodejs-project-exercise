module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        
        req.flash('error', 'You are not authenticated, please login first');
        res.redirect('/user/login');
    }
}
