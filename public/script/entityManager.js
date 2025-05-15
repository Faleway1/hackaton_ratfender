import { INGREDIENT_INFOS } from "./config.js";
import { INGREDIENTS } from "./class/ingredients.js";
import { TOWER_INFOS } from "./config.js";
import { TOWERS } from "./class/towers.js";
import { game } from "./game.js";

// Centralisation des entités (ingrédients ici, tu peux ajouter les tours)
const ENTITIES = [
    {
        info: INGREDIENT_INFOS.INGREDIENT_MILK,
        class: INGREDIENTS.Ingredient,
        selector: ".ingredient_milk",
    },
    {
        info: INGREDIENT_INFOS.INGREDIENT_PEPPER,
        class: INGREDIENTS.PepperIngredient,
        selector: ".ingredient_pepper",
    },
    {
        info: INGREDIENT_INFOS.INGREDIENT_JALAPENOS,
        class: INGREDIENTS.JalapenosIngredient,
        selector: ".ingredient_jalapenos",
    },
    {
        info: INGREDIENT_INFOS.INGREDIENT_ONION,
        class: INGREDIENTS.OnionIngredient,
        selector: ".ingredient_onion",
    },
    {
        info: INGREDIENT_INFOS.INGREDIENT_HERBE,
        class: INGREDIENTS.HerbeIngredient,
        selector: ".ingredient_herbe",
    },
    {
        info: INGREDIENT_INFOS.INGREDIENT_FIGUE,
        class: INGREDIENTS.FigueIngredient,
        selector: ".ingredient_figue",
    },
    {
        info: TOWER_INFOS.TOWER_TOME,
        class: TOWERS.Tower,
        selector: ".tower_tome",
    },
    {
        info: TOWER_INFOS.TOWER_COMTE,
        class: TOWERS.ComteTower,
        selector: ".tower_comte",
    },
    {
        info: TOWER_INFOS.TOWER_CHEVRE,
        class: TOWERS.ChevreTower,
        selector: ".tower_chevre",
    },
    {
        info: TOWER_INFOS.TOWER_ROQUEFORT,
        class: TOWERS.RoquefortTower,
        selector: ".tower_roquefort",
    }
];

// Placement générique d'une entité (ingrédient ou tour)
async function placeEntity(entity, card) {
  if (game.isTowerBeignPlaced) return;
  game.isTowerBeignPlaced = true;
  let new_entity = new entity.class();
  document.querySelector(".black-flag").style.display = "flex";
  card.style.opacity = "0.6";

  await new_entity.initBeforePlacement();

  const handleMouseMove = (event) => {
    if (new_entity.is_placed) {
      game.app.view.removeEventListener("mousemove", handleMouseMove);
      game.app.view.removeEventListener("click", handleMouseClick);
      return;
    }
    const rect = game.app.view.getBoundingClientRect();
    const scaleX = game.app.view.width / rect.width;
    const scaleY = game.app.view.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    new_entity.render(mouseX, mouseY, false);
  };

  const handleMouseClick = (event) => {
    const rect = game.app.view.getBoundingClientRect();
    const scaleX = game.app.view.width / rect.width;
    const scaleY = game.app.view.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    new_entity.render(mouseX, mouseY, true);
    game.isTowerBeignPlaced = false;
    document.querySelector(".black-flag").style.display = "none";
    card.style.opacity = "1";
  };

  game.app.view.addEventListener("mousemove", handleMouseMove);
  game.app.view.addEventListener("click", handleMouseClick);

  return new_entity;
}

// Affichage des upgrades
function showUpgrades(entityInstance) {
  const modal = document.querySelector(".upgrade-card-ingredient");
  modal.style.display = "flex";
  const ingredient_name = document.querySelector(".ingredientName");
  const image = document.querySelector("#ingredientPic");
  ingredient_name.innerHTML = entityInstance.type;
  image.src = entityInstance.imgUrl;
}

function hideUpgrades() {
  const modal = document.querySelector(".upgrade-card-ingredient");
  modal.style.display = "none";
}

// Activation des boutons et affichage des prix
function activateButtons() {
  ENTITIES.forEach((entity) => {
    const element = document.querySelector(entity.selector);
    if (!element) return;
    const priceElem = element.querySelector(".price");
    priceElem.innerHTML = entity.info.BASE_PRICE + " $";
    element.addEventListener("click", () => {
      if (game.pdr >= entity.info.BASE_PRICE) {
        placeEntity(entity, element);
        game.substractPdr(entity.info.BASE_PRICE);
      }
    });
  });
}

// Mise à jour des couleurs des cartes selon le pdr
function updateCardsColor() {
  ENTITIES.forEach((entity) => {
    const element = document.querySelector(entity.selector);
    if (!element) return;
    if (game.pdr >= entity.info.BASE_PRICE) {
      element.style.backgroundColor = "green";
      element.style.border = "darkgreen 2px solid";
    } else {
      element.style.backgroundColor = "red";
      element.style.border = "brown 2px solid";
    }
  });
}

const entityManager = {
  placeEntity,
  showUpgrades,
  hideUpgrades,
  activateButtons,
  updateCardsColor,
};

export { entityManager };