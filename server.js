require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const pool = require("./src/config/db");
const authRoutes = require("./src/routes/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Group 13 API is running",
  });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Connected to PostgreSQL!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});
app.get("/db-info", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        current_database() AS database,
        current_schema() AS schema
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database info failed",
    });
  }
});
app.get("/users-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM accounts");

    res.json({
      users: result.rows,
    });
  } catch (error) {
    console.error("Users test error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
