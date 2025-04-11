import { TOWER_INFOS } from "./config.js";
import { TOWERS } from "./class/towers.js";
import { game } from "./game.js";

async function placeTower(towerType) {
    let new_tower = null
    console.log(towerType);
    
    switch (towerType) {
        case TOWER_INFOS.TOWER_TOME.TYPE:
            new_tower = new TOWERS.Tower()
            break;
        case TOWER_INFOS.TOWER_COMTE.TYPE:
            new_tower = new TOWERS.ComteTower()
            break;
        case TOWER_INFOS.TOWER_CHEVRE.TYPE:
            new_tower = new TOWERS.ChevreTower()
            break;
        case TOWER_INFOS.TOWER_ROQUEFORT.TYPE:
            new_tower = new TOWERS.RoquefortTower()
            break;
        default:
            console.error("Unknown tower type:", towerType);
            return null;        
    }
    await new_tower.initBeforePlacement()

    const handleMouseMove = (event) => {
        
        if (new_tower.is_placed) {
            game.app.view.removeEventListener("mousemove", handleMouseMove);
            game.app.view.removeEventListener("click", handleMouseClick);
            return;
          }
          const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
          const scaleX = game.app.view.width / rect.width;
          const scaleY = game.app.view.height / rect.height;
          const mouseX = (event.clientX - rect.left) * scaleX;
          const mouseY = (event.clientY - rect.top) * scaleY;

          new_tower.render(mouseX, mouseY, false);
    }

    const handleMouseClick = (event) => {
        const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
        const scaleX = game.app.view.width / rect.width;
        const scaleY = game.app.view.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

        new_tower.render(mouseX, mouseY, true);
    }
    game.app.view.addEventListener("mousemove", handleMouseMove);
    game.app.view.addEventListener("click", handleMouseClick);

    return new_tower
}

function showUpgrades(tower) {
    const modal = document.querySelector(".upgrade-card");
    modal.style.display = "flex";
    const ratName = document.querySelector(".cheeseName");
    const image = document.querySelector("#cheesePic");
    const upgrade_price_elements = document.querySelectorAll(".upgrade .upgradePrice");

    ratName.innerHTML = tower.type;
    image.src = tower.imgUrl;
    upgrade_price_elements.forEach(price => {
        price.innerHTML = "5"; // A COMPLETER AVEC LE PRIX DE L'UPGRADE
    })
}

function hideUpgrades() {
    const modal = document.querySelector(".upgrade-card");
    modal.style.display = "none";
}

function activateButtons() {
    const tome = document.querySelector(".tower_tome");
    const comte = document.querySelector(".tower_comte");
    const chevre = document.querySelector(".tower_chevre");
    const roquefort = document.querySelector(".tower_roquefort");

    tome.addEventListener("click", () => {
        if (game.pdr >= TOWER_INFOS.TOWER_TOME.BASE_PRICE) {
            placeTower(TOWER_INFOS.TOWER_TOME.TYPE);
            game.pdr = game.pdr - TOWER_INFOS.TOWER_TOME.BASE_PRICE
            console.log(game.pdr);
            
        }
    });
    comte.addEventListener("click", () => {
        if (game.pdr >= TOWER_INFOS.TOWER_COMTE.BASE_PRICE) {
            placeTower(TOWER_INFOS.TOWER_COMTE.TYPE);
        }
    });
    chevre.addEventListener("click", () => {
        if (game.pdr >= TOWER_INFOS.TOWER_CHEVRE.BASE_PRICE) {
            placeTower(TOWER_INFOS.TOWER_CHEVRE.TYPE);
        }
    });
    roquefort.addEventListener("click", () => {
        if (game.pdr >= TOWER_INFOS.TOWER_ROQUEFORT.BASE_PRICE) {
            placeTower(TOWER_INFOS.TOWER_ROQUEFORT.TYPE);
        }
    });
}

const towerManager = {
    placeTower,
    showUpgrades,
    hideUpgrades,
    activateButtons
};

export { towerManager };