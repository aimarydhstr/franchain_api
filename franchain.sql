-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for franchain
CREATE DATABASE IF NOT EXISTS `franchain` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `franchain`;

-- Dumping structure for table franchain.agreements
CREATE TABLE IF NOT EXISTS `agreements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `franchisorId` int DEFAULT NULL,
  `franchiseeId` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `fileUrl` varchar(255) DEFAULT NULL,
  `ipfsHash` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `chainTxId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `franchisorId` (`franchisorId`),
  KEY `franchiseeId` (`franchiseeId`),
  CONSTRAINT `agreements_ibfk_1` FOREIGN KEY (`franchisorId`) REFERENCES `franchisors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agreements_ibfk_2` FOREIGN KEY (`franchiseeId`) REFERENCES `franchisees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.agreements: ~1 rows (approximately)
INSERT INTO `agreements` (`id`, `franchisorId`, `franchiseeId`, `title`, `fileUrl`, `ipfsHash`, `status`, `chainTxId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Halal Certification', '/uploads/agreements/1751795431189-file.pdf', 'Qmagreement123', 'approved', '7d471e923f145b3d7adfbc348a19b465d00cc16d8fdf011843244e98298363aa', '2025-07-09 01:00:18', '2025-07-09 01:00:18');

-- Dumping structure for table franchain.audits
CREATE TABLE IF NOT EXISTS `audits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `complaintId` int DEFAULT NULL,
  `franchiseeId` int DEFAULT NULL,
  `description` text,
  `auditDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `complaintId` (`complaintId`),
  KEY `franchiseeId` (`franchiseeId`),
  CONSTRAINT `audits_ibfk_1` FOREIGN KEY (`complaintId`) REFERENCES `complaints` (`id`) ON DELETE SET NULL,
  CONSTRAINT `audits_ibfk_2` FOREIGN KEY (`franchiseeId`) REFERENCES `franchisees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.audits: ~0 rows (approximately)
INSERT INTO `audits` (`id`, `complaintId`, `franchiseeId`, `description`, `auditDate`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Audit atas pengaduan konsumen Jogja 1', '2025-07-09 01:00:18', '2025-07-09 01:00:18', '2025-07-09 01:00:18');

-- Dumping structure for table franchain.audit_scores
CREATE TABLE IF NOT EXISTS `audit_scores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `franchiseeId` int NOT NULL,
  `score` float NOT NULL,
  `calculatedAt` datetime NOT NULL,
  `reputation` enum('Trusted','Compliant','Under Watch') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `chainTxId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `franchiseeId` (`franchiseeId`),
  CONSTRAINT `audit_scores_ibfk_1` FOREIGN KEY (`franchiseeId`) REFERENCES `franchisees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.audit_scores: ~2 rows (approximately)
INSERT INTO `audit_scores` (`id`, `franchiseeId`, `score`, `calculatedAt`, `reputation`, `createdAt`, `updatedAt`, `chainTxId`) VALUES
	(3, 1, 98, '2025-08-04 00:00:00', 'Trusted', '2025-08-04 00:00:00', '2025-08-04 00:00:00', '8a15cfd41babc70cb5889c46e6168d6f476f20fe3aa787e6cdb6e7e63c5aebf6'),
	(4, 2, 99, '2025-08-04 00:00:00', 'Trusted', '2025-08-04 00:00:00', '2025-08-04 00:00:00', '2a3a1c7c6611862c58be78e1d69ae89de25fa839d6e3d73c0ee69f1b9e64d0cd');

