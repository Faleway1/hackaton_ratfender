import { game } from "./game.js";

function roundEndPdr(round) {
    return Object.keys(game.pdrPerRound)
        .reverse()
        .find(key => round >= key) ? pdrPerRound[Object.keys(pdrPerRound).reverse().find(key => round >= key)] : 0;
}

