const db = require('../models');
const config = require('../../config/auth.config');
const User = db.users;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    email: req.body.email,
    level: req.body.level,
    progress: req.body.progress,
    img: req.body.img,
    courses: req.body.courses,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => {
      res.send({ message: 'User was registered successfully!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];

      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        courses: user.courses,
        img: user.img,
        level: user.level,
        progress: user.progress,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

exports.changeUserData = (req, res) => {
  const id = req.params.id;
  const value = req.body.value;
  const type = req.body.type;

  User.update({ [type]: value }, { where: { id } })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
