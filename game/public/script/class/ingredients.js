const INGREDIENT_MILK = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    IMAGE: "tomeFromage"
}

export class Ingredient {
    constructor() {
        this.buffs = {
            typebuff: INGREDIENT_MILK.TYPE_BUFF,
            current_buff: INGREDIENT_MILK.CURRENT_BUFF,
            base_buff: INGREDIENT_MILK,
            level: INGREDIENT_MILK.BASE_LEVEL
        }
        this.rng = INGREDIENT_MILK.BASE_RANGE;
        this.towers = []
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
}
