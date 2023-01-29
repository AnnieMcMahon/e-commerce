const db = require('../db');

const getUsers = (request, response) => {
  db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getUserByEmail = (request, response) => {
  const email = request.params.email;
  db.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const email = request.query.email;
  const password = request.query.password;
  db.query(
    'UPDATE users SET email = $1, password = $2 WHERE id = $3',
    [email, password, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    })
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser
};
