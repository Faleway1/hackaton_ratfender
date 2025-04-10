import {
    BadRequestError,
    NotFoundError,
} from "../errors/api.error.js"
import { getTopPlayers } from "../repositories/leaderboard.repository.js";
import { leaderboardRepository } from "./repositories/leaderboard.repository.js";

export async function addPlayerToLeaderboard({player, waves}) {
    if (!player || !/^[a-zA-Z ]+$/.test(player)) {
        throw new BadRequestError ("Le nom du joueur n'a pas été fourni ou n'est pas conforme");      
    }
    const leaderboard = await leaderboardRepository.addPlayerToLeaderboard({player, waves});

    return leaderboard.dataValues;
};

export async function getPlayerById(id) {
    const leaderboard = await leaderboardRepository.getPlayerById(id);

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

    const leaderboard = leaderboardRepository.updateLeaderboard(id, {
        player,
        waves,
    })

    return leaderboard.dataValues;
};

export async function deletePlayerLeaderboard(id){
    if (!(await getPlayerById(id))) {
        throw new NotFoundError("le héros n'existe pas");
    }

    return await leaderboardRepository.deletePlayerLeaderboard(id);
};

export async function deleteLeaderboard(){
    return await leaderboardRepository.deleteLeaderboard();
}

export async function getAllPlayers() {
    const leaderboards = await leaderboardRepository.getAllPlayers();

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
    const topPlayer = await leaderboardRepository.getTopPlayers();
    
    const formattedLeaderboard = topPlayer.map(player => ({
        id: player.id,
        player: player.player,
        waves: player.waves
    }));

    return formattedLeaderboard
}
