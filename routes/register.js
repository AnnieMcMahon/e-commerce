const db = require('../db');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// const { getUserById, getUserByEmail } = require('./users');

// passport.deserializeUser((id, done) => {
//   getUserById(id, function (err, user) {
//     if (err) {
//       return done(err);
//     }
//     done(null, user);
//   })
// });

// passport.use(
//   new LocalStrategy(function (email, password, done) {
//     getUserByEmail(email, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (user.password != password) {
//         return done(null, false);
//       }
//       return done(null, user);
//     })
//   }));

// const loginUser = (request, response) => {
//   response.redirect("/profile");
// };

// const authenticate = passport.authenticate("local", 
// { failureRedirect: "/login" });

const registerUser = (request, response) => {
  const { email, password } = request.body
  db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
};

module.exports = {
  // loginUser,
  registerUser 
  // authenticate
};