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
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `authority` bit(1) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `leader_user_id` bigint DEFAULT NULL,
  `leader_user_name` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `book_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf88aaqdjbphcduln6pebrjcm1` (`book_id`),
  CONSTRAINT `FKf88aaqdjbphcduln6pebrjcm1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting`
--

LOCK TABLES `meeting` WRITE;
/*!40000 ALTER TABLE `meeting` DISABLE KEYS */;
INSERT INTO `meeting` VALUES (1,_binary '','반갑습니다.','2023-04-06 16:34:05',2,'wonseok99','제주 탐묘생활에 대해 이야기 해봐요',123),(2,_binary '','상당히 재밌었던 책인데 생각할 거리들이 많아서 얘기 해보고 싶어요.. 첫번째 이야기 어떠셨나요 전 좋았어요','2023-04-06 16:37:27',2,'wonseok99','sf 좋아하시는 분들 한번 얘기해보실까요..',423),(4,_binary '','마냥 재밌진 않았던 것 같은데 한번 얘기 해보실 분 있나요','2023-04-06 16:41:46',2,'wonseok99','재밌던 책',21),(5,_binary '\0','안녕하세요. 모임지기입니다. 저는 소설을 참 좋아해요. 한권을 읽어도 다양한 측면에서 바라볼 수 있는 독서모임에 푹 빠져 모임을 만들게 되었습니다. 우리 함께 생각을 나눠요@','2023-04-06 17:07:55',5,'yuna','[생각 나누기] 빛의 속도?',423),(6,_binary '\0','익절해서 나가자!','2023-04-06 17:09:02',5,'yuna','스타벅스 대주주 모임입니다.',3);
/*!40000 ALTER TABLE `meeting` ENABLE KEYS */;
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
