import { game } from "./game.js";

function roundEndPdr(round, pdrPerRound) {
    return Object.keys(pdrPerRound)
        .reverse()
        .find(key => round >= key) ? pdrPerRound[Object.keys(pdrPerRound).reverse().find(key => round >= key)] : 0;
}

export {roundEndPdr}