import { INGREDIENT_INFOS } from "./config.js";
import { INGREDIENTS } from "./class/ingredients.js";
import { game } from "./game.js";

async function placeIngredient(ingredientType, card) {
    if (game.isTowerBeignPlaced) {
        return
    }
    game.isTowerBeignPlaced = true
    let new_ingredient = null   
    document.querySelector(".black-flag").style.display = "flex"
    card.style.opacity = "0.6"

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
        game.isTowerBeignPlaced = false
        document.querySelector(".black-flag").style.display = "none"
        card.style.opacity = "1"

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
        console.log(game);
        
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_MILK.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_MILK.TYPE, milk);
            const substract = game.substractPdr.bind(game);
            substract(INGREDIENT_INFOS.INGREDIENT_MILK.BASE_PRICE)
        }
    });
    pepper.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_PEPPER.TYPE, pepper);
            const substract = game.substractPdr.bind(game);
            substract(INGREDIENT_INFOS.INGREDIENT_PEPPER.BASE_PRICE)
        }
    });
    jalapenos.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_JALAPENOS.TYPE, jalapenos);
            const substract = game.substractPdr.bind(game);
            substract(INGREDIENT_INFOS.INGREDIENT_JALAPENOS.BASE_PRICE)
        }
    });
    onion.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_ONION.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_ONION.TYPE, onion);
            const substract = game.substractPdr.bind(game);
            substract(INGREDIENT_INFOS.INGREDIENT_ONION.BASE_PRICE)
        }
    });
    herbe.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_HERBE.TYPE, herbe);
            const substract = game.substractPdr.bind(game);
            substract(INGREDIENT_INFOS.INGREDIENT_HERBE.BASE_PRICE)
        }
    });
    figue.addEventListener("click", () => {
        if (game.pdr >= INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_PRICE) {
            placeIngredient(INGREDIENT_INFOS.INGREDIENT_FIGUE.TYPE, figue);
            const substract = game.substractPdr.bind(game);
            substract(INGREDIENT_INFOS.INGREDIENT_FIGUE.BASE_PRICE)
        }
    });
}

function updateCardsColor () {
    const milk = document.querySelector(".ingredient_milk");
    const pepper = document.querySelector(".ingredient_pepper");
    const jalapenos = document.querySelector(".ingredient_jalapenos");
    const onion = document.querySelector(".ingredient_onion");
    const herbe = document.querySelector(".ingredient_herbe");
    const figue = document.querySelector(".ingredient_figue");

    const cards = [
        [INGREDIENT_INFOS.INGREDIENT_MILK, milk],
        [INGREDIENT_INFOS.INGREDIENT_PEPPER, pepper],
        [INGREDIENT_INFOS.INGREDIENT_JALAPENOS, jalapenos],
        [INGREDIENT_INFOS.INGREDIENT_ONION, onion],
        [INGREDIENT_INFOS.INGREDIENT_HERBE, herbe],
        [INGREDIENT_INFOS.INGREDIENT_FIGUE, figue]
    ]

    cards.forEach(card => {
        if (game.pdr >= card[0].BASE_PRICE) {
            card[1].style.backgroundColor = "green"
            card[1].style.border = "darkgreen 2px solid"

        } else {
            card[1].style.backgroundColor = "red"
            card[1].style.border = "brown 2px solid"
        }
    });
    

}

const ingredientManager = {
    placeIngredient,
    showUpgrades,
    hideUpgrades,
    activateButtons,
    updateCardsColor
};

export { ingredientManager };