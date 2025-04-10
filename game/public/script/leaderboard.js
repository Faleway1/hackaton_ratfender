function fetchTopPlayers() {
    fetch('http://localhost:3000/api/v1/leaderboard/topPlayer')
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("leaderboard-list");
        data.forEach((player, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${player.player} - ${player.waves} waves`;
            list.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Erreur lors du chargement du leaderboard :", error);
    });
}

fetchTopPlayers();
