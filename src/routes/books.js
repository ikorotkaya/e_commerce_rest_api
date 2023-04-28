const express = require('express');
const booksRouter = express.Router();
const config = require('../config/config');

// Get all books
booksRouter.get('/', async (req, res) => {
  const result = await config.runQuery('SELECT * from books')
    
  res.send({
    books: result.rows
  })
});

module.exports = booksRouter;