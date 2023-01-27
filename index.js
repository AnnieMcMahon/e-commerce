const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  }));

app.get('/', (request, response) => { response.json({ info: 'Node.js, Express, and Postgres API' }) });

//http://localhost:4001/users/1 to test
const db = require('./routes/user');
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.static('public'));

