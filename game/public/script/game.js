import { Cell } from "./class/cell.js";

export const GRIDWIDTH = 40;
export const GRIDHEIGHT = 30;
export const APPWIDTH = 800;
export const APPHEIGHT = 600;
export const TILEWIDTH = APPWIDTH / GRIDWIDTH;
export const TILEHEIGHT = APPHEIGHT / GRIDHEIGHT;


export const game = {
    grid: document.querySelector(".game-grid"),
    gridWidth: GRIDWIDTH,
    gridHeight: GRIDHEIGHT,
    path: [{ lig: 15, col: 0 },
    { lig: 15, col: 1 },
    { lig: 15, col: 2 },
    { lig: 16, col: 2 },
    { lig: 17, col: 2 },
    { lig: 17, col: 3 },
    { lig: 17, col: 4 },
    { lig: 16, col: 4 },
    { lig: 15, col: 4 },
    { lig: 15, col: 5 },
    { lig: 15, col: 6 },
    { lig: 15, col: 7 },
    { lig: 14, col: 7 },
    { lig: 13, col: 7 },
    { lig: 13, col: 8 },
    { lig: 13, col: 9 },
    { lig: 14, col: 9 },
    { lig: 15, col: 9 },
    { lig: 15, col: 10 },
    { lig: 15, col: 11 },
    { lig: 15, col: 12 },
    { lig: 16, col: 12 },
    { lig: 17, col: 12 },
    { lig: 17, col: 13 },
    { lig: 17, col: 14 },
    { lig: 16, col: 14 },
    { lig: 15, col: 14 },
    { lig: 15, col: 15 },
    { lig: 15, col: 16 },
    { lig: 15, col: 17 },
    { lig: 14, col: 17 },
    { lig: 13, col: 17 },
    { lig: 13, col: 18 },
    { lig: 13, col: 19 },
    { lig: 14, col: 19 },
    { lig: 15, col: 19 },
    { lig: 15, col: 20 },
    { lig: 15, col: 21 },
    { lig: 15, col: 22 },
    { lig: 16, col: 22 },
    { lig: 17, col: 22 },
    { lig: 17, col: 23 },
    { lig: 17, col: 24 },
    { lig: 16, col: 24 },
    { lig: 15, col: 24 },
    { lig: 15, col: 25 },
    { lig: 15, col: 26 },
    { lig: 15, col: 27 },
    { lig: 14, col: 27 },
    { lig: 13, col: 27 },
    { lig: 13, col: 28 },
    { lig: 13, col: 29 },
    { lig: 14, col: 29 },
    { lig: 15, col: 29 },
    { lig: 15, col: 30 },
    { lig: 15, col: 31 },
    { lig: 15, col: 32 },
    { lig: 16, col: 32 },
    { lig: 17, col: 32 },
    { lig: 17, col: 33 },
    { lig: 17, col: 34 },
    { lig: 16, col: 34 },
    { lig: 15, col: 34 },
    { lig: 15, col: 35 },
    { lig: 15, col: 36 },
    { lig: 15, col: 37 },
    { lig: 15, col: 38 },
    { lig: 15, col: 39 },
    { lig: 15, col: 40 },
  ],
    cellsList: [],
    pathColor: "red",
    pdrPerRound: {
        0: 50,
        10: 100,
        20: 150,
        30: 200,
        40: 300,
        50: 400,
        75: 500,
        100: 1000,
    },
    pdr: 0,
    round: 0,

    appWidth: APPWIDTH,
    appHeight: APPHEIGHT,
    app: new PIXI.Application(),
};
await game.app.init({ background: '#1099bb', width: game.appWidth, height: game.appHeight });
game.grid.appendChild(game.app.view);


function endRound() {
    game.pdr += roundEndPdr(game.round);
    game.round += 1;

    // You can add more logic here, like updating the UI or resetting values.
}