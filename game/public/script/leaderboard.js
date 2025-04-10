const list = document.getElementById("leaderboard-list");

async function fetchTopPlayers() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/leaderboard");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du leaderboard");
    }

    const topPlayers = await response.json();

    topPlayers.forEach((player, index) => {
      const li = document.createElement("li");
      li.textContent = `#${index + 1} - ${player.player} (${player.waves} waves)`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur de chargement du leaderboard :", error);
    const li = document.createElement("li");
    li.textContent = "Impossible de charger le classement.";
    list.appendChild(li);
  }
}

fetchTopPlayers();
