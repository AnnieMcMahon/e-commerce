// GET /products?category={categoryId}
// GET /products/{productId}

const db = require('../db');

const getProductsByCategory = (request, response) => {
  const categoryId = request.query.category;
  db.query('SELECT * FROM products WHERE category_id = $1', [categoryId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)
  db.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

module.exports = {
  getProductsByCategory,
  getProductById
};