-- Dumping structure for table franchain.bpsks
CREATE TABLE IF NOT EXISTS `bpsks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.bpsks: ~0 rows (approximately)
INSERT INTO `bpsks` (`id`, `name`, `city`, `address`, `createdAt`, `updatedAt`) VALUES
	(1, 'BPSK Kota Yogyakarta', 'Yogyakarta', 'Jl. Laksda Adisucipto No. 99', '2025-07-09 01:00:18', '2025-07-09 01:00:18');

-- Dumping structure for table franchain.clarifications
CREATE TABLE IF NOT EXISTS `clarifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `complaintId` int NOT NULL,
  `text` text,
  `fileUrl` varchar(255) DEFAULT NULL,
  `ipfsHash` varchar(255) DEFAULT NULL,
  `submittedAt` datetime NOT NULL,
  `chainTxId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `complaintId` (`complaintId`),
  CONSTRAINT `clarifications_ibfk_1` FOREIGN KEY (`complaintId`) REFERENCES `complaints` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.clarifications: ~0 rows (approximately)

-- Dumping structure for table franchain.compensations
CREATE TABLE IF NOT EXISTS `compensations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `complaintId` int DEFAULT NULL,
  `type` enum('refund','voucher','discount') NOT NULL,
  `amount` int DEFAULT NULL,
  `description` text,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `resolvedBy` enum('system','franchisor','regulator','mediator') DEFAULT NULL,
  `chainTxId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `complaintId` (`complaintId`),
  CONSTRAINT `compensations_ibfk_1` FOREIGN KEY (`complaintId`) REFERENCES `complaints` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.compensations: ~2 rows (approximately)
INSERT INTO `compensations` (`id`, `complaintId`, `type`, `amount`, `description`, `status`, `resolvedBy`, `chainTxId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'voucher', 30000, 'Voucher untuk pengembalian uang', 'approved', 'mediator', '1373940a290f7e90182f72aa11b6b8b3a3edbd914e0ad759dc0179e6a4d6de8a', '2025-07-09 01:00:18', '2025-07-09 01:57:13'),
	(16, 16, 'voucher', 10000, NULL, 'approved', 'system', '64b7f9c5c59ce9d1dbf11f9c8ae42bc021f7c5f3a7686fc29314b407a541215d', '2025-08-01 09:00:00', '2025-08-01 09:00:00'),
	(17, 17, 'voucher', 10000, NULL, 'approved', 'system', '6f18667677cbf0f0dbea3122bf626ef395fa28daa99c274d074bc0418a28d1f8', '2025-08-08 03:30:00', '2025-08-08 03:30:00');

