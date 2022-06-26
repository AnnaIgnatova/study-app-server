const express = require('express');
const cors = require('cors');
const app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// lets create our strategy for web token

var corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// For Passport

app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/routes/courses.routes')(app);

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to study application' });
});
// set port, listen for requests

const db = require('./app/models');
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });

//Routes
require('./app/routes/users.routes')(app, passport);
require('./config/passport/passport.js')(passport, db.users);

db.sequelize.sync().then(() => {
  console.log('Drop and re-sync db.');
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
