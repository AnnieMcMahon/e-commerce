// POST /cart
// POST /cart/{cartId}
// GET /cart/{cartId}
// POST /cart/{cartId}/checkout

const db = require('../db');

// exports.listProducts = async (req, res) => {

//   const { city, region, country } = req.query
//   let response

//   if (city && region && country) {
//     response = await db.query('SELECT * FROM products WHERE city = $1 AND region = $2 AND country = $3', [city,region,country]);
//   } else {
//     response = await db.query('SELECT * FROM products ORDER BY productName ASC'); 
//   }

//   if (response.rowCount > 0) {
//      res.status(200).send(response.rows);
//   } else {
//      res.status(404).send({ message: "No products found" });
//   }
// };

const updateQuantity = (request, response) => {
  const userId = parseInt(request.params.id);
  const productId = parseInt(request.query.productId);
  const quantity = parseInt(request.query.qty);
  console.log(`userId: ${userId} productId: ${productId} quantity: ${quantity}`);
  db.query(
    'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
    [quantity, userId, productId],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Quantity updated with ${quantity}`);
    })
};

const addItemToCart = (request, response) => {
  const userId = parseInt(request.params.id);
  const productId = parseInt(request.query.productId);
  const qty = 1;
  db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)',
    [userId, productId, qty], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(userId, productId, qty);
    })
}

const viewCart = (request, response) => {
  const id = parseInt(request.params.id)
  db.query('SELECT * FROM cart_items WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

// const checkOutCart = (request, response) => {
//   const { id } = request.body
//   //to be completed
// }

module.exports = {
  viewCart,
  addItemToCart,
  updateQuantity
  // checkOutCart
};