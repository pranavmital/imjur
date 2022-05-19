-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `fk_postId` int NOT NULL,
  `fk_authorId` int NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `comment_author_idx` (`fk_authorId`),
  KEY `comment_belongsTo_idx` (`fk_postId`),
  CONSTRAINT `comment_author` FOREIGN KEY (`fk_authorId`) REFERENCES `users` (`id`),
  CONSTRAINT `comment_belongsTo` FOREIGN KEY (`fk_postId`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (9,'hello',11,9,'2022-05-18 22:57:53');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` mediumtext NOT NULL,
  `photopath` varchar(2048) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  `fk_userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post_author_idx` (`fk_userId`),
  CONSTRAINT `post_author` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,'Chairs','This is a description of a photo of chairs.','public/images/uploads/273229ff4d25c90b6a12e889daa903d24651e26cf356.jpeg','public/images/uploads/thumbnail-273229ff4d25c90b6a12e889daa903d24651e26cf356.jpeg',1,'2022-05-17 13:40:38',9),(5,'Feathers','This is a description of a photo of feathers.','public/images/uploads/79210dd8560f6a51f6d5a1e6111835b2689077cd0f3a.jpeg','public/images/uploads/thumbnail-79210dd8560f6a51f6d5a1e6111835b2689077cd0f3a.jpeg',1,'2022-05-17 13:43:09',9),(6,'Passage','This is a description of a photo of a passage.','public/images/uploads/c63f5932118aceae566dc0660a284e9746f368cb6d40.jpeg','public/images/uploads/thumbnail-c63f5932118aceae566dc0660a284e9746f368cb6d40.jpeg',1,'2022-05-17 13:44:18',9),(7,'Valley','This is a description of a photo of a valley','public/images/uploads/8643d5640186c4c4912342ea17a49c298e31c9f8eb7b.jpeg','public/images/uploads/thumbnail-8643d5640186c4c4912342ea17a49c298e31c9f8eb7b.jpeg',1,'2022-05-17 13:44:58',9),(8,'Windows','This is a description of a photo of painted windows.','public/images/uploads/f721ad3b71e36ec4b497a115c7a195812d29b1425bd9.jpeg','public/images/uploads/thumbnail-f721ad3b71e36ec4b497a115c7a195812d29b1425bd9.jpeg',1,'2022-05-17 13:45:47',9),(9,'Light','This is the description of a long-exposure photo of light.','public/images/uploads/7de9d9747e6980a262e01c17511e751bcde95b6f0449.jpeg','public/images/uploads/thumbnail-7de9d9747e6980a262e01c17511e751bcde95b6f0449.jpeg',1,'2022-05-17 13:53:57',9),(11,'Pattern','This is the description of a photo of a pattern.','public/images/uploads/4a2c0bf6f165fbce4b755fb3e0d93590c668330aa416.jpeg','public/images/uploads/thumbnail-4a2c0bf6f165fbce4b755fb3e0d93590c668330aa416.jpeg',1,'2022-05-17 13:59:11',9),(12,'Sky','This is the description of a photo of the sky.','public/images/uploads/29473042115e1ca1b33e354228c962cb01db05800357.jpeg','public/images/uploads/thumbnail-29473042115e1ca1b33e354228c962cb01db05800357.jpeg',1,'2022-05-17 14:00:18',9),(13,'Palm','This is a picture of palm trees.','public/images/uploads/aa0344d59f14ccb5c7ca64c22880602a4b57bf35f990.jpeg','public/images/uploads/thumbnail-aa0344d59f14ccb5c7ca64c22880602a4b57bf35f990.jpeg',1,'2022-05-18 20:17:58',14);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'test5','test5@gmail.com','$2b$15$SQDm.JOxtY0ieFXV.l/5KuGIV6pqpAYCWGT3ZU4ZIayLmo6LqlsK6',1,'2022-05-16 03:33:43'),(8,'test6','test6@gmail.com','$2b$15$LS2bCSNPk0Ysxjwz3KsVCessatrEzpimK/86/3C13CjBK/te9k80O',1,'2022-05-16 03:41:45'),(9,'user7','user7@email.com','$2b$15$4pHkDgQGRpodFCkdUrUfd.sMnksPZk4.mIEpDrgo/pL1P3vAuU6.u',1,'2022-05-16 04:23:19'),(10,'user10','10@gmai.com','$2b$15$8wYv4R0p1r1/QaM0Kdfs9uQgGVNyHDYsx15StWb1YyK5dPwyw3L0S',1,'2022-05-16 13:48:26'),(11,'refactor','refact@mail.com','$2b$15$.7YcRSR7NecByK6UuxEsFOKnLnHUAYihvHLZkrv8H8KPGl5pyoHwG',1,'2022-05-18 17:54:10'),(12,'test1000','test1000@mail.com','$2b$15$x7JkEr37U1tVP6GLj93JoOVyxmQi6ECs1E49U.CfJW5bEqMzqSAiG',1,'2022-05-18 19:17:52'),(13,'11','11@mail.com','$2b$15$.K2axVdHFR0J0kdAlwqdge8SYbrn4XcgyHRWqPfj6I9OYiNkHQHRm',1,'2022-05-18 19:21:57'),(14,'new_user','new@newmail.com','$2b$15$NY2619.cH2OldXVinFu2LO1ONnHuYQdgQ6W6f.lZmRGHLNSH9h4QO',1,'2022-05-18 20:17:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-18 23:13:44
