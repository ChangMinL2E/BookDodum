-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 43.201.102.210    Database: sasatech
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `survey` bit(1) NOT NULL DEFAULT b'1',
  `userid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'string','{bcrypt}$2a$10$/19r3Aq1eYXdfN83fr8diO48F2zx7ihG4n7K1SoUzyDO9LICCUFAu',_binary '\0','string'),(2,'wonseok99','{bcrypt}$2a$10$T4RnBxhG7p.Yr7tDIliyyOp/i4.XkXpYU2AreIqqN8UlVwwJVUvRy',_binary '\0','wonseok99'),(3,'유달리','{bcrypt}$2a$10$i.dLIbMAGb66LpcOdqsjTuhC.sm3pUuq1QBxg5yjtrNFemj0gTJsi',_binary '\0','ssafyssafy'),(4,'유달리','{bcrypt}$2a$10$hpkZT.QMEEA9XbhVE2y6x.1kU4jnzWshSrAib9cYqGDXxjkbUBlzm',_binary '\0','ssafyssafy'),(5,'yuna','{bcrypt}$2a$10$7bKvOAhfi763P3HyVP4Ll.9iO2plX43oIyc3HKIXrjzdykh/2UHOC',_binary '\0','yuna'),(6,'holly','{bcrypt}$2a$10$5fEBGozp/7h1GPhnH.z6GeZ1N5sQ7xuQqs93rn3NEfJxk6Qe./8ZO',_binary '\0','holly'),(7,'string','{bcrypt}$2a$10$mjirnpaKppFrzU9uuUsmG.jLnVYfH8dbRVgwqbt.cg9/OcjePOQxa',_binary '\0','string2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 12:04:14
