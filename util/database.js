const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodelearn",
  password: "Wil__001",
});

module.exports = pool.promise();
