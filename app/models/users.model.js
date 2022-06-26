module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.INTEGER,
    },
    progress: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    courses: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
