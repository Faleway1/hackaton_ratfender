import { INGREDIENT_INFOS } from "../config.js";
import { game } from "../game.js"
import { gridManager } from "../gridManager.js";
import { ingredientManager } from "../ingredientManager.js";

class Ingredient {
    constructor() {
        this.buffs = {
            typebuff: INGREDIENT_INFOS.INGREDIENT_MILK.TYPE_BUFF,
            current_buff: INGREDIENT_INFOS.INGREDIENT_MILK.CURRENT_BUFF,
            base_buff: INGREDIENT_INFOS.INGREDIENT_MILK.BASE_BUFF,
            level: INGREDIENT_INFOS.INGREDIENT_MILK.BASE_LEVEL
        }
        this.range = INGREDIENT_INFOS.INGREDIENT_MILK.BASE_RANGE;
        this.image = INGREDIENT_INFOS.INGREDIENT_MILK.IMAGE
        this.imgUrl = INGREDIENT_INFOS.INGREDIENT_MILK.IMAGEURL
        this.type = INGREDIENT_INFOS.INGREDIENT_MILK.TYPE;
        this.towers = []
        this.price = INGREDIENT_INFOS.INGREDIENT_MILK.BASE_PRICE;

        this.is_placed = false;
        this.asset = ""
        this.position = null;
        this.sprite = null;
        this.range_circle = null;

        this.cells_in_range = []
        this.enemies_in_range = []
    }

