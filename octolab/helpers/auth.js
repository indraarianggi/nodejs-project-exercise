module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        
        req.flash('error', 'You have not logged, please log in first');
        res.redirect('/user/login');
    },
    ensureGuest: function(req, res, next) {
        if(req.isAuthenticated()) {
            req.flash('success', 'You have already logged.')
            res.redirect('/user/profile');
        } else {
            return next();
        }        
    },
    ensureAdmin: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        
        req.flash('error', 'You have not logged, please log in first');
        res.redirect('/admin/login');
    },
    ensureAdminLogged: function(req, res, next) {
        if(req.isAuthenticated()) {
            req.flash('success', 'You have already logged.')
            res.redirect('/admin/overview');
        } else {
            return next();
        }        
    }
}
