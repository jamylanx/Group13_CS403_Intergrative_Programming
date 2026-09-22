const express = require("express");
const router = express.Router();
const playerController = require("../controllers/player.controller");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, playerController.getAllPlayers);
router.get("/:id", authenticateToken, playerController.getPlayerById);
router.post("/", authenticateToken, playerController.createPlayer);
router.put("/:id", authenticateToken, playerController.updatePlayer);
router.patch("/:id", authenticateToken, playerController.patchPlayer);
router.delete("/:id", authenticateToken, playerController.deletePlayer);

module.exports = router;
