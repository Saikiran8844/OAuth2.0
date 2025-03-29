const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

module.exports = promisePool;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, async (err) => {
  if (err) {
    console.error(" Error creating database:", err);
    return;
  }
  console.log(` Database '${process.env.DB_NAME}' is ready.`);

  
  const createDraftsTable = `
    CREATE TABLE IF NOT EXISTS drafts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      user_email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )`;

  try {
    await promisePool.query(createDraftsTable);
    console.log(" Drafts table is ready.");

    await promisePool.query(createUsersTable);
    console.log(" Users table is ready.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }

  connection.end();
});
