-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 12. 22:22
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `tabletek`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tabletek`
--

CREATE TABLE `tabletek` (
  `id` int(11) NOT NULL,
  `termek_nev` varchar(50) DEFAULT NULL,
  `operacios_rendszer` varchar(50) DEFAULT NULL,
  `processzor_orajel` float DEFAULT NULL,
  `processzormagok_szama` int(11) DEFAULT NULL,
  `kijelzo_merete` float DEFAULT NULL,
  `kijelzo_felbontasa` varchar(20) DEFAULT NULL,
  `ram_merete` int(11) DEFAULT NULL,
  `ar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tabletek`
--

INSERT INTO `tabletek` (`id`, `termek_nev`, `operacios_rendszer`, `processzor_orajel`, `processzormagok_szama`, `kijelzo_merete`, `kijelzo_felbontasa`, `ram_merete`, `ar`) VALUES
(1, 'Samsung Galaxy Tab S7', 'Android', 3.1, 8, 11, '2560x1600', 6, 220000),
(2, 'Apple iPad Air', 'iOS', 2.8, 6, 10.9, '2360x1640', 4, 260000),
(3, 'Microsoft Surface Pro 7', 'Windows', 1.3, 4, 12.3, '2736x1824', 8, 300000),
(4, 'Lenovo Tab P11 Pro', 'Android', 2.2, 8, 11.5, '2560x1600', 4, 180000),
(5, 'Apple iPad Pro', 'iOS', 2.9, 8, 12.9, '2732x2048', 6, 400000),
(6, 'Samsung Galaxy Tab A7', 'Android', 2, 8, 10.4, '2000x1200', 3, 120000),
(7, 'Huawei MatePad Pro', 'Android', 2.6, 8, 10.8, '2560x1600', 6, 250000),
(8, 'Microsoft Surface Go 2', 'Windows', 1.7, 4, 10.5, '1920x1280', 8, 180000),
(9, 'Amazon Fire HD 10', 'Fire OS', 2, 4, 10.1, '1920x1200', 2, 70000),
(10, 'Apple iPad Mini', 'iOS', 2.5, 6, 7.9, '2048x1536', 3, 180000);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tabletek`
--
ALTER TABLE `tabletek`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tabletek`
--
ALTER TABLE `tabletek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
