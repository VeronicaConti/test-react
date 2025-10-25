const express = require('express');
const pool = require('./db');
const app = express();

app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`✅ Conectado a PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    res.send(`❌ Error de conexión: ${error.message}`);
  }
});

app.listen(3001, () => {
  console.log('🚀 Backend running on http://localhost:3001');
});
