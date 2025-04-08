import { game } from "./game.js";

const pdrPerRound = {
    0 : 50,
    10 : 100,
    20 : 150,
    30 : 200,
    40 : 300,
    50 : 400,
    75 : 500,
    100 : 1000,
}

function roundEndPdr() {
    const round = game.rounds[game.currentRound];
    const pdr = Object.keys(pdrPerRound)
        .reverse()
        .find(key => round >= key) ? pdrPerRound[Object.keys(pdrPerRound).reverse().find(key => round >= key)] : 0;
    game.pdr += pdr;
    game.updatePdrDisplay();
    game.updatePdrBar();
}