-- Dumping structure for table franchain.complaints
CREATE TABLE IF NOT EXISTS `complaints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consumerId` int DEFAULT NULL,
  `franchiseeId` int DEFAULT NULL,
  `transactionId` int DEFAULT NULL,
  `agreementId` int DEFAULT NULL,
  `description` text,
  `violationType` enum('expired','bad_quality','late','incomplete','others') DEFAULT NULL,
  `evidenceFile` varchar(255) DEFAULT NULL,
  `evidenceHash` varchar(255) DEFAULT NULL,
  `penalty` int DEFAULT '0',
  `status` enum('open','resolved','escalated') DEFAULT 'open',
  `resolvedBy` enum('system','regulator','mediator') DEFAULT NULL,
  `chainTxId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `consumerId` (`consumerId`),
  KEY `franchiseeId` (`franchiseeId`),
  KEY `transactionId` (`transactionId`),
  KEY `agreementId` (`agreementId`),
  CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`consumerId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `complaints_ibfk_2` FOREIGN KEY (`franchiseeId`) REFERENCES `franchisees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `complaints_ibfk_3` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`id`) ON DELETE SET NULL,
  CONSTRAINT `complaints_ibfk_4` FOREIGN KEY (`agreementId`) REFERENCES `agreements` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.complaints: ~2 rows (approximately)
INSERT INTO `complaints` (`id`, `consumerId`, `franchiseeId`, `transactionId`, `agreementId`, `description`, `violationType`, `evidenceFile`, `evidenceHash`, `penalty`, `status`, `resolvedBy`, `chainTxId`, `createdAt`, `updatedAt`) VALUES
	(1, 4, 1, 1, 1, 'Cold food and slow service', 'bad_quality', 'uploads/complaints/evidence1.jpg', 'd82ce49c63245bb3c761eec1914e3c5829e472419a72a6a4035ad21626447977', 29998, 'resolved', 'mediator', '924b1a9f3241ac57ed2418df3c15d91c4024626939fcd31766eaa34476e8d3f1', '2025-07-09 01:00:18', '2025-07-09 01:57:13'),
	(16, 4, 1, 2, 1, 'Automation: Delivery exceeded the maximum time limit.', 'late', NULL, NULL, 10000, 'resolved', 'system', '3b5a997f042e9c985da4d3e263ea894e0f47eb2b4c90c0282f3823b05a92e07b', '2025-08-01 09:00:00', '2025-08-01 09:00:00'),
	(17, 8, 1, 3, 1, 'Automation: Delivery exceeded the maximum time limit.', 'late', NULL, NULL, 10000, 'resolved', 'system', '3b2593cb653f4579dd15db253c5af3ada8f5fcb2bd1e9fa08b60d82e182accca', '2025-08-08 03:30:00', '2025-08-08 03:30:00');

-- Dumping structure for table franchain.complaint_rules
CREATE TABLE IF NOT EXISTS `complaint_rules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `franchisorId` int NOT NULL,
  `violationType` enum('late') NOT NULL DEFAULT 'late',
  `maxDeliveryTime` int NOT NULL COMMENT 'Waktu maksimal pengiriman (dalam jam atau menit tergantung sistem transaksi)',
  `autoCompensationAmount` int DEFAULT NULL COMMENT 'Jumlah kompensasi otomatis jika terlambat',
  `autoCompensationType` enum('refund','voucher','discount') DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `franchisorId` (`franchisorId`),
  CONSTRAINT `complaint_rules_ibfk_1` FOREIGN KEY (`franchisorId`) REFERENCES `franchisors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.complaint_rules: ~1 rows (approximately)
INSERT INTO `complaint_rules` (`id`, `franchisorId`, `violationType`, `maxDeliveryTime`, `autoCompensationAmount`, `autoCompensationType`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'late', 90, 10000, 'voucher', 'active', '2025-07-09 01:00:18', '2025-07-09 04:18:08');

-- Dumping structure for table franchain.contracts
CREATE TABLE IF NOT EXISTS `contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `franchisorId` int DEFAULT NULL,
  `franchiseeId` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `fileUrl` varchar(255) DEFAULT NULL,
  `ipfsHash` varchar(255) DEFAULT NULL,
  `status` enum('draft','active','terminated') DEFAULT 'draft',
  `endDate` datetime DEFAULT NULL,
  `chainTxId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `franchisorId` (`franchisorId`),
  KEY `franchiseeId` (`franchiseeId`),
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`franchisorId`) REFERENCES `franchisors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`franchiseeId`) REFERENCES `franchisees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.contracts: ~2 rows (approximately)
INSERT INTO `contracts` (`id`, `franchisorId`, `franchiseeId`, `title`, `description`, `fileUrl`, `ipfsHash`, `status`, `endDate`, `chainTxId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Mie Gacoan Jogja Contract', 'Jogja outlet franchise cooperation agreement', '/uploads/contracts/1751807505579-file.pdf', '3164ff3c42db63c7cfbc660f670a44261708c3c8a1454350c91818d91de41d0c', 'active', '2026-07-20 08:37:54', 'b37b446e00a9146848c3a963d9914b74774b1b528b431e7f7b7751fc2ae34428', '2025-07-09 01:00:18', '2025-08-05 00:00:00'),
	(4, 1, 2, 'Mie Gacoan Purwokerto Contract', 'Purwokerto outlet franchise cooperation agreement', '/uploads/contracts/1753408869699-fileUrl.docx', 'f09ab9467e147e888be9b7d54ef00b7ae0c212386e029d9bc0c85b0841648413', 'active', '2026-07-25 16:59:59', 'e9b3b8cc2913f3823d021b51458bc1a8f38ef4a6f413c5eb0edb2686c4dc810e', '2025-07-25 02:01:09', '2025-07-25 02:09:48');

