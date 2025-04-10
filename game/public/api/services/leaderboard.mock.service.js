import {leaderboardMocks} from "../mocks/leaderboard.mock.js";
import { LeaderboardService } from "./index.service.js";

export async function initializeLeaderboardMock() {
    console.log("============ START LEADERBOARD MOCKING ============");
    for(const player of leaderboardMocks) {
        try {
            const newPlayer = await LeaderboardService.addPlayerToLeaderboard(player)
            console.log(newPlayer);
        } catch (error) {
            console.log("[ERROR]", error.message);
        }
    }
    console.log("========== ENDING LEADERBOARD MOCKING ==========");
    return await LeaderboardService.getAllPlayers();
}
