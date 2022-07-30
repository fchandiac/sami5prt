'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     
      let prices = [{
        product_id: 1, 
        tax_id: 1, 
        purchase: 500, 
        sale: 1000
      }]
    
     await queryInterface.bulkInsert('Prices', prices, {});

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
