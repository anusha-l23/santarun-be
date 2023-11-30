'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Registers', 'eventId', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: 'Events',
        key: 'id'
      },
     
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Registers', 'eventId');
  }
};
