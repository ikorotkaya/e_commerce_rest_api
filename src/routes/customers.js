const express = require('express');
const customersRouter = express.Router();

const bodyParser = require('body-parser');
customersRouter.use(bodyParser.json());
customersRouter.use(bodyParser.urlencoded({extended: true}));

// Create new customer
customersRouter.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  await client.connect()
  const {id, username, password, email} = req.body
  
  await client.query(`INSERT INTO customers (id, username, password, email) VALUES ('${id}', '${username}', '${password}', '${email}')`)
  const updatedResult = await client.query('SELECT * from customers')
  await client.end()
  
  res.status(201).send('User added with ID: ' + JSON.stringify(updatedResult.rows))
});

// Update username 
customersRouter.put('/:id', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  
  await client.connect()
  const { id } = req.params;
  console.log(id)
  const { username } = req.body
  
  await client.query(`UPDATE customers SET username = '${username}' WHERE id = '${id}'`)
  const updatedResult = await client.query(`SELECT * from customers where id = '${id}'`)
  await client.end()
  
  res.status(201).send('Email updated' + JSON.stringify(updatedResult.rows))
});

module.exports = customersRouter;