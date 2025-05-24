const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get('/api/meta_venta', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM meta_venta');
  res.json(rows);
});

app.get('/api/db-check', async (req, res) => {
  const result = await pool.query('SELECT version()');
  res.send(result.rows[0]);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
