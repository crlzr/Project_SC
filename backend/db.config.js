require("dotenv").config();
const { Pool } = require("pg");

// Directly using your Render database details in the connection string
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  DB_URL: process.env.DEPLOYED_URL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};

