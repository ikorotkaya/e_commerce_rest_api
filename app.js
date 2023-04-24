const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const session = require("express-session")

const { Client } = require('pg')
const client = new Client({
  user: 'irinakorotkaya',
  host: 'localhost',
  database: 'ecommerce_book_store',
  password: '',
  port: 5432,
})

app.use(
  session({
    secret: "D53gxl41G",
    cookie: {maxAge: 172800000, secure: true, sameSite: 'none'},
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json())
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

app.get('/authors', async (req, res) => {
  await client.connect()
  // select * from authors => json
  const result = await client.query('SELECT * from author')
  console.log(result)
  await client.end()
  
  res.send({
    authors: result.rows
  })
});

app.get('/authors/:id', async (req, res) => {
  await client.connect()
  const userId = req.params.id;
  // select * from authors => json
  const result = await client.query(`SELECT * from authors WHERE id = ${userId}`)
  console.log(result)
  await client.end()
  
  res.send(result.rows)
});

app.get('/genres', async (req, res) => {
  await client.connect()
  const result = await client.query('SELECT * from genres')
  console.log(result)
  await client.end()
  
  res.send({
    genres: result.rows
  })
});

app.get('/books', async (req, res) => {
  await client.connect()
  const result = await client.query('SELECT * from books')
  console.log(result)
  await client.end()
  
  res.send({
    books: result.rows
  })
});

// Create new customer
app.post('/customers', urlencodedParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  await client.connect()
  const {id, username, password, email} = req.body

  const result = await client.query(`INSERT INTO customers (id, username, password, email) VALUES ('${id}', '${username}', '${password}', '${email}')`)
  const updatedResult = await client.query('SELECT * from customers')
  await client.end()

  res.status(201).send('User added with ID: ' + JSON.stringify(updatedResult.rows))
});

// Create new order
app.post('/orders', urlencodedParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  await client.connect()
  const {id, date, customer_id, total_price} = req.body

  const result = await client.query(`INSERT INTO orders (id, date, customer_id, total_price) VALUES ('${id}', '${date}', '${customer_id}', '${total_price}')`)
  const updatedResult = await client.query('SELECT * from orders')
  await client.end()

  res.status(201).send('Order added ' + JSON.stringify(updatedResult.rows))
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
