const db = require('../db')

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createUser = (request, response) => {
  const { email, password } = request.body
  db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password], 
    (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { email, password } = request.body
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

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)
  db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
