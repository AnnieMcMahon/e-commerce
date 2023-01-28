// GET /products?category={categoryId}
// GET /products/{productId}

const db = require('../db');

const getProductsbyCategory = (request, response) => {
  const { categoryId } = request.body
//to be completed
};

const getProductbyId = (request, response) => {
  const { id } = request.body
//to be completed
};

module.exports = {
  getProductsByCategory,
  getProductById
};
