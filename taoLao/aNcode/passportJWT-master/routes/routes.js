var jwt = require('jsonwebtoken');
module.exports = function(app, passport) {
    // =====================================
    // HOME PAGE                    ========
    // =====================================
    app.get('/', (req, res) => res.render('index.ejs'));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.get('/signup',(req,res) => {
        // Check Authentication
        passport.authenticate('jwt',{session: false},(err,user) => {
            if (err || !user) () => res.render('signup.ejs',{'message': err || ''});
            return res.redirect('/profile');
        })(req,res);
    });
    app.post('/signup',(req,res) => {
        passport.authenticate('local-signup',{session:false},(err,user) => {
            if (err || !user) () => res.render('signup.ejs',{'message':err});
            return res.redirect('/signin');
        })(req,res);
    });

    // =====================================
    // SIGNIN ==============================
    // =====================================
    app.get('/signin', function(req, res) {
        // Check Authentication
        passport.authenticate('jwt', { session: false },(err,user) => {
            if (err || !user) {
                return res.render('signin.ejs',{'message': err || ''});
            }
            return res.redirect('/profile');
        })(req,res);
    });
    app.post('/signin', (req, res) => {
        // local-signin
        passport.authenticate('local-signin', { session: false}, (err, user) => {
            if (err || !user) {
              return res.render('signin.ejs',{'message': err || ''});
            }
            /** This is what ends up in our JWT */

            const payload = {
              sub: user.id,
              username: user.username,
              expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
              permissions: user.role
            };
            /** assigns payload to req.user */
            req.login(payload, {session: false}, (err) => {
                if (err) () => res.status(400).send({ err });
                /** generate a signed json web token and return it in the response */
                const token = jwt.sign(JSON.stringify(payload), 'Nguyen123');
                /** assign our jwt to the cookie */
                res.cookie('jwt', token, { httpOnly: true, secure: false });
                return res.redirect('/profile');
            });
        })(req, res);
    });
    // =====================================
    // Proflie     =========================
    // =====================================
    app.get('/profile', (req,res) => {
        passport.authenticate('jwt', { session: false },(err,user) => {
            if  ( err || !user) {
                return res.redirect('/signin');
            }
            return res.render('profile.ejs',{'user' : user});
        })(req,res);
    });
    // =====================================
    // Logout      =========================
    // =====================================

    //User can Logout in client side with remove Cookie
    //You can remove Cookie in Server side
    app.get('/logout', (req,res) => {
        res.clearCookie('jwt');
        res.redirect('/signin');
    });
};






