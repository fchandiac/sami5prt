'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      let categories = [{
          name: 'sin categoria'
      }]

    await queryInterface.bulkInsert('Categories', categories, {});
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
