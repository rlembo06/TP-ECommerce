-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Dim 07 Janvier 2018 à 19:08
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
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser` (`_username` VARCHAR(255), `_email` VARCHAR(255), `_firstname` VARCHAR(255), `_lastname` VARCHAR(255), `_city` VARCHAR(255), `_street` VARCHAR(255), `_cp` INTEGER(5), `_country` VARCHAR(255))  BEGIN
	IF (_email != NULL OR _email != '') THEN
		UPDATE user 
    		SET email = _email 
    		WHERE username = _username;
	END IF;

	IF (_firstname != NULL OR _firstname != '') THEN
		UPDATE user 
    		SET firstname = _firstname 
    		WHERE username = _username;
	END IF;

	IF (_lastname != NULL OR _lastname != '') THEN
		UPDATE user 
    		SET lastname = _lastname 
    		WHERE username = _username;
	END IF;

	IF (_city != NULL OR _city != '') THEN
		UPDATE user 
    		SET city = _city 
    		WHERE username = _username;
	END IF;

	IF (_street != NULL OR _street != '') THEN
		UPDATE user 
    		SET street = _street 
    		WHERE username = _username;
	END IF;

	IF (_cp != NULL OR _cp != '') THEN
		UPDATE user 
    		SET cp = _cp 
    		WHERE username = _username;
	END IF;

	IF (_country != NULL OR _country != '') THEN
		UPDATE user 
    		SET country = _country 
    		WHERE username = _username;
	END IF;
END$$

--
-- Fonctions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `createUser` (`_username` VARCHAR(255), `_password` VARCHAR(255), `_email` VARCHAR(255), `_lastname` VARCHAR(255), `_firstname` VARCHAR(255), `_city` VARCHAR(255), `_street` VARCHAR(255), `_cp` INTEGER(5), `_country` VARCHAR(255)) RETURNS TEXT CHARSET utf8mb4 READS SQL DATA
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
		INSERT INTO user(username, password, email, lastname, firstname, city, street, cp, country) 
		VALUES (_username, MD5(_password), _email, _lastname, _firstname, _city, _street, _cp, _country) ;
		
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
  `firstname` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `cp` int(5) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `lastname`, `firstname`, `city`, `street`, `cp`, `country`) VALUES
(2, 'test2', 'ad0234829205b9033196ba818f7a872b', 'test2', 'test2', 'test2', '', '', 0, ''),
(3, 'test2', 'ad0234829205b9033196ba818f7a872b', 'test2', 'test2', 'test2', '', '', 0, ''),
(4, 'test3', 'test3', 'test3@test3.fr', 'test3', 'test3', '', '', 0, ''),
(6, 'test', '098f6bcd4621d373cade4e832627b4f6', 'test@test.fr', 'test', 'test', 'CITY', '12, STREET', 75000, 'FRANCE'),
(8, 'username', '098f6bcd4621d373cade4e832627b4f6', 'email@test.fr', 'nom', 'préom', '', '', 0, ''),
(10, 'rlembo', '098f6bcd4621d373cade4e832627b4f6', 'romainlembo06@gmail.com', 'Lembo', 'Romain', 'Villeneuve', '1312, Boulevard Pierre Sauvaigo', 6480, 'France'),
(12, 'Cecile06', '098f6bcd4621d373cade4e832627b4f6', 'cecile.etourneau06@gmail.Com', 'Etourneau', 'Cécile', 'Villeneuve ', '55, Rue de ouf', 6270, 'France'),
(13, 'Cecile066', '098f6bcd4621d373cade4e832627b4f6', 'cecile.etourneau06@gmail.Com6', 'Etourneau', 'Cécile', 'Villeneuve ', '55, Rue de ouf', 6270, 'France');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;