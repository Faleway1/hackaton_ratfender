import { roundEndPdr } from "../pdrManager.js";
import { createGrid, findCell } from "../gridManager.js";
import { createPath } from "../pathMaker.js";

export class Game {
    constructor(tilesPerRow, tilesPerCol, appWidth, appHeight, pdrPerRound) {
        this.tilesPerRow = tilesPerRow;
        this.tilesPerCol = tilesPerCol;
        this.appWidth = appWidth;
        this.appHeight = appHeight;
        this.pdrPerRound = pdrPerRound;
        this.tilewidth = appWidth / tilesPerRow;
        this.tileheight = appHeight / tilesPerCol;
        this.cellsList = [];
        console.log(this.money);
        
        this.path = [
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
        ];
        this.pdr = 0;
        this.round = 0;
        this.money = document.querySelector(".money")
        this.money.textContent = this.pdr
        this.app = new PIXI.Application();
        
    }
    
    async initCanva() {
        await this.app.init({ background: '#1099bb', width: this.appWidth, height: this.appHeight })
        document.querySelector("#game").appendChild(this.app.view);
    }

    initGrid() {
        this.cellsList = createGrid(this.tilesPerRow, this.tilesPerCol);
    }

    initPath() {
        this.path = this.generatePath(this.path);
        const path = createPath(this.path);
        this.app.stage.addChild(path);
    }

    generatePath() {
        const middle = Math.floor(this.tilesPerCol / 2); // Commence au milieu verticalement
        let currentCell = findCell(0, middle, this.cellsList); // Commence à la première colonne
        const path = [currentCell];
        let blockedPaths = [];
        const directions = [
            [1, 0], // Droite
            [0, 1], // Bas
            [0, -1] // Haut
        ];
        const maxNumberOfTiles = this.tilesPerRow * 3

        while (currentCell.x !== this.tilesPerRow - 1 && path.length < maxNumberOfTiles) {
            blockedPaths.push(currentCell); // Ajoute la cellule actuelle aux chemins bloqués

            const possibleDirections = directions.filter(dir => {
                const potentialCell = findCell(currentCell.x + dir[0], currentCell.y + dir[1], this.cellsList);
                if (!blockedPaths.includes(potentialCell)
                    && potentialCell !== null) {
                    return true
                }
            })
            if (possibleDirections.length === 0) {
                break;
            }
            const currentDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]; // Choisit une direction aléatoire
            if (currentDirection[0] === 0) {
                blockedPaths.push(findCell(currentCell.x + 1, currentCell.y, this.cellsList)); // Ajoute la cellule suivante aux chemins bloqués
                blockedPaths.push(findCell(currentCell.x - 1, currentCell.y, this.cellsList)); // Ajoute la cellule suivante aux chemins bloqués
            } else if (currentDirection[1] === 0) {
                blockedPaths.push(findCell(currentCell.x, currentCell.y + 1, this.cellsList)); // Ajoute la cellule suivante aux chemins bloqués
                blockedPaths.push(findCell(currentCell.x, currentCell.y - 1, this.cellsList)); // Ajoute la cellule suivante aux chemins bloqués
            }

            const nextCell = findCell(currentCell.x + currentDirection[0], currentCell.y + currentDirection[1], this.cellsList); // Cellule suivante
            currentCell = nextCell; 
            path.push(currentCell);
        }

        findCell(currentCell.x + 1, currentCell.y, this.cellsList)
        path.push(currentCell);
        if (currentCell.x !== this.tilesPerRow - 1 || path.length < maxNumberOfTiles - 10) {
            return this.generatePath(); // Relance la fonction si le chemin n'est pas complet
        }
        console.log(path)

        return path;
    }

    startRound() {
        console.log("Debut de round")
        // A FAIRE : lancer les vagues d'ennemis
    }

    endRound() {
        console.log("Fin de round")
        this.pdr += roundEndPdr(this.round, this.pdrPerRound);
        this.round += 1;
        this.money.textContent = this.pdr
        // A FAIRE : stoper le jeu si bouton pause pressé/ relancer le jeu sinon
    }
}

