const express = require("express");
const router = express.Router();
const playerController = require("../controllers/player_controller");
const authenticateToken = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Player management endpoints
 */

/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all players
 *       401:
 *         description: Access token required or invalid
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticateToken, playerController.getAllPlayers);

/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     summary: Get a player by ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player found
 *       401:
 *         description: Access token required or invalid
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateToken, playerController.getPlayerById);

/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - hero
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               hero:
 *                 type: string
 *                 example: Warrior
 *     responses:
 *       201:
 *         description: Player successfully created
 *       401:
 *         description: Access token required or invalid
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateToken, playerController.createPlayer);

/**
 * @swagger
 * /api/players/{id}:
 *   put:
 *     summary: Update a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Player ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - hero
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               hero:
 *                 type: string
 *                 example: Warrior
 *     responses:
 *       200:
 *         description: Player successfully updated
 *       401:
 *         description: Access token required or invalid
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authenticateToken, playerController.updatePlayer);

/**
 * @swagger
 * /api/players/{id}:
 *   patch:
 *     summary: Partially update a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Player ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               hero:
 *                 type: string
 *                 example: Warrior
 *     responses:
 *       200:
 *         description: Player successfully updated
 *       401:
 *         description: Access token required or invalid
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authenticateToken, playerController.patchPlayer);

/**
 * @swagger
 * /api/players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player successfully deleted
 *       401:
 *         description: Access token required or invalid
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateToken, playerController.deletePlayer);

module.exports = router;
