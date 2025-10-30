-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2025 at 07:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `creditjambo`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password_hash`, `created_at`) VALUES
(1, 'Super Admin', 'admin@creditjambo.com', '$2b$10$uQc0XYTP77qFw2m4SfBTmOrWGMKxnVdAQQoS30Jks.6sNUZf.lSEa', '2025-10-28 09:35:21'),
(2, 'Super Admin', 'admin@gmail.com', '$2b$10$9i1A8LxiDhzMR/6Nw8tEBuS.2W9zvE8KzvJ7BaPuwNR8.mno0Aq8e', '2025-10-30 13:35:17');

-- --------------------------------------------------------

--
-- Table structure for table `balances`
--

CREATE TABLE `balances` (
  `user_id` int(11) NOT NULL,
  `balance` decimal(12,2) DEFAULT 0.00,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `balances`
--

INSERT INTO `balances` (`user_id`, `balance`, `updated_at`) VALUES
(1, 7000.00, '2025-10-27 12:57:20'),
(2, 53884210.00, '2025-10-30 20:29:31');

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `device_info` text DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `verified_by` int(11) DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `user_id`, `device_id`, `device_info`, `verified`, `verified_by`, `verified_at`, `created_at`) VALUES
(1, 1, 'SONY-XZ1-1234', 'Sony Xperia XZ1 - Android', 1, 1, '2025-10-27 12:49:07', '2025-10-27 10:58:47'),
(2, 2, 'PC1', 'DK', 1, 1, '2025-10-30 11:29:24', '2025-10-29 13:47:41'),
(3, 2, 'i123', 'iPhone 13', 1, NULL, NULL, '2025-10-30 20:08:21'),
(4, 2, 't455', 'Pixe 4', 1, NULL, NULL, '2025-10-30 20:29:07');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('deposit','withdraw') NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `balance_after` decimal(12,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `type`, `amount`, `balance_after`, `description`, `created_at`) VALUES
(1, 1, 'deposit', 10000.00, 10000.00, 'October deposit', '2025-10-27 12:50:05'),
(2, 1, 'withdraw', 3000.00, 7000.00, 'Cash withdrawal', '2025-10-27 12:57:20'),
(3, 2, 'deposit', 120000.00, 120000.00, 'rd', '2025-10-29 13:48:26'),
(4, 2, 'withdraw', 2000.00, 118000.00, 'ty', '2025-10-29 13:48:41'),
(5, 2, 'withdraw', 5000.00, 113000.00, 'dd', '2025-10-29 14:04:20'),
(6, 2, 'withdraw', 2345.00, 110655.00, 'gg', '2025-10-30 07:00:08'),
(7, 2, 'deposit', 100355.00, 211010.00, 'wass', '2025-10-30 07:01:05'),
(8, 2, 'withdraw', 3000.00, 208010.00, 'rea', '2025-10-30 07:02:01'),
(9, 2, 'deposit', 200000.00, 408010.00, 'er', '2025-10-30 07:04:36'),
(10, 2, 'deposit', 700000.00, 1108010.00, 'er', '2025-10-30 11:28:23'),
(11, 2, 'withdraw', 10800.00, 1097210.00, 're', '2025-10-30 12:01:25'),
(12, 2, 'withdraw', 23000.00, 1074210.00, 'kim', '2025-10-30 19:34:06'),
(13, 2, 'deposit', 50000000.00, 51074210.00, 'come on', '2025-10-30 20:15:06'),
(14, 2, 'withdraw', 400000.00, 50674210.00, 'tr', '2025-10-30 20:29:18'),
(15, 2, 'deposit', 3210000.00, 53884210.00, 'rt', '2025-10-30 20:29:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` char(128) NOT NULL,
  `salt` char(32) NOT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `salt`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Confy Eagle', 'confy@example.com', '6e807bc962517b01e4c33bf520280dfaefa53b284188030ea27ed254e1e1add639d2ca5eab018697289ce048b3e8c2555b131a3cc9b413076e1d5b7d8339caa1', '999684ff9f6175d5067d91581df198cd', 'admin', 1, '2025-10-27 10:29:48', '2025-10-27 11:34:36'),
(2, 'Aigle Confy', 'aigleconfy@gmail.com', '1d0af64e2353599b570a08fde392dbe54169a49b21e65e27249de8378f93c9dd3908bfab9aeaf1ba9ea7048ffb6d4a20461c92e13071bf052d255bbc3d1d0883', '1bb1ca5625b4d9f62f7dd491fbf99af0', 'customer', 1, '2025-10-28 17:59:39', '2025-10-28 17:59:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `balances`
--
ALTER TABLE `balances`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `balances`
--
ALTER TABLE `balances`
  ADD CONSTRAINT `balances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
