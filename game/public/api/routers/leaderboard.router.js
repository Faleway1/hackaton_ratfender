import express from "express";
import {LeaderboardController} from "../controllers/index.controller.js"

const leaderboardRouter = express.Router()

leaderboardRouter.post("/", LeaderboardController.addPlayerToLeaderboard);
leaderboardRouter.get("/", LeaderboardController.getPlayerById);
leaderboardRouter.put("/:id", LeaderboardController.updateLeaderboard);
leaderboardRouter.delete("/:id", LeaderboardController.deleteLeaderboard);
leaderboardRouter.delete("/", LeaderboardController.deleteLeaderboard)
leaderboardRouter.get("/", LeaderboardController.getAllPlayers);
leaderboardRouter.get("/", LeaderboardController.getTopPlayers);

export default leaderboardRouter;
