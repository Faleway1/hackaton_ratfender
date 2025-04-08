export class Ingredient {
    constructor(typebuff, buff, rng, towers, position, level, price) {
        this.typebuff = typebuff;
        this.buff = buff;
        this.baseBuff = buff
        this.rng = rng;
        this.towers = towers;
        this.position = position;
        this.level = level;
        this.price = price;
    }

    setTypeBuff(typebuff) {
        this.typebuff = typebuff;
    }
    getTypeBuff() {
        return this.typebuff
    }

    setBuff(buff) {
        this.buff = buff;
    }
    getBuff() {
        return this.buff
    }

    setRng(rng) {
        this.rng = rng;
    }

    getRng() {
        return this.rng
    }
    setTowers(towers) {
        this.towers = this.towers.push(towers);
    }

    getTowers() {
        return this.towers
    }
    setPosition(position) {
        this.position = position;
    }

    getPosition() {
        return this.position
    }
    setLevel(level) {
        this.level = level;
    }

    getLevel() {
        return this.level
    }

    setPrice(price) {
        this.price = price;
    }
    getPrice() {
        return this.price
    }

    IncreaseBuff() {
        this.buff += this.baseBuff
    }
    
    IncreaseLevel() {
        if (this.level === 5) {
            console.log("deja lvl max");
        } else {
            this.level += 1;
            this.IncreaseBuff()
            
        }
    }
}
