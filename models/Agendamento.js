const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Agendamento = sequelize.define("Agendamento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  data: { type: DataTypes.STRING, allowNull: false },
  hora: { type: DataTypes.STRING, allowNull: false },
  observacao: { type: DataTypes.STRING }
});

User.hasMany(Agendamento, { foreignKey: "userId" });
Agendamento.belongsTo(User, { foreignKey: "userId" });

module.exports = Agendamento;
