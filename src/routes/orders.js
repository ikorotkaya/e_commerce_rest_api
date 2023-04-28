const express = require('express');
const ordersRouter = express.Router();

// Create new order
ordersRouter.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  await client.connect()
  const {id, date, customer_id, total_price} = req.body

  await client.query(`INSERT INTO orders (id, date, customer_id, total_price) VALUES ('${id}', '${date}', '${customer_id}', '${total_price}')`)
  const updatedResult = await client.query('SELECT * from orders')
  await client.end()

  res.status(201).send('Order added ' + JSON.stringify(updatedResult.rows))
});

// Delete order
ordersRouter.delete('/:id', async (req, res) => {
  if (!req.body) return res.sendStatus(400)

  await client.connect()
  const { id } = req.params;

  await client.query(`DELETE FROM orders WHERE id = '${id}'`)
  await client.end()

  res.status(201).send('Order deleted')
});

module.exports = ordersRouter;