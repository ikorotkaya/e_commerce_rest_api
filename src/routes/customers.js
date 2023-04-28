const express = require('express');
const customersRouter = express.Router();
const config = require('../config/config');

const bodyParser = require('body-parser');
customersRouter.use(bodyParser.json());
customersRouter.use(bodyParser.urlencoded({extended: true}));

// Get all customers
customersRouter.get('/', async (req, res) => {
  const result = await config.runQuery('SELECT * from customers')

  res.send({
    customers: result.rows
  })
});

// Create new customer
customersRouter.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const {id, username, password, email} = req.body
  
  await config.runQuery(`INSERT INTO customers (id, username, password, email) VALUES ('${id}', '${username}', '${password}', '${email}')`)
  const updatedResult = await config.runQuery('SELECT * from customers')
  
  res.status(201).send('User added with ID: ' + JSON.stringify(updatedResult.rows))
});

// Update username 
customersRouter.put('/:id', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  
  const { id } = req.params;
  const { username } = req.body
  
  await config.runQuery(`UPDATE customers SET username = '${username}' WHERE id = '${id}'`)
  const updatedResult = await config.runQuery(`SELECT * from customers where id = '${id}'`)
  
  res.status(201).send('Email updated' + JSON.stringify(updatedResult.rows))
});

module.exports = customersRouter;