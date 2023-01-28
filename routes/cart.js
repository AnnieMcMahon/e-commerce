// POST /cart
// POST /cart/{cartId}
// GET /cart/{cartId}
// POST /cart/{cartId}/checkout

const db = require('../db');

const createNewCart = (request, response) => {
  const {  } = request.body
//to be completed
};

const addCartItem = (request, response) => {
  const {  } = request.body
//to be completed
};

const getCartById = (request, response) => {
  const { id } = request.body
//to be completed
};

const checkOutCart = (request, response) => {
  const { id } = request.body
  //to be completed
}

module.exports = {
  createNewCart,
  addCartItem,
  getCartById,
  checkOutCart
};