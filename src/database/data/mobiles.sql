-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2025 a las 04:05:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mobiles`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `baterias`
--

CREATE TABLE `baterias` (
  `ID_Bateria` int(11) NOT NULL,
  `ID_Movil` int(11) DEFAULT NULL,
  `Capacidad` varchar(10) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `CargaRapida` varchar(20) DEFAULT NULL,
  `CargaInalambrica` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `baterias`
--

INSERT INTO `baterias` (`ID_Bateria`, `ID_Movil`, `Capacidad`, `Tipo`, `CargaRapida`, `CargaInalambrica`) VALUES
(1, 1, '4000mAh', 'Li-Ion', '25W', 1),
(2, 2, '3279mAh', 'Li-Ion', '20W', 1),
(3, 3, '5000mAh', 'Li-Po', '80W', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camara`
--

CREATE TABLE `camara` (
  `ID_Camara` int(11) NOT NULL,
  `ID_Movil` int(11) DEFAULT NULL,
  `Principal` varchar(100) DEFAULT NULL,
  `Selfie` varchar(100) DEFAULT NULL,
  `Video` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `camara`
--

INSERT INTO `camara` (`ID_Camara`, `ID_Movil`, `Principal`, `Selfie`, `Video`) VALUES
(17, 1, '50MP', '12MP', '8K'),
(18, 2, '48MP', '12MP', '4K'),
(19, 3, '50MP', '32MP', '8K');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `imagen` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`, `imagen`) VALUES
(1, 'moviles', 'img/moviles.png'),
(2, 'smarttv', 'img/smarttv.png'),
(3, 'laptops', 'img/laptops.png'),
(4, 'consolas', 'img/consolas.png'),
(5, 'tablets', 'img/tablets.png'),
(6, 'otros', 'img/otros.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasificacion`
--

CREATE TABLE `clasificacion` (
  `ID_Clasificacion` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `clasificacion`
--

INSERT INTO `clasificacion` (`ID_Clasificacion`, `Nombre`) VALUES
(1, 'Gama Alta'),
(2, 'Gama Media'),
(3, 'Gama Baja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conectividad`
--

CREATE TABLE `conectividad` (
  `ID_Conectividad` int(11) NOT NULL,
  `ID_Movil` int(11) DEFAULT NULL,
  `Red` varchar(50) DEFAULT NULL,
  `WiFi` varchar(50) DEFAULT NULL,
  `Bluetooth` varchar(20) DEFAULT NULL,
  `NFC` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `conectividad`
--

INSERT INTO `conectividad` (`ID_Conectividad`, `ID_Movil`, `Red`, `WiFi`, `Bluetooth`, `NFC`) VALUES
(1, 1, '5G', 'WiFi 6E', 'Bluetooth 5.3', 1),
(2, 2, '5G', 'WiFi 6', 'Bluetooth 5.3', 1),
(3, 3, '5G', 'WiFi 7', 'Bluetooth 5.4', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dimensionespeso`
--

CREATE TABLE `dimensionespeso` (
  `ID_DimensionesPeso` int(11) NOT NULL,
  `ID_Movil` int(11) DEFAULT NULL,
  `Altura` varchar(10) DEFAULT NULL,
  `Anchura` varchar(10) DEFAULT NULL,
  `Grosor` varchar(10) DEFAULT NULL,
  `Peso` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `dimensionespeso`
--

INSERT INTO `dimensionespeso` (`ID_DimensionesPeso`, `ID_Movil`, `Altura`, `Anchura`, `Grosor`, `Peso`) VALUES
(58, 1, '147mm', '70mm', '7.6mm', '168g'),
(59, 2, '146mm', '71mm', '7.8mm', '171g'),
(60, 3, '152mm', '72mm', '8.0mm', '180g');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_pedido`
--

CREATE TABLE `estados_pedido` (
  `id` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `keys`
--

CREATE TABLE `keys` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `ID_Marca` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`ID_Marca`, `Nombre`) VALUES
(1, 'Samsung'),
(2, 'Apple'),
(3, 'Xiaomi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca_categoria`
--

CREATE TABLE `marca_categoria` (
  `marca_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `marca_categoria`
--

INSERT INTO `marca_categoria` (`marca_id`, `categoria_id`) VALUES
(1, 1),
(1, 3),
(1, 5),
(1, 6),
(2, 1),
(2, 2),
(2, 5),
(2, 6),
(3, 1),
(3, 5),
(3, 6),
(4, 1),
(5, 5),
(6, 5),
(7, 5),
(8, 2),
(8, 3),
(9, 3),
(10, 3),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 4),
(15, 6),
(16, 4),
(18, 6),
(19, 1),
(19, 6),
(20, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `memorias`
--

CREATE TABLE `memorias` (
  `ID_Memoria` int(11) NOT NULL,
  `ID_Movil` int(11) DEFAULT NULL,
  `RAM` varchar(10) DEFAULT NULL,
  `Almacenamiento` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `memorias`
--

INSERT INTO `memorias` (`ID_Memoria`, `ID_Movil`, `RAM`, `Almacenamiento`) VALUES
(21, 1, '8GB', '256GB'),
(22, 2, '6GB', '128GB'),
(23, 3, '12GB', '512GB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodos_pago`
--

CREATE TABLE `metodos_pago` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movilclasificaciones`
--

CREATE TABLE `movilclasificaciones` (
  `ID_Movil` int(11) NOT NULL,
  `ID_Clasificacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `movilclasificaciones`
--

INSERT INTO `movilclasificaciones` (`ID_Movil`, `ID_Clasificacion`) VALUES
(1, 1),
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moviles`
--

CREATE TABLE `moviles` (
  `ID_Movil` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `ID_Marca` int(11) DEFAULT NULL,
  `Año` int(11) DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `moviles`
--

INSERT INTO `moviles` (`ID_Movil`, `Nombre`, `ID_Marca`, `Año`, `Precio`) VALUES
(1, 'Galaxy S24', 1, 2024, 999.99),
(2, 'iPhone 15', 2, 2023, 1099.99),
(3, 'Xiaomi 14', 3, 2024, 899.99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado_id` int(11) NOT NULL,
  `metodo_pago_id` int(11) NOT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) DEFAULT 0.00,
  `categoria_id` int(11) DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT 0.00,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `img_principal` varchar(250) NOT NULL,
  `marca_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `descuento`, `fecha`, `img_principal`, `marca_id`) VALUES
(1, 'iPhone 12 64GB', '', 15995.00, 1, 20.00, '2025-03-09 11:06:10', 'https://www.plug.tech/cdn/shop/products/Untitleddesign_39239d69-632f-4486-8993-1f3e88a1ce2a.jpg?v=1628526193&%3Bwidth=500&em-format=auto', 1),
(2, 'iPhone 12 128GB', '', 17995.00, 1, 0.00, '2025-03-09 08:00:00', '', 1),
(3, 'iPhone 12 256GB', '', 19495.00, 1, 0.00, '2025-03-30 08:00:00', '', 1),
(4, 'iPhone 12 Pro 128GB', '', 21995.00, 1, 0.00, '2025-03-30 08:00:00', '', 1),
(5, 'iPhone 12 Pro 256GB', '', 23995.00, 1, 0.00, '2025-03-11 08:00:00', '', 1),
(6, 'iPhone 12 Pro Max 128GB ', '', 27495.00, 1, 0.00, '2025-03-01 08:00:00', '', 1),
(7, 'iPhone 12 Pro Max 256GB ', '', 28995.00, 1, 0.00, '2025-03-01 08:00:00', '', 1),
(8, 'iPhone 12 Pro Max 512GB', '', 29995.00, 1, 0.00, '2025-03-01 08:00:00', '', 1),
(9, 'iPhone 13 128GB ', '', 23995.00, 1, 0.00, '2025-03-01 08:00:00', '', 1),
(10, 'iPhone 13 256GB ', '', 25495.00, 1, 0.00, '2025-03-01 08:00:00', '', 1),
(11, 'iPhone 13 Pro 128GB ', '', 28495.00, 1, 0.00, '2025-03-14 08:00:00', '', 1),
(12, 'iPhone 13 Pro 256GB ', '', 30995.00, 1, 0.00, '2025-03-11 08:00:00', '', 1),
(13, 'iPhone 13 Pro Max 128GB ', '', 32995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(14, 'iPhone 13 Pro Max 256GB ', '', 35995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(15, 'iPhone 13 Pro Max 512GB ', '', 37495.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(16, 'iPhone 14 128GB ', '', 26495.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(17, 'iPhone 14 256GB ', '', 27995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(18, 'iPhone 14 Plus 128GB ', '', 28995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(19, 'iPhone 14 Plus 256GB ', '', 30995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(20, 'iPhone 14 Pro 128GB ', '', 34495.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(21, 'iPhone 14 Pro 256GB ', '', 36495.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(22, 'iPhone 14 Pro 512GB ', '', 38995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(23, 'iPhone 14 Pro Max 128GB ', '', 41495.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(24, 'iPhone 14 Pro Max 256GB ', '', 43995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(25, 'iPhone 14 Pro Max 512GB ', '', 46495.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(26, 'iPhone 15 128GB ', '', 35995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(27, 'iPhone 15 256GB ', '', 37995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(28, 'iPhone 15 Plus 128GB ', '', 38995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(29, 'iPhone 15 Plus 512GB ', '', 42995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(30, 'iPhone 15 Pro 128GB ', '', 41995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(31, 'iPhone 15 Pro Max 256GB ', '', 52995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(32, 'iPhone 15 Pro Max 256GB Con Sim Físico ', '', 54995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(33, 'iPhone 15 Pro Max 512GB ', '', 57995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(34, 'iPhone 15 Pro Max 1TB ', '', 61995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(35, 'iPhone 16 128GB ', '', 52495.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(36, 'iPhone 16E 256GB', '', 44995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(37, 'iPhone 16 Plus 128GB ', '', 54995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(38, 'iPhone 16 Pro Max 256GB ', '', 74995.00, 1, 0.00, '2023-01-01 08:00:00', '', 1),
(39, 'iPhone 16 Pro Max 512GB ', '', 84995.00, 1, 0.00, '2025-03-01 08:00:00', '', 1),
(40, 'SAMSUNG GALAXY S10 PLUS 8+128GB', '', 9995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(41, 'SAMSUNG GALAXY NOTE 10 PLUS 12+256GB', '', 13995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(42, 'SAMSUNG GALAXY NOTE 20 ULTRA 12+128GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(43, 'SAMSUNG GALAXY S21 ULTRA 12+128GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(44, 'SAMSUNG GALAXY S23 ULTRA 12+256GB', '', 39495.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(45, 'SAMSUNG GALAXY S25 ULTRA 12+512GB ', '', 84995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(46, 'SAMSUNG GALAXY A05 6+128GB ', '', 7995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(47, 'SAMSUNG GALAXY A05 4+64GB ', '', 6995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(48, 'SAMSUNG GALAXY A15 6+128GB ', '', 8995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(49, 'SAMSUNG GALAXY A25 5G 8+256GB ', '', 12995.00, 1, 0.00, '2023-01-01 08:00:00', '', 2),
(50, 'XIAOMI REDMI NOTE 13 5G 8+256GB', '', 10995.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(51, 'XIAOMI REDMI NOTE 13 PRO PLUS 5G 12+256GB', '', 20995.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(52, 'XIAOMI POCO X6 PRO 8+256 GB', '', 17495.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(53, 'XIAOMI REDMI 14C 4+128GB', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(54, 'XIAOMI REDMI NOTE 14 8+128GB', '', 10495.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(55, 'XIAOMI REDMI NOTE 14 8+256GB', '', 11995.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(56, 'XIAOMI REDMI NOTE 14 5G 12+256GB', '', 13995.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(57, 'XIAOMI REDMI NOTE 14 PRO 8+256GB', '', 15995.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(58, 'XIAOMI REDMI NOTE 14 PRO 5G 12+256GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(59, 'XIAOMI REDMI NOTE 14 PRO PLUS 5G 12+256GB', '', 22995.00, 1, 0.00, '2023-01-01 08:00:00', '', 3),
(60, 'Google Pixel 7 Pro 12+128GB', '', 17495.00, 1, 0.00, '2023-01-01 08:00:00', '', 4),
(61, 'Google Pixel 8 Pro 12+128GB', '', 24995.00, 1, 0.00, '2023-01-01 08:00:00', '', 4),
(62, 'INFINIX SMART 8 4+128GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', '', 19),
(63, 'INFINIX SMART 9 4+128GB', '', 5995.00, 1, 0.00, '2023-01-01 08:00:00', '', 19),
(64, 'INFINIX HOT 50I 6+256GB', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', '', 19),
(65, 'ZTE A35 CORE 4+64GB', '', 3995.00, 1, 0.00, '2023-01-01 08:00:00', '', 20),
(66, 'ZTE A35 4+64GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', '', 20),
(67, 'ZTE BLADE V60 6+256GB ', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', '', 20),
(68, 'ZTE NUBIA NEO 2 5G 8+256GB', '', 11995.00, 1, 0.00, '2023-01-01 08:00:00', '', 20),
(69, 'MOTOROLA E14 2+64GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', '', NULL),
(70, 'MOTOROLA G04 4+128GB', '', 5995.00, 1, 0.00, '2023-01-01 08:00:00', '', NULL),
(71, 'IPAD PRO 12.9-INCH 6TA GEN 128GB', '', 45995.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(72, 'IPAD PRO 12.9 6TA GEN 256GB', '', 47495.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(73, 'IPAD PRO M2 512GB 12.9 6TA GEN 512GB ', '', 49995.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(74, 'IPAD PRO 13 PULGADAS M4 512GB', '', 57995.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(75, 'IPAD PRO 13 PULGADAS M4 256GB', '', 54995.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(76, 'IPAD 10 GEN 64GB', '', 23495.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(79, 'AMAZON FIRE 8 32GB', '', 2995.00, 5, 0.00, '2023-01-01 08:00:00', '', 5),
(80, 'AMAZON FIRE 8 64GB', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', 5),
(81, 'ASTRO 8R 32G', '', 3495.00, 5, 0.00, '2025-03-30 08:00:00', '', NULL),
(82, 'XIAOMI REDMI PAD SE 8.7 128GB ', '', 8495.00, 5, 0.00, '2023-01-01 08:00:00', '', 3),
(83, 'VORTEX T10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', 6),
(84, 'HOTPEPPER 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', NULL),
(85, 'X10MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', '', NULL),
(86, 'VORTEX T10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', '', 6),
(87, 'SKYPAD 10 SKYPAD 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', 7),
(88, 'SKYPAD 10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', '', 7),
(89, 'Macbook Pro 13-Inch 2020 i5-8ram 512GB', '', 31995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(90, 'Macbook Air 13-Inch 2020 i3-8ram 256GB', '', 29495.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(91, 'Macbook Pro 16-Inch 2019 i7-16ram 512GB', '', 34995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(92, 'Macbook Pro 16-Inch 2019 i9-32Ram 512GB', '', 39995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(93, 'Macbook Pro 16-Inch 2019 i9-16Ram 1TB', '', 41995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(94, 'Macbook Air M1 8Ram 256GB ', '', 44995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(95, 'Macbook Pro M2 2022 8-Ram 256GB', '', 51995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(96, 'Macbook Air 15-Inch M2 256GB ', '', 54995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(97, 'HP Victus i5 12GEN 3050TI 8+512GB ', '', 33495.00, 3, 0.00, '2023-01-01 08:00:00', '', 8),
(98, 'Asus Tuf Gaming F15 i5-12GEN 16Ram-3050 512GB', '', 39995.00, 3, 0.00, '2025-03-14 08:00:00', '', 9),
(99, 'HP 15.6Inch i5 12GEN 8+256GB ', '', 23995.00, 3, 0.00, '2023-01-01 08:00:00', '', 8),
(100, 'HP i5 13GEN 8+256GB ', '', 24995.00, 3, 0.00, '2023-01-01 08:00:00', '', 8),
(102, 'IPAD PRO 12.9-INCH 6TA GEN 128GB A', '', 45995.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(103, 'IPAD PRO 12.9 6TA GEN 256GB A', '', 47495.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(104, 'IPAD PRO M2 512GB 12.9 6TA GEN 512GB', '', 49995.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(105, 'IPAD PRO 13 PULGADAS M4 512GB ', '', 57995.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(106, 'IPAD PRO 13 PULGADAS M4 256GB ', '', 54995.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(107, 'IPAD 10 GENERACION 64GB ', '', 23495.00, 5, 0.00, '2023-01-01 08:00:00', '', 1),
(108, 'SAMSUNG GALAXY TAB A9+ 64GB ', '', 11495.00, 5, 0.00, '2023-01-01 08:00:00', '', 2),
(109, 'SAMSUNG GALAXY TAB A9+ 128GB ', '', 13495.00, 5, 0.00, '2023-01-01 08:00:00', '', 2),
(110, 'AMAZON FIRE 8 32GB', '', 2995.00, 5, 0.00, '2023-01-01 08:00:00', '', 5),
(111, 'AMAZON FIRE 8 64GB', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', 5),
(112, 'ASTRO 8R 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', NULL),
(114, 'VORTEX T10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', 6),
(115, 'HOTPEPPER 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', NULL),
(116, 'X10MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', '', NULL),
(117, 'VORTEX T10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', '', 6),
(118, 'SKYPAD 10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', '', 7),
(119, 'SKYPAD 10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', '', 7),
(120, 'Macbook Pro 13-Inch 2020 i5 8+512GB', '', 31995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(121, 'Macbook Air 13-Inch 2020 i3 8+256GB ', '', 29495.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(122, 'Macbook Pro 16-Inch 2019 i7 16+512GB ', '', 34995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(123, 'Macbook Pro 16-Inch 2019 i9 32+512GB ', '', 39995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(124, 'Macbook Pro 16-Inch 2019 i9 16+1TB', '', 41995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(125, 'Macbook Air M1 8+256GB ', '', 44995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(126, 'Macbook Pro M2 2022 8+256GB', '', 51995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(127, 'Macbook Air 15-Inch M2 256GB', '', 54995.00, 3, 0.00, '2023-01-01 08:00:00', '', 1),
(128, 'HP Victus i5 12GEN 3050TI 8+512GB ', '', 33495.00, 3, 0.00, '2023-01-01 08:00:00', '', 8),
(130, 'HP 15.6Inch i5 12GEN 8+256GB ', '', 23995.00, 3, 0.00, '2023-01-01 08:00:00', '', 8),
(131, 'HP i5-13Gen-8Ram HP 256GB ', '', 24995.00, 3, 0.00, '2023-01-01 08:00:00', '', 8),
(132, 'Lenovo i3-12GEN 8+256GB ', '', 21495.00, 3, 0.00, '2023-01-01 08:00:00', '', 10),
(133, 'SAMSUNG WATCH 6 CLASSIC', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', '', 2),
(134, 'SAMSUNG WATCH 6', '', 11995.00, 6, 0.00, '2023-01-01 08:00:00', '', 2),
(135, 'SAMSUNG WATCH 7', '', 15995.00, 6, 0.00, '2023-01-01 08:00:00', '', 2),
(136, 'Samsung Galaxy Buds 3', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', '', 2),
(137, 'Samsung Galaxy Buds 2', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', '', 2),
(138, 'BEATS SOLO 4', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(139, 'BEATS STUDIO PRO', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(140, 'XIAOMI REDMI BUDS 4 ACTIVE', '', 1995.00, 6, 0.00, '2023-01-01 08:00:00', '', 3),
(142, 'AIRPODS GEN 2', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(143, 'AIRPODS GEN 3', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(144, 'AIRPODS GEN 4 CANCELACION DE RUIDO', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(145, 'AIRPODS PRO 2 TIPO C OPEN BOX', '', 10995.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(146, 'RAZER BARRACUDA X', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(147, 'APPLE WATCH SE 2', '', 10495.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(148, 'APPLE WATCH SERIE 7', '', 12994.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(149, 'APPLE WATCH SERIE 8', '', 14495.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(150, 'APPLE WATCH SERIE ULTRA', '', 24995.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(151, 'APPLE WATCH SERIE 9', '', 16495.00, 6, 0.00, '2023-01-01 08:00:00', '', 1),
(152, 'Smart TV Onn 32 Pulgadas', '', 9995.00, 2, 0.00, '2023-01-01 08:00:00', '', 14),
(153, 'Smart TV Onn 43 Pulgadas', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', '', 14),
(154, 'Smart TV Onn 65 Pulgadas', '', 28995.00, 2, 0.00, '2023-01-01 08:00:00', '', 14),
(155, 'Smart TV Onn 75 Pulgadas', '', 36995.00, 2, 0.00, '2023-01-01 08:00:00', '', 14),
(156, 'Smart TV Phillips 32 Pulgadas', '', 9995.00, 2, 0.00, '2023-01-01 08:00:00', '', NULL),
(157, 'Smart TV TCL Androide 32 Pulgadas', '', 10995.00, 2, 0.00, '2023-01-01 08:00:00', '', 11),
(158, 'Smart TV TCL Roku 43 Pulgadas', '', 16495.00, 2, 0.00, '2023-01-01 08:00:00', '', 11),
(159, 'Smart TV TCL Roku 55 Pulgadas', '', 23995.00, 2, 0.00, '2023-01-01 08:00:00', '', 11),
(160, 'Smart TV TCL Google 55 Pulgadas', '', 24995.00, 2, 0.00, '2023-01-01 08:00:00', '', 11),
(161, 'Smart TV TCL Fire TV 58 Pulgadas', '', 27495.00, 2, 0.00, '2023-01-01 08:00:00', '', 11),
(162, 'Smart TV TCL Roku 65 Pulgadas', '', 30995.00, 2, 0.00, '2025-03-14 08:00:00', '', 11),
(163, 'Smart TV TCL Google 65 Pulgadas', '', 34995.00, 2, 0.00, '2023-01-01 08:00:00', '', 11),
(164, 'Smart TV TCL Roku 85 Pulgadas', '', 74995.00, 2, 0.00, '2023-01-01 08:00:00', '', 11),
(165, 'Smart TV WESTINGHOUSE ROKU 43 Pulgadas', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', '', 13),
(166, 'Smart TV WESTINGHOUSE ROKU 65 Pulgadas', '', 28495.00, 2, 0.00, '2023-01-01 08:00:00', '', 13),
(167, 'Smart TV HISENSE GOOGLE 43 Pulgadas', '', 16995.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(168, 'Smart TV HISENSE GOOGLE QLED D5 43 Pulgadas', '', 18995.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(169, 'Smart TV HISENSE A7 Google 50 Pulgadas', '', 21495.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(170, 'Smart TV HISENSE QLED QD5 2024 55 Pulgadas', '', 27495.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(171, 'Smart TV HISENSE QLED D5 GOOGLE 65 Pulgadas', '', 37495.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(172, 'Smart TV HISENSE S7N CANVAS QLED GOOGLE 65 Pulgadas', '', 62495.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(173, 'Smart TV HISENSE A7 Google 75 Pulgadas', '', 42995.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(174, 'Smart TV HISENSE QLED QD6 GOOGLE 75 Pulgadas', '', 49995.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(175, 'Smart TV HISENSE A7 Google 85 Pulgadas', '', 82995.00, 2, 0.00, '2023-01-01 08:00:00', '', 12),
(176, 'Smart TV SAMSUNG SERIE 7 2024 55 Pulgadas', '', 28995.00, 2, 0.00, '2023-01-01 08:00:00', '', 2),
(177, 'Smart TV SAMSUNG QLED Q6 55 Pulgadas', '', 34995.00, 2, 0.00, '2023-01-01 08:00:00', '', 2),
(178, 'Smart TV SAMSUNG DU7200 2024 65 Pulgadas', '', 36495.00, 2, 0.00, '2023-01-01 08:00:00', '', 2),
(179, 'Smart TV SAMSUNG 75 Pulgadas', '', 54995.00, 2, 0.00, '2023-01-01 08:00:00', '', 2),
(180, 'Aire Acondicionado Inverter D WORLD 12000', '', 20995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(181, 'Aire Acondicionado Inverter GBR 18000', '', 32495.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(182, 'Aire Acondicionado Inverter TCL 24000', '', 44495.00, 6, 0.00, '2023-01-01 08:00:00', '', 11),
(183, 'Aire Acondicionado Inverter Black+Decker 12000', '', 23495.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(184, 'PlayStation 5 Slim', '', 33995.00, 4, 0.00, '2025-03-13 08:00:00', '', 15),
(185, 'Onyx Studio 8', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(186, 'Subwofer Barra de Sonido LG', '', 7995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(187, 'Samsung Barra de Sonido iHome 120w', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', '', 2),
(188, 'Samsung Barra de Sonido iHome 180w', '', 7995.00, 6, 0.00, '2023-01-01 08:00:00', '', 2),
(189, 'Freidora de Aire Brentwood 4L', '', 3995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(190, 'Freidora de Aire Ninja Speed 6L', '', 7495.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(191, 'Microonda Sokany', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(192, 'MOUSE RAZER DEATHADDER ESSENTIAL', '', 2495.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(193, 'TECLADO RAZER ORNATA V3', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(194, 'JBL FLIP 5', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', '', 18),
(195, 'JBL PARTYBOX ON-THE-GO', '', 19995.00, 6, 0.00, '2023-01-01 08:00:00', '', 18),
(196, 'JBL BOOMBOX3', '', 26495.00, 6, 0.00, '2023-01-01 08:00:00', '', 18),
(197, 'JBL CHARGE 5', '', 9495.00, 6, 0.00, '2023-01-01 08:00:00', '', 18),
(198, 'JBL CLIP 4', '', 4495.00, 6, 0.00, '2023-01-01 08:00:00', '', 18),
(199, 'JBL GO 3', '', 2995.00, 6, 0.00, '2023-01-01 08:00:00', '', 18),
(200, 'SONY SRS-XG500', '', 22495.00, 6, 0.00, '2023-01-01 08:00:00', '', 15),
(201, 'ANIKER SOUNDCORE', '', 2995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(202, 'SOUNDCORE BOOM 2 PLUS', '', 14995.00, 6, 0.00, '2023-01-01 08:00:00', '', NULL),
(203, 'Monitor Asus VG1B 27 Pulgada 165HZ', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', '', 9),
(204, 'Monitor LG Ultragear 34 Pulgada 160HZ', '', 24995.00, 2, 0.00, '2023-01-01 08:00:00', '', NULL),
(205, 'Monitor Samsung G3 ODYSSEY 27 Pulgada 165HZ', '', 17495.00, 2, 0.00, '2023-01-01 08:00:00', '', 2),
(206, 'Monitor Samsung G4 ODYSSEEY 27 Pulgada 240HZ', '', 19995.00, 2, 0.00, '2023-01-01 08:00:00', '', 2),
(207, 'Monitor Samsung G5 ODYSSEY 32 Pulgada 165HZ', '', 22995.00, 2, 0.00, '2023-01-01 08:00:00', '', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p_marcas`
--

CREATE TABLE `p_marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `p_marcas`
--

INSERT INTO `p_marcas` (`id`, `nombre`, `logo`) VALUES
(1, 'Apple', 'img/marcas/apple.png'),
(2, 'Samsung', 'img/marcas/samsung.png'),
(3, 'Xiaomi', 'img/marcas/xiaomi.png'),
(4, 'Google', 'img/marcas/google.png'),
(5, 'Amazon', 'img/marcas/amazon.png'),
(6, 'Vortex', 'img/marcas/vortex.png'),
(7, 'Skypad', 'img/marcas/skypad.png'),
(8, 'HP', 'img/marcas/hp.png'),
(9, 'Asus', 'img/marcas/asus.png'),
(10, 'Lenovo', 'img/marcas/lenovo.png'),
(11, 'TCL', 'img/marcas/tcl.png'),
(12, 'Hisense', 'img/marcas/hisense.png'),
(13, 'Westinghouse', 'img/marcas/westinghouse.png'),
(14, 'Onn', 'img/marcas/onn.png'),
(15, 'Sony', 'img/marcas/sony.png'),
(16, 'Microsoft', 'img/marcas/microsoft.png'),
(17, 'Nintendo', 'img/marcas/nintendo.png'),
(18, 'JBL', 'img/marcas/jbl.png'),
(19, 'Infinix', 'img/marcas/jbl.png'),
(20, 'ZTE', 'img/marcas/jbl.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `is_verified`, `created_at`) VALUES
(40, 'nilrad', 'nilradlvaldez@gmail.com', '$2b$10$U1NxuwgRdyme0x.DagoG8.HKLSSi0lR2.yLE6sDnwf4jI4COjZlXG', 1, '2025-04-22 00:10:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variantes`
--

CREATE TABLE `variantes` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `variantes`
--

INSERT INTO `variantes` (`id`, `producto_id`, `color`, `stock`, `img`) VALUES
(370, 1, 'rojo', 11, 'https://www.plug.tech/cdn/shop/products/Untitleddesign_39239d69-632f-4486-8993-1f3e88a1ce2a.jpg?v=1628526193&%3Bwidth=500&em-format=auto');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `baterias`
--
ALTER TABLE `baterias`
  ADD PRIMARY KEY (`ID_Bateria`),
  ADD KEY `ID_Movil` (`ID_Movil`);

--
-- Indices de la tabla `camara`
--
ALTER TABLE `camara`
  ADD PRIMARY KEY (`ID_Camara`),
  ADD KEY `ID_Movil` (`ID_Movil`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD PRIMARY KEY (`ID_Clasificacion`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `conectividad`
--
ALTER TABLE `conectividad`
  ADD PRIMARY KEY (`ID_Conectividad`),
  ADD KEY `ID_Movil` (`ID_Movil`);

--
-- Indices de la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  ADD PRIMARY KEY (`ID_DimensionesPeso`),
  ADD KEY `ID_Movil` (`ID_Movil`);

--
-- Indices de la tabla `estados_pedido`
--
ALTER TABLE `estados_pedido`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `estado` (`estado`);

--
-- Indices de la tabla `keys`
--
ALTER TABLE `keys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`ID_Marca`);

--
-- Indices de la tabla `marca_categoria`
--
ALTER TABLE `marca_categoria`
  ADD PRIMARY KEY (`marca_id`,`categoria_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `memorias`
--
ALTER TABLE `memorias`
  ADD PRIMARY KEY (`ID_Memoria`),
  ADD KEY `ID_Movil` (`ID_Movil`);

--
-- Indices de la tabla `metodos_pago`
--
ALTER TABLE `metodos_pago`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `movilclasificaciones`
--
ALTER TABLE `movilclasificaciones`
  ADD PRIMARY KEY (`ID_Movil`,`ID_Clasificacion`),
  ADD KEY `ID_Clasificacion` (`ID_Clasificacion`);

--
-- Indices de la tabla `moviles`
--
ALTER TABLE `moviles`
  ADD PRIMARY KEY (`ID_Movil`),
  ADD KEY `ID_Marca` (`ID_Marca`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `estado_id` (`estado_id`),
  ADD KEY `metodo_pago_id` (`metodo_pago_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `marca_id` (`marca_id`);

--
-- Indices de la tabla `p_marcas`
--
ALTER TABLE `p_marcas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `baterias`
--
ALTER TABLE `baterias`
  MODIFY `ID_Bateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `camara`
--
ALTER TABLE `camara`
  MODIFY `ID_Camara` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  MODIFY `ID_Clasificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `conectividad`
--
ALTER TABLE `conectividad`
  MODIFY `ID_Conectividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  MODIFY `ID_DimensionesPeso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `estados_pedido`
--
ALTER TABLE `estados_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `keys`
--
ALTER TABLE `keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `ID_Marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `memorias`
--
ALTER TABLE `memorias`
  MODIFY `ID_Memoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `metodos_pago`
--
ALTER TABLE `metodos_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `moviles`
--
ALTER TABLE `moviles`
  MODIFY `ID_Movil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT de la tabla `p_marcas`
--
ALTER TABLE `p_marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `variantes`
--
ALTER TABLE `variantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=371;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `baterias`
--
ALTER TABLE `baterias`
  ADD CONSTRAINT `baterias_ibfk_1` FOREIGN KEY (`ID_Movil`) REFERENCES `moviles` (`ID_Movil`);

--
-- Filtros para la tabla `camara`
--
ALTER TABLE `camara`
  ADD CONSTRAINT `camara_ibfk_1` FOREIGN KEY (`ID_Movil`) REFERENCES `moviles` (`ID_Movil`);

--
-- Filtros para la tabla `conectividad`
--
ALTER TABLE `conectividad`
  ADD CONSTRAINT `conectividad_ibfk_1` FOREIGN KEY (`ID_Movil`) REFERENCES `moviles` (`ID_Movil`);

--
-- Filtros para la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  ADD CONSTRAINT `dimensionespeso_ibfk_1` FOREIGN KEY (`ID_Movil`) REFERENCES `moviles` (`ID_Movil`);

--
-- Filtros para la tabla `marca_categoria`
--
ALTER TABLE `marca_categoria`
  ADD CONSTRAINT `marca_categoria_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `p_marcas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `marca_categoria_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `memorias`
--
ALTER TABLE `memorias`
  ADD CONSTRAINT `memorias_ibfk_1` FOREIGN KEY (`ID_Movil`) REFERENCES `moviles` (`ID_Movil`);

--
-- Filtros para la tabla `movilclasificaciones`
--
ALTER TABLE `movilclasificaciones`
  ADD CONSTRAINT `movilclasificaciones_ibfk_1` FOREIGN KEY (`ID_Movil`) REFERENCES `moviles` (`ID_Movil`),
  ADD CONSTRAINT `movilclasificaciones_ibfk_2` FOREIGN KEY (`ID_Clasificacion`) REFERENCES `clasificacion` (`ID_Clasificacion`);

--
-- Filtros para la tabla `moviles`
--
ALTER TABLE `moviles`
  ADD CONSTRAINT `moviles_ibfk_1` FOREIGN KEY (`ID_Marca`) REFERENCES `marcas` (`ID_Marca`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`estado_id`) REFERENCES `estados_pedido` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodos_pago` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`marca_id`) REFERENCES `p_marcas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD CONSTRAINT `variantes_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
