export class Tower{
    constructor(atk, atk_speed, rng, types, tiles) {
        this.atk = atk;
        this.atk_speed = atk_speed;
        this.rng = rng;
        this.types = types;
        this.tiles = tiles;
    }

    setAtk(atk) {
        this.atk = atk;
    }

    getAtk() {
        return this.atk;
    }

    setAtkSpeed(atk_speed) {
        this.atk_speed = atk_speed;
    }

    getAtkSpeed() {
        return this.atk_speed;
    }

    setRng(rng) {
        this.rng = rng;
    }

    getRng() {
        return this.rng;
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
}
