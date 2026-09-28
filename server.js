require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const pool = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const playerRoutes = require("./src/routes/player_route");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Group 13 API",
      version: "1.0.0",
      description: "API documentation for Group 13 project",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./server.js", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);

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

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
