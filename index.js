const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static('public'));

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

// const reg = require('./routes/register');
// app.post('/register', reg.registerUser);
// app.post('/login', req.authenticate,reg.loginUser);

//http://localhost:4001/users/1 to test
//http://localhost:4001/users/1?email=user1@yahoo.com&password=1234567 to test PUT path
const { getUsers, getUserById, updateUser } = require('./routes/users');
app.get('/users/', getUsers);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);

// GET /products?category={categoryId}
const { getProductsByCategory, getProductById } = require('./routes/products');
app.get('/products/', getProductsByCategory);
app.get('/products/:id', getProductById);

const { viewCart, addItemToCart, updateQuantity } = require('./routes/cart');
app.get('/cart/:id', viewCart);
app.post('/cart/:id', addItemToCart);
app.put('/cart/:id', updateQuantity);


// app.post('cart/:id/checkout', cart.checkOutCart);

const { getOrders, getOrderById } = require('./routes/orders');
// app.get('/orders/', getOrders);
// app.get('/orders/:id', getOrderById);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


