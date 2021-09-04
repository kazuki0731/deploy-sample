const { Pool } = require("pg");
require("pg").defaults.ssl = true;

const pool = new Pool({
  database: "d93viok0bqkd5e",
  user: "zjldotdtjrzzxo",
  password: "6e655c3dce4d84797d23ab53e4d1e628954bb2d9b798386f387f749c1218af93",
  host: "ec2-18-235-45-217.compute-1.amazonaws.com",
  port: 5432,
  ssl: {
    sslmode: "require",
    rejectUnauthorized: false,
  },
});

module.exports = pool;
