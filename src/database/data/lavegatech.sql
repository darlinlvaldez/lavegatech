-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2025 a las 07:11:42
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
-- Base de datos: `lavegatech`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL,
  `rol` varchar(20) DEFAULT 'editor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `fecha_creacion`, `activo`, `rol`) VALUES
(1, 'darlin', '$2b$10$Ok1XvBwTGA.u.fapoo2L0ekADvsCq.a8Pkka6Pf3b.iFETqF.1Ia6', '2025-07-13 16:39:48', 1, 'superadmin'),
(18, 'nilrad', '$2b$10$.3xBqsxHSufQwlJ4L1rrBeOv11Ho.DSt/GI6IfFJFx8dxKyqwuW/i', '2025-08-01 18:59:16', 1, 'editor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacenamiento`
--

CREATE TABLE `almacenamiento` (
  `id` int(11) NOT NULL,
  `capacidad` varchar(20) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `almacenamiento`
--

INSERT INTO `almacenamiento` (`id`, `capacidad`, `tipo`) VALUES
(1, '64GB', 'NVMe'),
(2, '128GB', 'NVMe'),
(3, '256GB', 'NVMe'),
(4, '512GB', 'NVMe'),
(5, '1TB', 'NVMe'),
(6, '128GB', 'UFS 2.2'),
(7, '256GB', 'UFS 3.1'),
(8, '512GB', 'UFS 3.1'),
(9, '1TB', 'UFS 4.0'),
(12, '64GB', 'UFS 2.2'),
(13, '64GB', 'UFS 2.1'),
(14, '256GB', 'UFS 2.2'),
(15, '128GB', 'eMMC 5.1'),
(16, '64GB', 'eMMC 5.1'),
(17, '512GB', 'UFS 4.0'),
(18, '256GB', 'UFS 4.0'),
(19, '128GB', 'UFS 4.0'),
(20, '128GB', 'UFS 3.1'),
(21, '256GB', 'UFS 3.0'),
(22, '128GB', 'UFS 2.1'),
(31, '256GB', 'eMMC 5.1'),
(32, '64GB', 'eMMC 5.1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `baterias`
--

CREATE TABLE `baterias` (
  `id` int(11) NOT NULL,
  `capacidad` varchar(10) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `carga_rapida` varchar(20) DEFAULT NULL,
  `carga_inalambrica` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `baterias`
--

INSERT INTO `baterias` (`id`, `capacidad`, `tipo`, `carga_rapida`, `carga_inalambrica`) VALUES
(1, '2815 mAh', 'Li-Ion', '20W', 1),
(2, '3687 mAh', 'Li-Ion', '20W', 1),
(3, '3227 mAh', 'Li-Ion', '20W', 1),
(4, '3095 mAh', 'Li-Ion', '20W', 1),
(5, '4352 mAh', 'Li-Ion', '20W', 1),
(6, '3279 mAh', 'Li-Ion', '20W', 1),
(7, '4325 mAh', 'Li-Ion', '20W', 1),
(8, '3200 mAh', 'Li-Ion', '20W', 1),
(9, '4422 mAh', 'Li-Ion', '27W', 1),
(10, '3349 mAh', 'Li-Ion', '27W', 1),
(11, '4383 mAh', 'Li-Ion', '27W', 1),
(12, '3274 mAh', 'Li-Ion', '27W', 1),
(13, '3400 mAh', 'Li-Ion', '25W', 1),
(14, '4100 mAh', 'Li-Ion', '15W', 1),
(15, '4000 mAh', 'Li-Ion', '25W', 1),
(16, '4677 mAh', 'Li-Ion', '30W', 1),
(17, '4500 mAh', 'Li-Ion', '45W', 1),
(18, '5000 mAh', 'Li-Ion', '25W', 1),
(19, '5000 mAh', 'Li-Po', '33W', 0),
(20, '5100 mAh', 'Li-Po', '67W', 0),
(21, '4300 mAh', 'Li-Po', '120W', 0),
(22, '5000 mAh', 'Li-Po', '18W', 0),
(23, '6000 mAh', 'Li-Po', '18W', 0),
(24, '5000 mAh', 'Li-Po', '10W', 0),
(25, '5050 mAh', 'Li-Ion', '30W', 1),
(26, '9720 mAh', 'Li-Po', '30W', 1),
(27, '10758 mAh', 'Li-Po', '30W', 1),
(28, '7606 mAh', 'Li-Po', '20W', 0),
(29, '4850 mAh', 'Li-Po', '5W', 0),
(30, '6000 mAh', 'Li-Po', '10W', 0),
(31, '8000 mAh', 'Li-Po', '18W', 0),
(32, '5000 mAh', 'Li-Po', '5W', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camara`
--

CREATE TABLE `camara` (
  `id` int(11) NOT NULL,
  `principal` varchar(100) DEFAULT NULL,
  `selfie` varchar(100) DEFAULT NULL,
  `video` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camara`
--

INSERT INTO `camara` (`id`, `principal`, `selfie`, `video`) VALUES
(1, 'Dual 12MP (wide/ultrawide)', '12MP', '4K@60fps'),
(2, 'Triple 12MP (wide/ultrawide/telephoto)', '12MP', '4K@60fps'),
(3, 'Triple 12MP (wide/ultrawide/telephoto) con sensor mejorado', '12MP', '4K@60fps'),
(4, 'Triple 12MP (mejorada con sensor mayor)', '12MP con autofoco', '4K@60fps'),
(5, 'Triple 48MP+12MP+12MP', '12MP con autofoco', '4K@60fps'),
(6, 'Triple 48MP+12MP+12MP (nuevo sensor)', '12MP con autofoco mejorado', '4K@60fps'),
(7, 'Dual 48MP+12MP', '12MP con autofoco mejorado', '4K@60fps'),
(8, 'Triple 48MP+12MP+12MP (tele 5x)', '12MP con autofoco mejorado', '4K@120fps'),
(9, 'Triple 12MP+12MP+16MP', '10MP+8MP', '4K@60fps'),
(10, 'Quad 108MP+12MP+10MP+10MP', '12MP', '8K@30fps'),
(11, 'Triple 50MP+12MP+5MP', '13MP', '4K@30fps'),
(12, 'Triple 108MP+8MP+2MP', '16MP', '1080p@30fps'),
(13, 'Triple 200MP+8MP+2MP', '16MP', '4K@30fps'),
(14, 'Triple 200MP+13MP+5MP', '32MP', '4K@60fps'),
(15, 'Triple 50MP+12MP+48MP', '10.8MP', '4K@60fps'),
(16, 'Triple 50MP+48MP+48MP', '10.5MP', '4K@120fps'),
(17, 'Dual 13MP+AI', '8MP', '1080p@30fps'),
(18, 'Dual 50MP+AI', '8MP', '1080p@30fps'),
(19, 'Single 8MP', '5MP', '720p@30fps'),
(20, 'Dual 12MP+10MP', '12MP', '4K@60fps'),
(21, 'Single 12MP', '12MP', '4K@60fps'),
(22, 'Single 2MP', '2MP', '720p@30fps'),
(23, 'Single 8MP', '5MP', '1080p@30fps'),
(24, 'Single 5MP', '2MP', '720p@30fps'),
(25, 'Single 13MP', '8MP', '1080p@30fps');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `fecha_agregado` timestamp NOT NULL DEFAULT current_timestamp(),
  `variante_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`) VALUES
(1, 'moviles'),
(2, 'smarttv'),
(3, 'laptops'),
(4, 'consolas'),
(5, 'tablets'),
(6, 'otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades_envio`
--

CREATE TABLE `ciudades_envio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `costo_envio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudades_envio`
--

INSERT INTO `ciudades_envio` (`id`, `nombre`, `costo_envio`) VALUES
(1, 'La Vega', 50.00),
(2, 'Santiago', 150.00),
(3, 'Santo Domingo', 250.00),
(4, 'Distrito Nacional', 250.00),
(5, 'San Cristóbal', 220.00),
(6, 'Monseñor Nouel', 100.00),
(7, 'Duarte', 180.00),
(8, 'Espaillat', 160.00),
(9, 'Puerto Plata', 200.00),
(10, 'Valverde', 170.00),
(11, 'María Trinidad Sánchez', 220.00),
(12, 'Samaná', 280.00),
(13, 'Hato Mayor', 300.00),
(14, 'El Seibo', 320.00),
(15, 'La Altagracia', 350.00),
(16, 'San Pedro de Macorís', 280.00),
(17, 'Monte Plata', 260.00),
(18, 'San José de Ocoa', 200.00),
(19, 'Peravia', 230.00),
(20, 'Azua', 250.00),
(21, 'Barahona', 300.00),
(22, 'Bahoruco', 280.00),
(23, 'Independencia', 320.00),
(24, 'Pedernales', 350.00),
(25, 'Elías Piña', 280.00),
(26, 'Dajabón', 250.00),
(27, 'Montecristi', 270.00),
(28, 'Santiago Rodríguez', 200.00),
(29, 'San Juan', 230.00),
(30, 'La Romana', 300.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasificacion`
--

CREATE TABLE `clasificacion` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `calificacion` tinyint(3) UNSIGNED DEFAULT NULL COMMENT 'Valor del 1 al 5',
  `comentario` mediumtext DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conectividad`
--

CREATE TABLE `conectividad` (
  `id` int(11) NOT NULL,
  `red` varchar(50) DEFAULT NULL,
  `wifi` varchar(50) DEFAULT NULL,
  `bluetooth` varchar(20) DEFAULT NULL,
  `nfc` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conectividad`
--

INSERT INTO `conectividad` (`id`, `red`, `wifi`, `bluetooth`, `nfc`) VALUES
(1, '5G', 'Wi-Fi 6 (802.11ax)', '5.0', 1),
(2, '5G', 'Wi-Fi 6E (802.11ax)', '5.3', 1),
(3, '5G+', 'Wi-Fi 6E', '5.4', 1),
(4, '4G', 'Wi-Fi 6', '5.0', 1),
(5, '5G', 'WI-FI 6 (802.11ax)', '5.3', 1),
(6, 'Wi-Fi Only', 'Wi-Fi 6E', '5.3', 0),
(7, '5G', 'Wi-Fi 6E', '5.3', 1),
(8, 'Wi-Fi Only', 'Wi-Fi 5', '5.0', 0),
(9, 'LTE', 'Wi-Fi 5', '5.0', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cpu`
--

CREATE TABLE `cpu` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `nucleos` varchar(20) DEFAULT NULL,
  `velocidad` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `cpu`
--

INSERT INTO `cpu` (`id`, `nombre`, `nucleos`, `velocidad`) VALUES
(1, 'Apple A14 Bionic', '6 (2+4)', '3.1 GHz'),
(2, 'Apple A15 Bionic', '6 (2+4)', '3.2 GHz'),
(3, 'Apple A16 Bionic', '6 (2+4)', '3.46 GHz'),
(4, 'Apple A17 Pro', '6 (2+4)', '3.78 GHz'),
(5, 'Apple A18 Pro', '6 (2+4)', '4.0 GHz'),
(6, 'Snapdragon 855', '8 (1+3+4)', '2.84 GHz'),
(7, 'Exynos 9820', '8 (2+2+4)', '2.7 GHz'),
(8, 'Snapdragon 8 Gen 2', '8 (1+4+3)', '3.2 GHz'),
(9, 'Snapdragon 685', '8 (2+6)', '2.8 GHz'),
(10, 'Dimensity 6080', '8 (2+6)', '2.4 GHz'),
(11, 'Dimensity 7200-Ultra', '8 (2+6)', '2.8 GHz'),
(12, 'Snapdragon 7s Gen 2', '8 (4+4)', '2.4 GHz'),
(13, 'Google Tensor G2', '8 (2+2+4)', '2.85 GHz'),
(14, 'Google Tensor G3', '9 (1+4+4)', '3.0 GHz'),
(15, 'Unisoc T606', '8 (2+6)', '1.6 GHz'),
(16, 'Unisoc SC9863A', '8 (4+4)', '1.6 GHz'),
(17, 'Dimensity 6100+', '8 (2+6)', '2.2 GHz'),
(18, 'Unisoc T606', '8 (2+6)', '1.6 GHz'),
(19, 'Apple M2', '8 (4+4)', '3.5 GHz'),
(20, 'Apple M4', '10 (4+6)', '4.0 GHz'),
(21, 'MediaTek MT8169A', '4 (4+0)', '2.0 GHz'),
(22, 'Unisoc T606', '8 (2+6)', '1.6 GHz'),
(23, 'Snapdragon 680', '8 (4+4)', '2.4 GHz'),
(24, 'MediaTek MT8768', '4 (4+0)', '2.0 GHz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedido`
--

CREATE TABLE `detalles_pedido` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `nombre_producto` varchar(150) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `impuesto` decimal(10,2) DEFAULT 0.00,
  `descuento` decimal(10,2) DEFAULT 0.00,
  `subtotal` decimal(10,2) NOT NULL,
  `colorSeleccionado` varchar(25) DEFAULT NULL,
  `ram` varchar(20) DEFAULT NULL,
  `almacenamiento` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_pedido`
--

INSERT INTO `detalles_pedido` (`id`, `pedido_id`, `producto_id`, `nombre_producto`, `cantidad`, `precio_unitario`, `impuesto`, `descuento`, `subtotal`, `colorSeleccionado`, `ram`, `almacenamiento`) VALUES
(226, 212, 1, 'iPhone 12', 1, 15995.00, 18.00, 20.00, 15099.28, 'blanco', '4GB', '64GB'),
(227, 213, 207, 'Monitor Samsung G5 ODYSSEY 32 Pulgada 165HZ', 1, 22995.00, 18.00, 0.00, 27134.10, 'negro', NULL, NULL),
(228, 214, 207, 'Monitor Samsung G5 ODYSSEY 32 Pulgada 165HZ', 1, 22995.00, 18.00, 0.00, 27134.10, 'negro', NULL, NULL),
(229, 215, 108, 'SAMSUNG GALAXY TAB A9+', 1, 11495.00, 18.00, 0.00, 13564.10, 'gris', '4GB', '64GB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dimensionespeso`
--

CREATE TABLE `dimensionespeso` (
  `id` int(11) NOT NULL,
  `altura` varchar(10) DEFAULT NULL,
  `anchura` varchar(10) DEFAULT NULL,
  `grosor` varchar(10) DEFAULT NULL,
  `peso` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dimensionespeso`
--

INSERT INTO `dimensionespeso` (`id`, `altura`, `anchura`, `grosor`, `peso`) VALUES
(1, '146.7 mm', '71.5 mm', '7.4 mm', '164 g'),
(2, '146.7 mm', '71.5 mm', '7.4 mm', '189 g'),
(3, '160.8 mm', '78.1 mm', '7.4 mm', '228 g'),
(4, '146.7 mm', '71.5 mm', '7.65 mm', '174 g'),
(5, '146.7 mm', '71.5 mm', '7.65 mm', '203 g'),
(6, '160.8 mm', '78.1 mm', '7.65 mm', '238 g'),
(7, '146.7 mm', '71.5 mm', '7.80 mm', '172 g'),
(8, '160.8 mm', '78.1 mm', '7.80 mm', '203 g'),
(9, '147.5 mm', '71.5 mm', '7.85 mm', '206 g'),
(10, '160.7 mm', '77.6 mm', '7.85 mm', '240 g'),
(11, '147.6 mm', '71.6 mm', '7.80 mm', '171 g'),
(12, '160.9 mm', '77.8 mm', '7.80 mm', '201 g'),
(13, '146.6 mm', '70.6 mm', '8.25 mm', '187 g'),
(14, '159.9 mm', '76.7 mm', '8.25 mm', '221 g'),
(15, '146.7 mm', '70.6 mm', '7.8 mm', '173 g'),
(16, '147.0 mm', '71.5 mm', '7.8 mm', '175 g'),
(17, '157.6 mm', '74.1 mm', '7.8 mm', '175 g'),
(18, '160.9 mm', '77.8 mm', '8.1 mm', '225 g'),
(19, '157.6 mm', '74.1 mm', '7.8 mm', '175 g'),
(20, '280.6 mm', '214.9 mm', '5.9 mm', '682 g'),
(21, '280.6 mm', '214.9 mm', '5.1 mm', '579 g'),
(22, '248.6 mm', '179.5 mm', '7.0 mm', '477 g'),
(23, '202 mm', '137 mm', '9.7 mm', '355 g'),
(24, '208 mm', '123 mm', '8.9 mm', '380 g'),
(25, '255 mm', '167 mm', '7.4 mm', '478 g'),
(26, '245 mm', '160 mm', '9.0 mm', '450 g');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envios`
--

CREATE TABLE `envios` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `estado_envio` varchar(50) DEFAULT 'pendiente',
  `costo_envio` decimal(10,2) DEFAULT 0.00,
  `fecha_envio` datetime DEFAULT NULL,
  `fecha_entregado` datetime DEFAULT NULL,
  `fecha_cancelado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `envios`
--

INSERT INTO `envios` (`id`, `pedido_id`, `estado_envio`, `costo_envio`, `fecha_envio`, `fecha_entregado`, `fecha_cancelado`) VALUES
(48, 212, 'pendiente', 50.00, NULL, NULL, NULL),
(49, 213, 'pendiente', 50.00, NULL, NULL, NULL),
(50, 214, 'entregado', 50.00, NULL, '2025-10-28 00:44:05', NULL),
(51, 215, 'enviado', 50.00, '2025-10-28 00:31:45', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fav`
--

CREATE TABLE `fav` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `fecha_agregado` timestamp NOT NULL DEFAULT current_timestamp(),
  `variante_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gpu`
--

CREATE TABLE `gpu` (
  `id` int(11) NOT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `nucleos` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `gpu`
--

INSERT INTO `gpu` (`id`, `modelo`, `nucleos`) VALUES
(1, 'Apple GPU (4-core graphics)', '4'),
(2, 'Apple GPU (5-core graphics)', '5'),
(3, 'Apple GPU (6-core graphics)', '6'),
(4, 'Adreno 640', '0'),
(5, 'Mali-G76 MP12', '12'),
(6, 'Adreno 740', '0'),
(7, 'Adreno 610', '0'),
(8, 'Mali-G57 MC2', '2'),
(9, 'Mali-G610 MC4', '4'),
(10, 'Adreno 710', '0'),
(11, 'ARM Mali-G57 MP1', '1'),
(12, 'PowerVR GE8322', '0'),
(13, 'ARM Mali-G57 MP2', '2'),
(14, 'ARM Mali-G57 MP1', '1'),
(15, 'Apple GPU (10-core)', '10'),
(16, 'Apple GPU (10-core)', '10'),
(17, 'PowerVR GE8300', '0'),
(18, 'PowerVR GE8320', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca_categoria`
--

CREATE TABLE `marca_categoria` (
  `marca_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(18, 6),
(19, 1),
(19, 6),
(20, 1),
(34, 2),
(34, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moviles`
--

CREATE TABLE `moviles` (
  `id` int(11) NOT NULL,
  `cpu_id` int(11) DEFAULT NULL,
  `camara_id` int(11) DEFAULT NULL,
  `bateria_id` int(11) DEFAULT NULL,
  `gpu_id` int(11) DEFAULT NULL,
  `conectividad_id` int(11) DEFAULT NULL,
  `dimensionespeso_id` int(11) DEFAULT NULL,
  `pantalla_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `moviles`
--

INSERT INTO `moviles` (`id`, `cpu_id`, `camara_id`, `bateria_id`, `gpu_id`, `conectividad_id`, `dimensionespeso_id`, `pantalla_id`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1),
(2, 1, 2, 3, 1, 1, 2, NULL),
(3, 1, 3, 2, 1, 1, 3, NULL),
(4, 2, 1, 4, 2, 1, 4, 1),
(5, 2, 4, 4, 2, 1, 5, NULL),
(6, 2, 4, 5, 2, 1, 6, NULL),
(7, 2, 1, 6, 2, 1, 7, 1),
(8, 2, 1, 7, 2, 5, 8, NULL),
(9, 3, NULL, NULL, 2, NULL, NULL, NULL),
(10, 3, 5, 9, 2, 5, 10, NULL),
(11, 2, 7, 10, 2, 5, 11, NULL),
(12, 2, 7, 11, 2, 2, 12, NULL),
(14, 4, 8, 9, 3, 2, 14, NULL),
(15, 5, 7, 13, 2, 3, 15, NULL),
(16, 2, 7, 14, 2, 5, 16, NULL),
(17, 5, 7, 15, 2, 3, 17, NULL),
(18, 5, 8, 16, 3, 4, 18, NULL),
(19, 7, 9, 2, 5, 4, 19, NULL),
(20, 7, 9, 3, 5, 4, 3, NULL),
(21, 6, 9, 5, 4, 1, 6, NULL),
(22, 6, 9, 7, 4, 1, 8, NULL),
(23, 8, 10, 17, 6, 2, 12, NULL),
(24, 8, 10, 17, 6, 3, 18, NULL),
(25, 6, 11, 14, 4, 4, 15, NULL),
(26, 6, 11, 18, 4, 1, 16, NULL),
(27, 6, 11, 18, 4, 1, 17, NULL),
(28, 10, 12, 19, 8, 1, 15, NULL),
(29, 12, 13, 20, 10, 1, 16, NULL),
(30, 11, 13, 19, 9, 1, 15, NULL),
(31, 9, 12, 19, 7, 4, 13, NULL),
(32, 10, 12, 19, 8, 4, 15, NULL),
(33, 10, 12, 19, 8, 1, 15, NULL),
(34, 11, 13, 20, 9, 4, 16, NULL),
(35, 11, 13, 20, 9, 1, 16, NULL),
(36, 12, 14, 21, 10, 1, 17, NULL),
(37, 13, 15, 15, 3, 2, 13, NULL),
(38, 14, 16, 16, 3, 3, 14, NULL),
(39, 15, 17, 22, 11, 4, 15, NULL),
(40, 15, 17, 22, 11, 4, 15, NULL),
(41, 15, 18, 23, 11, 4, 16, NULL),
(42, 16, 19, 22, 12, 4, 17, NULL),
(43, 16, 19, 22, 12, 4, 17, NULL),
(44, 22, 18, 32, 14, 4, 16, NULL),
(45, 17, NULL, NULL, 13, NULL, NULL, NULL),
(83, 24, 20, 32, 16, 4, 26, NULL),
(84, 23, 20, 31, 7, 4, 18, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `metodo_pago` varchar(50) NOT NULL,
  `estado_pago` varchar(50) DEFAULT 'pendiente',
  `paypal_order_id` varchar(100) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `pedido_id`, `metodo_pago`, `estado_pago`, `paypal_order_id`, `fecha_pago`) VALUES
(125, 212, 'paypal', 'completado', '2GJ29594WW234741X', '2025-10-27 21:22:26'),
(126, 213, 'paypal', 'completado', '81662119T1211683V', '2025-10-27 21:43:03'),
(127, 214, 'paypal', 'completado', '7FV220010A4550834', '2025-10-27 21:45:16'),
(128, 215, 'paypal', 'completado', '18L6783492055283E', '2025-10-27 23:37:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pantalla`
--

CREATE TABLE `pantalla` (
  `id` int(11) NOT NULL,
  `tamaño` varchar(20) DEFAULT NULL,
  `resolucion` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `frecuencia` varchar(20) DEFAULT NULL,
  `proteccion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pantalla`
--

INSERT INTO `pantalla` (`id`, `tamaño`, `resolucion`, `tipo`, `frecuencia`, `proteccion`) VALUES
(1, '6.1\"', '2532 x 1170 píxeles', 'OLED Super Retina XDR', '60 Hz', 'Ceramic Shield');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `direccion` mediumtext NOT NULL,
  `distrito` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pendiente',
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `ciudad_envio_id` int(11) DEFAULT NULL,
  `envio_diferente` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `usuario_id`, `nombre`, `apellido`, `email`, `direccion`, `distrito`, `telefono`, `total`, `status`, `fecha_creacion`, `ciudad_envio_id`, `envio_diferente`) VALUES
(212, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295542244', 15149.28, 'pagado', '2025-10-27 21:22:26', 1, 0),
(213, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295542244', 27184.10, 'pagado', '2025-10-27 21:43:03', 1, 0),
(214, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295542244', 27184.10, 'pagado', '2025-10-27 21:45:16', 1, 0),
(215, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295542244', 13614.10, 'pagado', '2025-10-27 23:37:32', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `movil_id` int(11) DEFAULT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `precio` decimal(10,2) DEFAULT 0.00,
  `categoria_id` int(11) DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT 0.00,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_publicacion` datetime DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `ram_id` int(11) DEFAULT NULL,
  `almacenamiento_id` int(11) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 0,
  `impuesto` decimal(5,2) DEFAULT 0.18
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `movil_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `descuento`, `fecha`, `fecha_publicacion`, `marca_id`, `ram_id`, `almacenamiento_id`, `activo`, `impuesto`) VALUES
(1, 1, 'iPhone 12', 'Experimenta el rendimiento y la elegancia del iPhone 12 de 64GB, un dispositivo que combina potencia, diseño y eficiencia. Equipado con 4GB de RAM, ofrece una experiencia fluida tanto en multitarea como en juegos y aplicaciones exigentes.\n\nEste equipo está en condición Triple A (AAA), lo que significa que ha sido cuidadosamente reacondicionado para lucir y funcionar como nuevo. Ideal para quienes desean la calidad de Apple a un precio más accesible.', 15995.00, 1, 20.00, '2025-08-05 23:06:00', '2025-10-23 00:39:00', 1, 1, 1, 1, 18.00),
(2, 1, 'iPhone 12', 's', 17995.00, 1, 10.00, '2025-08-02 00:00:00', NULL, 1, 1, 2, 1, 18.00),
(3, 1, 'iPhone 12', 's', 19495.00, 1, 0.00, '2025-08-02 04:00:00', NULL, 1, 1, 3, 1, 18.00),
(4, 2, 'iPhone 12 Pro', 's', 21995.00, 1, 0.00, '2025-08-02 00:00:00', NULL, 1, 2, 2, 1, 18.00),
(5, 2, 'iPhone 12 Pro', 's', 23995.00, 1, 0.00, '2025-08-01 20:00:00', NULL, 1, 2, 3, 1, 18.00),
(6, 3, 'iPhone 12 Pro Max', 's', 27495.00, 1, 0.00, '2025-08-01 20:00:00', NULL, 1, 2, 2, 1, 18.00),
(7, 3, 'iPhone 12 Pro Max', 's', 28995.00, 1, 0.00, '2025-05-31 16:00:00', NULL, 1, 2, 3, 1, 18.00),
(8, 3, 'iPhone 12 Pro Max', 's', 29995.00, 1, 0.00, '2025-05-01 16:00:00', NULL, 1, 2, 4, 1, 18.00),
(9, 4, 'iPhone 13', 'S', 23995.00, 1, 0.00, '2025-05-01 20:00:00', NULL, 1, 1, 2, 1, 18.00),
(10, 4, 'iPhone 13', 'S', 25495.00, 1, 0.00, '2025-05-01 16:00:00', NULL, 1, 1, 3, 1, 18.00),
(11, 5, 'iPhone 13 Pro', 'S', 28495.00, 1, 0.00, '2025-05-14 16:00:00', NULL, 1, 2, 2, 1, 18.00),
(12, 5, 'iPhone 13 Pro', 'S', 30995.00, 1, 0.00, '2025-03-11 16:00:00', NULL, 1, 2, 3, 1, 18.00),
(13, 6, 'iPhone 13 Pro Max', 'S', 32995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 2, 2, 1, 18.00),
(14, 6, 'iPhone 13 Pro Max', 'S', 35995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 2, 3, 1, 18.00),
(15, 6, 'iPhone 13 Pro Max', 'S', 37495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 2, 4, 1, 18.00),
(16, 7, 'iPhone 14', 'S', 26495.00, 1, 0.00, '2023-01-01 20:00:00', NULL, 1, 1, 2, 1, 18.00),
(17, 7, 'iPhone 14 ', 'S', 27995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 1, 3, 1, 18.00),
(18, 8, 'iPhone 14 Plus', 'S', 28995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 1, 2, 1, 18.00),
(19, 8, 'iPhone 14 Plus', 'S', 30995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 1, 3, 1, 18.00),
(20, 9, 'iPhone 14 Pro ', 'S', 34495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 2, 1, 18.00),
(21, 9, 'iPhone 14 Pro', 'S', 36495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 3, 1, 18.00),
(22, 9, 'iPhone 14 Pro', 'S', 38995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 4, 1, 18.00),
(23, 10, 'iPhone 14 Pro Max', 'S', 41495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 2, 1, 18.00),
(24, 10, 'iPhone 14 Pro Max', 'S', 43995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 3, 1, 18.00),
(25, 10, 'iPhone 14 Pro Max', 'S', 46495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 1, 9, 4, 1, 18.00),
(26, 11, 'iPhone 15', 'S', 35995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 2, 1, 18.00),
(27, 11, 'iPhone 15', 'S', 37995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 1, 9, 3, 1, 18.00),
(28, 12, 'iPhone 15 Plus', 'S', 38995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 2, 1, 18.00),
(29, 12, 'iPhone 15 Plus', 'S', 42995.00, 1, 0.00, '2023-01-01 20:00:00', NULL, 1, 9, 4, 1, 18.00),
(32, 14, 'iPhone 15 Pro Max', 'S', 54995.00, 1, 0.00, '2023-01-01 20:00:00', NULL, 1, 3, 3, 1, 18.00),
(33, 14, 'iPhone 15 Pro Max', 'S', 57995.00, 1, 0.00, '2023-01-01 20:00:00', NULL, 1, 3, 4, 1, 18.00),
(34, 14, 'iPhone 15 Pro Max', 'S', 61995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 1, 5, 5, 1, 18.00),
(35, 15, 'iPhone 16', 'S', 52495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 15, 4, 1, 18.00),
(36, 16, 'iPhone 16E', 'S', 44995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 14, 3, 1, 18.00),
(37, 17, 'iPhone 16 Plus', 'S', 54995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 15, 2, 1, 18.00),
(38, 18, 'iPhone 16 Pro Max', 's', 74995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 14, 3, 1, 18.00),
(39, 18, 'iPhone 16 Pro Max', 's', 84995.00, 1, 0.00, '2025-03-01 16:00:00', '2025-10-23 00:02:00', 1, 14, 4, 1, 18.00),
(40, 19, 'SAMSUNG GALAXY S10 PLUS', 'S', 9995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 4, 22, 1, 18.00),
(41, 20, 'SAMSUNG GALAXY NOTE 10 PLUS', 'S', 13995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 6, 21, 1, 18.00),
(42, 21, 'SAMSUNG GALAXY NOTE 20 ULTRA', 'S', 17995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 5, 20, 1, 18.00),
(43, 22, 'SAMSUNG GALAXY S21 ULTRA', 'S', 17995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 5, 20, 1, 18.00),
(44, 23, 'SAMSUNG GALAXY S23 ULTRA', 'S', 39495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 13, 18, 1, 18.00),
(45, 24, 'SAMSUNG GALAXY S25 ULTRA', 'S', 84995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 13, 17, 1, 18.00),
(46, 25, 'SAMSUNG GALAXY A05', 'S', 7995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 2, 15, 1, 18.00),
(47, 25, 'SAMSUNG GALAXY A05', 'S', 6995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 1, 16, 1, 18.00),
(48, 26, 'SAMSUNG GALAXY A15', 'S', 8995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 2, 15, 1, 18.00),
(49, 27, 'SAMSUNG GALAXY A25 5G', 'S', 12995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 4, 14, 1, 18.00),
(50, 28, 'XIAOMI REDMI NOTE 13 5G', 's', 10995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 7, 1, 18.00),
(51, 29, 'XIAOMI REDMI NOTE 13 PRO PLUS 5G ', 's', 20995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 5, 7, 1, 18.00),
(52, 30, 'XIAOMI POCO X6 PRO', 's', 17495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 7, 1, 18.00),
(53, 31, 'XIAOMI REDMI 14C', 's', 7495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 1, 15, 1, 18.00),
(54, 32, 'XIAOMI REDMI NOTE 14', 's', 10495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 20, 1, 18.00),
(55, 32, 'XIAOMI REDMI NOTE 14', 's', 11995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 7, 1, 18.00),
(56, 33, 'XIAOMI REDMI NOTE 14 5G ', 's', 13995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 5, 7, 1, 18.00),
(57, 34, 'XIAOMI REDMI NOTE 14 PRO ', 's', 15995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 7, 1, 18.00),
(58, 35, 'XIAOMI REDMI NOTE 14 PRO 5G', 's', 17995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 5, 7, 1, 18.00),
(59, 36, 'XIAOMI REDMI NOTE 14 PRO PLUS 5G', 's', 22995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 6, 14, 1, 18.00),
(60, 37, 'Google Pixel 7 Pro', 's', 17495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 4, 13, 20, 1, 18.00),
(61, 38, 'Google Pixel 8 Pro', 's', 24995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 4, 13, 20, 1, 18.00),
(62, 39, 'INFINIX SMART 8', 's', 4995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 19, 1, 15, 1, 18.00),
(63, 40, 'INFINIX SMART 9', 's', 5995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 19, 1, 15, 1, 18.00),
(64, 41, 'INFINIX HOT 50I', 'S', 7495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 19, 2, 31, 1, 18.00),
(65, 42, 'ZTE A35 CORE', 's', 3995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 20, 1, 32, 1, 18.00),
(67, 44, 'ZTE BLADE V60', 's', 7495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 20, 2, 14, 1, 18.00),
(68, 45, 'ZTE NUBIA NEO 2 5G', 's', 11995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 20, 4, 14, 1, 18.00),
(69, 84, 'MOTOROLA E14', 'S', 4995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 10, 18, 16, 1, 18.00),
(70, 84, 'MOTOROLA G04', 's', 5995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, NULL, 1, 15, 1, 18.00),
(71, NULL, 'IPAD PRO 12.9-INCH 6TA GEN 128GB', 's', 45995.00, 5, 0.00, '2023-01-01 08:00:00', '2025-10-24 21:31:00', 1, NULL, NULL, 1, 18.00),
(72, NULL, 'IPAD PRO 12.9 6TA GEN 256GB', '', 47495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(73, NULL, 'IPAD PRO M2 512GB 12.9 6TA GEN ', '', 49995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(74, NULL, 'IPAD PRO 13 PULGADAS M4 512GB', '', 57995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(75, NULL, 'IPAD PRO 13 PULGADAS M4 256GB', '', 54995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(76, NULL, 'IPAD 10 GEN 64GB', '', 23495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(79, NULL, 'AMAZON FIRE 8 32GB', '', 2995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 5, NULL, NULL, 1, 18.00),
(80, NULL, 'AMAZON FIRE 8 64GB', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 5, NULL, NULL, 1, 18.00),
(81, NULL, 'ASTRO 8R 32G', '', 3495.00, 5, 0.00, '2025-03-30 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(82, NULL, 'XIAOMI REDMI PAD SE 8.7', 's', 8495.00, 5, 0.00, '2023-01-01 12:00:00', '2025-10-24 20:46:00', 3, 1, 15, 1, 18.00),
(83, NULL, 'VORTEX T10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 6, NULL, NULL, 1, 18.00),
(84, NULL, 'HOTPEPPER 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(85, NULL, 'X10MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(86, NULL, 'VORTEX T10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 6, NULL, NULL, 1, 18.00),
(87, NULL, 'SKYPAD 10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 7, NULL, NULL, 1, 18.00),
(88, NULL, 'SKYPAD 10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 7, NULL, NULL, 1, 18.00),
(89, NULL, 'Macbook Pro 13-Inch 2020 i5-8ram 512GB', '', 31995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(91, NULL, 'Macbook Pro 16-Inch 2019 i7-16ram 512GB', '', 34995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(92, NULL, 'Macbook Pro 16-Inch 2019 i9-32Ram 512GB', '', 39995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(93, NULL, 'Macbook Pro 16-Inch 2019 i9-16Ram 1TB', '', 41995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(94, NULL, 'Macbook Air M1 8Ram 256GB ', '', 44995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(96, NULL, 'Macbook Air 15-Inch M2 256GB ', '', 54995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(97, NULL, 'HP Victus i5 12GEN 3050TI 8+512GB ', '', 33495.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 8, NULL, NULL, 1, 18.00),
(98, NULL, 'Asus Tuf Gaming F15 i5-12GEN 16Ram-3050 512GB', 'waos', 39995.00, 3, 0.00, '2025-06-23 16:00:00', NULL, 9, NULL, NULL, 1, 18.00),
(100, NULL, 'HP i5 13GEN 8+256GB ', '', 24995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 8, NULL, NULL, 1, 18.00),
(108, NULL, 'SAMSUNG GALAXY TAB A9+', 's', 11495.00, 5, 0.00, '2023-01-01 12:00:00', '2025-10-24 20:38:00', 2, 1, 12, 1, 18.00),
(109, NULL, 'SAMSUNG GALAXY TAB A9+ 128GB', 's', 13495.00, 5, 0.00, '2023-01-01 12:00:00', NULL, 2, 1, 6, 1, 18.00),
(121, NULL, 'Macbook Air 13-Inch 2020 i3 8+256GB ', '', 29495.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(122, NULL, 'Macbook Pro 16-Inch 2019 i7 16+512GB ', '', 34995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(126, NULL, 'Macbook Pro M2 2022 8+256GB', '', 51995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(131, NULL, 'HP i5-13Gen-8Ram HP 256GB ', '', 24995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 8, NULL, NULL, 1, 18.00),
(132, NULL, 'Lenovo i3-12GEN 8+256GB ', '', 21495.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 10, NULL, NULL, 1, 18.00),
(133, NULL, 'SAMSUNG WATCH 6 CLASSIC', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(134, NULL, 'SAMSUNG WATCH 6', '', 11995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(135, NULL, 'SAMSUNG WATCH 7', '', 15995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(136, NULL, 'Samsung Galaxy Buds 3', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(137, NULL, 'Samsung Galaxy Buds 2', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(138, NULL, 'BEATS SOLO 4', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(139, NULL, 'BEATS STUDIO PRO', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(140, NULL, 'XIAOMI REDMI BUDS 4 ACTIVE', '', 1995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 3, NULL, NULL, 1, 18.00),
(142, NULL, 'AIRPODS GEN 2', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(143, NULL, 'AIRPODS GEN 3', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(144, NULL, 'AIRPODS GEN 4 CANCELACION DE RUIDO', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(145, NULL, 'AIRPODS PRO 2 TIPO C OPEN BOX', '', 10995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(146, NULL, 'RAZER BARRACUDA X', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(147, NULL, 'APPLE WATCH SE 2', '', 10495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(148, NULL, 'APPLE WATCH SERIE 7', '', 12994.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(149, NULL, 'APPLE WATCH SERIE 8', '', 14495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(150, NULL, 'APPLE WATCH SERIE ULTRA', '', 24995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(151, NULL, 'APPLE WATCH SERIE 9', '', 16495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(152, NULL, 'Smart TV Onn 32 Pulgadas', '', 9995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 14, NULL, NULL, 1, 18.00),
(153, NULL, 'Smart TV Onn 43 Pulgadas', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 14, NULL, NULL, 1, 18.00),
(154, NULL, 'Smart TV Onn 65 Pulgadas', '', 28995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 14, NULL, NULL, 1, 18.00),
(155, NULL, 'Smart TV Onn 75 Pulgadas', '', 36995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 14, NULL, NULL, 1, 18.00),
(156, NULL, 'Smart TV Phillips 32 Pulgadas', '', 9995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(157, NULL, 'Smart TV TCL Androide 32 Pulgadas', '', 10995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(158, NULL, 'Smart TV TCL Roku 43 Pulgadas', '', 16495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(159, NULL, 'Smart TV TCL Roku 55 Pulgadas', '', 23995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(160, NULL, 'Smart TV TCL Google 55 Pulgadas', '', 24995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(161, NULL, 'Smart TV TCL Fire TV 58 Pulgadas', '', 27495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(162, NULL, 'Smart TV TCL Roku 65 Pulgadas', '', 30995.00, 2, 0.00, '2025-03-14 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(163, NULL, 'Smart TV TCL Google 65 Pulgadas', '', 34995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(164, NULL, 'Smart TV TCL Roku 85 Pulgadas', '', 74995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(165, NULL, 'Smart TV WESTINGHOUSE ROKU 43 Pulgadas', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 13, NULL, NULL, 1, 18.00),
(166, NULL, 'Smart TV WESTINGHOUSE ROKU 65 Pulgadas', '', 28495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 13, NULL, NULL, 1, 18.00),
(167, NULL, 'Smart TV HISENSE GOOGLE 43 Pulgadas', '', 16995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(168, NULL, 'Smart TV HISENSE GOOGLE QLED D5 43 Pulgadas', '', 18995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(169, NULL, 'Smart TV HISENSE A7 Google 50 Pulgadas', '', 21495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(170, NULL, 'Smart TV HISENSE QLED QD5 2024 55 Pulgadas', '', 27495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(171, NULL, 'Smart TV HISENSE QLED D5 GOOGLE 65 Pulgadas', '', 37495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(172, NULL, 'Smart TV HISENSE S7N CANVAS QLED GOOGLE 65 Pulgadas', 'siuuuusaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 62495.00, 2, 0.00, '2023-01-01 12:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(173, NULL, 'Smart TV HISENSE A7 Google 75 Pulgadas', '', 42995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(174, NULL, 'Smart TV HISENSE QLED QD6 GOOGLE 75 Pulgadas', '', 49995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(175, NULL, 'Smart TV HISENSE A7 Google 85 Pulgadas', '', 82995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(176, NULL, 'Smart TV SAMSUNG SERIE 7 2024 55 Pulgadas', '', 28995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(177, NULL, 'Smart TV SAMSUNG QLED Q6 55 Pulgadas', '', 34995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(178, NULL, 'Smart TV SAMSUNG DU7200 2024 65 Pulgadas', '', 36495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(179, NULL, 'Smart TV SAMSUNG 75 Pulgadas', '', 54995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(180, NULL, 'Aire Acondicionado Inverter D WORLD 12000', '', 20995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(181, NULL, 'Aire Acondicionado Inverter GBR 18000', '', 32495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(182, NULL, 'Aire Acondicionado Inverter TCL 24000', '', 44495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(183, NULL, 'Aire Acondicionado Inverter Black+Decker 12000', '', 23495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(184, NULL, 'PlayStation 5 Slim', '', 33995.00, 4, 0.00, '2025-03-13 08:00:00', NULL, 15, NULL, NULL, 1, 18.00),
(185, NULL, 'Onyx Studio 8', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(186, NULL, 'Subwofer Barra de Sonido LG', '', 7995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(187, NULL, 'Samsung Barra de Sonido iHome 120w', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(188, NULL, 'Samsung Barra de Sonido iHome 180w', '', 7995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(189, NULL, 'Freidora de Aire Brentwood 4L', '', 3995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(190, NULL, 'Freidora de Aire Ninja Speed 6L', '', 7495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(191, NULL, 'Microonda Sokany', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(192, NULL, 'MOUSE RAZER DEATHADDER ESSENTIAL', '', 2495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(193, NULL, 'TECLADO RAZER ORNATA V3', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(194, NULL, 'JBL FLIP 5', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(195, NULL, 'JBL PARTYBOX ON-THE-GO', '', 19995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(196, NULL, 'JBL BOOMBOX3', '', 26495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(197, NULL, 'JBL CHARGE 5', '', 9495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(198, NULL, 'JBL CLIP 4', '', 4495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(199, NULL, 'JBL GO 3', '', 2995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(200, NULL, 'SONY SRS-XG500', '', 22495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 15, NULL, NULL, 1, 18.00),
(201, NULL, 'ANIKER SOUNDCORE', '', 2995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(202, NULL, 'SOUNDCORE BOOM 2 PLUS', '', 14995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(203, NULL, 'Monitor Asus VG1B 27 Pulgada 165HZ', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 9, NULL, NULL, 1, 18.00),
(204, NULL, 'Monitor LG Ultragear 34 Pulgada 160HZ', 's', 24995.00, 2, 0.00, '2023-01-01 12:00:00', '2025-04-30 04:17:00', 2, NULL, NULL, 1, 18.00),
(206, NULL, 'Monitor Samsung G4 ODYSSEEY 27 Pulgada 240HZ', 's', 19995.00, 2, 0.00, '2023-01-01 12:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(207, NULL, 'Monitor Samsung G5 ODYSSEY 32 Pulgada 165HZ', 'siuuuusaddddassdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdasdsiuuuusaddddassdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdasdsiuuuusaddddassdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdasdsiuuuusaddddassdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdasd', 22995.00, 2, 0.00, '2025-12-10 20:00:00', '2025-10-23 01:05:00', 2, NULL, NULL, 1, 18.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p_marcas`
--

CREATE TABLE `p_marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `p_marcas`
--

INSERT INTO `p_marcas` (`id`, `nombre`) VALUES
(5, 'Amazon'),
(1, 'Apple'),
(9, 'Asus'),
(4, 'Google'),
(12, 'Hisense'),
(8, 'HP'),
(19, 'Infinix'),
(18, 'JBL'),
(10, 'Lenovo'),
(34, 'nilrad'),
(14, 'Onn'),
(2, 'Samsung'),
(7, 'Skypad'),
(15, 'Sony'),
(11, 'TCL'),
(6, 'Vortex'),
(13, 'Westinghouse'),
(3, 'Xiaomi'),
(20, 'ZTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p_variantes`
--

CREATE TABLE `p_variantes` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `p_variantes`
--

INSERT INTO `p_variantes` (`id`, `producto_id`, `color`, `stock`, `img`) VALUES
(372, 23, 'negro', 4, 'https://i.ebayimg.com/images/g/0lIAAOSwqNhkW5sy/s-l1600.webp'),
(373, 23, 'blanco', 3, 'https://i.ebayimg.com/images/g/b~YAAOSwNzNkW5tc/s-l1600.webp'),
(374, 25, 'oro', 5, 'https://i.ebayimg.com/images/g/0MgAAOSwWIpkW5u-/s-l1600.webp'),
(375, 24, 'purpura', 3, 'https://i.ebayimg.com/images/g/Yu0AAOSwG0hkW5uL/s-l1600.webp'),
(376, 24, 'blanco', 4, 'https://i.ebayimg.com/images/g/b~YAAOSwNzNkW5tc/s-l1600.webp'),
(377, 25, 'dorado', 4, 'https://i.ebayimg.com/images/g/0MgAAOSwWIpkW5u-/s-l1600.webp'),
(382, 1, 'blanco', 3, 'https://tecfys.com/290-medium_default/iphone-12-reacondicionado-128-gb-blanco.jpg'),
(383, 1, 'negro', 4, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/a75941f0-0032-4680-bda0-ba070e5f9982.jpg'),
(384, 1, 'verde', 3, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg'),
(385, 2, 'verde', 2, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg'),
(386, 2, 'pupura', 2, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/b01801bc-4c3c-411e-9ff0-dac6b4e34a87.jpg'),
(387, 3, 'blanco', 3, 'https://i.ebayimg.com/images/g/PfsAAOSwAuBlaMk9/s-l400.jpg'),
(388, 3, 'rojo', 3, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/859d07b9-f8a1-43bc-b8c3-ff09652e2c26.jpg'),
(389, 4, 'negro', 5, 'https://i.ebayimg.com/images/g/6VEAAOSwcrlhP6ad/s-l1600.webp'),
(390, 4, 'blanco', 4, 'https://i.ebayimg.com/images/g/WloAAOSwcU9hP6ap/s-l1600.webp'),
(391, 5, 'azul', 3, 'https://i.ebayimg.com/images/g/9PsAAOSwnh5hP6a7/s-l1600.webp'),
(392, 5, 'verde', 4, 'https://i.ebayimg.com/images/g/s2MAAOSwugxhP6bJ/s-l1600.webp'),
(393, 6, 'gris', 4, 'https://i.ebayimg.com/images/g/QVEAAOSwbWdhQfcN/s-l1600.webp'),
(394, 6, 'oro', 4, 'https://i.ebayimg.com/images/g/l8AAAOSwrQlhQfcU/s-l1600.webp'),
(395, 7, 'blanco', 2, 'https://i.ebayimg.com/images/g/Yj4AAOSwmb5hQfca/s-l1600.webp'),
(396, 7, 'azul', 4, 'https://i.ebayimg.com/images/g/YZsAAOSwntxhQfch/s-l1600.webp'),
(397, 8, 'Azul pacifico', 2, 'https://www.lacuracao.pe/media/catalog/product/o/r/orig_celr055azul-512gb__56549.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
(398, 9, 'Verde', 1, 'https://itpro.com.uy/wp-content/uploads/2024/04/wooc-454.jpeg'),
(399, 9, 'Azul', 4, 'https://covercompany.com.uy/cdn/shop/files/2-2513_7996_1.jpg?v=1734027637&width=400'),
(400, 10, 'Verde', 4, 'https://www.lacuracao.pe/media/catalog/product/p/s/ps23440159_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
(401, 10, 'Negro', 3, 'https://itpro.com.uy/wp-content/uploads/2025/03/wooc-851.jpeg'),
(402, 11, 'Verde alpino', 4, 'https://m.media-amazon.com/images/I/31zjY4rISlL._AC_SR400,400_.jpg'),
(403, 11, 'azul', 2, 'https://m.media-amazon.com/images/I/31ZMD4DfG9L.jpg'),
(404, 12, 'gris', 4, 'https://i.ebayimg.com/images/g/eeYAAeSw4S9obXlU/s-l960.webp'),
(405, 12, 'blanco', 4, 'https://i.ebayimg.com/images/g/FkcAAeSwvgNobXlS/s-l960.webp'),
(406, 13, 'oro', 4, 'https://i.ebayimg.com/images/g/FkcAAeSwvgNobXlS/s-l960.webp'),
(409, 14, 'gris', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Grey.jpg'),
(410, 14, 'oro', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Gold.jpg'),
(411, 15, 'blanco', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Silver.jpg'),
(412, 15, 'verde', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Green.jpg'),
(413, 16, 'negro', 4, 'https://i.ebayimg.com/images/g/AKQAAOSwn51oE~FN/s-l1600.webp'),
(414, 16, 'blanco', 4, '/uploads/1761357162243_iPhone_14_Starlight_PDP_Image_Position-1A_COES_7e10f08c-1fb7-436c-988c-b60ed9e536e4-convertido-a-400x400.jpeg'),
(415, 17, 'Rojo', 4, 'https://i.ebayimg.com/images/g/pcQAAeSwYfpozHz8/s-l400.jpg'),
(416, 17, 'azul', 4, 'https://www.mylar.es/37903-medium_default/SMARTPHONE-APPLE-IPHONE-14-PRO-256GB-BLUE-MPWP3QL-A.jpg'),
(417, 18, 'amarillo', 4, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--V33EemrL0m.webp'),
(418, 18, 'Prupura', 2, 'https://i.ebayimg.com/images/g/hZAAAOSwbu5mxjdc/s-l400.jpg'),
(419, 19, 'Purpura', 6, 'https://d3c745jesl5pj3.cloudfront.net/model-image/iphone-14-plus.png'),
(420, 19, 'Rojo', 4, 'https://itpro.com.uy/wp-content/uploads/2024/11/wooc-155.jpeg'),
(421, 20, 'negro', 4, 'https://i.ebayimg.com/images/g/o~UAAOSwVB1kXRSz/s-l1600.webp'),
(422, 20, 'blanco', 4, 'https://i.ebayimg.com/images/g/sI4AAOSwi5lkXRTg/s-l1600.webp'),
(423, 21, 'oro', 4, 'https://i.ebayimg.com/images/g/-FYAAOSw8UNkXRT4/s-l1600.webp'),
(424, 21, 'blanco', 4, 'https://i.ebayimg.com/images/g/sI4AAOSwi5lkXRTg/s-l1600.webp'),
(425, 22, 'gris', 4, 'https://i.ebayimg.com/images/g/ml4AAOSwQJZkXRUR/s-l1600.webp'),
(426, 22, 'negro', 4, 'https://i.ebayimg.com/images/g/o~UAAOSwVB1kXRSz/s-l140.webp'),
(427, 26, 'Negro', 3, 'https://claroperupoc.vteximg.com.br/arquivos/ids/2540982/052283676.jpg'),
(428, 26, 'Verde', 4, 'https://covercompany.com.uy/cdn/shop/files/17045_17258_0.jpg?v=1726762823&width=400'),
(429, 27, 'blanco', 4, 'https://i.ebayimg.com/images/g/ytcAAOSwqyZnN63o/s-l1600.webp'),
(430, 27, 'amarillo', 4, 'https://i.ebayimg.com/images/g/zM0AAOSwU2JnN63q/s-l1600.webp'),
(431, 28, 'Negro', 4, 'https://itpro.com.uy/wp-content/uploads/2024/04/wooc-492.jpeg'),
(432, 28, 'Rosado', 2, 'https://itpro.com.uy/wp-content/uploads/2025/03/wooc-881.jpeg'),
(433, 29, 'Amarillo', 4, 'https://www.trippodo.com/872471-medium_default/apple-iphone-15-plus-17-cm-67-sim-doble-ios-17-5g-.jpg'),
(434, 29, 'verde', 3, 'https://www.dealsmagnet.com/images/apple-iphone-15-plus-128-gb-o-196TMi7h.jpg'),
(435, 30, 'verde', 4, 'https://i.ebayimg.com/images/g/RjsAAOSwJsRnN63p/s-l1600.webp'),
(436, 30, 'negro', 4, 'https://i.ebayimg.com/images/g/NiQAAOSwUahnN63n/s-l1600.webp'),
(437, 31, 'negro', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+15+Pro+Max/iPhone+15+Pro+Max+Black.jpg'),
(438, 31, 'azul', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+15+Pro+Max/iPhone+15+Pro+Max+Blue.jpg'),
(439, 32, 'Negro', 4, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--LZEt1knyaA.webp'),
(440, 32, 'blanco', 4, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--jGZ9wYU4_x.webp'),
(441, 33, 'Titanio azul', 4, '/uploads/1761355660754_Imagen-Apple-iPhone-15-Pro-Max-Azul-768x768-convertido-a-400x400.jpeg'),
(442, 33, 'negro', 4, '/uploads/1761355741231_Imagen-Apple-iPhone-15-Pro-Max-Negro-768x768-convertido-a-400x400.jpeg'),
(443, 34, 'Natural titanio', 2, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--Szz0Nrj8Tu.webp'),
(444, 34, 'Negro titanio', 4, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--LZEt1knyaA.webp'),
(445, 35, 'Negro', 5, 'https://www.att.com.mx/dw/image/v2/BJKW_PRD/on/demandware.static/-/Sites-att-master/default/dwbb49dd6b/images/Devices/Apple/iPhone16/Black/iPhone_16_Black_PDP_Image_Position_1__GENS.jpg?sw=400&sh=400&sm=fit'),
(446, 35, 'Verde azulado', 5, 'https://www.sagitariodigital.com.ar/wp-content/uploads/2024/09/IPH-16-2-1.jpg'),
(447, 36, 'blanco', 1, 'https://www.ispotaba.com/wp-content/uploads/2025/05/iPHone-16E-White-400x400.jpg'),
(448, 36, 'Negro', 4, 'https://asset.conrad.com/media10/isa/160267/c1/-/en/003389602PI00/image.jpg?x=400&y=400&format=jpg&ex=400&ey=400&align=center'),
(449, 37, 'Rosado', 3, 'https://i.blogs.es/59ca30/31pghz1fcvl._sl500_/original.jpeg'),
(450, 37, 'Negro', 3, 'https://i.blogs.es/0cfce4/31trymc1n7l._sl500_/original.jpeg'),
(451, 38, 'Blanco Titanio', 3, 'https://target.scene7.com/is/image/Target/GUEST_c7ba2917-3af0-46b3-afc1-8283206fdd4d'),
(452, 38, 'Desierto titanio', 2, 'https://target.scene7.com/is/image/Target/GUEST_cb9ea8a2-a563-400a-8558-a0b682dc0dfc'),
(453, 39, 'Desierto titanio', 1, 'https://www.att.com.mx/dw/image/v2/BJKW_PRD/on/demandware.static/-/Sites-att-master/default/dw36d5fef0/images/Devices/Apple/iphone16-pro-max/Desert_Titanium/iPhone_16_Pro_Max_Desert_Titanium_PDP_Image_Position_1__GENS.jpg?sw=400&sh=400&sm=fit'),
(454, 39, 'Blanco titanio', 6, 'https://target.scene7.com/is/image/Target/GUEST_c7ba2917-3af0-46b3-afc1-8283206fdd4d'),
(455, 40, 'negro', 4, 'https://i.ebayimg.com/images/g/t34AAOSwoRRg2h05/s-l1600.webp'),
(456, 40, 'azul', 4, 'https://i.ebayimg.com/images/g/1x4AAOSwEGJivIgI/s-l1600.webp'),
(457, 41, 'Negro', 4, 'https://i.ebayimg.com/images/g/XqYAAOSwSSVnyAr~/s-l400.jpg'),
(458, 42, 'negro', 3, 'https://m.media-amazon.com/images/I/31hpK7xCN2L._SS400_.jpg'),
(459, 42, 'Purpura', 3, 'https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7f216f7abd304505ae3131388a554fd7~tplv-dx0w9n1ysr-crop-webp:400:400.webp?dr=10517&t=555f072d&ps=933b5bde&shp=57fff0e0&shcp=0d52deaf&idc=useast5&from=1476391136'),
(460, 43, 'Negro', 4, 'https://i.ebayimg.com/images/g/1ukAAOSw14pj5A7V/s-l400.jpg'),
(461, 43, 'Azul', 4, 'https://i.ebayimg.com/images/g/1GEAAOSw1IRgb42w/s-l400.jpg'),
(462, 44, 'Grafito', 4, 'https://www.ispotaba.com/wp-content/uploads/2024/06/065_galaxy_s23ultra_front_graphite-400x400.png'),
(463, 45, 'Negro titanio', 3, 'https://www.lacuracao.pe/media/catalog/product/p/s/ps26088579_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
(464, 45, 'Blanco', 2, 'https://www.efe.com.pe/media/catalog/product/4/5/459270-800-800_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
(465, 46, 'negro', 4, 'https://i.ebayimg.com/images/g/ZB0AAeSw33toaBuw/s-l1600.webp'),
(466, 47, 'negro', 4, 'https://www.ispotaba.com/wp-content/uploads/2024/02/1-9-400x400.jpg'),
(467, 48, 'Azul claro', 3, 'https://i.ebayimg.com/images/g/-cQAAOSwF~tmpOvA/s-l400.jpg'),
(468, 49, 'azul/negro', 4, 'https://www.sales366.com/storage/2025/01/SAMSUNG-A25.webp'),
(469, 50, 'Negro', 4, 'https://i.ebayimg.com/images/g/558AAOSw~KNl4ZWn/s-l400.jpg'),
(470, 50, 'Verde azulado', 4, 'https://www.sales366.com/storage/2024/04/edmi-Note-13-Pro-img4.webp'),
(471, 51, 'negro', 4, 'https://www.sales366.com/storage/2024/04/Redmi-Note-13-Pro-5G-img-1.webp'),
(472, 52, 'amarillo', 4, 'https://i.ebayimg.com/images/g/XgoAAeSwYkxoc01Z/s-l1600.webp'),
(473, 53, 'negro', 4, 'https://i.ebayimg.com/images/g/7x8AAeSw~pdoaaPb/s-l960.webp'),
(474, 54, 'azul', 4, 'https://i.ebayimg.com/images/g/Z3UAAOSwZ~dnk9gq/s-l1600.webp'),
(475, 55, 'negro', 4, 'https://i.ebayimg.com/images/g/swQAAeSwnPdocsh7/s-l1600.webp'),
(476, 56, 'negro', 4, 'https://i.ebayimg.com/images/g/swQAAeSwnPdocsh7/s-l1600.webp'),
(477, 58, 'negro', 4, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--hrpfoVmoZh.png'),
(478, 57, 'Verde', 2, 'https://covercompany.com.uy/cdn/shop/files/2-6106_14498_1.jpg?v=1737143330&width=400'),
(479, 59, 'Azul', 2, 'https://http2.mlstatic.com/D_NQ_NP_694238-MLA91477497768_092025-O.webp'),
(480, 60, 'negro', 4, 'https://i.ebayimg.com/images/g/7LAAAOSweRdkA1Mp/s-l960.webp'),
(481, 61, 'blanco', 4, '/uploads/1761357553474_google-pixel-8-pro-5g-porcelain-12gb-ram-128gb-storage.jpg'),
(482, 62, 'Negro', 4, 'https://images.bidcom.com.ar/resize?src=https://static.bidcom.com.ar/publicacionesML/productos/LCINFSM8X/1000x1000-LCINFSM8N.jpg&h=400&q=100'),
(483, 63, 'Oro arenisca', 2, 'https://i.ebayimg.com/images/g/dV0AAeSwpxFn0ZAS/s-l400.jpg'),
(484, 64, 'negro', 4, 'https://i.ebayimg.com/images/g/QwUAAOSwE~doRmVm/s-l1600.webp'),
(485, 65, 'verde', 4, 'https://i.ebayimg.com/images/g/zKIAAOSwkOdoVDu2/s-l1600.webp'),
(486, 66, 'negro', 4, 'https://i.ebayimg.com/images/g/lxMAAOSw~0VnD0FB/s-l1600.webp'),
(487, 67, 'blanco', 4, 'https://i.ebayimg.com/images/g/JmYAAOSw7YZoN8ef/s-l1600.webp'),
(488, 68, 'negro', 2, 'https://i.ebayimg.com/images/g/trcAAOSwvNJoSn1R/s-l1600.webp'),
(489, 69, 'negro', 3, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--1V-V3-7SKQ.webp'),
(490, 70, 'Verde', 4, 'https://www.lacuracao.pe/media/catalog/product/o/r/orig_images2fproducts2fjzmtzopo0-motog04verde_515201.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
(491, 71, 'Rosado', 3, 'https://i.ebayimg.com/images/g/ybcAAeSwsqto-AFl/s-l400.jpg'),
(492, 72, 'blanco', 4, 'https://i.ebayimg.com/images/g/-H4AAeSwMRhob-jD/s-l1600.webp'),
(493, 73, 'blanco', 3, 'https://i.ebayimg.com/images/g/9hAAAeSw~GBof9Dw/s-l960.webp'),
(494, 74, 'negro', 4, 'https://http2.mlstatic.com/D_Q_NP_2X_646175-MLA83298052986_042025-AB.webp'),
(495, 75, 'negro', 3, 'https://i.ebayimg.com/images/g/x5cAAOSwJEtoKoWg/s-l500.jpg'),
(496, 76, 'gris', 3, 'https://5.imimg.com/data5/SELLER/Default/2025/3/496156846/CR/ZD/VS/143240964/apple-ipad-10th-generation-500x500.jpeg'),
(497, 79, 'negro', 4, 'https://bestmart.cl/cdn/shop/products/tablet-amazon-fire-hd-8-version-2022-32gb-negro-1214629_400x.jpg?v=1758551816'),
(498, 80, 'Azul', 3, 'https://i.ebayimg.com/images/g/Fn8AAOSw4cFoLMzb/s-l400.jpg'),
(499, 81, 'negro', 4, 'https://clickventasrd.com/cdn/shop/files/31hc5NtHrXL._SS400.jpg?v=1716643691'),
(500, 82, 'gris', 3, 'https://mediamax.ba/wp-content/uploads/2024/10/pad-se-87inch-graz.jpg'),
(501, 83, 'azul', 4, 'https://i.ebayimg.com/images/g/IsUAAOSwf0tml-Vu/s-l1600.webp'),
(502, 85, 'gris', 3, 'https://vivaelectronics.am/Api/FetchImgBinBySKU/11930/tablet-xmobile-x10max.png'),
(503, 86, 'azul', 4, 'https://locosphone.com/wp-content/uploads/2023/11/TABLET-VORTEX.webp'),
(504, 87, 'negro', 4, 'https://i.ebayimg.com/images/g/G~cAAOSwqy1nYE2d/s-l500.jpg'),
(505, 88, 'negro', 4, '/uploads/1761352499202_1745940979-003.TBTCL141-1.jpg'),
(506, 89, 'gris', 3, 'https://i.ebayimg.com/images/g/XX0AAOSwI0JmHwCc/s-l1600.webp'),
(507, 90, 'gris', 4, 'https://i.ebayimg.com/images/g/s4MAAOSw3BVju4Q9/s-l400.jpg'),
(508, 91, 'gris', 3, 'https://i.ebayimg.com/images/g/sikAAOSwlgtl63K6/s-l1600.webp'),
(509, 92, 'gris', 4, 'https://cartlow.gumlet.io/prod/product/10946420001/96dcbea1-ee10-4967-a381-4108c6fef86a.jpg?width=400&height=0'),
(510, 93, 'gris', 3, 'https://i.ebayimg.com/images/g/6ZQAAOSwmIhhFik4/s-l400.jpg'),
(511, 94, 'Gris', 1, 'https://i.ebayimg.com/images/g/e1QAAeSwiNNowbjX/s-l400.jpg'),
(514, 97, 'negro', 3, 'https://i.ebayimg.com/images/g/0UAAAOSwqXpmCh5A/s-l400.jpg'),
(515, 98, 'negro', 3, 'https://i.ebayimg.com/images/g/vEwAAOSwN8xmzoR0/s-l400.jpg'),
(516, 99, 'gris', 3, 'https://i.ebayimg.com/images/g/l-oAAOSwoIRnTibC/s-l1600.webp'),
(517, 100, 'gris', 4, 'https://i.ebayimg.com/images/g/7~4AAOSw7-1mTMYP/s-l400.jpg'),
(518, 108, 'gris', 2, 'https://http2.mlstatic.com/D_Q_NP_2X_966054-MRD92550029082_092025-N.webp'),
(519, 109, 'gris', 4, 'https://tienda.composystem.com.uy/thumb/B193C2793F5D4D6CA6FF672253F677D7_400x400.jpg'),
(522, 132, 'gris', 3, 'https://i.ebayimg.com/images/g/ieYAAOSwU4hl32rq/s-l1600.webp'),
(523, 133, 'gris', 4, 'https://i.ebayimg.com/images/g/Dm0AAOSwe~1mPAUU/s-l1600.webp'),
(524, 134, 'negro', 3, 'https://ss7.vzw.com/is/image/VerizonWireless/samsung-galaxy-watch-6-classic-pre-order-graphite-43mm-smr955uzkv-a?wid=400&hei=400&fmt=webp-alpha'),
(525, 135, 'negro', 4, 'https://i.ebayimg.com/images/g/qh4AAOSwOVlnR1HZ/s-l1600.webp'),
(526, 136, 'negro', 3, 'https://i.ebayimg.com/images/g/H4sAAOSw3OBoRaW1/s-l1600.webp'),
(528, 137, 'blanco', 3, 'https://avechi.co.ke/wp-content/uploads/2021/12/Samsung-Galaxy-Buds-2-1.jpg'),
(529, 138, 'blanco', 4, 'https://target.scene7.com/is/image/Target/GUEST_d5f1b26d-c961-4a56-93d9-2c461e6040e5'),
(530, 139, 'blanco', 3, 'https://i.ebayimg.com/images/g/KfcAAOSwzqpm7fSt/s-l1600.webp'),
(531, 139, 'negro', 4, 'https://i.ebayimg.com/images/g/9AAAAOSwckBm7fSZ/s-l1600.webp'),
(532, 140, 'blanco', 3, 'https://i.ebayimg.com/images/g/ZKMAAOSwteZnqxRm/s-l1600.webp'),
(533, 142, 'blanco', 4, 'https://www.otterbox.es/dw/image/v2/BGMS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dwe73c7eac/productimages/dis/cases-screen-protection/apla8-airpods/apla8-airpods-mooncrystal-1.jpg?sw=400&sh=400'),
(534, 143, 'blanco', 3, 'https://i.ebayimg.com/images/g/yhMAAOSwCo5joYAl/s-l960.webp'),
(535, 144, 'blanco', 4, 'https://i.ebayimg.com/images/g/wX0AAOSwez1nPOcc/s-l1600.webp'),
(536, 145, 'blanco', 3, 'https://i.ebayimg.com/images/g/kPMAAeSwK0ZoZM-f/s-l1600.webp'),
(537, 146, 'blanco', 4, 'https://i.ebayimg.com/images/g/RT8AAOSwm6Fn0bBn/s-l1600.webp'),
(538, 147, 'negro', 2, 'https://i.ebayimg.com/images/g/6cwAAOSwMb9kUu9g/s-l1600.webp'),
(539, 147, 'blanco', 2, 'https://i.ebayimg.com/images/g/ukgAAOSwpstjYBYM/s-l400.jpg'),
(540, 148, 'negro', 2, 'https://i.ebayimg.com/images/g/SCcAAOSwoS1jXCoO/s-l1600.webp'),
(541, 148, 'blanco', 2, 'https://i.ebayimg.com/images/g/PRwAAOSwDcBjXCom/s-l1600.webp'),
(542, 149, 'negro', 2, 'https://ss7.vzw.com/is/image/VerizonWireless/apple-watch-series-8-cellular-45mm-midnight-aluminum-midnight-sport-band-34fr-screen-usen-mnvl3ll-a-front?wid=400&hei=400&fmt=webp-alpha'),
(543, 149, 'blanco', 2, 'https://i.ebayimg.com/images/g/zJAAAOSw94xkUuPb/s-l1600.webp'),
(544, 150, 'negro', 2, 'https://i.ebayimg.com/images/g/DOYAAOSwTzxnqweo/s-l1600.webp'),
(545, 151, 'negro', 2, '/uploads/1761353629676_refurb-45-cell-alum-midnight-sport-band-midnight-s9.jpg'),
(546, 151, 'crema', 2, 'https://cdnimage.eureka.com.kw/productimages/largeimages/apple-mr8t3--smart-watch-3jinc.jfif?v=666&maxwidth=400&maxheight=400&quality=100'),
(547, 152, 'negro', 2, 'https://i.ebayimg.com/images/g/2-wAAeSwJ1xoW1-N/s-l1600.webp'),
(548, 153, 'negro', 2, 'https://i.ebayimg.com/images/g/QaEAAOSwsA5kjgWx/s-l1600.webp'),
(549, 154, 'negro', 4, 'https://i.ebayimg.com/images/g/fAcAAeSwFZFogXYH/s-l1600.webp'),
(550, 155, 'negro', 4, 'https://i.ebayimg.com/images/g/Kz8AAOSwiJ5kWfPb/s-l960.webp'),
(551, 156, 'negro', 4, 'https://i.ebayimg.com/images/g/~xIAAOSwGThmze79/s-l1600.webp'),
(552, 157, 'negro', 3, 'https://i.ebayimg.com/images/g/YbsAAOSwBxNk-eiA/s-l1600.webp'),
(553, 158, 'negro', 4, 'https://i5.walmartimages.com/seo/TCL-43-Class-4K-UHD-LED-Smart-Roku-TV-4-Series-43S425_93d834c1-6e8e-4db0-82d6-07677b99557a.26c2883c14fea6b281164c87d09725c5.jpeg'),
(554, 159, 'negro', 4, 'https://i.ebayimg.com/images/g/xGsAAeSw1ZlogQVA/s-l1600.webp'),
(555, 160, 'negro', 4, 'https://m.media-amazon.com/images/I/71Fqi90oSgL._SS400_.jpg'),
(556, 161, 'negro', 4, 'https://images-na.ssl-images-amazon.com/images/I/71TTN7b+o0L._AC_UL495_SR435,495_.jpg'),
(557, 162, 'negro', 4, 'https://i.ebayimg.com/images/g/fAcAAeSwFZFogXYH/s-l1600.webp'),
(558, 163, 'negro', 4, 'https://chedrauimx.vteximg.com.br/arquivos/ids/56665759-400-400/846042073134_00.jpg?v=638963249217530000'),
(559, 164, 'negro', 4, 'https://www.gollo.com/media/catalog/product/9/0/9000000014_3_.jpg?width=400&height=400&canvas=400,400&optimize=medium&bg-color=255,255,255&fit=bounds'),
(560, 165, 'negro', 4, 'https://i.ebayimg.com/images/g/ObIAAeSw1b5obgf3/s-l1600.webp'),
(561, 166, 'negro', 4, 'https://target.scene7.com/is/image/Target/GUEST_7098e7c1-c218-4e14-8673-ac80ec148391'),
(562, 167, 'negro', 4, 'https://i.ebayimg.com/images/g/GOIAAOSwJkBoLzNi/s-l960.webp'),
(563, 168, 'negro', 4, 'https://i.ebayimg.com/images/g/GOIAAOSwJkBoLzNi/s-l960.webp'),
(564, 169, 'negro', 4, 'https://i.ebayimg.com/images/g/yq0AAOSwhTlnl5GM/s-l1600.webp'),
(565, 170, 'negro', 4, 'https://www.hisensecac.com/wp-content/uploads/2024/06/55Q6N_2024-4.png'),
(566, 171, 'negro', 4, 'https://i.ebayimg.com/images/g/9MsAAOSw7lBi0mCu/s-l960.webp'),
(567, 172, 'negro', 4, 'https://www.lacuracao.pe/media/catalog/product/7/5/75q6npe_1_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
(568, 173, 'negro', 4, 'https://i.ebayimg.com/images/g/Kz8AAOSwiJ5kWfPb/s-l960.webp'),
(569, 176, 'negro', 4, 'https://m.media-amazon.com/images/I/51ORI6jVG5L._SS400_.jpg'),
(570, 177, 'negro', 4, 'https://i.ebayimg.com/images/g/V5MAAeSwyXFohpfG/s-l1600.webp'),
(571, 178, 'negro', 4, 'https://cymcomputer.com/wp-content/uploads/2024/11/Tv-smart-samsung-65-.jpg'),
(572, 179, 'negro', 4, 'https://shop.samsung.com/latin/pub/media/catalog/product/cache/a69170b4a4f0666a52473c2224ba9220/q/n/qn65qn900cfxza_001_front_titan-black_2_1_1.png'),
(573, 180, 'blanco', 4, 'https://casacuesta.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/3/3/3350104-1.jpg'),
(574, 181, 'blanco', 4, 'https://casacuesta.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/3/3/3338451-1__1729812230.jpg'),
(575, 182, 'blanco', 4, 'https://casacuesta.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/3/3/3310342-1.jpg'),
(576, 183, 'blanco', 4, 'https://img.tcheloco.com.py/85231-home_default/aire-acondicionado-blackdecker-12000btu-220v60hz-inverter.jpg'),
(577, 184, 'blanco', 4, 'https://media.direct.playstation.com/is/image/sierialto/ps5-slim-model-hero-new'),
(578, 185, 'azul', 4, 'https://i.ebayimg.com/images/g/b4YAAOSwGV5kGfaQ/s-l400.png'),
(579, 186, 'negro', 2, 'https://images-na.ssl-images-amazon.com/images/I/51h48onuf5L._SS400_.jpg'),
(580, 187, 'negro', 4, 'https://m.media-amazon.com/images/I/31dC-vrN7CL._UF894,1000_QL80_.jpg'),
(581, 188, 'negro', 4, 'https://casacuesta.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/3/3/3344574-1__1725558716.jpg'),
(582, 189, 'negro', 4, 'https://m.media-amazon.com/images/I/61oOTu-kfDL._UF894,1000_QL80_.jpg'),
(583, 190, 'gris', 4, 'https://m.media-amazon.com/images/I/51KfYfuFpSL._UF894,1000_QL80_.jpg'),
(584, 191, 'blanco', 4, 'https://img.yfisher.com/m6289/1749537156900-00/jpg70-t4-width440.webp'),
(585, 192, 'negro', 4, 'https://m.media-amazon.com/images/I/415qavdCboL._SS400_.jpg'),
(586, 193, 'negro', 4, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--RmRLKDHTiQ.png'),
(587, 194, 'negro', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw5bf3296f/JBL_CHARGE5_HERO_BLACK_0046_x1.png?sw=400&sh=400&sm=fit&sfrm=png'),
(588, 194, 'azul', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwb72930cc/JBL_Flip5_Product%20Photo_Hero_RiverTeal-1605x1605-hero.png?sw=400&sh=400&sm=fit&sfrm=png'),
(589, 195, 'negro', 4, 'https://target.scene7.com/is/image/Target/GUEST_b93c5d96-f2ab-4cf5-a83b-d95c7221dd18'),
(590, 196, 'verde', 4, 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwcf80711d/1_JBL_BOOMBOX_3_SQUAD_HERO_33262_x2.png?sw=400&sh=400&sm=fit&sfrm=png'),
(591, 197, 'negro', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwcbb4fd11/1_JBL_BOOMBOX_3_HERO_BLACK_33216_x2.png?sw=400&sh=400&sm=fit&sfrm=png'),
(592, 198, 'negro', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw962d962e/JBL_CLIP4_HERO_STANDARD_TRIPLE_BLACK_0737_x1.png?sw=400&sh=400&sm=fit&sfrm=png'),
(593, 199, 'negro', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwafaeef0d/JBL_GO_4_HERO_BLACK_48156_x4.png?sw=400&sh=400&sm=fit&sfrm=png'),
(594, 200, 'negro', 4, '/uploads/1761354978109_PROD-71.jpg'),
(595, 201, 'negro', 4, 'https://m.media-amazon.com/images/I/51QReosscPL._UF894,1000_QL80_.jpg'),
(596, 202, 'negro', 4, 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/37316ee8-f080-4809-a447-98bd68af8441.png;maxHeight=828;maxWidth=400?format=webp'),
(597, 203, 'negro', 4, 'https://www.asus.com/media/global/gallery/0osdprj9mpap1rub_setting_xxx_0_90_end_2000.png'),
(598, 204, 'negro', 4, 'https://windigitalpc.com/wp-content/uploads/2025/05/Monitor-LG-UltraGear-Curvo-34-QHD-VA-160Hz1.png'),
(599, 205, 'negro', 4, 'https://casacuesta.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/3/3/3352805-1__1747070732.jpg'),
(600, 206, 'negro', 4, 'https://covercompany.com.uy/cdn/shop/files/19950_19951_3.jpg?v=1726589380&width=400'),
(601, 207, 'negro', 3, 'https://casacuesta.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/3/3/3344468-1__1715126132.jpg'),
(602, 131, 'Gris', 2, 'https://http2.mlstatic.com/D_Q_NP_2X_680852-MRD69531082702_052023-N.webp'),
(603, 84, 'Gris', 4, 'https://mobilestoreonline.com/wp-content/uploads/2025/04/Andriod-13-400x400.png'),
(604, 120, 'Gris', 5, 'https://i.ebayimg.com/images/g/oAwAAOSw--1lEYcs/s-l400.jpg'),
(605, 121, 'Rosado', 2, 'https://i.ebayimg.com/images/g/gN0AAOSwy3Rl12Xi/s-l400.jpg'),
(606, 122, 'Gris', 3, 'https://i.ebayimg.com/images/g/nUoAAeSwABJow0IF/s-l400.jpg'),
(607, 123, 'Gris', 2, 'https://i.ebayimg.com/images/g/HdMAAOSwVVhl1aaH/s-l400.jpg'),
(608, 124, 'Gris', 3, 'https://i.ebayimg.com/images/g/6ZQAAOSwmIhhFik4/s-l400.jpg'),
(609, 125, 'Gris', 4, 'https://i.ebayimg.com/images/g/6ZsAAOSwUtJm9T0O/s-l400.jpg'),
(610, 126, 'Gris', 1, 'https://i.ebayimg.com/images/g/sOcAAeSw8hNo4ffQ/s-l400.jpg'),
(613, 96, 'Negro', 2, 'https://5.imimg.com/data5/ANDROID/Default/2025/2/487652080/GA/JV/TB/234503777/product-jpeg-500x500.jpg'),
(614, 174, 'Negro', 2, 'https://hisense.com.pe/static/1fee299aec5f19ca4ecea543fbc6bb4f/cd18a/75Q6.jpg'),
(615, 175, 'Negro', 2, 'https://www.megaaudio.com.mx/cdn/shop/files/Pantalla-Hisense-85A7H_01.jpg?v=1736465649&width=416'),
(623, 1, 'Rojo', 2, 'https://www.lacuracao.pe/media/catalog/product/p/s/ps76702836_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ram`
--

CREATE TABLE `ram` (
  `id` int(11) NOT NULL,
  `capacidad` varchar(20) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ram`
--

INSERT INTO `ram` (`id`, `capacidad`, `tipo`) VALUES
(1, '4GB', 'LPDDR4X'),
(2, '6GB', 'LPDDR4X'),
(3, '8GB', 'LPDDR5'),
(4, '8GB', 'LPDDR4X'),
(5, '12GB', 'LPDDR5'),
(6, '12GB', 'LPDDR4X'),
(7, '16GB', 'LPDDR5'),
(8, '4GB', 'LPDDR4'),
(9, '6GB', 'LPDDR5'),
(13, '12GB', 'LPDDR5X'),
(14, '8GB', 'LPDDR5E'),
(15, '6GB', 'LPDDR5E'),
(18, '2GB', 'LPDDR4X');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `activo`, `fecha_creacion`) VALUES
(79, 'darlin', 'darlinlvaldez@gmail.com', '$2b$10$H1yfTCPuSSNEJZrRr0l7S.ZrzWvU3VVmpyEoFPgBnJ01uGhKMuUqO', 1, '2025-10-28 01:12:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variantes_almacenamiento`
--

CREATE TABLE `variantes_almacenamiento` (
  `movil_id` int(11) NOT NULL,
  `almacenamiento_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variantes_almacenamiento`
--

INSERT INTO `variantes_almacenamiento` (`movil_id`, `almacenamiento_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(3, 2),
(3, 3),
(3, 4),
(4, 2),
(4, 3),
(5, 2),
(5, 3),
(6, 2),
(6, 3),
(6, 4),
(7, 2),
(7, 3),
(8, 2),
(8, 3),
(9, 2),
(9, 3),
(9, 4),
(10, 2),
(10, 3),
(10, 4),
(11, 2),
(11, 3),
(12, 2),
(12, 4),
(19, 2),
(20, 3),
(21, 2),
(22, 2),
(23, 3),
(24, 4),
(25, 1),
(25, 2),
(26, 2),
(27, 3),
(28, 3),
(29, 3),
(30, 3),
(31, 2),
(32, 2),
(32, 3),
(33, 3),
(34, 3),
(35, 3),
(36, 3),
(37, 2),
(38, 2),
(39, 2),
(40, 2),
(41, 3),
(42, 1),
(43, 1),
(44, 3),
(45, 3),
(84, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variantes_ram`
--

CREATE TABLE `variantes_ram` (
  `movil_id` int(11) NOT NULL,
  `ram_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variantes_ram`
--

INSERT INTO `variantes_ram` (`movil_id`, `ram_id`) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(9, 6),
(9, 8),
(10, 2),
(11, 2),
(12, 2),
(18, 5),
(19, 4),
(20, 6),
(21, 6),
(21, 8),
(22, 6),
(23, 5),
(24, 7),
(25, 1),
(26, 2),
(27, 3),
(28, 3),
(29, 5),
(30, 3),
(30, 9),
(31, 1),
(32, 3),
(33, 5),
(34, 3),
(35, 5),
(36, 5),
(36, 8),
(37, 5),
(38, 5),
(39, 1),
(39, 15),
(40, 1),
(41, 2),
(42, 1),
(43, 1),
(44, 2),
(45, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `baterias`
--
ALTER TABLE `baterias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `camara`
--
ALTER TABLE `camara`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario_producto_variante` (`usuario_id`,`producto_id`,`variante_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `fk_cart_producto` (`producto_id`),
  ADD KEY `fk_carrito_variante` (`variante_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ciudades_envio`
--
ALTER TABLE `ciudades_envio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `conectividad`
--
ALTER TABLE `conectividad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cpu`
--
ALTER TABLE `cpu`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`pedido_id`),
  ADD KEY `fk_order_items` (`producto_id`);

--
-- Indices de la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `envios`
--
ALTER TABLE `envios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`);

--
-- Indices de la tabla `fav`
--
ALTER TABLE `fav`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `fk_fav_variante` (`variante_id`);

--
-- Indices de la tabla `gpu`
--
ALTER TABLE `gpu`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `marca_categoria`
--
ALTER TABLE `marca_categoria`
  ADD PRIMARY KEY (`marca_id`,`categoria_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `moviles`
--
ALTER TABLE `moviles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_moviles_cpu` (`cpu_id`),
  ADD KEY `fk_moviles_camara` (`camara_id`),
  ADD KEY `fk_moviles_bateria` (`bateria_id`),
  ADD KEY `fk_moviles_gpu` (`gpu_id`),
  ADD KEY `fk_moviles_conectividad` (`conectividad_id`),
  ADD KEY `fk_dimensionespeso_cpu` (`dimensionespeso_id`),
  ADD KEY `fk_moviles_pantalla` (`pantalla_id`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`pedido_id`);

--
-- Indices de la tabla `pantalla`
--
ALTER TABLE `pantalla`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_usuario` (`usuario_id`),
  ADD KEY `fk_ciudad_envio` (`ciudad_envio_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `marca_id` (`marca_id`),
  ADD KEY `fk_productos_moviles` (`movil_id`),
  ADD KEY `fk_ram` (`ram_id`),
  ADD KEY `fk_almacenamiento` (`almacenamiento_id`);

--
-- Indices de la tabla `p_marcas`
--
ALTER TABLE `p_marcas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `p_variantes`
--
ALTER TABLE `p_variantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `variantes_almacenamiento`
--
ALTER TABLE `variantes_almacenamiento`
  ADD PRIMARY KEY (`movil_id`,`almacenamiento_id`),
  ADD KEY `almacenamiento_id` (`almacenamiento_id`);

--
-- Indices de la tabla `variantes_ram`
--
ALTER TABLE `variantes_ram`
  ADD PRIMARY KEY (`movil_id`,`ram_id`),
  ADD KEY `ram_id` (`ram_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `baterias`
--
ALTER TABLE `baterias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `camara`
--
ALTER TABLE `camara`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `ciudades_envio`
--
ALTER TABLE `ciudades_envio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `conectividad`
--
ALTER TABLE `conectividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `cpu`
--
ALTER TABLE `cpu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;

--
-- AUTO_INCREMENT de la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `envios`
--
ALTER TABLE `envios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `fav`
--
ALTER TABLE `fav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=804;

--
-- AUTO_INCREMENT de la tabla `gpu`
--
ALTER TABLE `gpu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `moviles`
--
ALTER TABLE `moviles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT de la tabla `pantalla`
--
ALTER TABLE `pantalla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT de la tabla `p_marcas`
--
ALTER TABLE `p_marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `p_variantes`
--
ALTER TABLE `p_variantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=624;

--
-- AUTO_INCREMENT de la tabla `ram`
--
ALTER TABLE `ram`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `fk_carrito_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_carrito_variante` FOREIGN KEY (`variante_id`) REFERENCES `p_variantes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD CONSTRAINT `fk_clasificacion_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_clasificacion_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD CONSTRAINT `fk_detalles_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_detalles_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `envios`
--
ALTER TABLE `envios`
  ADD CONSTRAINT `fk_envios_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`);

--
-- Filtros para la tabla `fav`
--
ALTER TABLE `fav`
  ADD CONSTRAINT `fk_fav_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_fav_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_fav_variante` FOREIGN KEY (`variante_id`) REFERENCES `p_variantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `marca_categoria`
--
ALTER TABLE `marca_categoria`
  ADD CONSTRAINT `fk_marca_categoria_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_marca_categoria_marca` FOREIGN KEY (`marca_id`) REFERENCES `p_marcas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `moviles`
--
ALTER TABLE `moviles`
  ADD CONSTRAINT `fk_dimensionespeso_cpu` FOREIGN KEY (`dimensionespeso_id`) REFERENCES `dimensionespeso` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_moviles_bateria` FOREIGN KEY (`bateria_id`) REFERENCES `baterias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_moviles_camara` FOREIGN KEY (`camara_id`) REFERENCES `camara` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_moviles_conectividad` FOREIGN KEY (`conectividad_id`) REFERENCES `conectividad` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_moviles_cpu` FOREIGN KEY (`cpu_id`) REFERENCES `cpu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_moviles_gpu` FOREIGN KEY (`gpu_id`) REFERENCES `gpu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_moviles_pantalla` FOREIGN KEY (`pantalla_id`) REFERENCES `pantalla` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `fk_pagos_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_ciudad_envio` FOREIGN KEY (`ciudad_envio_id`) REFERENCES `ciudades_envio` (`id`),
  ADD CONSTRAINT `fk_pedidos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_producto_almacenamiento` FOREIGN KEY (`almacenamiento_id`) REFERENCES `almacenamiento` (`id`),
  ADD CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `fk_producto_marca` FOREIGN KEY (`marca_id`) REFERENCES `p_marcas` (`id`),
  ADD CONSTRAINT `fk_producto_ram` FOREIGN KEY (`ram_id`) REFERENCES `ram` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_productos_moviles` FOREIGN KEY (`movil_id`) REFERENCES `moviles` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `variantes_almacenamiento`
--
ALTER TABLE `variantes_almacenamiento`
  ADD CONSTRAINT `fk_variante_almacenamiento` FOREIGN KEY (`almacenamiento_id`) REFERENCES `almacenamiento` (`id`),
  ADD CONSTRAINT `fk_variante_moviles` FOREIGN KEY (`movil_id`) REFERENCES `moviles` (`id`);

--
-- Filtros para la tabla `variantes_ram`
--
ALTER TABLE `variantes_ram`
  ADD CONSTRAINT `fk_carrito_movil` FOREIGN KEY (`movil_id`) REFERENCES `moviles` (`id`),
  ADD CONSTRAINT `fk_variante_ram` FOREIGN KEY (`ram_id`) REFERENCES `ram` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
