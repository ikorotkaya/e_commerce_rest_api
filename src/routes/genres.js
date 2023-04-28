const express = require('express');
const genresRouter = express.Router();


// Get all genres
genresRouter.get('/', async (req, res) => {
  await client.connect()
  const result = await client.query('SELECT * from genres')
  await client.end()
  
  res.send({
    genres: result.rows
  })
});

module.exports = genresRouter;