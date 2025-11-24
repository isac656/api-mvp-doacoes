const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Feedback = sequelize.define("Feedback", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nota: { type: DataTypes.INTEGER, allowNull: false },
  comentario: { type: DataTypes.STRING }
});

User.hasMany(Feedback, { foreignKey: "userId" });
Feedback.belongsTo(User, { foreignKey: "userId" });

module.exports = Feedback;
