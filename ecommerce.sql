-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Sam 06 Janvier 2018 à 17:48
-- Version du serveur :  10.1.26-MariaDB-0+deb9u1
-- Version de PHP :  7.0.19-1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ecommerce`
--

DELIMITER $$
--
-- Fonctions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `createUser` (`_username` VARCHAR(255), `_password` VARCHAR(255), `_email` VARCHAR(255), `_lastname` VARCHAR(255), `_firstname` VARCHAR(255)) RETURNS TEXT CHARSET utf8mb4 READS SQL DATA
BEGIN
	DECLARE response TEXT;
	DECLARE existUsername INT;
	DECLARE existEmail INT;

	SET existUsername := (SELECT COUNT(*) FROM user WHERE username = _username);
	SET existEmail := (SELECT COUNT(*) FROM user WHERE email = _email);

	IF (existEmail > 0) THEN
		SET response := "Cet email est déjà utilisé.";
	END IF;

	IF (existUsername > 0) THEN
		SET response:= "Cet username est déjà utilisé.";
	END IF;

	IF (existEmail > 0 && existUsername > 0) THEN
		SET response:= "Username et email est déjà utilisé.";
	END IF;

	IF (existEmail = 0 && existUsername = 0) THEN
		INSERT INTO user(username, password, email, lastname, firstname) 
		VALUES (_username, MD5(_password), _email, _lastname, _firstname) ;
		
		SET response:= "Profil ajouté !";
	END IF;

	return response;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `lastname`, `firstname`) VALUES
(2, 'test2', 'ad0234829205b9033196ba818f7a872b', 'test2', 'test2', 'test2'),
(3, 'test2', 'ad0234829205b9033196ba818f7a872b', 'test2', 'test2', 'test2'),
(4, 'test3', 'test3', 'test3@test3.fr', 'test3', 'test3'),
(6, 'test', '098f6bcd4621d373cade4e832627b4f6', 'test@test.fr', 'test', 'test'),
(8, 'username', '098f6bcd4621d373cade4e832627b4f6', 'email@test.fr', 'nom', 'préom');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
