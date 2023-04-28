const express = require('express');
const booksRouter = express.Router();
import { runQuery } from "./config/config.js";

// Get all books
booksRouter.get('/', async (req, res) => {
  const result = await runQuery('SELECT * from books')
  
  res.send({
    books: result.rows
  })
});

module.exports = booksRouter;