const express = require('express');
const customersRouter = express.Router();
import { runQuery } from "./config/config.js";

const bodyParser = require('body-parser');
customersRouter.use(bodyParser.json());
customersRouter.use(bodyParser.urlencoded({extended: true}));

// Create new customer
customersRouter.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const {id, username, password, email} = req.body
  
  await runQuery(`INSERT INTO customers (id, username, password, email) VALUES ('${id}', '${username}', '${password}', '${email}')`)
  const updatedResult = await runQuery('SELECT * from customers')
  
  res.status(201).send('User added with ID: ' + JSON.stringify(updatedResult.rows))
});

// Update username 
customersRouter.put('/:id', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  
  const { id } = req.params;
  const { username } = req.body
  
  await runQuery(`UPDATE customers SET username = '${username}' WHERE id = '${id}'`)
  const updatedResult = await runQuery(`SELECT * from customers where id = '${id}'`)
  
  res.status(201).send('Email updated' + JSON.stringify(updatedResult.rows))
});

module.exports = customersRouter;