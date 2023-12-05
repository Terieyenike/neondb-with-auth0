const { Pool } = require('pg');
const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

app.post('/students', async (req, res) => {
  const client = await pool.connect();
  const { first_name, last_name, email } = req.body;
  try {
    const response = await client.query('INSERT INTO student (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, email]);
    res.json(response.rows[0]);
  } catch(err) {
    console.error(err.message);
  }
  finally {
    client.release();
  }
})

app.get('/students', async (req, res) => {
  const client = await pool.connect();
  try {
    const response = await client.query('SELECT * FROM student');
    res.json(response.rows);
  } catch(err) {
    console.error(err.message);
  }
  finally {
    client.release();
  }
});

app.get('/students/:id', async (req, res) => {
  const client = await pool.connect();
  const {id} = req.params;
  try {
    const response = await client.query('SELECT * FROM student WHERE student_id = $1', [id]);
    res.json(response.rows[0]);
  } catch(err) {
    console.error(err.message);
  }
  finally {
    client.release();
  }
})

app.put('/students/:id', async (req, res) => {
  const client = await pool.connect();
  const { id } = req.params;
  const {first_name, last_name, email} = req.body;
  try {
    const response = await client.query('UPDATE student SET first_name = $1, last_name = $2, email = $3 WHERE student_id = $4 RETURNING *', [first_name, last_name, email, id]);
    res.json(`Student id: ${id} updated successfully`);
  } catch(err) {
    console.error(err.message);
  }
  finally {
    client.release();
  }
})

app.delete('/students/:id', async (req, res) => {
  const client = await pool.connect();
  const { id } = req.params;
  try {
    const response = await client.query('DELETE FROM student WHERE student_id = $1', [id]);
    res.json(`Student id: ${id} deleted successfully`);
  } catch(err) {
    console.error(err.message);
  }
  finally {
    client.release();
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
})
