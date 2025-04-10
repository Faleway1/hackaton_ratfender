import cors from "cors";
import sequelize from "./config/database.js";
import express from "express";
import leaderboardRouter from "./routers/leaderboard.router.js";
import { logMiddleware } from "./middleware/log.middleware.js";

import { initializeLeaderboardMock } from "./services/leaderboard.mock.service.js"
import { errorHandler } from "./middleware/error.middleware.js";

await sequelize.sync({force: true});
console.log("Base de donnée synchronisée");

await initializeLeaderboardMock();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logMiddleware);

app.use("/api/v1/leaderboard", leaderboardRouter);

app.use(errorHandler)

app.listen(3000, () => console.log("Server listen on http://localhost:3000"));