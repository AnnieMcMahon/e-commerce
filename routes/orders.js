// GET /orders
// GET /orders/{orderId}

const db = require('../db');

const getOrders = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getOrderById = (request, response) => {
  const id = parseInt(request.params.id)
  db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

module.exports = {
  getOrders,
  getOrderById
};