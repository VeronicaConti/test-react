// server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// 🩺 Validación de conexión
app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`✅ Conectado a PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    res.send(`❌ Error de conexión: ${error.message}`);
  }
});

// 🔄 Obtener todas las órdenes
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener órdenes:', err);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
});

// 📝 Crear nueva orden (versión simple, sin products)
app.post('/orders', async (req, res) => {
  const { orderNumber, date, productsCount, finalPrice } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO orders (orderNumber, date, productsCount, finalPrice) VALUES ($1, $2, $3, $4) RETURNING *',
      [orderNumber, date, productsCount, finalPrice]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al guardar orden:', err);
    res.status(500).json({ error: 'Error al guardar orden' });
  }
});

// 🗑️ Eliminar orden por ID
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar orden:', err);
    res.status(500).json({ error: 'Error al eliminar orden' });
  }
});

// 🚀 Inicio del servidor
app.listen(3001, () => {
  console.log('🚀 Backend running on http://localhost:3001');
});
