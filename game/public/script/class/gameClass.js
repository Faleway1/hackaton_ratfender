import { roundEndPdr } from "../pdrManager.js";
import { gridManager } from "../gridManager.js";
import { createPath } from "../pathManager.js";

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
        
        this.towerTilesOccupied = [];
        this.path = [];
        this.pdr = 0;
        this.round = 0;

        this.money = document.querySelector(".money")
        this.money.textContent = this.pdr
        this.app = new PIXI.Application();
    }

    async initGame() {
        await this.initCanva();
        this.initGrid();
        this.initPath();
    }
    
    async initCanva() {
        await this.app.init({ background: '#1099bb', width: this.appWidth, height: this.appHeight })
        document.querySelector("#game").appendChild(this.app.view);
    }

    initGrid() {
        this.cellsList = gridManager.createGrid(this.tilesPerRow, this.tilesPerCol);
    }

    initPath() {
        this.path = this.generatePath(this.path);
        const path = createPath(this.path);
        this.app.stage.addChild(path);
    }

    generatePath() {
        const middle = Math.floor(this.tilesPerCol / 2); // Commence au milieu verticalement
        let currentCell = gridManager.findCell(0, middle, this.cellsList); // Commence à la première colonne
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
                const potentialCell = gridManager.findCell(currentCell.x + dir[0], currentCell.y + dir[1], this.cellsList);
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
                blockedPaths.push(gridManager.findCell(currentCell.x + 1, currentCell.y, this.cellsList)); // Ajoute la cellule suivante aux chemins bloqués
                blockedPaths.push(gridManager.findCell(currentCell.x - 1, currentCell.y, this.cellsList)); // Ajoute la cellule suivante aux chemins bloqués
            } else if (currentDirection[1] === 0) {
                blockedPaths.push(gridManager.findCell(currentCell.x, currentCell.y + 1, this.cellsList)); // Ajoute la cellule suivante aux chemins bloqués
                blockedPaths.push(gridManager.findCell(currentCell.x, currentCell.y - 1, this.cellsList)); // Ajoute la cellule suivante aux chemins bloqués
            }

            const nextCell = gridManager.findCell(currentCell.x + currentDirection[0], currentCell.y + currentDirection[1], this.cellsList); // Cellule suivante
            currentCell = nextCell;
            path.push(currentCell);
        }

        gridManager.findCell(currentCell.x + 1, currentCell.y, this.cellsList)
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

