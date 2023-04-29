require('dotenv').config();

// const session = require("express-session")
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET_KEY,
//     cookie: {maxAge: 172800000, secure: true, sameSite: 'none'},
//     resave: false,
//     saveUninitialized: false,
//   })
// );

const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.CLIENT_USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.CLIENT_PASSWORD,
  port: process.env.PORT_CLIENT,
})

const runQuery = async (query) => {
  return await pool.query(query);
}

module.exports = {
  runQuery
};