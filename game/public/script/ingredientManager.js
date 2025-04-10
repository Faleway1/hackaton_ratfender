import { INGREDIENT_INFOS } from "./config.js";
import { INGREDIENTS } from "./class/ingredients.js";
import { game } from "./game.js";

async function placeIngredient(ingredientType) {
    let new_ingredient = null   
    switch (ingredientType) {
        case INGREDIENT_INFOS.INGREDIENT_MILK.TYPE:
            new_ingredient = new INGREDIENTS.Ingredient()
            break;
        case INGREDIENT_INFOS.INGREDIENT_PEPPER.TYPE:
            new_ingredient = new INGREDIENTS.PepperIngredient()
            break;
        case INGREDIENT_INFOS.INGREDIENT_FIGUE.TYPE:
            new_ingredient = new INGREDIENTS.FigueIngredient()
            break;
        case INGREDIENT_INFOS.INGREDIENT_HERBE.TYPE:
            new_ingredient = new INGREDIENTS.HerbeIngredient()
            break;
        case INGREDIENT_INFOS.INGREDIENT_JALAPENOS.TYPE:
            new_ingredient = new INGREDIENTS.JalapenosIngredient()
            break;
        case INGREDIENT_INFOS.INGREDIENT_ONION.TYPE:
            new_ingredient = new INGREDIENTS.OnionIngredient()
            break;
        default:
            console.error("Unknown tower type:", ingredientType);
            return null;        
    }
    await new_ingredient.initBeforePlacement()

    const handleMouseMove = (event) => {
        
        if (new_ingredient.is_placed) {
            game.app.view.removeEventListener("mousemove", handleMouseMove);
            game.app.view.removeEventListener("click", handleMouseClick);
            return;
          }
          const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
          const scaleX = game.app.view.width / rect.width;
          const scaleY = game.app.view.height / rect.height;
          const mouseX = (event.clientX - rect.left) * scaleX;
          const mouseY = (event.clientY - rect.top) * scaleY;

          new_ingredient.render(mouseX, mouseY, false);
    }

    const handleMouseClick = (event) => {
        const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
        const scaleX = game.app.view.width / rect.width;
        const scaleY = game.app.view.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

        new_ingredient.render(mouseX, mouseY, true);
    }
    game.app.view.addEventListener("mousemove", handleMouseMove);
    game.app.view.addEventListener("click", handleMouseClick);

    return new_ingredient
}

function showUpgrades(ingredient) {
    const modal = document.querySelector(".upgrade-card-ingredient");
    modal.style.display = "flex";
    const ratName = document.querySelector(".ingredientName");
    const image = document.querySelector("#ingredientPic");
    const upgrade_name_elements = document.querySelector(".ingredient-upgradeName");
    const upgrade_price_elements = document.querySelector(".ingredient-upgradePrice");

    ratName.innerHTML = ingredient.type;
    image.src = ingredient.imgUrl;
    
}

function hideUpgrades() {
    const modal = document.querySelector(".upgrade-card-ingredient");
    modal.style.display = "none";
}

function activateButtons() {
    const milk = document.querySelector(".ingredient_milk");
    const pepper = document.querySelector(".ingredient_pepper");
    const jalapenos = document.querySelector(".ingredient_jalapenos");
    const onion = document.querySelector(".ingredient_onion");
    const herbe = document.querySelector(".ingredient_herbe");
    const figue = document.querySelector(".ingredient_figue");

    milk.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_MILK.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_MILK.TYPE);
            game.pdr = game.pdr - INGREDIENT_INFOS.INGREDIENT_MILK.BASE_PRICE
            game.money.textContent = game.pdr
        }
    });
    pepper.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_PEPPER.TYPE);
            game.pdr = game.pdr - INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_PRICE
            game.money.textContent = game.pdr
        }
    });
    jalapenos.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_JALAPENOS.TYPE);
            game.pdr = game.pdr - INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_PRICE
            game.money.textContent = game.pdr
        }
    });
    onion.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_ONION.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_ONION.TYPE);
            game.pdr = game.pdr - INGREDIENT_INFOS.INGREDIENT_ONION.BASE_PRICE
            game.money.textContent = game.pdr
        }
    });
    herbe.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_HERBE.TYPE);
            game.pdr = game.pdr - INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_PRICE
            game.money.textContent = game.pdr
        }
    });
    figue.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_FIGUE.TYPE);
            game.pdr = game.pdr - INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_PRICE
            game.money.textContent = game.pdr
        }
    });
}

const ingredientManager = {
    placeIngredient,
    showUpgrades,
    hideUpgrades,
    activateButtons,
};

export { ingredientManager };