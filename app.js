const express = require('express')
const app = express()
const port = 3000

const { Client } = require('pg')
const client = new Client({
  user: 'irinakorotkaya',
  host: 'localhost',
  database: 'ecommerce_book_store',
  password: '',
  port: 5432,
})

app.get('/authors', async (req, res) => {
  await client.connect()
  // select * from authors => json
  const result = await client.query('SELECT * from author')
  console.log(result)
  await client.end()
  
  res.send({
    authors: result.rows
  })
});

app.get('/authors/:id', async (req, res) => {
  await client.connect()
  const userId = req.params.id;
  // select * from authors => json
  const result = await client.query(`SELECT * from author WHERE id = ${userId}`)
  console.log(result)
  await client.end()
  
  res.send(result.rows)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

