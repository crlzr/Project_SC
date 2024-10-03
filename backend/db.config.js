require("dotenv").config();
const { Pool } = require("pg");

// Directly using your Render database details in the connection string
const connectionString = 'postgres://db_xx98_user:WtufEwvyo3n9gVIXQZC69GRNlsEq6meH@dpg-cruuss5ds78s73a5841g-a.oregon-postgres.render.com:5432/db_xx98';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
