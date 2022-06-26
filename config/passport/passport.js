//load bcrypt
var bCrypt = require('bcrypt');

module.exports = function (passport, user) {
  var User = user;

  var LocalStrategy = require('passport-local').Strategy;
  var AuthTokenStrategy = require('passport-auth-token').Strategy;

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      async function (req, email, password, done) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        await User.findOne({
          where: {
            email: email,
          },
        }).then(async function (user) {
          if (user) {
            return done(null, false, {
              message: 'That email is already taken',
            });
          } else {
            var userPassword = generateHash(password);

            var data = {
              email: email,
              password: userPassword,
              name: req.body.name,
              level: req.body.level,
              courses: req.body.courses,
              img: req.body.img,
              progress: req.body.progress,
            };

            await User.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
  //serialize
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  // deserialize user
  passport.deserializeUser(async function (id, done) {
    await User.findByPk(id).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
  //LOCAL SIGNIN
  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email

        usernameField: 'email',

        passwordField: 'password',

        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      async function (req, email, password, done) {
        var User = user;

        var isValidPassword = function (userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        await User.findOne({
          where: {
            email: email,
          },
        })
          .then(function (user) {
            console.log(user);
            if (!user) {
              return done(null, false, {
                message: 'Email does not exist',
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: 'Incorrect password.',
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function (err) {
            console.log('Error:', err);

            return done(null, false, {
              message: 'Something went wrong with your Signin',
            });
          });
      }
    )
  );
};
