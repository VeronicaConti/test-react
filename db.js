const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:OtDznqfYZYyXpuuOZUCNLlzvaeBEvoXO@postgres.railway.internal:5432/railway',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
