"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leitura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leitura.init(
    {
      local: DataTypes.STRING,
      data_hora: DataTypes.DATE,
      tipo: DataTypes.STRING,
      valor: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Leitura",
      timestamps: false,
      tableName: "Leituras",
    }
  );
  return Leitura;
};
