const express = require('express');
const authorsRouter = express.Router();
const config = require('../config/config');

// Get all authors
authorsRouter.get('/', async (req, res) => {
  const result = await config.runQuery('SELECT * from author')
  
  res.send({
    authors: result.rows
  })
});

// Get authors by id
authorsRouter.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const result = await config.runQuery(`SELECT * from authors WHERE id = ${userId}`)
  
  res.send(result.rows)
});

module.exports = authorsRouter;