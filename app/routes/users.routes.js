module.exports = (app, passport) => {
  const users = require('../controllers/user.controller.js');
  var router = require('express').Router();
  // router.post('/', users.create);
  router.post('/user', users.findUser);
  router.get('/signup', users.signup);
  router.get('/signin', users.signin);
  router.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/',
    })
  );
  router.get('/logout', users.logout);
  router.post(
    '/signin',
    passport.authenticate('local-signin', {
      successRedirect: '/',
      failureRedirect: '/',
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }
  app.use('/api/users', router);
};
