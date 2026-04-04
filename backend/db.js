// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'bulletinboard',
//   password: 'my_password_here',  // ← replaced with my postgres password
//   port: 5432,
// });

// module.exports = pool;

require('dotenv').config(); // loads environment variables from .env file
const { Pool } = require('pg');

const pool = new Pool({
  // process.env.DATABASE_URL = the external URL from Render
  // we'll set this on Render's dashboard
  connectionString: process.env.DATABASE_URL,

  // required for Render's postgres — encrypts the connection
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;