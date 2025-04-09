export class Tower{
    constructor(name, types, tiles, position, price) {
        this.stats = {
            attack: 0,
            shot_speed:0,
            range:0
        }
        this.name = name
        this.types = types;
        this.tiles = tiles;
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

    setTiles(tiles) {
        this.tiles = this.tiles.push(tiles);
    }

    getTiles() {
        return this.tiles;
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
}

export class Tome extends Tower {

}
