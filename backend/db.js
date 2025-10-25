// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Asegura que lea variables desde .env si lo usás localmente

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:OtDznqfYZYyXpuuOZUCNLlzvaeBEvoXO@postgres.railway.internal:5432/railway',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
