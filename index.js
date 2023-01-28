const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require("express-session");
const store = new session.MemoryStore();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
    store
  }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  }));

app.get('/', (request, response) => { response.json({ info: 'Node.js, Express, and Postgres API' }) });

const reg = require('./routes/register');
app.post('/register', reg.registerUser);
app.post('/login', req.authenticate,reg.loginUser);

//http://localhost:4001/users/1 to test
const user = require('./routes/users');
app.get('/users/', user.getUsers);
app.get('/users/:id', user.getUserById);
app.put('/users/:id', user.updateUser);
app.delete('/users/:id', user.deleteUser);

// GET /products?category={categoryId}
// GET /products/{productId}
const prod = require('./routes/products');
app.get('products?category={categoryId}', prod.getProductsByCategory);
app.get('products/:id'.prod.getProductById);

const cart = require('./routes/cart');
app.post('cart', cart.createNewCart);
app.post('cart/:id', cart.addCartItem);
app.get('cart/:id', cart.getCartById);

app.post('cart/:id/checkout', cart.checkOutCart);

const order = require('./routes/orders');
app.get('/orders/', order.getOrders);
app.get('/orders/:id', order.getOrderById);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


