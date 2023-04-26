const express = require('express');
const booksRouter = express.Router();

module.exports = booksRouter;

// Get all books
booksRouter.get('/books', async (req, res) => {
  await client.connect()
  const result = await client.query('SELECT * from books')
  await client.end()
  
  res.send({
    books: result.rows
  })
});