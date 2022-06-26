module.exports = (app) => {
  const courses = require('../controllers/courses.controller.js');
  var router = require('express').Router();
  router.post('/', courses.create);
  router.get('/', courses.findAll);
  router.get('/:id', courses.findOne);
  app.use('/api/courses', router);
};
