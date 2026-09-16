const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// REGISTER

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingAccount = await pool.query("SELECT id FROM accounts WHERE email = $1", [email]);

    if (existingAccount.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create account
    const result = await pool.query(
      `INSERT INTO accounts (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email, created_at`,
      [email, passwordHash],
    );

    res.status(201).json({
      message: "Account registered successfully",
      account: result.rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find account
    const result = await pool.query(
      `SELECT id, email, password_hash
       FROM accounts
       WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const account = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, account.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // ACCESS TOKEN
    const accessToken = jwt.sign(
      {
        id: account.id,
        email: account.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    // REFRESH TOKEN
    const refreshToken = jwt.sign(
      {
        id: account.id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Refresh token expiration
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store refresh token
    await pool.query(
      `INSERT INTO refresh_tokens
       (account_id, token, expires_at)
       VALUES ($1, $2, $3)`,
      [account.id, refreshToken, expiresAt],
    );

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      account: {
        id: account.id,
        email: account.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// REFRESH ACCESS TOKEN
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    const result = await pool.query(
      `SELECT id, account_id, expires_at
       FROM refresh_tokens
       WHERE token = $1`,
      [refreshToken],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const storedToken = result.rows[0];

    // Check database expiration
    if (new Date(storedToken.expires_at) < new Date()) {
      await pool.query("DELETE FROM refresh_tokens WHERE id = $1", [storedToken.id]);

      return res.status(401).json({
        message: "Refresh token expired",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // Makes sure the token belongs to the same account
    if (decoded.id !== storedToken.account_id) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const accountResult = await pool.query(
      `SELECT id, email
       FROM accounts
       WHERE id = $1`,
      [storedToken.account_id],
    );

    if (accountResult.rows.length === 0) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const account = accountResult.rows[0];

    // Create new access token
    const accessToken = jwt.sign(
      {
        id: account.id,
        email: account.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.json({
      message: "Access token refreshed",
      accessToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// GET CURRENT ACCOUNT
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, created_at
       FROM accounts
       WHERE id = $1`,
      [req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.json({
      account: result.rows[0],
    });
  } catch (error) {
    console.error("Get account error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// LOGOUT
router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token required",
      });
    }

    const result = await pool.query(
      `DELETE FROM refresh_tokens
       WHERE token = $1
       RETURNING id`,
      [refreshToken],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Refresh token not found",
      });
    }

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
