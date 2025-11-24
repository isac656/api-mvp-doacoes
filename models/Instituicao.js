const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Instituicao = sequelize.define("Instituicao", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  endereco: { type: DataTypes.STRING, allowNull: false },
  telefone: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Instituicao;
