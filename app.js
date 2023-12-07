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

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
})
