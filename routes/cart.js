// POST /cart
// POST /cart/{cartId}
// GET /cart/{cartId}
// POST /cart/{cartId}/checkout

const db = require('../db');

const viewCart = (request, response) => {
  const id = parseInt(request.params.id)
  db.query('SELECT * FROM cart_items WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const addItemToCart = (request, response) => {
  const userId = parseInt(request.params.id);
  const productId = parseInt(request.query.productId);
  const qty = 1;
  db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)', 
  [userId, productId, qty], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(userId, productId, qty);
  })
};

// const checkOutCart = (request, response) => {
//   const { id } = request.body
//   //to be completed
// }

module.exports = {
  viewCart,
  addItemToCart
  // checkOutCart
};