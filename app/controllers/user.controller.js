const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  res.redirect('signup');
};

exports.signin = (req, res) => {
  console.log(req.cookies('token_study_app'));
  res.redirect('signin');
};

exports.logout = (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
};

exports.findUser = (req, res) => {
  const email = req.body.email;

  User.findAll({
    where: {
      email: email,
    },
  })
    .then(function (user) {
      if (user) {
        res.send(user);
      }
    })
    .catch(function (err) {
      console.log('Error:', err);
    });
};
