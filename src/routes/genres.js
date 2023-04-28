const express = require('express');
const genresRouter = express.Router();
const config = require('../config/config');

// Get all genres
genresRouter.get('/', async (req, res) => {
  const result = await config.query('SELECT * from genres')
  
  res.send({
    genres: result.rows
  })
});

module.exports = genresRouter;