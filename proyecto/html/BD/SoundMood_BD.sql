-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: soundmooddb
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `canciones`
--

DROP TABLE IF EXISTS `canciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canciones` (
  `id_cancion` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `artista` varchar(100) DEFAULT NULL,
  `album` varchar(100) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `url_streaming` text,
  `duracion` time DEFAULT NULL,
  PRIMARY KEY (`id_cancion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canciones`
--

LOCK TABLES `canciones` WRITE;
/*!40000 ALTER TABLE `canciones` DISABLE KEYS */;
INSERT INTO `canciones` VALUES (1,'Happy','Pharrell Williams','G I R L','Pop','https://music.com/happy','00:03:53'),(2,'Someone Like You','Adele','21','Soul','https://music.com/someone','00:04:45'),(3,'Weightless','Marconi Union','Weightless','Ambient','https://music.com/weightless','00:08:00'),(4,'Eye of the Tiger','Survivor','Eye of the Tiger','Rock','https://music.com/eye','00:04:05'),(5,'Let Her Go','Passenger','All the Little Lights','Indie','https://music.com/lethergo','00:04:12');
/*!40000 ALTER TABLE `canciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadosanimo`
--

DROP TABLE IF EXISTS `estadosanimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadosanimo` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(50) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_estado`),
  UNIQUE KEY `nombre_estado` (`nombre_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadosanimo`
--

LOCK TABLES `estadosanimo` WRITE;
/*!40000 ALTER TABLE `estadosanimo` DISABLE KEYS */;
INSERT INTO `estadosanimo` VALUES (1,'Feliz','Estado emocional positivo y alegre'),(2,'Triste','Sentimiento de melancolía o aflicción'),(3,'Ansioso','Sensación de preocupación o nerviosismo'),(4,'Relajado','Estado de calma y tranquilidad'),(5,'Motivado','Deseo de actuar o alcanzar metas');
/*!40000 ALTER TABLE `estadosanimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialestados`
--

DROP TABLE IF EXISTS `historialestados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialestados` (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_historial`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_estado` (`id_estado`),
  CONSTRAINT `historialestados_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `historialestados_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estadosanimo` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialestados`
--

LOCK TABLES `historialestados` WRITE;
/*!40000 ALTER TABLE `historialestados` DISABLE KEYS */;
INSERT INTO `historialestados` VALUES (1,1,1,'2025-03-05 15:30:00'),(2,2,4,'2025-03-06 17:00:00'),(3,3,2,'2025-03-07 20:45:00');
/*!40000 ALTER TABLE `historialestados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlistcanciones`
--

DROP TABLE IF EXISTS `playlistcanciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlistcanciones` (
  `id_playlist` int NOT NULL,
  `id_cancion` int NOT NULL,
  PRIMARY KEY (`id_playlist`,`id_cancion`),
  KEY `id_cancion` (`id_cancion`),
  CONSTRAINT `playlistcanciones_ibfk_1` FOREIGN KEY (`id_playlist`) REFERENCES `playlists` (`id_playlist`) ON DELETE CASCADE,
  CONSTRAINT `playlistcanciones_ibfk_2` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlistcanciones`
--

LOCK TABLES `playlistcanciones` WRITE;
/*!40000 ALTER TABLE `playlistcanciones` DISABLE KEYS */;
INSERT INTO `playlistcanciones` VALUES (1,1),(3,2),(2,3),(3,5);
/*!40000 ALTER TABLE `playlistcanciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id_playlist` int NOT NULL AUTO_INCREMENT,
  `nombre_playlist` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `id_usuario` int DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_playlist`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_estado` (`id_estado`),
  CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `playlists_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estadosanimo` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (1,'Música Feliz','Canciones para sentirte bien',1,1,'2025-04-05 17:45:54'),(2,'Relájate Aquí','Playlist para relajarse',2,4,'2025-04-05 17:45:56'),(3,'Supera la Tristeza','Canciones reconfortantes',3,2,'2025-04-05 17:45:56');
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recomendacionesai`
--

DROP TABLE IF EXISTS `recomendacionesai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recomendacionesai` (
  `id_recomendacion` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  `id_cancion` int DEFAULT NULL,
  `score_relevancia` decimal(5,2) DEFAULT NULL,
  `fecha_recomendacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_recomendacion`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_estado` (`id_estado`),
  KEY `id_cancion` (`id_cancion`),
  CONSTRAINT `recomendacionesai_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `recomendacionesai_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estadosanimo` (`id_estado`),
  CONSTRAINT `recomendacionesai_ibfk_3` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recomendacionesai`
--

LOCK TABLES `recomendacionesai` WRITE;
/*!40000 ALTER TABLE `recomendacionesai` DISABLE KEYS */;
/*!40000 ALTER TABLE `recomendacionesai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Laura Gómez','laura@soundmood.com','hashed_password3','2025-04-05 17:45:20'),(2,'Sergio Iván López Poveda','sergio@soundmood.com','hashed_password1','2025-04-05 17:45:39'),(3,'Andrés Felipe Pineda Obando','andres@soundmood.com','hashed_password2','2025-04-05 17:45:41');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-05 12:53:58
