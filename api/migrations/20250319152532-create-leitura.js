'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leituras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      local: {
        type: Sequelize.STRING
      },
      data_hora: {
        type: Sequelize.DATE
      },
      tipo: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.FLOAT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leituras');
  }
};