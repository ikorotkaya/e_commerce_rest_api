const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRouter = require('./riutes/api');
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})