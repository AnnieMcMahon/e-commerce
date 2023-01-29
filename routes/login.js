const db = require('../db');

const loginUser = (request, response) => {
  const email = request.param.email;
  const password = request.param.password;
  const done = request.param.done;
  db.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      return done(error);
    }
    if (!results) {
      return done(null, false, { message: 'Incorrect email.'});
    }
    if (results.password != password) {
      return done(null, false, { message: 'Incorrect password.'});
    }
    return done(null, results);
  })
}

module.exports = {
  loginUser
};


