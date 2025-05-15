import { GAME_SETTINGS, TOWER_INFOS, INGREDIENT_INFOS } from "./config.js";
import { Game } from "./class/gameClass.js";
import { entityManager } from "./entityManager.js";

entityManager.activateButtons()

const game = new Game(
  GAME_SETTINGS.TILES_PER_ROW,
  GAME_SETTINGS.TILES_PER_COL,
  GAME_SETTINGS.APP_WIDTH,
  GAME_SETTINGS.APP_HEIGHT,
  GAME_SETTINGS.TILE_WIDTH,
  GAME_SETTINGS.TILE_HEIGHT,
  GAME_SETTINGS.PDR_PER_ROUND
);
await game.initGame()
await game.startRound()

const tooltip = document.getElementById("tooltip");
const allLis = document.querySelectorAll(".tower_list li, .ingredients_list li");

allLis.forEach(li => {
    li.addEventListener("mouseenter", (e) => {
        
        tooltip.innerHTML = li.dataset.tooltip.replace(/\\n/g, '<br>');
        tooltip.style.display = "block";
    });

    li.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY + 10 + "px";
    });

    li.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
});


const paused = document.querySelector(".pausePlayButton")

paused.addEventListener("click", async () => {
    if (game.isPaused) {
        await game.startRound()
        game.isPaused = false
        paused.textContent = "⏸"
    } else {
        game.isPaused = true
        paused.textContent = "▶"
    }
})



export { game };
