const playerService = require("../services/player_service");

const getAllPlayers = async (request, response) => {
  try {
    const players = await playerService.getAllPlayers();
    response.json(players);
  } catch (error) {
    console.error("Error getting players:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const getPlayerById = async (request, response) => {
  const id = Number(request.params.id);
  try {
    const player = await playerService.getPlayerById(id);
    
    if (!player) {
      return response.status(404).json({ message: "Player not found" });
    }
    
    response.json(player);
  } catch (error) {
    console.error("Error getting player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const createPlayer = async (request, response) => {
  const { name, hero } = request.body;

  if (!name || !hero) {
    return response.status(400).json({ message: "Name and hero are required" });
  }

  try {
    const newPlayer = await playerService.createPlayer(name, hero);
    response.status(201).json(newPlayer);
  } catch (error) {
    console.error("Error creating player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const updatePlayer = async (request, response) => {
  const id = Number(request.params.id);
  const { name, hero } = request.body;
  
  if (!name || !hero) {
    return response.status(400).json({ message: "Name and hero are required" });
  }

  try {
    const updatedPlayer = await playerService.updatePlayer(id, name, hero);

    if (!updatedPlayer) {
      return response.status(404).json({ message: "Player not found" });
    }

    response.json(updatedPlayer);
  } catch (error) {
    console.error("Error updating player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const patchPlayer = async (request, response) => {
  const id = Number(request.params.id);
  const { name, hero } = request.body;

  try {
    const patchedPlayer = await playerService.patchPlayer(id, name, hero);

    if (!patchedPlayer) {
      return response.status(404).json({ message: "Player not found" });
    }

    response.json(patchedPlayer);
  } catch (error) {
    console.error("Error patching player:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const deletePlayer = async (request, response) => {
  const id = Number(request.params.id);
  
  try {
    const deletedPlayer = await playerService.deletePlayer(id);

    if (!deletedPlayer) {
      return response.status(404).json({ message: "Player not found" });
    }

    response.json({ message: "Player deleted successfully", deletedPlayer });
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
