require('dotenv').config();
const session = require("express-session")



const { Client } = require('pg')
 
const client = new Client({
  user: process.env.CLIENT_USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.CLIENT_PASSWORD,
  port: process.env.PORT_CLIENT,
})

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    cookie: {maxAge: 172800000, secure: true, sameSite: 'none'},
    resave: false,
    saveUninitialized: false,
  })
);