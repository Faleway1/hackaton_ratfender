import {
    BadRequestError,
    NotFoundError,
} from "../errors/api.error.js"
import { LeaderboardRepository } from  "../repositories/index.repository.js";

export async function addPlayerToLeaderboard({player, waves}) {
    if (!player || !/^[a-zA-Z ]+$/.test(player)) {
        throw new BadRequestError ("Le nom du joueur n'a pas été fourni ou n'est pas conforme");      
    }
    const leaderboard = await LeaderboardRepository.addPlayerToLeaderboard({player, waves});

    return leaderboard.dataValues;
};

export async function getPlayerById(id) {
    const leaderboard = await LeaderboardRepository.getPlayerById(id);

    if (!leaderboard) {
        throw new NotFoundError("Le joueur n'existe pas")
    }

    return {
        id: leaderboard.id,
        player: leaderboard.player,
        waves: leaderboard.waves,
    };
};

export async function updateLeaderboard(id, {player, waves}){
    if (!player || !/^[a-zA-Z ]+$/.test(player)) {
        throw new BadRequestError ("Le nom du joueur n'a pas été fourni ou n'est pas conforme");      
    }

    if (!await leaderboardRepository.getPlayerById(player)) {
        throw new NotFoundError("Le héros n'existe pas")
    }

    const leaderboard = LeaderboardRepository.updateLeaderboard(id, {
        player,
        waves,
    })

    return leaderboard.dataValues;
};

export async function deletePlayerLeaderboard(id){
    if (!(await getPlayerById(id))) {
        throw new NotFoundError("le héros n'existe pas");
    }

    return await LeaderboardRepository.deletePlayerLeaderboard(id);
};

export async function deleteLeaderboard(){
    return await LeaderboardRepository.deleteLeaderboard();
}

export async function getAllPlayers() {
    const leaderboards = await LeaderboardRepository.getAllPlayers();

    const formattedLeaderboard = leaderboards.map((leaderboard) => {
        return {
            id: leaderboard.id,
            player: leaderboard.player,
            waves: leaderboard.waves,
        };
    });

    return formattedLeaderboard;
};

export async function getTopPlayers() {
    const topPlayer = await LeaderboardRepository.getTopPlayers();
    
    const formattedLeaderboard = topPlayer.map(player => ({
        id: player.id,
        player: player.player,
        waves: player.waves
    }));

    return formattedLeaderboard
}
