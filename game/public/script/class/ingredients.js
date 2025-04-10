const INGREDIENT_MILK = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    IMAGE: "milkIngredient"
}
const INGREDIENT_PEPPER = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    IMAGE: "pepperIngredient"
}
const INGREDIENT_FIGUE = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    IMAGE: "figueIngredient"
}
const INGREDIENT_HERBE = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    IMAGE: "herbeIngredient"
}
const INGREDIENT_JALAPENOS = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    IMAGE: "jalapenosIngredient"
}
const INGREDIENT_ONION = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    IMAGE: "onionIngredient"
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

    IncreaseBuff() {
        this.buff += this.baseBuff
    }
}

export class pepperIngredient extends Ingredient{
    constructor() {
        super();
        
        this.buffs = {
            typebuff: INGREDIENT_PEPPER.TYPE_BUFF,
            current_buff: INGREDIENT_PEPPER.CURRENT_BUFF,
            base_buff: INGREDIENT_PEPPER,
            level: INGREDIENT_PEPPER.BASE_LEVEL
        }
        this.rng = INGREDIENT_PEPPER.BASE_RANGE;
    }
}
export class figueIngredient extends Ingredient{
    constructor() {
        super();

        this.buffs = {
            typebuff: INGREDIENT_FIGUE.TYPE_BUFF,
            current_buff: INGREDIENT_FIGUE.CURRENT_BUFF,
            base_buff: INGREDIENT_FIGUE,
            level: INGREDIENT_FIGUE.BASE_LEVEL
        }
        this.rng = INGREDIENT_FIGUE.BASE_RANGE;
    }
}
export class herbeIngredient extends Ingredient{
    constructor() {
        super();

        this.buffs = {
            typebuff: INGREDIENT_HERBE.TYPE_BUFF,
            current_buff: INGREDIENT_HERBE.CURRENT_BUFF,
            base_buff: INGREDIENT_HERBE,
            level: INGREDIENT_HERBE.BASE_LEVEL
        }
        this.rng = INGREDIENT_HERBE.BASE_RANGE;
    }
}
export class jalapenosIngredient extends Ingredient{
    constructor() {
        super();

        this.buffs = {
            typebuff: INGREDIENT_JALAPENOS.TYPE_BUFF,
            current_buff: INGREDIENT_JALAPENOS.CURRENT_BUFF,
            base_buff: INGREDIENT_JALAPENOS,
            level: INGREDIENT_JALAPENOS.BASE_LEVEL
        }
        this.rng = INGREDIENT_JALAPENOS.BASE_RANGE;
    }
}
export class onionIngredient extends Ingredient{
    constructor() {
        super();

        this.buffs = {
            typebuff: INGREDIENT_ONION.TYPE_BUFF,
            current_buff: INGREDIENT_ONION.CURRENT_BUFF,
            base_buff: INGREDIENT_ONION,
            level: INGREDIENT_ONION.BASE_LEVEL
        }
        this.rng = INGREDIENT_ONION.BASE_RANGE;
    }
}