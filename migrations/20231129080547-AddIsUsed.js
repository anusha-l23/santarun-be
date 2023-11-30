'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Coupons', 'isUsed', {
      type: Sequelize.BOOLEAN
    })
  },

  async down (queryInterface, Sequelize) {
 await queryInterface.removeColumn('Coupons', 'isUsed')
  }
};
