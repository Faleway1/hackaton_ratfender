import express from "express";
import {LeaderboardController} from "../controllers/index.controller.js"

const leaderboardRouter = express.Router()

leaderboardRouter.get("/", LeaderboardController.getAllPlayers);         
leaderboardRouter.get("/topPlayer", LeaderboardController.getTopPlayers);
leaderboardRouter.post("/", LeaderboardController.addPlayerToLeaderboard);
leaderboardRouter.get("/:id", LeaderboardController.getPlayerById); 
leaderboardRouter.put("/:id", LeaderboardController.updateLeaderboard);
leaderboardRouter.delete("/:id", LeaderboardController.deletePlayerLeaderboard);
leaderboardRouter.delete("/", LeaderboardController.deleteLeaderboard);




export default leaderboardRouter;
