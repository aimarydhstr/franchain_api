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
      fileUrl: '/uploads/agreements/1751795431189-file.pdf',
      ipfsHash: generateIpfsHash('1751795431189-file.pdf'),
      status: 'approved',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    data1.chainTxId = generateChainTxId(data1);

    await queryInterface.bulkInsert('agreements', [data1]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('agreements', null, {});
  }
};