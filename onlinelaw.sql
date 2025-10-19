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


-- Dumping database structure for onlinelaw
CREATE DATABASE IF NOT EXISTS `onlinelaw` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `onlinelaw`;

-- Dumping structure for table onlinelaw.articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `author_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('draft','scheduled','published') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `published_at` timestamp NULL DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_slug_unique` (`slug`),
  KEY `articles_author_id_foreign` (`author_id`),
  KEY `articles_category_id_foreign` (`category_id`),
  KEY `articles_status_published_at_index` (`status`,`published_at`),
  CONSTRAINT `articles_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `articles_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.articles: ~6 rows (approximately)
INSERT INTO `articles` (`id`, `author_id`, `category_id`, `title`, `slug`, `thumbnail`, `body`, `is_featured`, `status`, `published_at`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
	(35, 1, 3, 'UMKM Kreatif di Indonesia Kini Lebih Mudah Lindungi Hak Cipta Karyanya', 'umkm-kreatif-di-indonesia-kini-lebih-mudah-lindungi-hak-cipta-karyanya-1759130553-0', 'thumbnails/article1.jpg', '\r\n                    <p>Seiring pertumbuhan UMKM kreatif di Indonesia, perlindungan hak cipta menjadi isu yang semakin penting. \r\n                    Pelaku usaha kini dapat mendaftarkan karya mereka secara daring melalui Direktorat Jenderal Kekayaan Intelektual.</p>\r\n\r\n                    <p><img src=\'https://picsum.photos/seed/umkmnews1/800/400\' alt=\'UMKM Kreatif\'></p>\r\n\r\n                    <p>Proses ini membantu UMKM menghindari risiko tiruan, serta memberikan nilai tambah bagi bisnis mereka. \r\n                    Banyak desainer, pembuat kerajinan tangan, dan pengembang produk digital memanfaatkan fasilitas ini.</p>\r\n\r\n                    <p>Selain itu, pemerintah mengadakan pelatihan dan sosialisasi mengenai hak cipta untuk meningkatkan kesadaran hukum di kalangan pelaku usaha.</p>\r\n\r\n                    <p>UMKM yang melindungi karya mereka secara resmi memiliki bukti legal yang kuat untuk menghadapi sengketa atau pelanggaran hak cipta.</p>\r\n\r\n                    <p>Dengan perlindungan yang memadai, UMKM kreatif dapat berkembang lebih profesional dan berkelanjutan, membuka peluang pasar baru, dan meningkatkan daya saing di tingkat nasional maupun internasional.</p>\r\n                ', 0, 'published', NULL, 'UMKM Kreatif di Indonesia Kini Lebih Mudah Lindungi Hak Cipta Karyanya', '\r\n                    Seiring pertumbuhan UMKM kreatif di Indonesia, perlindungan hak cipta menjadi isu yang semakin penting. \r\n                    Pe...', '2025-09-29 07:22:33', '2025-09-29 07:22:33'),
	(36, 1, 2, 'Tips Aman bagi Freelancer Kreatif untuk Menghindari Sengketa Kontrak', 'tips-aman-bagi-freelancer-kreatif-untuk-menghindari-sengketa-kontrak-1759130553-1', 'thumbnails/article2.jpg', '\r\n                    <p>Banyak freelancer kreatif menghadapi risiko sengketa karena kontrak yang tidak jelas. \r\n                    Menyusun kontrak kerja yang formal sangat penting untuk melindungi hak cipta, durasi pekerjaan, dan pembayaran.</p>\r\n\r\n                    <p><img src=\'https://picsum.photos/seed/freelancenews/800/400\' alt=\'Freelance Kreatif\'></p>\r\n\r\n                    <p>Ahli hukum menyarankan agar setiap freelancer memiliki kontrak tertulis sebelum memulai proyek. \r\n                    Kontrak ini dapat berupa dokumen PDF atau surat elektronik yang ditandatangani kedua pihak.</p>\r\n\r\n                    <p>Selain itu, kontrak harus memuat klausul hak cipta, penggunaan karya, dan mekanisme penyelesaian sengketa. \r\n                    Hal ini memberikan perlindungan hukum yang lebih kuat.</p>\r\n\r\n                    <p>Dengan kontrak yang tepat, freelancer dapat fokus pada kreativitas mereka tanpa khawatir haknya dilanggar, sehingga proyek berjalan lancar dan aman secara hukum.</p>\r\n\r\n                    <p>Pemahaman tentang hak dan kewajiban melalui kontrak juga meningkatkan profesionalisme freelancer di industri kreatif.</p>\r\n                ', 0, 'published', NULL, 'Tips Aman bagi Freelancer Kreatif untuk Menghindari Sengketa Kontrak', '\r\n                    Banyak freelancer kreatif menghadapi risiko sengketa karena kontrak yang tidak jelas. \r\n                    Menyusun kontrak ker...', '2025-09-29 07:22:33', '2025-09-29 07:22:33'),
	(37, 1, 4, 'BPJS Kini Memperluas Jangkauan Perlindungan untuk Pekerja Kreatif dan UMKM', 'bpjs-kini-memperluas-jangkauan-perlindungan-untuk-pekerja-kreatif-dan-umkm-1759130553-2', 'thumbnails/article4.jpg', '\r\n                    <p>Pekerja kreatif freelance dan pelaku UMKM kini dapat mendaftar BPJS Kesehatan dan Ketenagakerjaan secara mandiri. \r\n                    Hal ini memberikan perlindungan sosial yang sebelumnya sulit diakses oleh pekerja non-formal. BPJS Kesehatan memastikan setiap pekerja memperoleh layanan medis, sementara BPJS Ketenagakerjaan memberikan jaminan kecelakaan kerja dan pensiun. \r\n                    Pendaftaran dapat dilakukan secara online melalui aplikasi resmi BPJS.</p>\r\n\r\n                    <p>Langkah ini meningkatkan kesejahteraan dan keamanan finansial pekerja kreatif, serta memberi perlindungan hukum jika terjadi kecelakaan kerja.</p>\r\n\r\n                    <p>Pemerintah juga menyediakan panduan dan sosialisasi untuk memudahkan pendaftaran dan pemahaman hak-hak pekerja.</p>\r\n\r\n                    <p>Dengan akses BPJS yang lebih luas, sektor kreatif dapat berkembang lebih aman dan terstruktur, mendukung pertumbuhan ekonomi lokal.</p>\r\n                ', 0, 'published', NULL, 'BPJS Kini Memperluas Jangkauan Perlindungan untuk Pekerja Kreatif dan UMKM', '\r\n                    Pekerja kreatif freelance dan pelaku UMKM kini dapat mendaftar BPJS Kesehatan dan Ketenagakerjaan secara mandiri....', '2025-09-29 07:22:33', '2025-09-29 07:22:33'),
	(38, 1, 1, 'Startup Kreatif Perlu Memahami Aturan Pajak dan Hak Cipta', 'startup-kreatif-perlu-memahami-aturan-pajak-dan-hak-cipta-1759130553-3', 'thumbnails/article3.jpg', '\r\n                    <p>Banyak startup di bidang kreatif mengabaikan peraturan pajak dan hak cipta, yang dapat menimbulkan risiko hukum. \r\n                    Pemahaman yang baik terhadap regulasi menjadi kunci keberhasilan dan keamanan usaha.</p>\r\n\r\n                    <p><img src=\'https://picsum.photos/seed/startupnews/800/400\' alt=\'Startup Kreatif\'></p>\r\n\r\n                    <p>Ahli hukum menyarankan setiap startup memiliki tim hukum atau konsultan untuk memastikan kepatuhan terhadap pajak dan perlindungan kekayaan intelektual. \r\n                    Hal ini termasuk pendaftaran hak cipta produk digital, logo, dan merek dagang.</p>\r\n\r\n                    <p>Penerapan prosedur hukum yang benar meningkatkan kepercayaan investor dan konsumen terhadap startup kreatif.</p>\r\n\r\n                    <p>Selain itu, startup yang mematuhi regulasi memiliki keuntungan strategis dalam membangun reputasi bisnis yang kredibel dan profesional.</p>\r\n\r\n                    <p>Pembekalan hukum sejak awal akan mencegah sengketa dan memberikan kepastian hukum bagi pengembangan inovasi kreatif di masa depan.</p>\r\n                ', 0, 'published', '2025-07-02 07:22:33', 'Startup Kreatif Perlu Memahami Aturan Pajak dan Hak Cipta', '\r\n                    Banyak startup di bidang kreatif mengabaikan peraturan pajak dan hak cipta, yang dapat menimbulkan risiko hukum....', '2025-09-29 07:22:33', '2025-09-29 07:22:33'),
	(39, 1, 1, 'Kolaborasi Kreator Lokal dan UMKM Tingkatkan Ekonomi Kreatif', 'kolaborasi-kreator-lokal-dan-umkm-tingkatkan-ekonomi-kreatif-1759130553-4', 'thumbnails/article5.jpg', '\r\n                    <p>Kolaborasi antara kreator lokal dan UMKM semakin marak di Indonesia. \r\n                    Melalui kolaborasi ini, UMKM memperoleh konten kreatif berkualitas, sementara kreator mendapatkan proyek resmi secara hukum.</p>\r\n\r\n                    <p><img src=\'https://picsum.photos/seed/kolaborasinews/800/400\' alt=\'Kolaborasi Kreator\'></p>\r\n\r\n                    <p>Kontrak tertulis harus disusun untuk mengatur hak cipta, pembagian keuntungan, dan durasi proyek agar jelas bagi kedua pihak.</p>\r\n\r\n                    <p>Kolaborasi yang terstruktur meningkatkan profesionalisme dan keberlanjutan ekosistem kreatif lokal.</p>\r\n\r\n                    <p>Selain itu, proyek kolaborasi sering menarik perhatian media dan investor, membuka peluang pasar baru bagi UMKM dan kreator.</p>\r\n\r\n                    <p>Pendampingan hukum dalam kolaborasi ini memastikan semua pihak terlindungi dan mendorong pertumbuhan ekonomi kreatif yang sehat.</p>\r\n                ', 0, 'published', NULL, 'Kolaborasi Kreator Lokal dan UMKM Tingkatkan Ekonomi Kreatif', '\r\n                    Kolaborasi antara kreator lokal dan UMKM semakin marak di Indonesia. \r\n                    Melalui kolaborasi ini, UMKM memperol...', '2025-09-29 07:22:33', '2025-09-29 07:22:33');

-- Dumping structure for table onlinelaw.article_tags
CREATE TABLE IF NOT EXISTS `article_tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `tag_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_tags_article_id_foreign` (`article_id`),
  KEY `article_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `article_tags_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `article_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.article_tags: ~10 rows (approximately)
INSERT INTO `article_tags` (`id`, `article_id`, `tag_id`, `created_at`, `updated_at`) VALUES
	(58, 35, 4, NULL, NULL),
	(59, 36, 4, NULL, NULL),
	(60, 37, 2, NULL, NULL),
	(61, 37, 3, NULL, NULL),
	(62, 37, 1, NULL, NULL),
	(63, 38, 2, NULL, NULL),
	(64, 38, 3, NULL, NULL),
	(65, 38, 4, NULL, NULL),
	(66, 39, 1, NULL, NULL);

-- Dumping structure for table onlinelaw.authors
CREATE TABLE IF NOT EXISTS `authors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `authors_user_id_foreign` (`user_id`),
  CONSTRAINT `authors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.authors: ~1 rows (approximately)
INSERT INTO `authors` (`id`, `user_id`, `display_name`, `bio`, `avatar_path`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Redaksi Portal', 'Tim redaksi hukum yang berfokus pada isu-isu nasional dan internasional.', NULL, '2025-08-18 05:25:55', '2025-08-18 05:25:55');

-- Dumping structure for table onlinelaw.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.cache: ~0 rows (approximately)

-- Dumping structure for table onlinelaw.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.cache_locks: ~0 rows (approximately)

-- Dumping structure for table onlinelaw.case_chats
CREATE TABLE IF NOT EXISTS `case_chats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('open','pending_review','closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `case_chats_user_id_foreign` (`user_id`),
  CONSTRAINT `case_chats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.case_chats: ~0 rows (approximately)
INSERT INTO `case_chats` (`id`, `user_id`, `title`, `status`, `created_at`, `updated_at`) VALUES
	(1, 5, 'Hukum Ketenagakerjaan', 'open', '2025-09-15 09:02:00', '2025-09-15 09:02:00');

-- Dumping structure for table onlinelaw.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.categories: ~5 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'Kolaborasi Kreatif', 'kolaborasi-kreatif', NULL, '2025-08-18 05:25:55', '2025-09-29 07:31:56'),
	(2, 'Freelancer & Kontrak', 'freelancer-kontrak', NULL, '2025-08-18 05:25:55', '2025-09-29 07:31:20'),
	(3, 'UMKM & Kreatif', 'umkm-kreatif', NULL, '2025-08-18 05:25:55', '2025-09-29 07:30:57'),
	(4, 'BPJS & Perlindungan Sosial', 'bpjs-perlindungan-sosial', NULL, '2025-08-18 05:25:55', '2025-09-29 07:31:40');

-- Dumping structure for table onlinelaw.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `case_chat_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `role` enum('user','ai','expert') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `metadata` json DEFAULT NULL,
  `status` enum('auto','need_review','approved') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'auto',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chats_case_chat_id_foreign` (`case_chat_id`),
  KEY `chats_user_id_foreign` (`user_id`),
  CONSTRAINT `chats_case_chat_id_foreign` FOREIGN KEY (`case_chat_id`) REFERENCES `case_chats` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.chats: ~40 rows (approximately)
INSERT INTO `chats` (`id`, `case_chat_id`, `user_id`, `role`, `message`, `metadata`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 5, 'user', 'Apa itu hubungan kerja?', NULL, 'auto', '2025-09-29 03:45:52', '2025-09-29 03:45:52'),
	(2, 1, 5, 'ai', 'Hubungan kerja adalah hubungan antara pengusaha dengan pekerja berdasarkan perjanjian kerja yang mempunyai unsur pekerjaan, upah, dan perintah.', '{"sources": ["UU No. 13 Tahun 2003 Pasal 1 angka 15"], "confidence": 0.3217898368835449}', 'need_review', '2025-09-29 03:45:52', '2025-09-29 03:45:52'),
	(3, 1, 5, 'user', 'Jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 03:46:21', '2025-09-29 03:46:21'),
	(4, 1, 5, 'ai', 'Serikat pekerja adalah organisasi yang dibentuk dari, oleh, dan untuk pekerja baik di perusahaan maupun di luar perusahaan guna memperjuangkan hak-hak pekerja.', '{"sources": ["UU No. 21 Tahun 2000 tentang Serikat Pekerja"], "confidence": 0.3547961235046387}', 'need_review', '2025-09-29 03:46:21', '2025-09-29 03:46:21'),
	(6, 1, 5, 'user', 'apa yang dimaksud dengan phk?', NULL, 'auto', '2025-09-29 03:56:13', '2025-09-29 03:56:13'),
	(7, 1, 5, 'ai', 'Pemutusan Hubungan Kerja (PHK) adalah berakhirnya hubungan kerja karena suatu hal tertentu yang mengakibatkan berakhirnya hak dan kewajiban antara pekerja dengan pengusaha.', '{"sources": ["UU No. 13 Tahun 2003 Pasal 1 angka 25"], "confidence": 0.5492212295532226}', 'need_review', '2025-09-29 03:56:13', '2025-09-29 03:56:13'),
	(8, 1, 5, 'user', 'Apa itu hubungan kerja?', NULL, 'auto', '2025-09-29 03:57:04', '2025-09-29 03:57:04'),
	(9, 1, 5, 'ai', 'Hubungan kerja adalah hubungan antara pengusaha dengan pekerja berdasarkan perjanjian kerja yang mempunyai unsur pekerjaan, upah, dan perintah.', '{"sources": ["UU No. 13 Tahun 2003 Pasal 1 angka 15"], "confidence": 0.5637705802917481}', 'need_review', '2025-09-29 03:57:04', '2025-09-29 03:57:04'),
	(10, 1, 5, 'user', 'Apa itu PHK?', NULL, 'auto', '2025-09-29 03:58:51', '2025-09-29 03:58:51'),
	(11, 1, 5, 'ai', 'Pemutusan Hubungan Kerja (PHK) adalah berakhirnya hubungan kerja karena suatu hal tertentu yang mengakibatkan berakhirnya hak dan kewajiban antara pekerja dengan pengusaha.', '{"sources": ["UU No. 13 Tahun 2003 Pasal 1 angka 25"], "confidence": 0.5904455661773682}', 'need_review', '2025-09-29 03:58:51', '2025-09-29 03:58:51'),
	(12, 1, 5, 'user', 'apa yang dimaksud dengan phk?', NULL, 'auto', '2025-09-29 03:59:23', '2025-09-29 03:59:23'),
	(13, 1, 5, 'ai', 'Pemutusan Hubungan Kerja (PHK) adalah berakhirnya hubungan kerja karena suatu hal tertentu yang mengakibatkan berakhirnya hak dan kewajiban antara pekerja dengan pengusaha.', '{"sources": ["UU No. 13 Tahun 2003 Pasal 1 angka 25"], "confidence": 0.5492212295532226}', 'need_review', '2025-09-29 03:59:23', '2025-09-29 03:59:23'),
	(14, 1, 5, 'user', 'apa itu hubungan kerja?', NULL, 'auto', '2025-09-29 04:01:11', '2025-09-29 04:01:11'),
	(15, 1, 5, 'ai', 'Hubungan kerja adalah hubungan antara pengusaha dengan pekerja berdasarkan perjanjian kerja yang mempunyai unsur pekerjaan, upah, dan perintah.', '{"sources": ["UU No. 13 Tahun 2003 Pasal 1 angka 15"], "confidence": 0.5637705802917481}', 'need_review', '2025-09-29 04:01:11', '2025-09-29 04:01:11'),
	(16, 1, 5, 'user', 'hukum memotong upah pekerja', NULL, 'auto', '2025-09-29 04:01:55', '2025-09-29 04:01:55'),
	(17, 1, 5, 'ai', 'Mohon maaf, saat ini AI belum memiliki jawaban. Silakan ajukan pertanyaan lain atau coba lagi nanti.', '{"sources": [], "confidence": 0}', 'need_review', '2025-09-29 04:01:55', '2025-09-29 04:01:55'),
	(18, 1, 5, 'user', 'jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:02:41', '2025-09-29 04:02:41'),
	(19, 1, 5, 'ai', 'Mohon maaf, saat ini AI belum memiliki jawaban. Silakan ajukan pertanyaan lain atau coba lagi nanti.', '{"sources": [], "confidence": 0}', 'need_review', '2025-09-29 04:02:41', '2025-09-29 04:02:41'),
	(20, 1, 5, 'user', 'Jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:03:05', '2025-09-29 04:03:05'),
	(21, 1, 5, 'ai', 'Mohon maaf, saat ini AI belum memiliki jawaban. Silakan ajukan pertanyaan lain atau coba lagi nanti.', '{"sources": [], "confidence": 0}', 'need_review', '2025-09-29 04:03:05', '2025-09-29 04:03:05'),
	(22, 1, 5, 'user', 'jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:03:53', '2025-09-29 04:03:53'),
	(23, 1, 5, 'user', 'jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:06:27', '2025-09-29 04:06:27'),
	(24, 1, 5, 'user', 'jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:08:12', '2025-09-29 04:08:12'),
	(25, 1, 5, 'ai', 'Mohon maaf, saat ini AI belum memiliki jawaban. Silakan ajukan pertanyaan lain atau coba lagi nanti.', '{"sources": [], "confidence": 0}', 'need_review', '2025-09-29 04:08:12', '2025-09-29 04:08:12'),
	(26, 1, 5, 'user', 'jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:09:09', '2025-09-29 04:09:09'),
	(27, 1, 5, 'user', 'jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:10:26', '2025-09-29 04:10:26'),
	(28, 1, 5, 'ai', 'Mohon maaf, saat ini AI belum memiliki jawaban. Silakan ajukan pertanyaan lain atau coba lagi nanti.', '{"sources": [], "confidence": 0}', 'need_review', '2025-09-29 04:10:26', '2025-09-29 04:10:26'),
	(29, 1, 5, 'user', 'apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:11:44', '2025-09-29 04:11:44'),
	(30, 1, 5, 'ai', 'Serikat pekerja adalah organisasi yang dibentuk dari, oleh, dan untuk pekerja baik di perusahaan maupun di luar perusahaan guna memperjuangkan hak-hak pekerja.', '{"sources": ["UU No. 21 Tahun 2000 tentang Serikat Pekerja"], "confidence": 0.8691922187805176}', 'auto', '2025-09-29 04:11:44', '2025-09-29 04:11:44'),
	(31, 1, 5, 'user', 'jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:15:52', '2025-09-29 04:15:52'),
	(32, 1, 5, 'user', 'jelaskan apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:16:29', '2025-09-29 04:16:29'),
	(33, 1, 5, 'ai', 'Serikat pekerja adalah organisasi yang dibentuk dari, oleh, dan untuk pekerja baik di perusahaan maupun di luar perusahaan guna memperjuangkan hak-hak pekerja.', '{"sources": ["UU No. 21 Tahun 2000 tentang Serikat Pekerja"], "confidence": 0.8691922187805176}', 'auto', '2025-09-29 04:16:29', '2025-09-29 04:16:29'),
	(34, 1, 5, 'user', 'apa itu serikat pekerja', NULL, 'auto', '2025-09-29 04:17:00', '2025-09-29 04:17:00'),
	(35, 1, 5, 'ai', 'Serikat pekerja adalah organisasi yang dibentuk dari, oleh, dan untuk pekerja baik di perusahaan maupun di luar perusahaan guna memperjuangkan hak-hak pekerja.', '{"sources": ["UU No. 21 Tahun 2000 tentang Serikat Pekerja"], "confidence": 0.8691922187805176}', 'auto', '2025-09-29 04:17:00', '2025-09-29 04:17:00'),
	(36, 1, 5, 'user', 'sebutkan macam-macam serikat pekerja', NULL, 'auto', '2025-09-29 04:17:36', '2025-09-29 04:17:36'),
	(37, 1, 5, 'ai', 'Serikat pekerja adalah organisasi yang dibentuk dari, oleh, dan untuk pekerja baik di perusahaan maupun di luar perusahaan guna memperjuangkan hak-hak pekerja.', '{"sources": ["UU No. 21 Tahun 2000 tentang Serikat Pekerja"], "confidence": 0.6787466049194336}', 'approved', '2025-09-29 04:17:36', '2025-09-29 07:43:11'),
	(38, 1, 3, 'expert', 'Macam-macam serikat pekerja meliputi serikat pekerja di tingkat perusahaan, serikat pekerja di tingkat sektor atau jenis usaha, federasi serikat pekerja, serta konfederasi serikat pekerja.', '{"sources": "UU No. 21 Tahun 2000 tentang Serikat Pekerja"}', 'approved', '2025-09-29 07:43:11', '2025-09-29 07:43:11'),
	(39, 1, 5, 'user', 'sebutkan macam-macam serikat pekerja', NULL, 'auto', '2025-09-29 08:23:29', '2025-09-29 08:23:29'),
	(40, 1, 5, 'ai', 'Macam-macam serikat pekerja meliputi serikat pekerja di tingkat perusahaan, serikat pekerja di tingkat sektor atau jenis usaha, federasi serikat pekerja, serta konfederasi serikat pekerja.', '{"sources": ["UU No. 21 Tahun 2000 tentang Serikat Pekerja"], "confidence": 0.7789553165435791}', 'auto', '2025-09-29 08:23:29', '2025-09-29 08:23:29'),
	(41, 1, 5, 'user', 'jelaskan apa itu phk?', NULL, 'auto', '2025-10-03 23:36:03', '2025-10-03 23:36:03'),
	(42, 1, 5, 'ai', 'Pemutusan Hubungan Kerja (PHK) adalah berakhirnya hubungan kerja karena suatu hal tertentu yang mengakibatkan berakhirnya hak dan kewajiban antara pekerja dengan pengusaha.', '{"sources": ["UU No. 13 Tahun 2003 Pasal 1 angka 25"], "confidence": 0.5904455661773682}', 'approved', '2025-10-03 23:36:04', '2025-10-03 23:37:14'),
	(43, 1, 2, 'expert', 'PHK (Pemutusan Hubungan Kerja) adalah berakhirnya hubungan kerja antara pekerja dan pengusaha karena suatu alasan tertentu, yang mengakibatkan berakhirnya hak dan kewajiban kedua belah pihak dalam hubungan kerja.', '{"sources": "UU No. 13 Tahun 2003 tentang Ketenagakerjaan"}', 'approved', '2025-10-03 23:37:14', '2025-10-03 23:37:14'),
	(44, 1, 5, 'user', 'jelaskan apa itu phk?', NULL, 'auto', '2025-10-03 23:38:29', '2025-10-03 23:38:29'),
	(45, 1, 5, 'ai', 'PHK (Pemutusan Hubungan Kerja) adalah berakhirnya hubungan kerja antara pekerja dan pengusaha karena suatu alasan tertentu, yang mengakibatkan berakhirnya hak dan kewajiban kedua belah pihak dalam hubungan kerja.', '{"sources": ["UU No. 13 Tahun 2003 tentang Ketenagakerjaan"], "confidence": 1}', 'auto', '2025-10-03 23:38:29', '2025-10-03 23:38:29');

-- Dumping structure for table onlinelaw.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `guest_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guest_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_article_id_foreign` (`article_id`),
  KEY `comments_user_id_foreign` (`user_id`),
  KEY `comments_status_article_id_index` (`status`,`article_id`),
  CONSTRAINT `comments_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.comments: ~0 rows (approximately)

-- Dumping structure for table onlinelaw.consult_chats
CREATE TABLE IF NOT EXISTS `consult_chats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `expert_id` bigint unsigned NOT NULL,
  `role` enum('user','expert') COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `consult_chats_user_id_foreign` (`user_id`),
  KEY `consult_chats_expert_id_foreign` (`expert_id`),
  CONSTRAINT `consult_chats_expert_id_foreign` FOREIGN KEY (`expert_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `consult_chats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.consult_chats: ~2 rows (approximately)
INSERT INTO `consult_chats` (`id`, `user_id`, `expert_id`, `role`, `message`, `read_at`, `created_at`, `updated_at`) VALUES
	(1, 5, 3, 'user', 'Halo', NULL, '2025-09-30 15:58:48', '2025-09-30 15:58:48'),
	(2, 3, 5, 'expert', 'Halo, ada yang bisa saya bantu?', NULL, '2025-09-30 16:06:45', '2025-09-30 16:06:45');

-- Dumping structure for table onlinelaw.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table onlinelaw.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.jobs: ~0 rows (approximately)

-- Dumping structure for table onlinelaw.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.job_batches: ~0 rows (approximately)

-- Dumping structure for table onlinelaw.knowledge_bases
CREATE TABLE IF NOT EXISTS `knowledge_bases` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sources` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `knowledge_bases_question_answer_fulltext` (`question`,`answer`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.knowledge_bases: ~40 rows (approximately)
INSERT INTO `knowledge_bases` (`id`, `question`, `answer`, `sources`, `created_at`, `updated_at`) VALUES
	(1, 'Apa itu hubungan kerja?', 'Hubungan kerja adalah hubungan antara pengusaha dengan pekerja berdasarkan perjanjian kerja yang mempunyai unsur pekerjaan, upah, dan perintah.', 'UU No. 13 Tahun 2003 Pasal 1 angka 15', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(2, 'Apa perbedaan PKWT dan PKWTT?', 'PKWT (Perjanjian Kerja Waktu Tertentu) adalah kontrak kerja dengan jangka waktu tertentu, sedangkan PKWTT (Perjanjian Kerja Waktu Tidak Tertentu) adalah kontrak kerja permanen atau tetap.', 'UU No. 13 Tahun 2003 Pasal 56-59, UU No. 11 Tahun 2020 tentang Cipta Kerja', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(3, 'Berapa jam kerja normal dalam seminggu?', 'Jam kerja normal adalah 7 jam per hari dan 40 jam per minggu untuk 6 hari kerja, atau 8 jam per hari dan 40 jam per minggu untuk 5 hari kerja.', 'UU No. 13 Tahun 2003 Pasal 77', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(4, 'Apakah pekerja berhak atas cuti tahunan?', 'Ya, pekerja yang telah bekerja selama 12 bulan terus menerus berhak atas cuti tahunan sekurang-kurangnya 12 hari kerja.', 'UU No. 13 Tahun 2003 Pasal 79', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(5, 'Bagaimana ketentuan upah minimum?', 'Upah minimum ditetapkan oleh Gubernur setiap tahun sebagai jaring pengaman agar pekerja tidak menerima upah di bawah standar.', 'UU No. 13 Tahun 2003 Pasal 88C, PP No. 36 Tahun 2021 tentang Pengupahan', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(6, 'Apakah pekerja berhak atas THR?', 'Ya, pekerja berhak atas Tunjangan Hari Raya Keagamaan yang wajib dibayar pengusaha paling lambat 7 hari sebelum hari raya.', 'Permenaker No. 6 Tahun 2016 tentang THR Keagamaan', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(7, 'Bagaimana aturan lembur di Indonesia?', 'Kerja lembur hanya boleh dilakukan paling banyak 4 jam per hari dan 18 jam per minggu dengan persetujuan pekerja dan wajib dibayar.', 'UU No. 13 Tahun 2003 Pasal 78, PP No. 35 Tahun 2021', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(8, 'Apa itu PHK?', 'Pemutusan Hubungan Kerja (PHK) adalah berakhirnya hubungan kerja karena suatu hal tertentu yang mengakibatkan berakhirnya hak dan kewajiban antara pekerja dengan pengusaha.', 'UU No. 13 Tahun 2003 Pasal 1 angka 25', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(9, 'Apa hak pekerja yang terkena PHK?', 'Pekerja berhak atas uang pesangon, uang penghargaan masa kerja, dan uang penggantian hak sesuai ketentuan undang-undang.', 'UU No. 13 Tahun 2003 Pasal 156', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(10, 'Apakah pekerja kontrak berhak atas pesangon?', 'Pekerja kontrak (PKWT) tidak berhak atas pesangon, tetapi berhak atas uang kompensasi di akhir kontrak.', 'UU No. 11 Tahun 2020 tentang Cipta Kerja, PP No. 35 Tahun 2021 Pasal 15', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(11, 'Apakah pekerja magang diakui dalam hukum ketenagakerjaan?', 'Ya, pemagangan diatur dalam perjanjian tertulis antara peserta magang dengan perusahaan dan tidak menimbulkan hubungan kerja.', 'UU No. 13 Tahun 2003 Pasal 21, PP No. 36 Tahun 2016', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(12, 'Apakah pekerja perempuan berhak atas cuti melahirkan?', 'Ya, pekerja perempuan berhak cuti 1,5 bulan sebelum dan 1,5 bulan sesudah melahirkan.', 'UU No. 13 Tahun 2003 Pasal 82', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(13, 'Apakah pekerja sakit tetap menerima upah?', 'Ya, pekerja yang sakit tetap berhak atas upah dengan persentase tertentu sesuai lama sakit.', 'UU No. 13 Tahun 2003 Pasal 93', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(14, 'Bagaimana aturan cuti haid untuk pekerja perempuan?', 'Pekerja perempuan yang dalam masa haid dan merasa sakit dapat tidak masuk kerja pada hari pertama dan kedua, dengan tetap mendapat upah.', 'UU No. 13 Tahun 2003 Pasal 81', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(15, 'Apa itu serikat pekerja?', 'Serikat pekerja adalah organisasi yang dibentuk dari, oleh, dan untuk pekerja baik di perusahaan maupun di luar perusahaan guna memperjuangkan hak-hak pekerja.', 'UU No. 21 Tahun 2000 tentang Serikat Pekerja', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(16, 'Apakah pekerja harian lepas dilindungi undang-undang?', 'Ya, pekerja harian lepas tetap dilindungi hukum sepanjang memenuhi unsur hubungan kerja.', 'UU No. 13 Tahun 2003, Putusan MA No. 150 K/Pdt.Sus-PHI/2014', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(17, 'Bagaimana ketentuan outsourcing di Indonesia?', 'Outsourcing hanya boleh dilakukan untuk kegiatan penunjang, dengan jaminan perlindungan hak pekerja.', 'UU No. 11 Tahun 2020 tentang Cipta Kerja, PP No. 35 Tahun 2021', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(18, 'Apakah pekerja berhak atas BPJS Ketenagakerjaan?', 'Ya, setiap pekerja berhak atas jaminan sosial tenaga kerja seperti JKK, JKM, JHT, dan JP.', 'UU No. 24 Tahun 2011 tentang BPJS, PP No. 46 Tahun 2015', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(19, 'Bagaimana penyelesaian perselisihan hubungan industrial?', 'Perselisihan hubungan industrial diselesaikan melalui bipartit, mediasi, konsiliasi, arbitrase, atau pengadilan hubungan industrial.', 'UU No. 2 Tahun 2004 tentang Penyelesaian Perselisihan Hubungan Industrial', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(20, 'Apakah pekerja anak diperbolehkan?', 'Pekerja anak dilarang, kecuali untuk pekerjaan ringan dengan syarat khusus dan pengawasan ketat.', 'UU No. 13 Tahun 2003 Pasal 68-75', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(21, 'Apa syarat sah perjanjian kerja?', 'Perjanjian kerja sah apabila dibuat atas dasar kesepakatan, kecakapan, adanya pekerjaan, serta pekerjaan yang diperjanjikan tidak bertentangan dengan hukum.', 'UU No. 13 Tahun 2003 Pasal 52', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(22, 'Apakah pekerja boleh dipindahkan sepihak oleh perusahaan?', 'Pemindahan pekerja (mutasi) hanya sah apabila tidak merugikan pekerja dan tetap memperhatikan hak-hak pekerja.', 'UU No. 13 Tahun 2003 Pasal 32', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(23, 'Bagaimana perlindungan untuk pekerja difabel?', 'Pengusaha wajib mempekerjakan sekurang-kurangnya 1 orang penyandang disabilitas dari setiap 100 pekerja.', 'UU No. 8 Tahun 2016 tentang Penyandang Disabilitas Pasal 53', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(24, 'Apakah pekerja berhak menolak lembur?', 'Ya, pekerja berhak menolak lembur jika tidak ada persetujuan tertulis atau perintah kerja lembur dari pengusaha.', 'UU No. 13 Tahun 2003 Pasal 78', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(25, 'Apakah pekerja harian lepas berhak atas cuti?', 'Pekerja harian lepas berhak cuti jika masa kerjanya telah memenuhi syarat minimal 12 bulan berturut-turut.', 'UU No. 13 Tahun 2003 Pasal 79', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(26, 'Apa itu uang penghargaan masa kerja?', 'Uang penghargaan masa kerja adalah kompensasi yang diberikan kepada pekerja yang di-PHK berdasarkan lama masa kerjanya.', 'UU No. 13 Tahun 2003 Pasal 156 ayat (3)', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(27, 'Apa itu uang penggantian hak?', 'Uang penggantian hak diberikan kepada pekerja yang di-PHK, meliputi cuti tahunan yang belum diambil, biaya pulang, dan hal lain sesuai perjanjian kerja.', 'UU No. 13 Tahun 2003 Pasal 156 ayat (4)', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(28, 'Apakah pekerja PKWT dapat diputus sebelum kontrak berakhir?', 'Jika kontrak diputus sebelum waktunya, pihak yang memutus wajib membayar ganti rugi sebesar sisa masa kontrak.', 'UU No. 13 Tahun 2003 Pasal 62', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(29, 'Apakah pekerja outsourcing berhak atas jaminan sosial?', 'Ya, pekerja outsourcing berhak didaftarkan BPJS oleh perusahaan outsourcing.', 'PP No. 35 Tahun 2021 Pasal 19', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(30, 'Apa itu perjanjian kerja bersama (PKB)?', 'PKB adalah perjanjian hasil perundingan antara serikat pekerja dan pengusaha yang memuat syarat kerja, hak, dan kewajiban kedua belah pihak.', 'UU No. 13 Tahun 2003 Pasal 116', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(31, 'Apakah pekerja dapat mogok kerja?', 'Ya, mogok kerja sah apabila dilakukan sebagai akibat gagalnya perundingan dan diberitahukan secara tertulis kepada pengusaha dan instansi terkait.', 'UU No. 13 Tahun 2003 Pasal 137-138', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(32, 'Apa kewajiban perusahaan terhadap pekerja asing?', 'Perusahaan wajib memiliki izin penggunaan tenaga kerja asing (IMTA) dan wajib menunjuk tenaga kerja Indonesia sebagai pendamping.', 'UU No. 13 Tahun 2003 Pasal 42, PP No. 34 Tahun 2021', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(33, 'Apakah pekerja boleh dipotong upahnya?', 'Upah tidak boleh dipotong, kecuali untuk potongan tertentu seperti iuran BPJS, koperasi, atau denda yang telah diatur.', 'UU No. 13 Tahun 2003 Pasal 90-91', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(34, 'Apa hak pekerja perempuan saat menyusui?', 'Pekerja perempuan berhak mendapat waktu istirahat untuk menyusui atau memerah ASI selama jam kerja.', 'UU No. 13 Tahun 2003 Pasal 83', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(35, 'Bagaimana perlindungan terhadap pekerja yang mengalami kecelakaan kerja?', 'Pekerja yang mengalami kecelakaan kerja berhak atas perawatan medis, santunan, dan jaminan kecelakaan kerja dari BPJS.', 'UU No. 24 Tahun 2011 tentang BPJS, PP No. 44 Tahun 2015', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(36, 'Apakah pekerja borongan diatur dalam hukum?', 'Ya, pekerjaan borongan tetap diakui sepanjang memenuhi unsur hubungan kerja, meskipun dibayar berdasarkan hasil.', 'UU No. 13 Tahun 2003, praktik yurisprudensi', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(37, 'Apa kewajiban pengusaha terkait K3?', 'Pengusaha wajib menerapkan sistem manajemen keselamatan dan kesehatan kerja (K3) untuk melindungi pekerja.', 'UU No. 1 Tahun 1970 tentang Keselamatan Kerja', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(38, 'Apakah pekerja berhak mendapatkan uang pisah?', 'Ya, uang pisah diberikan kepada pekerja yang mengundurkan diri secara baik-baik sesuai aturan perusahaan.', 'PP No. 35 Tahun 2021 Pasal 36', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(39, 'Apakah pekerja dengan masa percobaan dilindungi undang-undang?', 'Ya, masa percobaan kerja hanya berlaku untuk pekerja PKWTT dan paling lama 3 bulan, dengan tetap dibayar upah.', 'UU No. 13 Tahun 2003 Pasal 60', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(40, 'Bagaimana aturan pekerja waktu paruh (part-time)?', 'Pekerja part-time tetap dilindungi sepanjang ada hubungan kerja, meski jam kerjanya lebih sedikit.', 'UU No. 13 Tahun 2003, PP No. 35 Tahun 2021', '2025-09-29 03:56:07', '2025-09-29 03:56:07'),
	(41, 'sebutkan macam-macam serikat pekerja', 'Macam-macam serikat pekerja meliputi serikat pekerja di tingkat perusahaan, serikat pekerja di tingkat sektor atau jenis usaha, federasi serikat pekerja, serta konfederasi serikat pekerja.', 'UU No. 21 Tahun 2000 tentang Serikat Pekerja', '2025-09-29 07:43:11', '2025-09-29 07:43:11'),
	(43, 'jelaskan apa itu phk?', 'PHK (Pemutusan Hubungan Kerja) adalah berakhirnya hubungan kerja antara pekerja dan pengusaha karena suatu alasan tertentu, yang mengakibatkan berakhirnya hak dan kewajiban kedua belah pihak dalam hubungan kerja.', 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan', '2025-10-03 23:37:14', '2025-10-03 23:37:14');

-- Dumping structure for table onlinelaw.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.migrations: ~12 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_08_18_041154_create_categories_table', 1),
	(5, '2025_08_18_041210_create_tags_table', 1),
	(6, '2025_08_18_041221_create_authors_table', 1),
	(7, '2025_08_18_041230_create_articles_table', 1),
	(8, '2025_08_18_041242_create_article_tags_table', 1),
	(9, '2025_08_18_041300_create_comments_table', 1),
	(10, '2025_09_15_091411_create_case_chats_table', 2),
	(13, '2025_09_15_091421_create_chats_table', 3),
	(16, '2025_09_29_005313_create_reviews_table', 4),
	(18, '2025_09_24_225650_create_knowledge_bases_table', 5),
	(19, '2025_09_29_160450_create_consult_chats_table', 6);

-- Dumping structure for table onlinelaw.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table onlinelaw.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `chat_id` bigint unsigned NOT NULL,
  `expert_id` bigint unsigned NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sources` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'approved',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_chat_id_foreign` (`chat_id`),
  KEY `reviews_expert_id_foreign` (`expert_id`),
  CONSTRAINT `reviews_chat_id_foreign` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_expert_id_foreign` FOREIGN KEY (`expert_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.reviews: ~1 rows (approximately)
INSERT INTO `reviews` (`id`, `chat_id`, `expert_id`, `answer`, `sources`, `status`, `created_at`, `updated_at`) VALUES
	(1, 37, 3, 'Macam-macam serikat pekerja meliputi serikat pekerja di tingkat perusahaan, serikat pekerja di tingkat sektor atau jenis usaha, federasi serikat pekerja, serta konfederasi serikat pekerja.', 'UU No. 21 Tahun 2000 tentang Serikat Pekerja', 'approved', '2025-09-29 07:43:11', '2025-09-29 07:43:11'),
	(2, 42, 2, 'PHK (Pemutusan Hubungan Kerja) adalah berakhirnya hubungan kerja antara pekerja dan pengusaha karena suatu alasan tertentu, yang mengakibatkan berakhirnya hak dan kewajiban kedua belah pihak dalam hubungan kerja.', 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan', 'approved', '2025-10-03 23:37:14', '2025-10-03 23:37:14');

-- Dumping structure for table onlinelaw.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.sessions: ~5 rows (approximately)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('3uXVpVHR8LJrFEW6gamEkBQY03JJTp8ReiiowlU1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ3ZjMlpaTE55Vmp5bHhaMWZrVnFqa01OeHFNNTlWQ0tzQlpYM0hHYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760843131),
	('E41f5UFEF4RoAcfyFeA1mCbnykpH34TjAylFcusl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUWQwSjZBNXJaVXBBNnpiVG1xMTl4THQxdkZvMWhCaDVJSDBwMEdaeCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7fX0=', 1759545901),
	('hEvb4qrZjIxHfk02ZGOqYwdTnPL6kAF7SHxidRp0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiOW5uc2JGVWxLZ0FKeklVYk1BQTNKN3h1ampnQlphMUhKUzNwMEY2SiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1759545355),
	('lAVkmHmGHhmuhOhQCUi6lknPzvJePgf8WSGzybFy', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUldxb2d2d0tWRFF2Y0xlUDhqa0xVeWNPMWxYVFpaMVJKc0V4dmJMYiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MTp7aTowO3M6Nzoic3VjY2VzcyI7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7czo3OiJzdWNjZXNzIjtzOjE1OiJMb2dpbiBiZXJoYXNpbCEiO30=', 1759549449),
	('w8XhmmMyr7B6Mb1KtHXtBxS0dn6InZQkDuxbTtjc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ0czWmxTN1IzUFFOQjQ2N2hrMERORmpzZDNzYnFHNFNwQW9tamprTCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7fX0=', 1759550114);

-- Dumping structure for table onlinelaw.tags
CREATE TABLE IF NOT EXISTS `tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.tags: ~5 rows (approximately)
INSERT INTO `tags` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	(1, 'Perjanjian', 'perjanjian', '2025-08-18 05:25:55', '2025-08-18 05:25:55'),
	(2, 'Kontrak', 'kontrak', '2025-08-18 05:25:55', '2025-08-18 05:25:55'),
	(3, 'Pidana Khusus', 'pidana-khusus', '2025-08-18 05:25:55', '2025-08-18 05:25:55'),
	(4, 'Konstitusi', 'konstitusi', '2025-08-18 05:25:55', '2025-08-18 05:25:55'),
	(5, 'Ekonomi', 'ekonomi', '2025-08-18 05:25:55', '2025-08-18 05:25:55');

-- Dumping structure for table onlinelaw.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table onlinelaw.users: ~6 rows (approximately)
INSERT INTO `users` (`id`, `name`, `username`, `email`, `email_verified_at`, `password`, `role`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Administrator', 'admin', 'admin@gmail.com', NULL, '$2y$12$r9bhTd0gA20jJfQTS2ygyeWJeLdAR3wD3zd/hVP0Cb/hPCTO1pAbu', 'admin', 'active', NULL, '2025-08-18 05:25:54', '2025-08-18 05:25:54'),
	(2, 'Charles White', 'charles', 'charles@gmail.com', NULL, '$2y$12$S.TtKPOg9N/SYbcjuESKg.grMEv8EKNXpgjh1NyiZFfMZO.Uh1t5u', 'expert', 'active', NULL, '2025-08-18 05:25:54', '2025-08-18 05:25:54'),
	(3, 'Maria Siregar', 'maria', 'maria@gmail.com', NULL, '$2y$12$gq5uLyzzN7psPpSyhrWK.e9yguDSWwmCiM1zTm5Zn1mb6hf5PSjLS', 'expert', 'active', NULL, '2025-08-18 05:25:55', '2025-08-18 05:25:55'),
	(4, 'Joe Dohn', 'joedohn', 'joedohn@gmail.com', NULL, '$2y$12$ECsh3Ttd85kOSjstahAzZOiizgScT44rtbW7nvR9kZkgvubmDNKGG', 'user', 'active', NULL, '2025-08-18 05:25:55', '2025-08-18 05:25:55'),
	(5, 'Rahmat Hidayat', 'rahmat', 'rahmat@gmail.com', NULL, '$2y$12$ZmgnfEoHubffLLSMVPe0XO47i5DR/27eljkRjl70Yp4k8BUwLze0m', 'user', 'active', NULL, '2025-08-18 05:25:55', '2025-08-18 05:25:55'),
	(7, 'test', 'test', 'test@gm.com', NULL, '$2y$12$.lVlBy65fxFkLJFgeWv3nuvagUNqYKinY4YdQD8mVL9DDjHPfXr/G', 'user', 'active', NULL, '2025-10-03 01:46:29', '2025-10-03 01:46:29');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
