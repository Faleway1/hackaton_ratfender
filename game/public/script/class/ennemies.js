export class Rat{
    constructor(hp, type, name,id_tile, image, money) {
        this.hp = hp;
        this.type = type;
        this.name = name;
        this.id_tile = id_tile;
        this.image = image;
        this.money = money;
    }

    setHp(hp) {
        this.hp = hp
    }

    getHp() {
        return this.getHp;
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    setIdTile(id_tile) {
        this.id_tile = id_tile;
    }

    getIdTile() {
        return this.id_tile;
    }

    getImage() {
        return this.image;
    }

    getMoney() {
        return this.money
    }
}