'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

  
      let products = [{
          name: 'producto',
          categoria_id = 1
      }]

     await queryInterface.bulkInsert('Products', products, {});

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