-- Dumping structure for table franchain.franchisees
CREATE TABLE IF NOT EXISTS `franchisees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `franchisorId` int DEFAULT NULL,
  `outletCode` varchar(255) DEFAULT NULL,
  `outletName` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `outletCode` (`outletCode`),
  KEY `userId` (`userId`),
  KEY `franchisorId` (`franchisorId`),
  CONSTRAINT `franchisees_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `franchisees_ibfk_2` FOREIGN KEY (`franchisorId`) REFERENCES `franchisors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.franchisees: ~2 rows (approximately)
INSERT INTO `franchisees` (`id`, `userId`, `franchisorId`, `outletCode`, `outletName`, `location`, `active`, `createdAt`, `updatedAt`) VALUES
	(1, 3, 1, 'DIY001', 'Mie Gacoan Jogja', 'Jl. Kaliurang No. 10, Yogyakarta', 1, '2025-07-09 01:00:18', '2025-07-09 01:00:18'),
	(2, 7, 1, 'PWT001', 'Mie Gacoan Purwokerto', 'Purwokerto Utara', 1, '2025-07-25 01:40:30', '2025-07-25 01:40:30');

-- Dumping structure for table franchain.franchisors
CREATE TABLE IF NOT EXISTS `franchisors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `npwp` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `nib` varchar(255) DEFAULT NULL,
  `financialFile` varchar(255) DEFAULT NULL,
  `ipfsHash` varchar(255) DEFAULT NULL,
  `verified` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `franchisors_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.franchisors: ~0 rows (approximately)
INSERT INTO `franchisors` (`id`, `userId`, `companyName`, `npwp`, `address`, `nib`, `financialFile`, `ipfsHash`, `verified`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 'PT Mie Gacoan Nusantara', '123456789012345', 'Jl. Merdeka No. 1, Jakarta', 'NIB-987654321', 'laporan_gacoan.pdf', 'c85c8e7b349c918ca94496f6c4a2d82cb06ab76d38ce91cf1d3c24d0a1ab9902', 'terverifikasi', '2025-07-09 01:00:18', '2025-07-09 01:00:18');

-- Dumping structure for table franchain.mediations
CREATE TABLE IF NOT EXISTS `mediations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `complaintId` int DEFAULT NULL,
  `mediatorId` int DEFAULT NULL,
  `schedule` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `result` text,
  `verdictFile` varchar(255) DEFAULT NULL,
  `verdictHash` varchar(255) DEFAULT NULL,
  `status` enum('scheduled','completed','rejected') DEFAULT 'scheduled',
  `chainTxId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `complaintId` (`complaintId`),
  KEY `mediatorId` (`mediatorId`),
  CONSTRAINT `mediations_ibfk_1` FOREIGN KEY (`complaintId`) REFERENCES `complaints` (`id`) ON DELETE CASCADE,
  CONSTRAINT `mediations_ibfk_2` FOREIGN KEY (`mediatorId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.mediations: ~1 rows (approximately)
