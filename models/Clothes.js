const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Clothes = sequelize.define("Clothes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descricao: { type: DataTypes.STRING, allowNull: false },
  tamanho: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false },
  imagem: { type: DataTypes.STRING, allowNull: true }
});

User.hasMany(Clothes, { foreignKey: "userId" });
Clothes.belongsTo(User, { foreignKey: "userId" });

module.exports = Clothes;
