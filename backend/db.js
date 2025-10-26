// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Carga variables desde .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
