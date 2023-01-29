const db = require('../db');

const registerUser = (request, response) => {
  const email = request.query.email;
  const password = request.query.password;
  db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added: ${email}`)
    })
};

const loginUser = (request, response) => {
  response.redirect('/cart');
};


module.exports = {
  loginUser,
  registerUser 
};