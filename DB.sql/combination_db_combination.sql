-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: combination_db
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `combination`
--

DROP TABLE IF EXISTS `combination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combination` (
  `combination_id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `fit` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`combination_id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combination`
--

LOCK TABLES `combination` WRITE;
/*!40000 ALTER TABLE `combination` DISABLE KEYS */;
INSERT INTO `combination` VALUES (1,'blue','small',''),(2,'blue','medium',''),(3,'blue','large',''),(4,'yellow','small',''),(5,'yellow','medium',''),(6,'yellow','large',''),(7,'green','small',''),(8,'green','medium',''),(9,'green','large',''),(10,'red','small',''),(11,'red','medium',''),(12,'red','large',''),(13,'blue','small','s'),(14,'blue','small','m'),(15,'blue','small','l'),(16,'blue','medium','s'),(17,'blue','medium','m'),(18,'blue','medium','l'),(19,'blue','large','s'),(20,'blue','large','m'),(21,'blue','large','l'),(22,'yellow','small','s'),(23,'yellow','small','m'),(24,'yellow','small','l'),(25,'yellow','medium','s'),(26,'yellow','medium','m'),(27,'yellow','medium','l'),(28,'yellow','large','s'),(29,'yellow','large','m'),(30,'yellow','large','l'),(31,'green','small','s'),(32,'green','small','m'),(33,'green','small','l'),(34,'green','medium','s'),(35,'green','medium','m'),(36,'green','medium','l'),(37,'green','large','s'),(38,'green','large','m'),(39,'green','large','l'),(40,'red','small','s'),(41,'red','small','m'),(42,'red','small','l'),(43,'red','medium','s'),(44,'red','medium','m'),(45,'red','medium','l'),(46,'red','large','s'),(47,'red','large','m'),(48,'red','large','l'),(49,'blue','small',NULL),(50,'blue','medium',NULL),(51,'blue','large',NULL),(52,'yellow','small',NULL),(53,'yellow','medium',NULL),(54,'yellow','large',NULL),(55,'green','small',NULL),(56,'green','medium',NULL),(57,'green','large',NULL),(58,'red','small',NULL),(59,'red','medium',NULL),(60,'red','large',NULL),(61,'blue','small',NULL),(64,'yellow','small',NULL),(65,'yellow','medium',NULL),(66,'yellow','large',NULL),(67,'green','small',NULL),(68,'green','medium',NULL),(69,'green','large',NULL),(70,'red','small',NULL),(72,'orange','medium',NULL);
/*!40000 ALTER TABLE `combination` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-15 13:38:40
