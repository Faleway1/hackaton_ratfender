import cors from "cors";
import sequelize from "./config/database.js";
import express from "express";
import leaderboardRouter from "./routers/leaderboard.router.js";

import { initializeLeaderboardMock } from "./services/leaderboard.mock.service.js"

await sequelize.sync({force: true});
console.log("Base de donnée synchronisée");

await initializeLeaderboardMock();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/leaderboard", leaderboardRouter);
app.listen(3000, () => console.log("Server listen on http://localhost:3000"));