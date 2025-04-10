import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Leaderboard = sequelize.define(
    "leaderboard",
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        player: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        waves: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
);

export default Leaderboard;