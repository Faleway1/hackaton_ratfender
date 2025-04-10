import Leaderboard from "./models/leaderboard.models.js";

export async function addPlayerToLeaderboard({player, waves}) {
    const leaderboard = await Leaderboard.create({ player, waves});
    return leaderboard;
};

export async function getPlayerById(id) {
    const leaderboard = await Leaderboard.findByPk(id);
    if (!leaderboard) {
        return null
    }
    
    return leaderboard;
};

export async function updateLeaderboard(id, values) {
    const leaderboard = await Leaderboard.getPlayerById(id);
    if (!leaderboard) {
        return null;
    }

    return await leaderboard.update(values)
};

export async function deletePlayerLeaderboard(id) {
    const leaderboard = await Leaderboard.getPlayerById(id);
    if (!leaderboard) {
        return null;
    }

    return await leaderboard.id.destroy();
};

export async function getAllPlayers(){
    return await Leaderboard.findAll();
};

export async function getTopPlayers(limit = 10) {
    const leaderboard = await Leaderboard.findAll({
        order: [['waves', 'DESC']],  
        limit: limit                 
    });

    return leaderboard;
};

