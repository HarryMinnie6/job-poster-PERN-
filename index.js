const { Pool } = require("pg");
require("dotenv").config();

/////////////////////////////////////////////
const devConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
};
const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
