const db = require('../models');
const Courses = db.courses;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const course = {
    name: req.body.name,
    subtitle: req.body.subtitle,
    level: req.body.level,
    time: req.body.time,
    theory: req.body.theory,
    examples: req.body.examples,
    practise: req.body.practise,
    testing: req.body.testing,
    img: req.body.img,
  };

  Courses.create(course)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the course.',
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.name;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Courses.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving courses.',
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Courses.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Course with id=' + id,
      });
    });
};

exports.findByTitle = (req, res) => {
  const title = req.body.title;
  var condition = title ? { name: { [Op.like]: `%${title}%` } } : null;
  Courses.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving courses.',
      });
    });
};
