import { game } from "../game.js"
import { findCell, findOnGrid } from "../gridManager.js";

const INGREDIENT_MILK = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    PRICE: 100,
    IMAGE: "milkIngredient"
}
const INGREDIENT_PEPPER = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    PRICE: 100,
    IMAGE: "pepperIngredient"
}
const INGREDIENT_FIGUE = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    PRICE: 100,
    IMAGE: "figueIngredient"
}
const INGREDIENT_HERBE = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    PRICE: 100,
    IMAGE: "herbeIngredient"
}
const INGREDIENT_JALAPENOS = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    PRICE: 100,
    IMAGE: "jalapenosIngredient"
}
const INGREDIENT_ONION = {
    TYPE_BUFF: "range",
    CURRENT_BUFF: 10,
    BASE_BUFF: 10,
    BASE_RANGE: 2,
    BASE_PRICE: 50,
    BASE_LEVEL: 0,
    PRICE: 100,
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
        this.image = INGREDIENT_MILK.IMAGE
        this.towers = []
        this.price = INGREDIENT_MILK.PRICE;

        this.is_placed = false;
        this.asset = ""
        this.position = null;
        this.sprite = null;
        this.range_circle = null;

        this.paths_in_range = []
        this.enemies_in_range = []
    }

    IncreaseBuff() {
        this.buff += this.baseBuff
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.image);
    }


    async initBeforePlacement() {
        await this.loadAsset()
        this.initRangeVisual()
    }

    initAfterPlacement() {
        this.pathsInRange()
        this.sprite.tint = 0xFFFFFF; // Blanc
        this.hideRange()
    }

    initRangeVisual() {
        this.rangeGraphic = new PIXI.Graphics();
        this.rangeGraphic.circle(0, 0, this.rng * game.tilewidth);
        this.rangeGraphic.beginFill(0x00FF00, 0.5); // Vert avec opacité
        game.app.stage.addChild(this.rangeGraphic)
        this.rangeGraphic.stroke({ width: 2, color: 0xfeeb77 });
        this.rangeGraphic.visible = false;

    }

    showRange() {
        this.rangeGraphic.x = this.position.x;
        this.rangeGraphic.y = this.position.y;
        this.rangeGraphic.visible = true;
    }

    hideRange() {
        this.rangeGraphic.visible = false;
    }

    pathsInRange() {
        const entitiesInRange = []
        const cell = findOnGrid(this.position.x, this.position.y, game.cellsList);
        const startCol = Math.floor((cell.x - this.rng));
        const endCol = Math.floor((cell.x + this.rng));
        const startRow = Math.floor((cell.y - this.rng));
        const endRow = Math.floor((cell.y + this.rng));

        for (let col = startCol; col <= endCol; col++) {
            for (let row = startRow; row <= endRow; row++) {
                const cell = findCell(col, row, game.cellsList);
                if (!cell) continue;
                if (game.path.includes(cell) && !this.enemies_in_range.includes(cell)) {
                    entitiesInRange.push(cell)
                }
            }
        }
        this.paths_in_range = entitiesInRange;
    }


    ableToPlace(x, y) {
        const cell_position = findOnGrid(x, y);
        const cell = findCell(cell_position.x, cell_position.y, game.cellsList);
        if (game.path.includes(cell) || game.towerTilesOccupied.includes(cell)) {
            return false
        }
        return true
    }

    updatePosition(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }

    render(x, y, placeIt) {
        if (this.is_placed) {
            return
        }
        this.position = {
            x: x,
            y: y,
        };
        if (!this.sprite) {
            this.sprite = new PIXI.Sprite(this.asset);
            this.sprite.anchor.set(0.5);
            this.sprite.name = this.id;
            this.sprite.width = game.tilewidth;
            this.sprite.height = game.tileheight;
        }
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        game.app.stage.addChild(this.sprite);

        this.showRange()
        if (this.ableToPlace(this.position.x, this.position.y)) {
            this.sprite.tint = 0x00FF00; // Vert
            this.is_placed = placeIt;
            if (placeIt) {
                this.initAfterPlacement()
            }
        } else {
            this.sprite.tint = 0xFF0000; // Rouge
            this.is_placed = false;
        }
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
        this.image = INGREDIENT_PEPPER.IMAGE;
        this.price =INGREDIENT_PEPPER.PRICE
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
        this.image = INGREDIENT_FIGUE.IMAGE
        this.price = INGREDIENT_FIGUE.PRICE;
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
        this.image = INGREDIENT_HERBE.IMAGE
        this.price = INGREDIENT_HERBE.PRICE;
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
        this.image = INGREDIENT_JALAPENOS.IMAGE
        this.price = INGREDIENT_JALAPENOS.PRICE;
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
        this.image = INGREDIENT_ONION.IMAGE
        this.price = INGREDIENT_ONION.PRICE;
    }
}