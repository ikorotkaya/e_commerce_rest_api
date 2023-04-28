const express = require('express');
const authorsRouter = express.Router();


// Get all authors
authorsRouter.get('/', async (req, res) => {
  await client.connect()
  const result = await client.query('SELECT * from author')
  await client.end()
  
  res.send({
    authors: result.rows
  })
});

// Get authors by id
authorsRouter.get('/:id', async (req, res) => {
  await client.connect()
  const userId = req.params.id;
  // select * from authors => json
  const result = await client.query(`SELECT * from authors WHERE id = ${userId}`)
  await client.end()
  
  res.send(result.rows)
});

module.exports = authorsRouter;