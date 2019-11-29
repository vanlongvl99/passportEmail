
module.exports = function(app, passport) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        if (req.isAuthenticated())
            res.redirect("/profile");
        else
        res.render('index.ejs'); // load the index.ejs file
    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/signin', function(req, res) {
        // render the page and pass in any flash data if it exists
        if (req.isAuthenticated())
            res.redirect('/profile');
        else
        res.render('signin.ejs', { message: req.flash('loginMessage') });
    });
    // process the login form
    app.post('/signin', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signin', // redirect back to the signin page if there is an error
            failureFlash : true // allow flash messages
        }),function(req, res){
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
    });
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', (req, res) => res.render('signup.ejs', { message: req.flash('signupMessage')}));
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // =====================================
    // Proflie     =========================
    // =====================================
    app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/signin');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}





