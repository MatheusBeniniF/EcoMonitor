"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Leituras",
      [
        {
          local: "São Paulo",
          data_hora: new Date(),
          tipo: "Temperatura",
          valor: 22.5,
        },
        {
          local: "Rio de Janeiro",
          data_hora: new Date(),
          tipo: "Umidade",
          valor: 65.0,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Leituras", null, {});
  },
};
