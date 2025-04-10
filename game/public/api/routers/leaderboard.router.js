import express from "express";
import {LeaderboardControllers} from "../controllers/leaderboard.controller.js"

const leaderboardRouter = express.Router()

leaderboardRouter.post("/", LeaderboardControllers.addPlayerToLeaderboard);
leaderboardRouter.get("/", LeaderboardControllers.getPlayerById);
leaderboardRouter.put("/:id", LeaderboardControllers.updateLeaderboard);
leaderboardRouter.delete("/:id", LeaderboardControllers.deleteLeaderboard);
leaderboardRouter.delete("/", LeaderboardControllers.deleteLeaderboard)
leaderboardRouter.get("/", LeaderboardControllers.getAllPlayers);
leaderboardRouter.get("/", LeaderboardControllers.getTopPlayers);

export default leaderboardRouter;
