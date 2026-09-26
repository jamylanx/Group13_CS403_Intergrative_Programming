const pool = require("../config/db");

const getAllPlayers = async (request, response) => {
  try {
    const result = await pool.query("SELECT * FROM players ORDER BY id ASC");
    response.json(result.rows);
  } catch (error) {
    console.error("Error getting players:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const getPlayerById = async (request, response) => {
  const id = Number(request.params.id);
  try {
    const result = await pool.query("SELECT * FROM players WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return response.status(404).json({ message: "Player not found" });
    }
    
    response.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const createPlayer = async (request, response) => {
  const { name, hero } = request.body;
  try {
    const result = await pool.query(
      "INSERT INTO players (name, hero) VALUES ($1, $2) RETURNING *",
      [name, hero]
    );
    response.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const updatePlayer = async (request, response) => {
  const id = Number(request.params.id);
  const { name, hero } = request.body;
  
  try {
    const result = await pool.query(
      "UPDATE players SET name = $1, hero = $2 WHERE id = $3 RETURNING *",
      [name, hero, id]
    );

    if (result.rows.length === 0) {
      return response.status(404).json({ message: "Player not found" });
    }

    response.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const patchPlayer = async (request, response) => {
  const id = Number(request.params.id);
  const { name, hero } = request.body;

  try {
    // COALESCE keeps the old value if the new value is not provided (null)
    const result = await pool.query(
      "UPDATE players SET name = COALESCE($1, name), hero = COALESCE($2, hero) WHERE id = $3 RETURNING *",
      [name, hero, id]
    );

    if (result.rows.length === 0) {
      return response.status(404).json({ message: "Player not found" });
    }

    response.json(result.rows[0]);
  } catch (error) {
    console.error("Error patching player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const deletePlayer = async (request, response) => {
  const id = Number(request.params.id);
  
  try {
    const result = await pool.query("DELETE FROM players WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return response.status(404).json({ message: "Player not found" });
    }

    response.json({ message: "Player deleted successfully", deletedPlayer: result.rows[0] });
  } catch (error) {
    console.error("Error deleting player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  patchPlayer,
  deletePlayer,
};
