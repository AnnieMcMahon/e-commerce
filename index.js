const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();
const PORT = process.env.PORT || 4001;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require('./db');

const { registerUser } = require('./routes/register');
// const { loginUser } = require('./routes/login');
const { getUsers, getUserById, updateUser } = require('./routes/users');
const { getProductsByCategory, getProductById } = require('./routes/products');
const { viewCart, addItemToCart, updateQuantity } = require('./routes/cart');
const { getOrders, getOrderById } = require('./routes/orders');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static('public'));

// set up session
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

// set up Passport session
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      return done(error);
    }
    done(null, results);
  })
});

passport.use(new LocalStrategy((email, password, done) => {
  db.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      return done(error);
    }
    if (!results) {
      return done(null, false, { message: 'Incorrect email.'});
    }
    if (results.password != password) {
      return done(null, false, { message: 'Incorrect password.'});
    }
    return done(null, results);
  })
}));

//set up routes
app.get('/', (request, response) => { response.json({ info: 'Node.js, Express, and Postgres API' }) });

app.post('/register', registerUser);

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  (request, response) => { response.redirect('/cart');
  });


//http://localhost:4001/users/1 to test
//http://localhost:4001/users/1?email=user1@yahoo.com&password=1234567 to test PUT path
app.get('/users/', getUsers);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);

// GET /products?category={categoryId}
app.get('/products/', getProductsByCategory);
app.get('/products/:id', getProductById);

app.get('/cart/:id', viewCart);
app.post('/cart/:id', addItemToCart);
app.put('/cart/:id', updateQuantity);


// app.post('cart/:id/checkout', cart.checkOutCart);

// app.get('/orders/', getOrders);
// app.get('/orders/:id', getOrderById);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


