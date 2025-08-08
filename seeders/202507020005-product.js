'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        id: 2,
        name: 'Mie Suit',
        price: 10000,
        description: 'Non-spicy noodle for those who prefer a milder flavor.',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        franchiseeId: 1
      },
      {
        id: 3,
        name: 'Mie Hompimpa',
        price: 11000,
        description: 'Spicy noodle dish for chili lovers seeking a thrill.',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        franchiseeId: 1
      },
      {
        id: 4,
        name: 'Es Gobak Sodor',
        price: 8000,
        description: 'Colorful iced drink with fruity flavors to refresh your day.',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        franchiseeId: 1
      },
      {
        id: 5,
        name: 'Es Teklek',
        price: 8000,
        description: 'A mix of milk and syrup served with crushed ice, sweet and cold.',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        franchiseeId: 1
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};