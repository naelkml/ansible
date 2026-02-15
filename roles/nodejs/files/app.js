const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});

client.connect();

app.get('/', (req, res) => res.send('API is running'));
app.get('/users', async (req, res) => {
  const result = await client.query('SELECT * FROM users;');
  res.json(result.rows);
});

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
});
