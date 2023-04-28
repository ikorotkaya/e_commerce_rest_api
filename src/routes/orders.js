const express = require('express');
const ordersRouter = express.Router();
const config = require('../config/config');

// Create new order
ordersRouter.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const {id, date, customer_id, total_price} = req.body

  await config.runQuery(`INSERT INTO orders (id, date, customer_id, total_price) VALUES ('${id}', '${date}', '${customer_id}', '${total_price}')`)
  const updatedResult = await config.runQuery('SELECT * from orders')

  res.status(201).send('Order added ' + JSON.stringify(updatedResult.rows))
});

// Delete order
ordersRouter.delete('/:id', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const { id } = req.params;

  await config.runQuery(`DELETE FROM orders WHERE id = '${id}'`)

  res.status(201).send('Order deleted')
});

module.exports = ordersRouter;