const express = require('express');
const customersRouter = express.Router();
const config = require('../config/config');

const bodyParser = require('body-parser');
customersRouter.use(bodyParser.json());
customersRouter.use(bodyParser.urlencoded({ extended: true }));

// Get all customers
customersRouter.get('/', async (req, res) => {
  try {
    const result = await config.runQuery('SELECT * from customers')
    res.send({
      customers: result.rows
    })
  } catch (err) {
    res.status(500).json(err.message)
  }
});

// Get customer by id
customersRouter.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await config.runQuery(`SELECT * from customers WHERE id = ${userId}`)
    res.send(result.rows)
  } catch (err) {
    res.status(400).json(err.message)
  }
});

// Create new customer
customersRouter.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body
    await config.runQuery(`INSERT INTO customers (username, password, email) VALUES ('${username}', '${password}', '${email}')`)
    await config.runQuery(`SELECT COUNT(*) FROM customers`);
    res.status(201).send('User added')
  } catch (err) {
    console.log(err)
    
    res.status(400).json(err.message)
  }
});

// Update username 
customersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body
    await config.runQuery(`UPDATE customers SET username = '${username}' WHERE id = '${id}'`)
    res.status(201).send('Email updated')
  } catch (err) {
    res.status(400).json(err.message)
  }
});

module.exports = customersRouter;