    increaseBuff() {
        const priceHtml = document.querySelector(".ingredientUp")
        const priceIngre = document.querySelector(".priceIngre")
        console.log(this.price);
        
        priceHtml.addEventListener("click", () => {
            if (this.price <= game.pdr) {
                if (this.buffs.level >= 5) {
                    return false
                }
                console.log(this.price);
                
                game.pdr = game.pdr - this.price
                game.money.textContent = game.pdr
                this.buffs.level += 1
                this.buffs.current_buff = this.buffs.base_buff * this.buffs.level
                this.price = this.price + (20 * this.buffs.level)
                priceIngre.textContent = this.price
            }
        })
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.image);
    }

    async initBeforePlacement() {
        await this.loadAsset()
        this.initRangeVisual()
    }

    initAfterPlacement() {
        this.freeCellsInRange()
        this.sprite.tint = 0xFFFFFF; // Blanc
        this.hideRange()
        this.detectTowersInterval()
        this.initIngredientSelect()
        game.towerTilesOccupied.push(this.ingredientCell())
        this.increaseBuff()
    }

    ingredientSelect() {
        ingredientManager.showUpgrades(this);
        this.showRange()
    }

    ingredientUnselect() {
        ingredientManager.hideUpgrades(this);
        this.hideRange()
    }

    initIngredientSelect() {
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
    
        this.is_selected = false;
        this.sprite.on("click", (e) => {
          if (this.is_selected) {
            return;
          }
          const handleClick = (event) => {
            if (!this.is_selected) {
              return;
            }
            this.ingredientUnselect();
            this.is_selected = false;
            game.app.view.removeEventListener("click", handleClick);
          };
    
          game.app.view.addEventListener("click", handleClick);
    
          setTimeout(() => {
            this.is_selected = true;
            this.ingredientSelect();
          }, 10);
        });
    }

    initRangeVisual() {
        this.rangeGraphic = new PIXI.Graphics();
        this.rangeGraphic.circle(0, 0, this.range * game.tilewidth);
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

    freeCellsInRange() {
        const freeCells = []
        const cell = gridManager.findOnGrid(this.position.x, this.position.y, game.cellsList);
        const startCol = Math.floor((cell.x - this.range));
        const endCol = Math.floor((cell.x + this.range));
        const startRow = Math.floor((cell.y - this.range));
        const endRow = Math.floor((cell.y + this.range));


        for (let col = startCol; col <= endCol; col++) {
            for (let row = startRow; row <= endRow; row++) {
                const cell = gridManager.findCell(col, row, game.cellsList);
                if (!cell) continue;
                if (!game.path.includes(cell)) {
                    freeCells.push(cell)
                }
            }
        }
        this.cells_in_range = freeCells;        
    }

    applyBuffToTower(tower) {
        const tower_buff = tower.buffs.filter((buff) => buff.typebuff === this.buffs.typebuff)
        if (tower_buff.length > 0) {
            tower.buffs.pop(tower_buff[0])
        }
        tower.buffs.push(this.buffs)
        tower.updateBuffs()
    }

    applyBuffToTowers(list_of_towers) {
        list_of_towers.forEach((tower) => {
            this.applyBuffToTower(tower)
        })
    }
            


    detectNearbyTowers() {
        const towers_nearby = []
        this.cells_in_range.forEach((cell) => {
            cell.towers.forEach((tower) => {
                if (tower.is_placed && !towers_nearby.includes(tower)) {     
                    towers_nearby.push(tower)
                } 
            })
        })
        this.applyBuffToTowers(towers_nearby)
        this.towers = towers_nearby
        
    }

    detectTowersInterval() {
        this.detectingTowers = setInterval(() => {
            this.detectNearbyTowers();
        }, 200);
    }


    ableToPlace(x, y) {
        const cell_position = gridManager.findOnGrid(x, y);
        const cell = gridManager.findCell(cell_position.x, cell_position.y, game.cellsList);
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

    ingredientCell() {
        const cell = gridManager.findOnGrid(
            this.position.x,
            this.position.y,
            game.cellsList
        );
        return cell;
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

class PepperIngredient extends Ingredient{
    constructor() {
        super();
        
        this.buffs = {
            typebuff: INGREDIENT_INFOS.INGREDIENT_PEPPER.TYPE_BUFF,
            current_buff: INGREDIENT_INFOS.INGREDIENT_PEPPER.CURRENT_BUFF,
            base_buff: INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_BUFF,
            level: INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_LEVEL
        }

        this.range = INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_RANGE;
        this.image = INGREDIENT_INFOS.INGREDIENT_PEPPER.IMAGE;
        this.imgUrl = INGREDIENT_INFOS.INGREDIENT_PEPPER.IMAGEURL
        this.type = INGREDIENT_INFOS.INGREDIENT_PEPPER.TYPE;

        this.price =INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_PRICE
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
        this.range = INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_RANGE;
        this.image = INGREDIENT_INFOS.INGREDIENT_FIGUE.IMAGE
        this.imgUrl = INGREDIENT_INFOS.INGREDIENT_FIGUE.IMAGEURL
        this.type = INGREDIENT_INFOS.INGREDIENT_FIGUE.TYPE;

        this.price = INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_PRICE;
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
        this.range = INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_RANGE;
        this.image = INGREDIENT_INFOS.INGREDIENT_HERBE.IMAGE
        this.imgUrl = INGREDIENT_INFOS.INGREDIENT_HERBE.IMAGEURL
        this.type = INGREDIENT_INFOS.INGREDIENT_HERBE.TYPE;

        this.price = INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_PRICE;
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
        this.range = INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_RANGE;
        this.image = INGREDIENT_INFOS.INGREDIENT_JALAPENOS.IMAGE
        this.imgUrl = INGREDIENT_INFOS.INGREDIENT_JALAPENOS.IMAGEURL
        this.type = INGREDIENT_INFOS.INGREDIENT_JALAPENOS.TYPE;

        this.price = INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_PRICE;
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
        this.range = INGREDIENT_INFOS.INGREDIENT_ONION.BASE_RANGE;
        this.image = INGREDIENT_INFOS.INGREDIENT_ONION.IMAGE
        this.imgUrl = INGREDIENT_INFOS.INGREDIENT_ONION.IMAGEURL
        this.type = INGREDIENT_INFOS.INGREDIENT_ONION.TYPE;

        this.price = INGREDIENT_INFOS.INGREDIENT_ONION.BASE_PRICE;
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