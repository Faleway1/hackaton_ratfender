import { Game } from "./class/gameClass.js";


const pdrPerRound = {
    0: 50,
    10: 100,
    20: 150,
    30: 200,
    40: 300,
    50: 400,
    75: 500,
    100: 1000,
};

const game = new Game(40, 20, 800, 400, pdrPerRound)
game.initCanva()
game.initGrid()
game.initPath()

game.cellsList[0].highlight()

export { game };