INSERT INTO `mediations` (`id`, `complaintId`, `mediatorId`, `schedule`, `location`, `result`, `verdictFile`, `verdictHash`, `status`, `chainTxId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 6, '2025-07-12 01:00:18', 'Online Mediation Room - Zoom', 'Discussing violations and their solutions', '/uploads/verdicts/1752026197092-file.pdf', 'ab352502039efec560ddd21084640af15a113e86c9ef89e711dd0d1577f7e7f2', 'completed', 'd3b8a57f9f9dbffec3f13d3e191f4e42c92ff5d6578f8b09b01e84a2ea0152bd', '2025-07-09 01:00:18', '2025-07-09 01:56:37');

-- Dumping structure for table franchain.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactionId` int DEFAULT NULL,
  `consumerId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transactionId` (`transactionId`),
  KEY `consumerId` (`consumerId`),
  KEY `productId` (`productId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`consumerId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.orders: ~4 rows (approximately)
INSERT INTO `orders` (`id`, `transactionId`, `consumerId`, `productId`, `qty`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 4, 1, 2, '2025-08-01 07:28:08', '2025-08-01 07:28:08'),
	(2, 2, 4, 5, 2, '2025-08-01 07:28:08', '2025-08-01 07:28:08'),
	(3, 1, 4, 1, 3, '2025-08-07 22:50:18', '2025-08-07 22:50:18'),
	(4, 3, 8, 2, 1, '2025-08-08 01:59:45', '2025-08-08 01:59:45'),
	(5, 3, 8, 4, 1, '2025-08-08 01:59:45', '2025-08-08 01:59:45');

-- Dumping structure for table franchain.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `franchiseeId` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` int DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `franchiseeId` (`franchiseeId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`franchiseeId`) REFERENCES `franchisees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.products: ~5 rows (approximately)
INSERT INTO `products` (`id`, `franchiseeId`, `name`, `description`, `price`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'Mie Gacoan', 'Sweet and spicy noodle dish, the signature flavor of Gacoan.', 10000, 'active', '2025-08-01 07:18:10', '2025-08-01 07:27:26'),
	(2, 1, 'Mie Suit', 'Non-spicy noodle for those who prefer a milder flavor.', 10000, 'active', '2025-08-01 07:26:11', '2025-08-01 07:26:11'),
	(3, 1, 'Mie Hompimpa', 'Spicy noodle dish for chili lovers seeking a thrill.', 11000, 'active', '2025-08-01 07:26:11', '2025-08-01 07:26:11'),
	(4, 1, 'Es Gobak Sodor', 'Colorful iced drink with fruity flavors to refresh your day.', 8000, 'active', '2025-08-01 07:26:11', '2025-08-01 07:26:11'),
	(5, 1, 'Es Teklek', 'A mix of milk and syrup served with crushed ice, sweet and cold.', 8000, 'active', '2025-08-01 07:26:11', '2025-08-01 07:26:11');

-- Dumping structure for table franchain.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table franchain.sequelizemeta: ~19 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('1000-add-agreement.js'),
	('1000-add-transaction.js'),
	('20230701000000-create-user.js'),
	('20230701000100-create-franchisor.js'),
	('20230701000200-create-franchisee.js'),
	('20230701000300-create-contract-add.js'),
	('20230701000300-create-contract.js'),
	('20230701000300-create-product.js'),
	('20230701000400-create-agreement.js'),
	('20230701000500-create-transaction.js'),
	('20230701000501-create-order.js'),
	('20230701000600-create-complaint.js'),
	('20230701000601-create-clarification.js'),
	('20230701000700-create-audit.js'),
	('20230701000900-create-bpsk.js'),
	('20230701000910-create-mediation.js'),
	('20230701001100-create-compensation.js'),
	('20230701001111-create-compaint_rule.js'),
	('20230701001112-create-audit_score.js'),
	('20250807150917-remove-amount-column-from-transactions.js'),
	('20250807150917-remove-column-from-transactions.js'),
	('20250807192546-add-column-from-audit-scores.js');

-- Dumping structure for table franchain.transactions
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consumerId` int DEFAULT NULL,
  `franchiseeId` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `chainTxId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `consumerId` (`consumerId`),
  KEY `franchiseeId` (`franchiseeId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`consumerId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`franchiseeId`) REFERENCES `franchisees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.transactions: ~3 rows (approximately)
INSERT INTO `transactions` (`id`, `consumerId`, `franchiseeId`, `total`, `timestamp`, `status`, `chainTxId`, `createdAt`, `updatedAt`) VALUES
	(1, 4, 1, 30000, '2025-07-09 01:00:18', 'completed', '6fc80db84dbd67c72b7ab1c2cfcfd0c5a1139db84667428bb8c370f4184b88f1', '2025-07-09 01:00:18', '2025-07-09 01:00:18'),
	(2, 4, 1, 36000, '2025-08-01 07:28:08', 'completed', 'd14b518d03f364bf7689e1de51ddf34981d6c501fa2dd920be8d7dbbdb84d838', '2025-08-01 07:28:08', '2025-08-01 12:30:09'),
	(3, 8, 1, 18000, '2025-08-08 01:59:45', 'completed', '7f25c1e0b82d2746459d69608365a4700fcaf9d4168d90341aef3a1c85b574c5', '2025-08-08 01:59:45', '2025-08-08 03:30:00');

-- Dumping structure for table franchain.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','franchisor','franchisee','consumer','regulator','mediator') DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table franchain.users: ~8 rows (approximately)
INSERT INTO `users` (`id`, `name`, `username`, `password`, `role`, `email`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', 'admin', '$2b$10$YBAz3JDxcvfXCbdnMAthn.6ks0UlGqtD2V9Nmy4rwR5MVU8rMev6u', 'admin', 'admin@franchain.com', 'aktif', '2025-07-09 01:00:18', '2025-07-09 01:00:18'),
	(2, 'Franchisor Mie Gacoan', 'franchisor', '$2b$10$qleyvmLs2SJFY1UmDFojC.1V610il.Fv3hXf9WUDLbBgixe3e/LOC', 'franchisor', 'franchisor@mie-gacoan.com', 'aktif', '2025-07-09 01:00:18', '2025-07-09 01:00:18'),
	(3, 'Mie Gacoan Jogja', 'franchisee', '$2b$10$H6GyneYn2256g/af7ynk5ebzDwU81JVJl9vA5iAHDXRQXnc1T4zQS', 'franchisee', 'outlet@mie-gacoan.com', 'aktif', '2025-07-09 01:00:18', '2025-07-09 01:00:18'),
	(4, 'Yuna', 'consumer', '$2b$10$kKy/Fj7ox4.4csNwpmDqR.tXnnbovvw5K6gcWnGCQnZ8rGaxoXRPS', 'consumer', 'customer1@gmail.com', 'aktif', '2025-07-09 01:00:18', '2025-07-09 01:00:18'),
	(5, 'Regulator', 'regulator', '$2b$10$RLrc7CZOQ4vxLS4incvaierVkZJmLFLwX/Z6ewvS6H6DJNJ2eZqCW', 'regulator', 'regulator@bpkn.go.id', 'aktif', '2025-07-09 01:00:18', '2025-07-09 01:00:18'),
	(6, 'Mediator', 'mediator', '$2b$10$mWI/iZtDnmPTcW/b.u6Hp.nCDaxQK6TODw5xOdgT.PwtsSZ7DxpUO', 'mediator', 'bpsk@pusat.go.id', 'aktif', '2025-07-09 01:00:18', '2025-07-09 01:00:18'),
	(7, 'Mie Gacoan Purwokerto', 'gacoanpwt', '$2b$10$0B3EEEyhlUQynX8j77jHtesODWN6MgASCm0Eub7jsEbnbOJCmOPA2', 'franchisee', 'gacoanpwt@gmail.com', 'aktif', '2025-07-25 01:40:30', '2025-07-25 13:39:14'),
	(8, 'Joe Dohn', 'joedohn', '$2b$10$z2oBjKmLxnB0yrETiswDW.h9wo3G0C0uUr.snhTg25rNI9j8ETY.C', 'consumer', 'joedohn@gmail.com', 'aktif', '2025-08-08 01:45:30', '2025-08-08 01:55:32');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
