# 🧀 RatFender - Tower Defense

**RatFender** est un jeu de **Tower Defense** original où tu dois défendre ton territoire contre des vagues de rats en plaçant des fromages qui les attaquent automatiquement.

---

## 🎮 Qu'est-ce qu'un Tower Defense ?

Dans un **Tower Defense**, les ennemis suivent un chemin fixe.  
Ton but : **placer des tours (ici, des fromages)** autour de ce chemin pour les empêcher d'atteindre la fin.  
Chaque fromage attaque automatiquement les ennemis à portée.  
Plus tu avances, plus les vagues deviennent difficiles… à toi de t'adapter !


## 🐭 Les ennemis : les Rats

- 🐀 **Rat normal** : vulnérable à tous les fromages.
- 🕵️‍♂️ **Rat camouflé** : visible **uniquement** par le **Comté** ou via un item spécial.
- 🛡️ **Rat blindé** : peut être détruit **seulement** par le **Roquefort** ou avec un item spécial.
- 🌈 **Rat multicolor** : très résistant, mais **faible contre le Chèvre** ou l’item adapté.


## 🧀 Les fromages (tours)

Chaque fromage est une tour défensive unique avec ses propres caractéristiques.  
Tu peux les améliorer en leur donnant des **items** !


## 🧩 Les Items

### ⚙️ Améliorations générales

- 🥛 **Lait** : augmente les **dégâts**.
- 🌿 **Herbes de Provence** : augmente la **vitesse de tir**.
- 🍇 **Figue** : augmente la **portée**.

### 🧄 Améliorations spécialisées

Permettent aux fromages d’attaquer des types de rats spécifiques :

- 🧄 **Ail** : permet d’attaquer les **rats camouflés**.
- 🌶️ **Jalapeños** : permet d’attaquer les **rats blindés**.
- 🧂 **Poivre** : permet d’attaquer les **rats multicolors**.


## 🕹️ Comment jouer

1. **Clique sur une carte** pour acheter un fromage.
2. **Place-le sur la map** (sur une zone autorisée).
3. Les fromages attaquent automatiquement les rats à portée.
4. Utilise les **items** pour booster tes tours ou leur donner de nouvelles capacités.
5. Résiste à un maximum de vagues !


## 🏆 Leaderboard

À la fin de la partie, ton score est enregistré.  
💪 Affronte les autres joueurs et grimpe dans le **classement** !

## 🧀 Défends ton royaume… à coups de fromage !

Tu penses être le roi du fromage ?  
Prouve-le en éliminant un maximum de rats !  
Bonne chance, stratège fromager 🧠🧀🐀


## 🛠️ Technologies utilisées

- **Backend (API REST)** :
  - [Express.js](https://expressjs.com/) – Framework minimaliste pour créer l'API.
  - [Sequelize](https://sequelize.org/) – ORM pour gérer la base de données relationnelle.

- **Frontend (Jeu)** :
  - [PixiJS](https://pixijs.com/) – Moteur de rendu 2D pour la création du jeu en JavaScript.

## 🚀 Déploiement

- 🎮 Jeu en ligne : [https://ratfender.netlify.app/](https://ratfender.netlify.app/)
- 🌐 API en ligne : [https://hackaton-ratfender.onrender.com/api/v1/leaderboard](https://hackaton-ratfender.onrender.com/api/v1/leaderboard)
