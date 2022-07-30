'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


      let taxes = [{
          name:'iva',
          value: 1.19
      }]

     await queryInterface.bulkInsert('Taxes', taxes, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
