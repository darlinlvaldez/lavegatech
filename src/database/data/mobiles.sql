-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2025 a las 14:02:37
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
(1, 'iPhone 12', '64GB - Calidad A', 15995.00, 1, 20.00, '2025-03-09 07:06:10', 'https://iphoneros.com/wp-content/uploads/2021/04/moradoytal.jpg', 1),
(2, 'iPhone 12', '128GB - Calidad A', 17995.00, 1, 0.00, '2025-03-09 04:00:00', '/img/iphone12black.png', 1),
(3, 'iPhone 12', '256GB - Calidad A', 19495.00, 1, 0.00, '2025-03-30 04:00:00', 'https://macniacos.es/3990-home_default/iphone-12.jpg', 1),
(4, 'iPhone 12 Pro', '128GB - Calidad A', 21995.00, 1, 0.00, '2025-03-30 04:00:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0QKHaKX07GoNDf_fep9X5ruPL8pMGfolDiA&s', 1),
(5, 'iPhone 12 Pro', '256GB - Calidad A', 23995.00, 1, 0.00, '2025-03-11 04:00:00', '', 1),
(6, 'iPhone 12 Pro Max', '128GB - Calidad A', 27495.00, 1, 0.00, '2025-03-01 04:00:00', '', 1),
(7, 'iPhone 12 Pro Max', '256GB - Calidad A', 28995.00, 1, 0.00, '2025-03-01 04:00:00', '', 1),
(8, 'iPhone 12 Pro Max', '512GB - Calidad A', 29995.00, 1, 0.00, '2025-03-01 04:00:00', '', 1),
(9, 'iPhone 13', '128GB - Calidad A', 23995.00, 1, 0.00, '2025-03-01 04:00:00', '', 1),
(10, 'iPhone 13', '256GB - Calidad A', 25495.00, 1, 0.00, '2025-03-01 04:00:00', '', 1),
(11, 'iPhone 13 Pro', '128GB - Calidad A', 28495.00, 1, 0.00, '2025-03-14 04:00:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwCw1I7KO58d-DpN6mYjVeF72lmM06yMcbw&s', 1),
(12, 'iPhone 13 Pro', '256GB - Calidad A', 30995.00, 1, 0.00, '2025-03-11 04:00:00', '', 1),
(13, 'iPhone 13 Pro Max', '128GB - Calidad A', 32995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(14, 'iPhone 13 Pro Max', '256GB - Calidad A', 35995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(15, 'iPhone 13 Pro Max', '512GB - Calidad A', 37495.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(16, 'iPhone 14', '128GB - Calidad A', 26495.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(17, 'iPhone 14', '256GB - Calidad A', 27995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(18, 'iPhone 14 Plus', '128GB - Calidad A', 28995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(19, 'iPhone 14 Plus', '256GB - Calidad A', 30995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(20, 'iPhone 14 Pro', '128GB - Calidad A', 34495.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(21, 'iPhone 14 Pro', '256GB - Calidad A', 36495.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(22, 'iPhone 14 Pro', '512GB - Calidad A', 38995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(23, 'iPhone 14 Pro Max', '128GB - Calidad A', 41495.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(24, 'iPhone 14 Pro Max', '256GB - Calidad A', 43995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(25, 'iPhone 14 Pro Max', '512GB - Calidad A', 46495.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(26, 'iPhone 15', '128GB - Calidad A', 35995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(27, 'iPhone 15', '256GB - Calidad A', 37995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(28, 'iPhone 15 Plus', '128GB - Calidad A', 38995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(29, 'iPhone 15 Plus', '512GB - Calidad A', 42995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(30, 'iPhone 15 Pro', '128GB - Calidad A', 41995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(31, 'iPhone 15 Pro Max', '256GB - Calidad A', 52995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(32, 'iPhone 15 Pro Max Con Sim Físico', '256GB - Calidad A', 54995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(33, 'iPhone 15 Pro Max', '512GB - Calidad A', 57995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(34, 'iPhone 15 Pro Max', '1TB - Calidad A', 61995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(35, 'iPhone 16', '128GB - Nuevo', 52495.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(36, 'iPhone 16', '128GB - Calidad A', 44995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(37, 'iPhone 16 Plus', '128GB - Calidad A', 54995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(38, 'iPhone 16 Pro Max', '256GB - Nuevo', 74995.00, 1, 0.00, '2023-01-01 04:00:00', '', 1),
(39, 'iPhone 16 Pro Max', '512GB - Nuevo', 84995.00, 1, 0.00, '2025-03-01 04:00:00', '', 1),
(40, 'SAMSUNG GALAXY S10 PLUS', '128GB - A', 9995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(41, 'SAMSUNG GALAXY NOTE 10 PLUS', '256GB - A', 13995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(42, 'SAMSUNG GALAXY NOTE 20 ULTRA', '128GB - A', 17995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(43, 'SAMSUNG GALAXY S21 ULTRA', '128GB - A', 17995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(44, 'SAMSUNG GALAXY S23 ULTRA', '256GB - A', 39495.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(45, 'SAMSUNG GALAXY S25 ULTRA', '512GB - Nuevo', 84995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(46, 'SAMSUNG GALAXY A05', '128GB - Nuevo', 7995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(47, 'SAMSUNG GALAXY A05', '64GB - Nuevo', 6995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(48, 'SAMSUNG GALAXY A15', '128GB - Nuevo', 8995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(49, 'SAMSUNG GALAXY A25 5G', '256GB - Nuevo', 12995.00, 1, 0.00, '2023-01-01 04:00:00', '', 2),
(50, 'XIAOMI REDMI NOTE 13 5G', 'Nuevo', 10995.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(51, 'XIAOMI REDMI NOTE 13 PRO PLUS 5G', 'Nuevo', 20995.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(52, 'XIAOMI POCO X6 PRO', 'Nuevo', 17495.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(53, 'XIAOMI REDMI 14C', 'Nuevo', 7495.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(54, 'XIAOMI REDMI NOTE 14', 'Nuevo', 10495.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(55, 'XIAOMI REDMI NOTE 14', 'Nuevo', 11995.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(56, 'XIAOMI REDMI NOTE 14 5G', 'Nuevo', 13995.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(57, 'XIAOMI REDMI NOTE 14 PRO', 'Nuevo', 15995.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(58, 'XIAOMI REDMI NOTE 14 PRO 5G', 'Nuevo', 17995.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(59, 'XIAOMI REDMI NOTE 14 PRO PLUS 5G', 'Nuevo', 22995.00, 1, 0.00, '2023-01-01 04:00:00', '', 3),
(60, 'Google Pixel 7 Pro', 'A', 17495.00, 1, 0.00, '2023-01-01 04:00:00', '', 4),
(61, 'Google Pixel 8 Pro', 'A', 24995.00, 1, 0.00, '2023-01-01 04:00:00', '', 4),
(62, 'INFINIX SMART 8', 'Nuevo', 4995.00, 1, 0.00, '2023-01-01 04:00:00', '', 19),
(63, 'INFINIX SMART 9', 'Nuevo', 5995.00, 1, 0.00, '2023-01-01 04:00:00', '', 19),
(64, 'INFINIX HOT 50I', 'Nuevo', 7495.00, 1, 0.00, '2023-01-01 04:00:00', '', 19),
(65, 'ZTE A35 CORE', 'Nuevo', 3995.00, 1, 0.00, '2023-01-01 04:00:00', '', 20),
(66, 'ZTE A35', 'Nuevo', 4995.00, 1, 0.00, '2023-01-01 04:00:00', '', 20),
(67, 'ZTE BLADE V60', 'Nuevo', 7495.00, 1, 0.00, '2023-01-01 04:00:00', '', 20),
(68, 'ZTE NUBIA NEO 2 5G', 'Nuevo', 11995.00, 1, 0.00, '2023-01-01 04:00:00', '', 20),
(69, 'MOTOROLA E14', 'Nuevo', 4995.00, 1, 0.00, '2023-01-01 04:00:00', '', NULL),
(70, 'MOTOROLA G04', 'Nuevo', 5995.00, 1, 0.00, '2023-01-01 04:00:00', '', NULL),
(71, 'IPAD PRO 12.9-INCH (6TH)', 'Apple, 128GB, A', 45995.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(72, 'IPAD PRO 12.9 (6TH)', 'Apple, 256GB, A', 47495.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(73, 'IPAD PRO M2 512GB 12.9 6TA GEN', 'Apple, 512GB, A', 49995.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(74, 'IPAD PRO 13 PULGADAS M4', 'Apple, 512GB, Nuevo', 57995.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(75, 'IPAD PRO 13 PULGADAS M4', '256GB, Nuevo', 54995.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(76, 'IPAD 10 GENERACION', 'Apple, 64GB, Nuevo', 23495.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(79, 'AMAZON FIRE 8', 'Amazon, 32GB, A', 2995.00, 5, 0.00, '2023-01-01 04:00:00', '', 5),
(80, 'AMAZON FIRE 8', 'Amazon, 64GB, A', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', 5),
(81, 'ASTRO 8R', 'ASTRO, 32GB, Nuevo', 3495.00, 5, 0.00, '2025-03-30 04:00:00', '', NULL),
(82, 'XIAOMI REDMI PAD SE 8.7', 'redmi, 128GB, Nuevo', 8495.00, 5, 0.00, '2023-01-01 04:00:00', '', 3),
(83, 'VORTEX T10', 'VORTEX, 32GB, Nuevo', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', 6),
(84, 'HOTPEPPER', 'HOTPEPPER, 32GB, Nuevo', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', NULL),
(85, 'X10MAX', 'X10MAX, 64GB, Nuevo', 3995.00, 5, 0.00, '2023-01-01 04:00:00', '', NULL),
(86, 'VORTEX T10 PRO MAX', 'VORTEX, 64GB, Nuevo', 3995.00, 5, 0.00, '2023-01-01 04:00:00', '', 6),
(87, 'SKYPAD 10', 'SKYPAD, 32GB, Nuevo', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', 7),
(88, 'SKYPAD 10 PRO MAX', 'SKYPAD, 64GB, Nuevo', 3995.00, 5, 0.00, '2023-01-01 04:00:00', '', 7),
(89, 'Macbook Pro 13-Inch 2020 i5-8ram', 'Macbook, 512GB, A', 31995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(90, 'Macbook Air 13-Inch 2020 i3-8ram', 'Macbook, 256GB, A', 29495.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(91, 'Macbook Pro 16-Inch 2019 i7-16ram', 'Macbook, 512GB, A', 34995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(92, 'Macbook Pro 16-Inch 2019 i9-32Ram', 'Macbook, 512GB, A', 39995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(93, 'Macbook Pro 16-Inch 2019 i9-16Ram', 'Macbook, 1TB, A', 41995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(94, 'Macbook Air M1 8Ram Sellada', 'Macbook, 256GB, Nuevo', 44995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(95, 'Macbook Pro M2 2022 8-Ram', 'Macbook, 256GB, A', 51995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(96, 'Macbook Air 15-Inch M2', 'Macbook, 256GB, Nuevo', 54995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(97, 'HP Victus i5-12Gen-8Ram-3050TI', 'HP, 512GB, Nuevo', 33495.00, 3, 0.00, '2023-01-01 04:00:00', '', 8),
(98, 'Asus Tuf Gaming F15 i5-12Gen-16Ram-3050', 'Asus, 512GB, Nuevo', 39995.00, 3, 0.00, '2025-03-14 04:00:00', '', 9),
(99, 'HP 15.6Inch i5-12Gen-8Ram', 'HP, 256GB, Nuevo', 23995.00, 3, 0.00, '2023-01-01 04:00:00', '', 8),
(100, 'HP i5-13Gen-8Ram', 'HP, 256GB, Nuevo', 24995.00, 3, 0.00, '2023-01-01 04:00:00', '', 8),
(102, 'IPAD PRO 12.9-INCH (6TH)', 'Apple, 128GB, A', 45995.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(103, 'IPAD PRO 12.9 (6TH)', 'Apple, 256GB, A', 47495.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(104, 'IPAD PRO M2 512GB 12.9 6TA GEN', 'Apple, 512GB, A', 49995.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(105, 'IPAD PRO 13 PULGADAS M4', 'Apple, 512GB, Nuevo', 57995.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(106, 'IPAD PRO 13 PULGADAS M4', '256GB, Nuevo', 54995.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(107, 'IPAD 10 GENERACION', 'Apple, 64GB, Nuevo', 23495.00, 5, 0.00, '2023-01-01 04:00:00', '', 1),
(108, 'SAMSUNG GALAXY TAB A9+', 'Samsung, 64GB, Nuevo', 11495.00, 5, 0.00, '2023-01-01 04:00:00', '', 2),
(109, 'SAMSUNG GALAXY TAB A9+', 'Samsung, 128GB, Nuevo', 13495.00, 5, 0.00, '2023-01-01 04:00:00', '', 2),
(110, 'AMAZON FIRE 8', 'Amazon, 32GB, A', 2995.00, 5, 0.00, '2023-01-01 04:00:00', '', 5),
(111, 'AMAZON FIRE 8', 'Amazon, 64GB, A', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', 5),
(112, 'ASTRO 8R', 'ASTRO, 32GB, Nuevo', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', NULL),
(114, 'VORTEX T10', 'VORTEX, 32GB, Nuevo', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', 6),
(115, 'HOTPEPPER', 'HOTPEPPER, 32GB, Nuevo', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', NULL),
(116, 'X10MAX', 'X10MAX, 64GB, Nuevo', 3995.00, 5, 0.00, '2023-01-01 04:00:00', '', NULL),
(117, 'VORTEX T10 PRO MAX', 'VORTEX, 64GB, Nuevo', 3995.00, 5, 0.00, '2023-01-01 04:00:00', '', 6),
(118, 'SKYPAD 10', 'SKYPAD, 32GB, Nuevo', 3495.00, 5, 0.00, '2023-01-01 04:00:00', '', 7),
(119, 'SKYPAD 10 PRO MAX', 'SKYPAD, 64GB, Nuevo', 3995.00, 5, 0.00, '2023-01-01 04:00:00', '', 7),
(120, 'Macbook Pro 13-Inch 2020 i5-8ram', 'Macbook, 512GB, A', 31995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(121, 'Macbook Air 13-Inch 2020 i3-8ram', 'Macbook, 256GB, A', 29495.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(122, 'Macbook Pro 16-Inch 2019 i7-16ram', 'Macbook, 512GB, A', 34995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(123, 'Macbook Pro 16-Inch 2019 i9-32Ram', 'Macbook, 512GB, A', 39995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(124, 'Macbook Pro 16-Inch 2019 i9-16Ram', 'Macbook, 1TB, A', 41995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(125, 'Macbook Air M1 8Ram Sellada', 'Macbook, 256GB, Nuevo', 44995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(126, 'Macbook Pro M2 2022 8-Ram', 'Macbook, 256GB, A', 51995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(127, 'Macbook Air 15-Inch M2', 'Macbook, 256GB, Nuevo', 54995.00, 3, 0.00, '2023-01-01 04:00:00', '', 1),
(128, 'HP Victus i5-12Gen-8Ram-3050TI', 'HP, 512GB, Nuevo', 33495.00, 3, 0.00, '2023-01-01 04:00:00', '', 8),
(130, 'HP 15.6Inch i5-12Gen-8Ram', 'HP, 256GB, Nuevo', 23995.00, 3, 0.00, '2023-01-01 04:00:00', '', 8),
(131, 'HP i5-13Gen-8Ram', 'HP, 256GB, Nuevo', 24995.00, 3, 0.00, '2023-01-01 04:00:00', '', 8),
(132, 'Lenovo i3-12Gen-8Ram', 'Lenovo, 256GB, Nuevo', 21495.00, 3, 0.00, '2023-01-01 04:00:00', '', 10),
(133, 'SAMSUNG WATCH 6 CLASSIC', 'Reloj', 12995.00, 6, 0.00, '2023-01-01 04:00:00', '', 2),
(134, 'SAMSUNG WATCH 6', 'Reloj', 11995.00, 6, 0.00, '2023-01-01 04:00:00', '', 2),
(135, 'SAMSUNG WATCH 7', 'Reloj', 15995.00, 6, 0.00, '2023-01-01 04:00:00', '', 2),
(136, 'Samsung Galaxy Buds 3', 'Audífonos', 8495.00, 6, 0.00, '2023-01-01 04:00:00', '', 2),
(137, 'Samsung Galaxy Buds 2', 'Audífonos', 5995.00, 6, 0.00, '2023-01-01 04:00:00', '', 2),
(138, 'BEATS SOLO 4', 'Audífonos', 8495.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(139, 'BEATS STUDIO PRO', 'Audífonos', 9995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(140, 'XIAOMI REDMI BUDS 4 ACTIVE', 'Audífonos', 1995.00, 6, 0.00, '2023-01-01 04:00:00', '', 3),
(142, 'AIRPODS GEN 2', 'Audífonos', 4995.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(143, 'AIRPODS GEN 3', 'Audífonos', 9995.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(144, 'AIRPODS GEN 4 CANCELACION DE RUIDO', 'Audífonos', 12995.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(145, 'AIRPODS PRO 2 TIPO C OPEN BOX', 'Audífonos', 10995.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(146, 'RAZER BARRACUDA X', 'Audífonos', 4995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(147, 'APPLE WATCH SE 2', 'Reloj', 10495.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(148, 'APPLE WATCH SERIE 7', 'Reloj', 12994.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(149, 'APPLE WATCH SERIE 8', 'Reloj', 14495.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(150, 'APPLE WATCH SERIE ULTRA', 'Reloj', 24995.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(151, 'APPLE WATCH SERIE 9', 'Reloj', 16495.00, 6, 0.00, '2023-01-01 04:00:00', '', 1),
(152, 'Smart TV Onn', '32 Pulgadas', 9995.00, 2, 0.00, '2023-01-01 04:00:00', '', 14),
(153, 'Smart TV Onn', '43 Pulgadas', 14995.00, 2, 0.00, '2023-01-01 04:00:00', '', 14),
(154, 'Smart TV Onn', '65 Pulgadas', 28995.00, 2, 0.00, '2023-01-01 04:00:00', '', 14),
(155, 'Smart TV Onn', '75 Pulgadas', 36995.00, 2, 0.00, '2023-01-01 04:00:00', '', 14),
(156, 'Smart TV Phillips', '32 Pulgadas', 9995.00, 2, 0.00, '2023-01-01 04:00:00', '', NULL),
(157, 'Smart TV TCL Androide', '32 Pulgadas', 10995.00, 2, 0.00, '2023-01-01 04:00:00', '', 11),
(158, 'Smart TV TCL Roku', '43 Pulgadas', 16495.00, 2, 0.00, '2023-01-01 04:00:00', '', 11),
(159, 'Smart TV TCL Roku', '55 Pulgadas', 23995.00, 2, 0.00, '2023-01-01 04:00:00', '', 11),
(160, 'Smart TV TCL Google', '55 Pulgadas', 24995.00, 2, 0.00, '2023-01-01 04:00:00', '', 11),
(161, 'Smart TV TCL Fire TV', '58 Pulgadas', 27495.00, 2, 0.00, '2023-01-01 04:00:00', '', 11),
(162, 'Smart TV TCL Roku', '65 Pulgadas', 30995.00, 2, 0.00, '2025-03-14 04:00:00', '', 11),
(163, 'Smart TV TCL Google', '65 Pulgadas', 34995.00, 2, 0.00, '2023-01-01 04:00:00', '', 11),
(164, 'Smart TV TCL Roku', '85 Pulgadas', 74995.00, 2, 0.00, '2023-01-01 04:00:00', '', 11),
(165, 'Smart TV WESTINGHOUSE ROKU', '43 Pulgadas', 14995.00, 2, 0.00, '2023-01-01 04:00:00', '', 13),
(166, 'Smart TV WESTINGHOUSE ROKU', '65 Pulgadas', 28495.00, 2, 0.00, '2023-01-01 04:00:00', '', 13),
(167, 'Smart TV HISENSE GOOGLE', '43 Pulgadas', 16995.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(168, 'Smart TV HISENSE GOOGLE QLED D5', '43 Pulgadas', 18995.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(169, 'Smart TV HISENSE A7 Google', '50 Pulgadas', 21495.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(170, 'Smart TV HISENSE QLED QD5 2024', '55 Pulgadas', 27495.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(171, 'Smart TV HISENSE QLED D5 GOOGLE', '65 Pulgadas', 37495.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(172, 'Smart TV HISENSE S7N CANVAS QLED GOOGLE', '65 Pulgadas', 62495.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(173, 'Smart TV HISENSE A7 Google', '75 Pulgadas', 42995.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(174, 'Smart TV HISENSE QLED QD6 GOOGLE', '75 Pulgadas', 49995.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(175, 'Smart TV HISENSE A7 Google', '85 Pulgadas', 82995.00, 2, 0.00, '2023-01-01 04:00:00', '', 12),
(176, 'Smart TV SAMSUNG SERIE 7 2024', '55 Pulgadas', 28995.00, 2, 0.00, '2023-01-01 04:00:00', '', 2),
(177, 'Smart TV SAMSUNG QLED Q6', '55 Pulgadas', 34995.00, 2, 0.00, '2023-01-01 04:00:00', '', 2),
(178, 'Smart TV SAMSUNG DU7200 2024', '65 Pulgadas', 36495.00, 2, 0.00, '2023-01-01 04:00:00', '', 2),
(179, 'Smart TV SAMSUNG', '75 Pulgadas', 54995.00, 2, 0.00, '2023-01-01 04:00:00', '', 2),
(180, 'Aire Acondicionado Inverter D WORLD', '12,000', 20995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(181, 'Aire Acondicionado Inverter GBR', '18,000', 32495.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(182, 'Aire Acondicionado Inverter TCL', '24,000', 44495.00, 6, 0.00, '2023-01-01 04:00:00', '', 11),
(183, 'Aire Acondicionado Inverter Black+Decker', '12,000', 23495.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(184, 'PlayStation 5 Slim', 'Consola', 33995.00, 4, 0.00, '2025-03-13 04:00:00', '', 15),
(185, 'Onyx Studio 8', 'Bocina', 12995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(186, 'Subwofer Barra de Sonido LG', 'Barra de Sonido', 7995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(187, 'Samsung Barra de Sonido iHome 120w', 'Barra de Sonido', 5995.00, 6, 0.00, '2023-01-01 04:00:00', '', 2),
(188, 'Samsung Barra de Sonido iHome 180w', 'Barra de Sonido', 7995.00, 6, 0.00, '2023-01-01 04:00:00', '', 2),
(189, 'Freidora de Aire Brentwood 4L', 'Freidora', 3995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(190, 'Freidora de Aire Ninja Speed 6L', 'Freidora', 7495.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(191, 'Microonda Sokany', 'Microonda', 5995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(192, 'RAZER DEATHADDER ESSENTIAL', 'Mouse', 2495.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(193, 'RAZER ORNATA V3', 'Teclado', 4995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(194, 'JBL FLIP 5', 'Bocina', 5995.00, 6, 0.00, '2023-01-01 04:00:00', '', 18),
(195, 'JBL PARTYBOX ON-THE-GO', 'Bocina', 19995.00, 6, 0.00, '2023-01-01 04:00:00', '', 18),
(196, 'JBL BOOMBOX3', 'Bocina', 26495.00, 6, 0.00, '2023-01-01 04:00:00', '', 18),
(197, 'JBL CHARGE 5', 'Bocina', 9495.00, 6, 0.00, '2023-01-01 04:00:00', '', 18),
(198, 'JBL CLIP 4', 'Bocina', 4495.00, 6, 0.00, '2023-01-01 04:00:00', '', 18),
(199, 'JBL GO 3', 'Bocina', 2995.00, 6, 0.00, '2023-01-01 04:00:00', '', 18),
(200, 'SONY SRS-XG500', 'Bocina', 22495.00, 6, 0.00, '2023-01-01 04:00:00', '', 15),
(201, 'ANIKER SOUNDCORE', 'Bocina', 2995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(202, 'SOUNDCORE BOOM 2 PLUS', 'Bocina', 14995.00, 6, 0.00, '2023-01-01 04:00:00', '', NULL),
(203, 'Monitor Asus VG1B 27 Pulgada 165HZ', 'Monitor', 14995.00, 2, 0.00, '2023-01-01 04:00:00', '', 9),
(204, 'Monitor LG Ultragear 34 Pulgada 160HZ', 'Monitor', 24995.00, 2, 0.00, '2023-01-01 04:00:00', '', NULL),
(205, 'Monitor Samsung G3 ODYSSEY 27 Pulgada 165HZ', 'Monitor', 17495.00, 2, 0.00, '2023-01-01 04:00:00', '', 2),
(206, 'Monitor Samsung G4 ODYSSEEY 27 Pulgada 240HZ', 'Monitor', 19995.00, 2, 0.00, '2023-01-01 04:00:00', '', 2),
(207, 'Monitor Samsung G5 ODYSSEY 32 Pulgada 165HZ', 'Monitor', 22995.00, 2, 0.00, '2023-01-01 04:00:00', '', 2);

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
(10, 1, 'purpura', 30, 'https://iphoneros.com/wp-content/uploads/2021/04/moradoytal.jpg'),
(11, 1, 'verde', 15, 'https://www.att.com.mx/dw/image/v2/BJKW_PRD/on/demandware.static/-/Sites-att-master/default/dwdcd3412e/images/Devices/Apple/iphone%2015/verde/iPhone15_Green_PDP_Image_Position-1__MXLA.jpg?sw=400&sh=400&sm=fit'),
(14, 1, 'blanco', 10, 'https://img2.corotos.com.do/variants/ebyj87789bqynakeif8k9tl5zxla/0d54b8412257af91ac052258f87c01a7316c7bcdfea14eb58109304934875c8e'),
(16, 3, 'negro', 30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGIDlJbXXmBrBCkY4eQ-1ncjBSaga-e9KjKg&s'),
(17, 2, 'Negro Espacial', 26, '/img/iphone12black.png'),
(18, 9, 'Púrpura Profundo', 30, NULL),
(19, 10, 'Púrpura Profundo', 30, '/img/iphone12black.png'),
(20, 3, 'rojo', 11, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHL63?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1623349246000'),
(21, 4, 'rojo', 11, 'https://hk-refurbished-stock.com/wp-content/uploads/2023/11/1277__Red__1.jpg'),
(22, 4, 'azul', 30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0QKHaKX07GoNDf_fep9X5ruPL8pMGfolDiA&s'),
(23, 11, 'blanco', 30, 'https://hk-refurbished-stock.com/wp-content/uploads/2023/11/UI000000024602__Starlight__1-1.jpg'),
(24, 11, 'negro', 30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwCw1I7KO58d-DpN6mYjVeF72lmM06yMcbw&s'),
(25, 16, 'Titanio Blanco', 30, NULL),
(26, 17, 'Titanio Blanco', 30, NULL),
(27, 18, 'Titanio Blanco', 30, NULL),
(28, 5, 'Titanio Blanco', 30, NULL),
(29, 20, 'Titanio Blanco', 30, NULL),
(30, 21, 'Titanio Blanco', 30, NULL),
(31, 22, 'Titanio Blanco', 30, NULL),
(32, 23, 'Titanio Blanco', 30, NULL),
(33, 24, 'Titanio Blanco', 30, NULL),
(34, 25, 'Titanio Blanco', 30, NULL),
(35, 26, 'Titanio Blanco', 30, NULL),
(36, 27, 'Titanio Blanco', 30, NULL),
(37, 28, 'Titanio Blanco', 30, NULL),
(38, 29, 'Titanio Blanco', 30, NULL),
(39, 30, 'Titanio Blanco', 30, ''),
(40, 31, 'Titanio Blanco', 30, NULL),
(41, 32, 'Titanio Blanco', 30, NULL),
(42, 33, 'Titanio Blanco', 30, NULL),
(43, 34, 'Titanio Blanco', 30, NULL),
(44, 35, 'Titanio Blanco', 30, NULL),
(45, 36, 'Titanio Blanco', 30, NULL),
(46, 37, 'Titanio Blanco', 30, NULL),
(47, 38, 'Titanio Blanco', 30, NULL),
(48, 39, 'Titanio Blanco', 30, 'https://www.altice.com.do/sites/default/files/styles/product/public/equipment_images/2024-11/iphone%2016%20Ultra%20White%20-%201.png?itok=d936xdWm'),
(49, 40, 'Titanio Blanco', 30, NULL),
(50, 41, 'Titanio Blanco', 30, NULL),
(51, 42, 'Titanio Blanco', 30, NULL),
(52, 43, 'Titanio Blanco', 30, NULL),
(53, 44, 'Titanio Blanco', 30, NULL),
(54, 45, 'Titanio Blanco', 30, NULL),
(55, 46, 'Titanio Blanco', 30, 'https://www.altice.com.do/sites/default/files/styles/product/public/equipment_images/2024-06/TELSGAL156-1.png?itok=J8Zcp9Rg'),
(56, 47, 'Titanio Blanco', 30, NULL),
(57, 48, 'Titanio Blanco', 30, NULL),
(58, 49, 'Titanio Blanco', 30, NULL),
(59, 50, 'Titanio Blanco', 30, NULL),
(60, 51, 'Titanio Blanco', 30, NULL),
(61, 52, 'Titanio Blanco', 30, NULL),
(62, 53, 'Titanio Blanco', 30, NULL),
(63, 54, 'Titanio Blanco', 30, NULL),
(64, 55, 'Titanio Blanco', 30, ''),
(65, 56, 'Titanio Blanco', 30, NULL),
(66, 57, 'Titanio Blanco', 30, NULL),
(67, 58, 'Titanio Blanco', 30, NULL),
(68, 59, 'Titanio Blanco', 30, NULL),
(69, 60, 'Titanio Blanco', 30, NULL),
(70, 61, 'Titanio Blanco', 30, NULL),
(71, 62, 'Titanio Blanco', 30, NULL),
(72, 63, 'Titanio Blanco', 30, NULL),
(73, 64, 'Titanio Blanco', 30, NULL),
(74, 65, 'Titanio Blanco', 30, NULL),
(75, 66, 'Titanio Blanco', 30, NULL),
(76, 67, 'Titanio Blanco', 30, NULL),
(77, 68, 'Titanio Blanco', 30, NULL),
(78, 69, 'Titanio Blanco', 30, NULL),
(79, 70, 'Titanio Blanco', 30, NULL),
(80, 40, 'Blanco', 30, NULL),
(81, 41, 'Negro', 30, NULL),
(82, 42, 'Blanco', 30, NULL),
(83, 43, 'Negro', 30, NULL),
(84, 44, 'Negro', 30, NULL),
(85, 45, 'Negro', 30, NULL),
(86, 46, 'Negro', 20, NULL),
(87, 47, 'Negro', 30, NULL),
(88, 48, 'Negro', 30, NULL),
(89, 49, 'Negro', 30, NULL),
(90, 50, 'Negro', 30, NULL),
(91, 51, 'Negro', 30, NULL),
(92, 52, 'Negro', 30, NULL),
(93, 53, 'Negro', 30, NULL),
(94, 54, 'Negro', 30, NULL),
(95, 55, 'Negro', 30, NULL),
(96, 56, 'Negro', 30, NULL),
(97, 57, 'Negro', 30, NULL),
(98, 58, 'Negro', 30, NULL),
(99, 59, 'Negro', 30, NULL),
(100, 60, 'Blanco', 30, NULL),
(101, 61, 'Negro', 30, NULL),
(102, 62, 'Negro', 30, NULL),
(103, 63, 'Negro', 30, NULL),
(104, 64, 'Negro', 30, NULL),
(105, 65, 'Negro', 30, NULL),
(106, 66, 'Negro', 30, NULL),
(107, 67, 'Negro', 30, NULL),
(108, 68, 'Negro', 30, NULL),
(109, 69, 'Negro', 30, NULL),
(110, 70, 'Negro', 30, NULL),
(111, 152, '', 30, NULL),
(112, 153, '', 30, NULL),
(113, 154, '', 30, NULL),
(114, 155, '', 30, NULL),
(115, 156, '', 30, NULL),
(116, 157, '', 30, NULL),
(117, 158, '', 30, NULL),
(118, 159, '', 30, NULL),
(119, 160, '', 30, NULL),
(120, 161, '', 30, NULL),
(121, 162, '', 30, NULL),
(122, 163, '', 30, NULL),
(123, 164, '', 30, NULL),
(124, 165, '', 30, NULL),
(125, 166, '', 30, NULL),
(126, 167, '', 30, NULL),
(127, 168, '', 30, NULL),
(128, 169, '', 30, NULL),
(129, 170, '', 30, NULL),
(130, 171, '', 30, NULL),
(131, 172, '', 30, NULL),
(132, 173, '', 30, 'http://localhost:3000/mobiles/product/46?color=Titanio%20Blanco'),
(133, 174, '', 30, NULL),
(134, 175, 'negro', 30, ''),
(135, 176, '', 30, NULL),
(136, 177, '', 30, NULL),
(137, 178, '', 30, NULL),
(138, 179, '', 30, NULL),
(139, 203, '', 30, NULL),
(140, 204, '', 30, NULL),
(141, 205, '', 30, NULL),
(142, 206, '', 30, NULL),
(143, 89, '', 30, NULL),
(144, 90, '', 30, NULL),
(145, 91, '', 30, NULL),
(146, 92, '', 30, NULL),
(147, 93, '', 30, NULL),
(148, 94, '', 30, NULL),
(149, 95, '', 30, NULL),
(150, 96, '', 30, NULL),
(151, 97, '', 30, NULL),
(152, 98, 'negro', 30, NULL),
(153, 99, '', 30, NULL),
(154, 100, '', 30, NULL),
(155, 120, '', 30, NULL),
(156, 121, '', 30, NULL),
(157, 122, '', 30, NULL),
(158, 123, '', 30, NULL),
(159, 124, '', 30, NULL),
(160, 125, '', 30, NULL),
(161, 126, '', 30, NULL),
(162, 127, '', 30, NULL),
(163, 128, '', 30, NULL),
(165, 130, '', 30, NULL),
(166, 131, '', 30, NULL),
(167, 132, '', 30, NULL),
(168, 184, '', 30, NULL),
(169, 72, '', 30, NULL),
(170, 73, '', 30, NULL),
(171, 74, '', 30, NULL),
(172, 75, '', 30, NULL),
(173, 76, '', 30, NULL),
(176, 79, '', 30, NULL),
(177, 80, '', 30, NULL),
(178, 81, 'negro vivo', 30, 'https://www.lapulga.com.do/f/7168592-1.jpg'),
(179, 82, '', 30, NULL),
(180, 83, '', 30, NULL),
(181, 84, '', 30, NULL),
(182, 85, '', 30, NULL),
(183, 86, '', 30, NULL),
(184, 87, '', 30, NULL),
(185, 88, '', 30, NULL),
(186, 102, '', 30, NULL),
(187, 103, '', 30, NULL),
(188, 104, '', 30, NULL),
(189, 105, '', 30, NULL),
(190, 106, '', 30, NULL),
(191, 107, '', 30, NULL),
(192, 108, '', 30, NULL),
(193, 109, '', 30, NULL),
(194, 110, '', 30, NULL),
(195, 111, '', 30, NULL),
(196, 112, '', 30, NULL),
(198, 114, '', 30, NULL),
(199, 115, '', 30, NULL),
(200, 116, '', 30, NULL),
(201, 117, '', 30, NULL),
(202, 118, '', 30, NULL),
(203, 119, '', 30, NULL),
(204, 133, '', 30, NULL),
(205, 134, '', 30, NULL),
(206, 135, '', 30, NULL),
(207, 136, '', 30, NULL),
(208, 137, '', 30, NULL),
(209, 138, '', 30, NULL),
(210, 139, '', 30, NULL),
(211, 140, '', 30, NULL),
(213, 142, '', 30, NULL),
(214, 143, '', 30, NULL),
(215, 144, '', 30, NULL),
(216, 145, '', 30, NULL),
(217, 146, '', 30, NULL),
(218, 147, '', 30, NULL),
(219, 148, '', 30, NULL),
(220, 149, '', 30, NULL),
(221, 150, '', 30, NULL),
(222, 151, '', 30, NULL),
(223, 180, '', 30, NULL),
(224, 181, '', 30, NULL),
(225, 182, '', 30, NULL),
(226, 183, '', 30, NULL),
(227, 185, '', 30, NULL),
(228, 186, '', 30, NULL),
(229, 187, '', 30, NULL),
(230, 188, '', 30, NULL),
(231, 189, '', 30, NULL),
(232, 190, '', 30, NULL),
(233, 191, '', 30, NULL),
(234, 192, '', 30, NULL),
(235, 193, '', 30, NULL),
(236, 194, '', 30, NULL),
(237, 195, '', 30, NULL),
(238, 196, '', 30, NULL),
(239, 197, '', 30, NULL),
(240, 198, '', 30, NULL),
(241, 199, '', 30, NULL),
(242, 200, '', 30, NULL),
(243, 201, '', 30, NULL),
(244, 202, '', 30, NULL),
(366, 71, '', 30, NULL);

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
-- AUTO_INCREMENT de la tabla `variantes`
--
ALTER TABLE `variantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

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
