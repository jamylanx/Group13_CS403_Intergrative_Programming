const pool = require("../config/db");

const getAllPlayers = async () => {
  const result = await pool.query("SELECT * FROM players ORDER BY id ASC");
  return result.rows;
};

const getPlayerById = async (id) => {
  const result = await pool.query("SELECT * FROM players WHERE id = $1", [id]);
  return result.rows[0];
};

const createPlayer = async (name, hero) => {
  const result = await pool.query(
    "INSERT INTO players (name, hero) VALUES ($1, $2) RETURNING *",
    [name, hero]
  );
  return result.rows[0];
};

const updatePlayer = async (id, name, hero) => {
  const result = await pool.query(
    "UPDATE players SET name = $1, hero = $2 WHERE id = $3 RETURNING *",
    [name, hero, id]
  );
  return result.rows[0];
};

const patchPlayer = async (id, name, hero) => {
  const result = await pool.query(
    "UPDATE players SET name = COALESCE($1, name), hero = COALESCE($2, hero) WHERE id = $3 RETURNING *",
    [name, hero, id]
  );
  return result.rows[0];
};

const deletePlayer = async (id) => {
  const result = await pool.query("DELETE FROM players WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  patchPlayer,
  deletePlayer,
};
