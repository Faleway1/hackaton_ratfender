import { INGREDIENT_INFOS } from "../config";

class Ingredient {
    constructor() {
        this.buffs = {
            typebuff: INGREDIENT_INFOS.INGREDIENT_MILK.TYPE_BUFF,
            current_buff: INGREDIENT_INFOS.INGREDIENT_MILK.CURRENT_BUFF,
            base_buff: INGREDIENT_INFOS.INGREDIENT_MILK.BASE_BUFF,
            level: INGREDIENT_INFOS.INGREDIENT_MILK.BASE_LEVEL
        }
        this.rng = INGREDIENT_INFOS.INGREDIENT_MILK.BASE_RANGE;
        this.towers = []
        this.price = price;
    }

    IncreaseBuff() {
        this.buffs.current_buff += this.buffs.base_buff
    }
}

class PepperIngredient extends Ingredient{
    constructor() {
        super();
        
        this.buffs = {
            typebuff: INGREDIENT_INFOS.INGREDIENT_PEPPER.TYPE_BUFF,
            current_buff: INGREDIENT_INFOS.INGREDIENT_PEPPER.CURRENT_BUFF,
            base_buff: INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_BUFF,
            level: INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_LEVEL
        }
        this.rng = INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_RANGE;
    }
}
class FigueIngredient extends Ingredient{
    constructor() {
        super();

        this.buffs = {
            typebuff: INGREDIENT_INFOS.INGREDIENT_FIGUE.TYPE_BUFF,
            current_buff: INGREDIENT_INFOS.INGREDIENT_FIGUE.CURRENT_BUFF,
            base_buff: INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_BUFF,
            level: INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_LEVEL
        }
        this.rng = INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_RANGE;
    }
}
class HerbeIngredient extends Ingredient{
    constructor() {
        super();

        this.buffs = {
            typebuff: INGREDIENT_INFOS.INGREDIENT_HERBE.TYPE_BUFF,
            current_buff: INGREDIENT_INFOS.INGREDIENT_HERBE.CURRENT_BUFF,
            base_buff: INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_BUFF,
            level: INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_LEVEL
        }
        this.rng = INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_RANGE;
    }
}
class JalapenosIngredient extends Ingredient{
    constructor() {
        super();

        this.buffs = {
            typebuff: INGREDIENT_INFOS.INGREDIENT_JALAPENOS.TYPE_BUFF,
            current_buff: INGREDIENT_INFOS.INGREDIENT_JALAPENOS.CURRENT_BUFF,
            base_buff: INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_BUFF,
            level: INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_LEVEL
        }
        this.rng = INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_RANGE;
    }
}
class OnionIngredient extends Ingredient{
    constructor() {
        super();

        this.buffs = {
            typebuff: INGREDIENT_INFOS.INGREDIENT_ONION.TYPE_BUFF,
            current_buff: INGREDIENT_INFOS.INGREDIENT_ONION.CURRENT_BUFF,
            base_buff: INGREDIENT_INFOS.INGREDIENT_ONION.BASE_BUFF,
            level: INGREDIENT_INFOS.INGREDIENT_ONION.BASE_LEVEL
        }
        this.rng = INGREDIENT_INFOS.INGREDIENT_ONION.BASE_RANGE;
    }
}

const INGREDIENTS = {
    Ingredient,
    PepperIngredient,
    FigueIngredient,
    HerbeIngredient,
    JalapenosIngredient,
    OnionIngredient
}
export { INGREDIENTS };