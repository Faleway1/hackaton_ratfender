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
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        new_tower.render(mouseX, mouseY, true);
    }
    game.app.view.addEventListener("mousemove", handleMouseMove);
    game.app.view.addEventListener("click", handleMouseClick);

    return new_tower
}

export { placeTower };