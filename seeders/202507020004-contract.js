'use strict';

const crypto = require('crypto');

function generateChainTxId(data) {
  const raw = JSON.stringify(data) + new Date().toISOString();
  return crypto.createHash('sha256').update(raw).digest('hex');
}

function generateIpfsHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data1 = {
      id: 1,
      franchisorId: 1,
      franchiseeId: 1,
      title: 'Kontrak Mie Gacoan Jogja 1',
      description: 'Perjanjian kerjasama waralaba outlet Jogja 1',
      fileUrl: '/uploads/contracts/1751807505579-file.pdf',
      ipfsHash: generateIpfsHash('1751807505579-file.pdf'),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    data1.chainTxId = generateChainTxId(data1);

    await queryInterface.bulkInsert('contracts', [data1]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contracts', null, {});
  }
};