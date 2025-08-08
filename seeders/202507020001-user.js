'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      { id: 1, name: 'Admin', username: 'admin', password: await bcrypt.hash('password', 10), role: 'admin', email: 'admin@franchain.com', status: 'active', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Franchisor Mie Gacoan', username: 'franchisor', password: await bcrypt.hash('password', 10), role: 'franchisor', email: 'franchisor@mie-gacoan.com', status: 'active', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Mie Gacoan Jakarta', username: 'franchisee', password: await bcrypt.hash('password', 10), role: 'franchisee', email: 'outlet@mie-gacoan.com', status: 'active', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Yuna', username: 'consumer', password: await bcrypt.hash('password', 10), role: 'consumer', email: 'customer1@gmail.com', status: 'active', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Regulator', username: 'regulator', password: await bcrypt.hash('password', 10), role: 'regulator', email: 'regulator@bpkn.go.id', status: 'active', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Mediator', username: 'mediator', password: await bcrypt.hash('password', 10), role: 'mediator', email: 'bpsk@pusat.go.id', status: 'active', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};