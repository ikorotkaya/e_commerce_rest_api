const express = require('express');
const genresRouter = express.Router();

module.exports = genresRouter;

// Get all genres
genresRouter.get('/genres', async (req, res) => {
  await client.connect()
  const result = await client.query('SELECT * from genres')
  await client.end()
  
  res.send({
    genres: result.rows
  })
});