'use strict';

const crypto = require('crypto');

function generateIpfsHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('franchisors', [
      {
        id: 1,
        userId: 2,
        companyName: 'PT Mie Gacoan Nusantara',
        npwp: '123456789012345',
        address: 'Jl. Merdeka No. 1, Jakarta',
        nib: 'NIB-987654321',
        financialFile: '12314213-laporan_gacoan.pdf',
        ipfsHash: generateIpfsHash('12314213-laporan_gacoan.pdf'),
        verified: 'terverifikasi',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('franchisors', null, {});
  }
};