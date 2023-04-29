const express = require('express');
const authorsRouter = express.Router();
const config = require('../config/config');

const bodyParser = require('body-parser');
authorsRouter.use(bodyParser.json());
authorsRouter.use(bodyParser.urlencoded({ extended: true }));

// Get all authors
authorsRouter.get('/', async (req, res) => {
  try {
    const result = await config.runQuery('SELECT * from authors')
    res.send({
      authors: result.rows
    })
  } catch (err) {
    res.status(400).json(err)
  }
});

// Get authors by id
authorsRouter.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await config.runQuery(`SELECT * from authors WHERE id = ${userId}`)
    res.send(result.rows)
  } catch (err) {
    res.status(400).json(err)
  }
});

// Create new author
authorsRouter.post('/', async (req, res) => {
  try {
    const { id, first_name, last_name } = req.body
    await config.runQuery(`INSERT INTO authors (id, first_name, last_name) VALUES ('${id}', ${first_name}', '${last_name}')`)
    res.status(201).send('Author added')
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = authorsRouter;