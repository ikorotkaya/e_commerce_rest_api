const express = require('express');
const booksRouter = express.Router();


// Get all books
booksRouter.get('/', async (req, res) => {
  const result = await runQuery('SELECT * from books')
  
  res.send({
    books: result.rows
  })
});

module.exports = booksRouter;