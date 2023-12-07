const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const { Pool } = require('pg');
const path = require('path');
const express = require('express');
const app = express();

require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use(auth(config));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

app.get("/", async (req, res) => {
  const client = await pool.connect();
  const response = await client.query('SELECT * FROM student');
  res.render("index", {
    title: "Neon authentication with auth0",
    students: response.rows,
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
})

app.get("/profile", requiresAuth(), (req, res) => {
  res.render("profile", {
    title: "Secured profile page",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
})


// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     require: true,
//   },
// });

// app.post('/', async (req, res) => {
//   const client = await pool.connect();
//   const { first_name, last_name, email } = req.body;
//   try {
//     const response = await client.query('INSERT INTO student (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, email]);
//     res.json(response.rows[0]);
//   } catch(err) {
//     console.error(err.message);
//   }
//   finally {
//     client.release();
//   }
// })

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// app.get('/', async (req, res) => {
//   console.log(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   const isAuthenticated = req.oidc.isAuthenticated();
//   const client = await pool.connect();
//   try {
//     const response = await client.query('SELECT * FROM student');
//     res.json(response.rows);
//   } catch(err) {
//     console.error(err.message);
//   }
//   finally {
//     client.release();
//   }
// });

// app.get('/:id', async (req, res) => {
//   const client = await pool.connect();
//   const {id} = req.params;
//   try {
//     const response = await client.query('SELECT * FROM student WHERE student_id = $1', [id]);
//     res.json(response.rows[0]);
//   } catch(err) {
//     console.error(err.message);
//   }
//   finally {
//     client.release();
//   }
// })

// app.put('/:id', async (req, res) => {
//   const client = await pool.connect();
//   const { id } = req.params;
//   const {first_name, last_name, email} = req.body;
//   try {
//     const response = await client.query('UPDATE student SET first_name = $1, last_name = $2, email = $3 WHERE student_id = $4 RETURNING *', [first_name, last_name, email, id]);
//     res.json(`Student id: ${id} updated successfully`);
//   } catch(err) {
//     console.error(err.message);
//   }
//   finally {
//     client.release();
//   }
// })

// app.delete('/:id', async (req, res) => {
//   const client = await pool.connect();
//   const { id } = req.params;
//   try {
//     const response = await client.query('DELETE FROM student WHERE student_id = $1', [id]);
//     res.json(`Student id: ${id} deleted successfully`);
//   } catch(err) {
//     console.error(err.message);
//   }
//   finally {
//     client.release();
//   }
// })

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
})
