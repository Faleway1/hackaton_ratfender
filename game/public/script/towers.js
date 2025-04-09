import {game} from "./game.js"
import { findCell } from "./pathMaker.js";

export class Tower{
    constructor(types, position, price) {
        this.stats = {
            attack: 10,
            shot_speed:5,
            range:2
        }
        this.types = types;
        this.tiles_seen = []
        this.position = position;
        this.price = price;
        this.level = {
            path1: 0,
            path2: 0,
            path3: 0
        }
    }

    setTypes(types) {
        this.types = this.types.push(types);
    }

    getTypes() {
        return this.types;
    }

    setPosition(position) {
        this.position = position;
    }
    getPosition() {
        return this.position;
    }

    setPrice(price) {
        this.price = price;
    }
    getPrice() {
        return this.price;
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    IncreaseLevel(id_upgrade) {
        if (id_upgrade === 1) {
            if (this.level.path1 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path1 += 1;
                this.stats.attack +=5;
            }
        }
        if (id_upgrade === 2) {
            if (this.level.path2 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path2 += 1;
                this.stats.shot_speed +=2;
            }
        }
        if (id_upgrade === 3) {
            if (this.level.path3 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path3 += 1;
                this.stats.range +=1;
            }
        }
    }

    TilesSeen() {
        for (let y = -(this.stats.range); y < this.stats.range + 1; y++) {
            for (let x = -(this.stats.range); x < this.stats.range + 1; x++) {
                const cell = findCell((this.position[0]+x), (this.position[1]+y))
                game.path.forEach(element => {
                    if (element.x === cell.x && element.y === cell.y) {
                        this.tiles_seen.push(`cell-${element.x}-${element.y}`)
                    }
                });
            }            
        }
        return this.tiles_seen
    }
}

