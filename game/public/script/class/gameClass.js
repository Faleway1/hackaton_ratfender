import { roundEndPdr } from "../pdrManager.js";
import { gridManager } from "../gridManager.js";
import { createPath } from "../pathManager.js";
import { ENEMY_INFOS, GAME_SETTINGS } from "../config.js";
import { ENEMIES } from "./ennemies.js";
import { Cell } from "./cell.js";

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
        
        this.towerTilesOccupied = [];
        this.totalEnnemies = []
        this.path = [];
        this.pdr = 300;
        this.round = 0;
        this.life = 100
        this.ennemySpawn = 5 + (2*this.round)
        const hp = document.querySelector(".hp")
        hp.textContent = `Vie : ${this.life}`

        this.rng = new Math.seedrandom('efrei');
        // this.rng = Math.random;
        this.isPaused = false;
        this.isPlaying = false;

        this.money = document.querySelector(".money")
        this.money.textContent = this.pdr
        this.app = new PIXI.Application();
    }

    async initGame() {
        await this.initCanva();
        await this.initGrid();
        await this.initPath();
        this.money.textContent = this.pdr
    }
    
    async initCanva() {
        await this.app.init({ background: '#1099bb', width: this.appWidth, height: this.appHeight })
        document.querySelector("#game").appendChild(this.app.view);
    }

    async initGrid() {
        this.cellsList = await gridManager.createGrid(this.tilesPerRow, this.tilesPerCol);
    }

    async initPath() {
        this.path = this.generatePath(this.path);
        const path = await createPath(this.path);
        this.app.stage.addChild(path);
    }

    generatePath() {
        const middle = Math.floor(this.tilesPerCol / 2); // Commence au milieu verticalement
        let currentCell = gridManager.findCell(0, middle, this.cellsList); // Commence à la première colonne
        const path = [new Cell(-1, middle), currentCell];
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
            // const currentDirection = possibleDirections[Math.floor(this.rng() * possibleDirections.length)];

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

        return path;
    }

    defineEnnemyAmount() {
        this.ennemySpawn = 5 + (2 * this.round)
    }

    checkPossibleEnnemies() {
        const ennemyTypes = []
        if (this.round > 0) {
            ennemyTypes.push(ENEMY_INFOS.NORMAL_RAT)
        }
        if (this.round > 4) {
            ennemyTypes.push(ENEMY_INFOS.CAMO_RAT)
        }
        if (this.round > 9) {
            ennemyTypes.push(ENEMY_INFOS.RAINBOW_RAT)
        }
        if (this.round > 14) {
            ennemyTypes.push(ENEMY_INFOS.STEEL_RAT)
        }
        return ennemyTypes
    }

    async createRat(ratType) {
        let new_rat = null;
        switch (ratType) {
            case ENEMY_INFOS.CAMO_RAT:
                new_rat = new ENEMIES.CamoRat();
                break;
            case ENEMY_INFOS.RAINBOW_RAT:
                new_rat = new ENEMIES.RainbowRat();
                break;
            case ENEMY_INFOS.STEEL_RAT:
                new_rat = new ENEMIES.SteelRat();
                break;
            default:
                new_rat = new ENEMIES.Rat();
                break;
        }
        await new_rat.loadAsset()
        new_rat.render()
        this.totalEnnemies.push(new_rat)
        return new_rat
    }

    async startRound() {
        if (this.isPlaying) return
        let i = 0
        this.defineEnnemyAmount()
        const possible_enemies = this.checkPossibleEnnemies()
        
        this.spawnEnnemiesInterval = setInterval(async () => {
            if (i === this.ennemySpawn) {
                clearInterval(this.spawnEnnemiesInterval)
                return
            }
            i++
            let new_rat = await this.createRat(possible_enemies[Math.floor(this.rng() * possible_enemies.length)])
            new_rat.moveEntityInterval()
        }, 1000)
        setTimeout(() => {
            this.checkIfRoundEnd()
        }, 1000 * this.ennemySpawn)
    }

    checkIfRoundEnd() {
        this.checkIfRoundEndInterval = setInterval(() => {         

            if (this.totalEnnemies.length === 0) {
                this.roundEnd()
                
            }
        }, 200)
    }

    roundEnd() {
        
        clearInterval(this.gameInterval)
        clearInterval(this.spawnEnnemiesInterval)
        clearInterval(this.checkIfRoundEndInterval)
        this.round++
        console.log(this.round)
        if (this.isPaused) return
        else {
            this.startRound()
        }
    }

}

