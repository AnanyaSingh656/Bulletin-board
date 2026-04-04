const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bulletinboard',
  password: 'my_password_here',  // ← replaced with my postgres password
  port: 5432,
});

module.exports = pool;