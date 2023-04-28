require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT
const apiRouter = require('./src/routes/api');

app.use('/', apiRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})