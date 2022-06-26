module.exports = (sequelize, Sequelize) => {
  const Courses = sequelize.define('courses', {
    name: {
      type: Sequelize.STRING,
    },
    subtitle: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.INTEGER,
    },
    time: {
      type: Sequelize.INTEGER,
    },
    theory: {
      type: Sequelize.STRING,
    },
    examples: {
      type: Sequelize.STRING,
    },
    practise: {
      type: Sequelize.STRING,
    },
    testing: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
    },
  });
  return Courses;
};
