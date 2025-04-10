import { LeaderboardService } from "../api/services/leaderboard.service.js";

export async function addPlayerToLeaderboard(req,res, error) {
    try {
        const {player, waves} = req.body;
        const newPlayer = await LeaderboardService.addPlayerToLeaderboard({
            player,
            waves,
        });
        res.json(newPlayer);
    }catch (error){
        next(error)
    }
}

export async function getPlayerById(req, res, next) {
    try {
        const id = req.params.id;
        const leaderboard = await LeaderboardService.getPlayerById(id);
        res.json(leaderboard);
    } catch (error) {
        next(error)
    }
}

export async function updateLeaderboard(req, res, next) {
    try{
        const id = req.params.id;
        const { player, waves} = req.body;
        const updatedLeaderboard = await LeaderboardService.updateHero(id, {
            player,
            waves
        });
        res.json(updatedLeaderboard);
    } catch (error) {
        next(error)
    }
}

export async function deletePlayerLeaderboard(req, res, next) {
    try {
        const id = req.params.id;
        const deletedLeaderboard = await LeaderboardService.deletePlayerLeaderboard(id, {
            player,
            waves,
        });
        res.json(deletedLeaderboard);
    } catch (error) {
        next(error)
    }
}

export async function getAllPlayers(req, res, next) {
    try {
        const leaderboard = await LeaderboardService.getAllPlayers();
        res.json(leaderboard);
    } catch (error) {
        next(error)
    }
}

export async function getTopPlayers(){
    try {
        const topPlayer = await LeaderboardService.getTopPlayers();
        res.json(topPlayer);
    } catch (error) {
        next(error)
    }
};