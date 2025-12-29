-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 29-12-2025 a las 20:19:47
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
  `categoria` varchar(100) NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`, `activo`) VALUES
(1, 'moviles', 1),
(2, 'smarttv', 1),
(3, 'laptops', 1),
(4, 'consolas', 1),
(5, 'tablets', 1),
(6, 'otros', 1),
(37, 'claro', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades_envio`
--

CREATE TABLE `ciudades_envio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `costo_envio` decimal(10,2) NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudades_envio`
--

INSERT INTO `ciudades_envio` (`id`, `nombre`, `costo_envio`, `activo`) VALUES
(1, 'La Vega', 50.00, 1),
(2, 'Santiago', 150.00, 1),
(3, 'Santo Domingo', 250.00, 1),
(4, 'Distrito Nacional', 250.00, 1),
(5, 'San Cristóbal', 220.00, 1),
(6, 'Monseñor Nouel', 100.00, 1),
(7, 'Duarte', 180.00, 1),
(8, 'Espaillat', 160.00, 1),
(9, 'Puerto Plata', 200.00, 1),
(10, 'Valverde', 170.00, 1),
(11, 'María Trinidad Sánchez', 220.00, 1),
(12, 'Samaná', 280.00, 1),
(13, 'Hato Mayor', 300.00, 1),
(14, 'El Seibo', 320.00, 1),
(15, 'La Altagracia', 350.00, 1),
(16, 'San Pedro de Macorís', 280.00, 1),
(17, 'Monte Plata', 260.00, 1),
(18, 'San José de Ocoa', 200.00, 1),
(19, 'Peravia', 230.00, 1),
(20, 'Azua', 250.00, 1),
(21, 'Barahona', 300.00, 1),
(22, 'Bahoruco', 280.00, 1),
(23, 'Independencia', 320.00, 1),
(24, 'Pedernales', 350.00, 1),
(25, 'Elías Piña', 280.00, 1),
(26, 'Dajabón', 250.00, 1),
(27, 'Montecristi', 270.00, 1),
(28, 'Santiago Rodríguez', 200.00, 1),
(29, 'San Juan', 230.00, 1),
(30, 'La Romana', 300.00, 1);

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
(246, 228, 12, 'iPhone 13 Pro', 1, 30995.00, 18.00, 0.00, 36574.10, 'blanco', '6GB', '256GB'),
(247, 229, 157, 'Smart TV TCL Androide 32 Pulgadas', 1, 10995.00, 18.00, 0.00, 12974.10, 'negro', NULL, NULL),
(248, 230, 12, 'iPhone 13 Pro', 1, 30995.00, 18.00, 0.00, 36574.10, 'gris', '6GB', '256GB'),
(249, 231, 93, 'Macbook Pro 16-Inch 2019 i9-16Ram 1TB', 1, 41995.00, 18.00, 0.00, 49554.10, 'gris', NULL, NULL),
(250, 231, 194, 'JBL FLIP 5', 1, 5995.00, 18.00, 0.00, 7074.10, 'negro', NULL, NULL),
(251, 231, 184, 'PlayStation 5 Slim', 1, 33995.00, 18.00, 0.00, 40114.10, 'blanco', NULL, NULL),
(252, 231, 41, 'SAMSUNG GALAXY NOTE 10 PLUS', 1, 13995.00, 18.00, 0.00, 16514.10, 'Negro', '12GB', '256GB'),
(253, 231, 71, 'IPAD PRO 12.9-INCH 6TA GEN 128GB', 1, 45995.00, 18.00, 0.00, 54274.10, 'Rosado', NULL, NULL),
(254, 232, 5, 'iPhone 12 Pro', 2, 23995.00, 18.00, 0.00, 56628.20, 'azul', '6GB', '256GB'),
(255, 233, 16, 'iPhone 14', 2, 26495.00, 18.00, 0.00, 62528.20, 'negro', '4GB', '128GB'),
(256, 234, 160, 'Smart TV TCL Google 55 Pulgadas', 2, 24995.00, 18.00, 0.00, 58988.20, 'negro', NULL, NULL),
(257, 234, 138, 'BEATS SOLO 4', 2, 8495.00, 18.00, 0.00, 20048.20, 'blanco', NULL, NULL),
(258, 235, 20, 'iPhone 14 Pro ', 2, 34495.00, 18.00, 0.00, 81408.20, 'negro', '6GB', '128GB'),
(259, 236, 21, 'iPhone 14 Pro', 3, 36495.00, 18.00, 0.00, 129192.30, 'blanco', '6GB', '256GB'),
(260, 237, 62, 'INFINIX SMART 8', 1, 4995.00, 18.00, 0.00, 5894.10, 'Negro', '4GB', '128GB');

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
(62, 228, 'pendiente', 50.00, NULL, NULL, NULL),
(63, 229, 'enviado', 50.00, '2025-12-10 21:34:30', NULL, NULL),
(64, 230, 'pendiente', 50.00, NULL, NULL, NULL),
(65, 231, 'enviado', 150.00, '2025-12-29 12:35:46', NULL, NULL),
(66, 232, 'pendiente', 50.00, NULL, NULL, NULL),
(67, 233, 'pendiente', 50.00, NULL, NULL, NULL),
(68, 234, 'pendiente', 50.00, NULL, NULL, NULL),
(69, 235, 'pendiente', 50.00, NULL, NULL, NULL),
(70, 236, 'pendiente', 50.00, NULL, NULL, NULL),
(71, 237, 'pendiente', 50.00, NULL, NULL, NULL);

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
(20, 1);

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
(2, 1, 2, 3, 1, 1, 2, 1),
(3, 1, 3, 2, 1, 1, 3, 3),
(4, 2, 1, 4, 2, 1, 4, 1),
(5, 2, 4, 4, 2, 1, 5, 1),
(6, 2, 4, 5, 2, 1, 6, 3),
(7, 2, 1, 6, 2, 1, 7, 1),
(8, 2, 1, 7, 2, 5, 8, 3),
(9, 3, 5, 8, 2, 5, 9, 9),
(10, 3, 5, 9, 2, 5, 10, 6),
(11, 2, 7, 10, 2, 5, 11, 1),
(12, 2, 7, 11, 2, 2, 12, 3),
(14, 4, 8, 9, 3, 2, 14, 6),
(15, 5, 7, 13, 2, 3, 15, 1),
(16, 2, 7, 14, 2, 5, 16, 3),
(17, 5, 7, 15, 2, 3, 17, 9),
(18, 5, 8, 16, 3, 4, 18, 6),
(19, 7, 9, 2, 5, 4, 19, 19),
(20, 7, 9, 3, 5, 4, 3, 18),
(21, 6, 9, 5, 4, 1, 6, 20),
(22, 6, 9, 7, 4, 1, 8, 22),
(23, 8, 10, 17, 6, 2, 12, 24),
(24, 8, 10, 17, 6, 3, 18, 23),
(25, 6, 11, 14, 4, 4, 15, 25),
(26, 6, 11, 18, 4, 1, 16, 26),
(27, 6, 11, 18, 4, 1, 17, 27),
(28, 10, 12, 19, 8, 1, 15, 28),
(29, 12, 13, 20, 10, 1, 16, 29),
(30, 11, 13, 19, 9, 1, 15, 30),
(31, 9, 12, 19, 7, 4, 13, 31),
(32, 10, 12, 19, 8, 4, 15, 32),
(33, 10, 12, 19, 8, 1, 15, 32),
(34, 11, 13, 20, 9, 4, 16, 32),
(35, 11, 13, 20, 9, 1, 16, 32),
(36, 12, 14, 21, 10, 1, 17, 32),
(37, 13, 15, 15, 3, 2, 13, 32),
(38, 14, 16, 16, 3, 3, 14, 32),
(39, 15, 17, 22, 11, 4, 15, 34),
(40, 15, 17, 22, 11, 4, 15, 34),
(41, 15, 18, 23, 11, 4, 16, 35),
(42, 16, 19, 22, 12, 4, 17, 35),
(43, 16, 19, 22, 12, 4, 17, 36),
(44, 22, 18, 32, 14, 4, 16, 36),
(45, 17, NULL, NULL, 13, NULL, NULL, 36),
(83, 24, 20, 32, 16, 4, 26, NULL),
(84, 23, 20, 31, 7, 4, 18, NULL);

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
(139, 228, 'paypal', 'completado', '82Y61807J0651384S', '2025-12-10 20:40:57'),
(140, 229, 'paypal', 'completado', '87G18009VR988633B', '2025-12-10 20:59:15'),
(141, 230, 'paypal', 'completado', '9S509024UX901960Y', '2025-12-11 13:36:17'),
(142, 231, 'paypal', 'completado', '97V00059EF398712X', '2025-12-11 13:44:24'),
(143, 232, 'paypal', 'completado', '5YS77365ND9247801', '2025-12-11 13:46:17'),
(144, 233, 'paypal', 'completado', '0FP63950D7834612J', '2025-12-11 13:47:00'),
(145, 234, 'paypal', 'completado', '68037426LW1597640', '2025-12-11 13:48:01'),
(146, 235, 'paypal', 'completado', '9U916185JC615113E', '2025-12-11 13:48:55'),
(147, 236, 'paypal', 'completado', '8X447422PC6073849', '2025-12-12 13:06:58'),
(148, 237, 'paypal', 'completado', '3JC657285H428651U', '2025-12-14 17:35:05');

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
(1, '6.1 pulgadas', '2532 x 1170 píxeles', 'OLED Super Retina XDR', '60 Hz', 'Ceramic Shield'),
(3, '6.7 pulgadas', '2778 × 1284 píxeles (458 ppp)', 'Super Retina XDR OLED', '60 Hz', 'Ceramic Shield (frontal), vidrio trasero con acero inoxidable'),
(6, '6,7 pulgadas ', '2778 × 1284 píxeles ', 'Super Retina XDR OLED con ProMotion ', '120 Hz adaptativa ', 'Ceramic Shield (igual protección frontal)'),
(9, '6.1 pulgadas', '2556 × 1179 píxeles (~460 ppi) ', 'Super Retina XDR OLED con tecnología LTPO / ProMot', '120 Hz adaptativo ', 'Ceramic Shield (frontal)'),
(17, '6,3 pulgadas ', '1206 × 2622 píxeles (~460 ppi) ', 'Super Retina XDR OLED con ProMotion (LTPO) ', '120 Hz adaptativo ', 'Igual frente con Ceramic Shield 2ª generación; bordes más finos '),
(18, '6,9 pulgadas ', '1320 × 2868 píxeles ', 'Super Retina XDR OLED con ProMotion (LTPO) ', '120 Hz adaptativo ', 'Igual frente con Ceramic Shield 2ª generación; marco más estrecho '),
(19, '6,4 pulgadas.', '3.040 × 1.440 píxeles', 'Dynamic AMOLED (también descrita como “Dynamic AMO', '60 Hz', 'Frente protegido con Corning Gorilla Glass 6.'),
(20, '6,8″ (diagonal)', '3040 × 1440 píxeles', 'Dynamic AMOLED, con certificación HDR10+ y función', '60 Hz ', 'Frente con Corning Gorilla Glass 6'),
(21, '6,9 pulgadas.', '3 088 × 1 440 píxeles (~496 ppi) ', 'Dynamic AMOLED 2X', '120 Hz ', 'Corning Gorilla Glass Victus.'),
(22, '6,8 pulgadas.', '3200 × 1440 píxeles (~515 ppi)', 'Dynamic AMOLED 2X', '120 Hz ', 'Corning Gorilla Glass Victus.'),
(23, '6,8 pulgadas.', '3 088 × 1 440 píxeles', 'Dynamic AMOLED 2X', '120 Hz', 'Corning Gorilla Glass Victus 2'),
(24, '6,9', '3 120 × 1 440 píxeles (~498 ppi)', 'Dynamic LTPO AMOLED 2X', '120 Hz', 'Corning Gorilla Armor 2.'),
(25, '6,7 pulgadas.', '720 × 1600 píxeles (HD+)', 'PLS LCD', '60 Hz', 'Gorilla Glass'),
(26, '6,7 pulgadas', '720 × 1600 píxeles (HD+)', 'PLS LCD.', '60 Hz ', 'Gorilla Glass'),
(27, '6,5 pulgadas', '1080 × 2340 píxeles', 'Super AMOLED', '90 Hz', 'Gorilla Glass'),
(28, '6,5 pulgadas', '1080 × 2340 píxeles', 'Super AMOLED', '120 Hz ', 'Gorilla Glass 5'),
(29, '6,67 pulgadas.', '2 400 × 1 080 píxeles', 'AMOLED / “FHD+ AMOLED”', '120 Hz ', 'Gorilla Glass 5'),
(30, '6.67 pulgadas', '1 220 × 2 712 píxeles', 'AMOLED', '120 Hz', 'Corning Gorilla Glass 5'),
(31, '6,88 pulgadas', '1 640 × 720 píxeles', 'IPS LCD / TFT LCD', '120 Hz', 'Corning Gorilla Glass 3'),
(32, '6.67 pulgadas', '2400 × 1080 píxeles', 'AMOLED', '120 Hz', 'Corning Gorilla Glass 5'),
(34, '6.7 pulgadas', '3 120 × 1 440 píxeles', 'LTPO AMOLED (“pOLED”)', '120 Hz', 'Gorilla Glass Victus'),
(35, '6,6 pulgadas', '720 × 1 612 píxeles (HD+)', 'IPS LCD.', '90 Hz', 'Gorilla Glass'),
(36, ' 6,75 pulgadas', '720 × 1 600 píxeles (HD+)', 'IPS LCD', '90 Hz', 'Gorilla Glass'),
(37, '6,56 pulgadas', '720 × 1 612 píxeles', 'IPS LCD', '90 Hz', 'Gorilla Glass'),
(38, '12,9 pulgadas', '2 732 × 2 048 píxeles', 'Liquid Retina XDR', '120 Hz', 'Pantalla laminada, con recubrimiento oleofóbico para huellas, recubrimiento antirreflejo.'),
(39, '13 pulgadas', '2752 × 2064 píxeles', 'Ultra Retina XDR', '120 Hz', 'Vidrio laminado, recubrimiento oleofóbico, coating antirreflejo'),
(40, '10,9 pulgadas', '2360 × 1640 píxeles', 'Liquid Retina', '60 Hz', ''),
(41, '8.0 pulgadas', '1280 × 800 pixels', 'IPS / HD LCD', '60 Hz', '');

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
  `estado` varchar(50) DEFAULT 'pendiente',
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `envio_diferente` tinyint(1) DEFAULT 0,
  `ciudad_envio_id` int(11) NOT NULL,
  `ciudad_envio_nombre` varchar(100) NOT NULL,
  `ciudad_envio_costo` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `usuario_id`, `nombre`, `apellido`, `email`, `direccion`, `distrito`, `telefono`, `total`, `estado`, `fecha_creacion`, `envio_diferente`, `ciudad_envio_id`, `ciudad_envio_nombre`, `ciudad_envio_costo`) VALUES
(228, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 36624.10, 'pagado', '2025-12-10 20:40:57', 0, 1, '', 0.00),
(229, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 13024.10, 'pagado', '2025-12-10 20:59:15', 0, 1, 'La Vega', 50.00),
(230, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 36624.10, 'pagado', '2025-12-11 13:36:17', 0, 1, 'La Vega', 50.00),
(231, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 167680.50, 'pagado', '2025-12-11 13:44:24', 0, 2, 'Santiago', 150.00),
(232, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 56678.20, 'pagado', '2025-12-11 13:46:17', 0, 1, 'La Vega', 50.00),
(233, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 62578.20, 'pagado', '2025-12-11 13:47:00', 0, 1, 'La Vega', 50.00),
(234, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 79086.40, 'pagado', '2025-12-11 13:48:01', 0, 1, 'La Vega', 50.00),
(235, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 81458.20, 'pagado', '2025-12-11 13:48:55', 0, 1, 'La Vega', 50.00),
(236, 79, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295524400', 129242.30, 'pagado', '2025-12-12 13:06:58', 0, 1, 'La Vega', 50.00),
(237, 98, 'Darlin', 'L.V', 'darlinlvaldez@gmail.com', 'La Vega', 'LA VEGA', '8295542244', 5944.10, 'pagado', '2025-12-14 17:35:05', 0, 1, 'La Vega', 50.00);

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
(1, 1, 'iPhone 12', 'El iPhone 12 combina potencia, elegancia y rendimiento en un diseño icónico. Este dispositivo se encuentra en condición Doble A (AA), lo que significa que luce casi como nuevo, con un funcionamiento impecable y solo ligeros signos de uso apenas perceptibles. Su pantalla Super Retina XDR ofrece colores vibrantes y una nitidez excepcional, mientras que el chip A14 Bionic garantiza un rendimiento rápido y fluido. Ideal para quienes buscan la calidad y experiencia premium de Apple a un precio más accesible.', 15995.00, 1, 20.00, '2025-08-05 23:06:00', '2025-10-23 00:39:00', 1, 1, 1, 1, 18.00),
(2, 1, 'iPhone 12', 'El iPhone 12 combina potencia, elegancia y rendimiento en un diseño icónico. Este dispositivo se encuentra en condición Doble A (AA), lo que significa que luce casi como nuevo, con un funcionamiento impecable y solo ligeros signos de uso apenas perceptibles. Su pantalla Super Retina XDR ofrece colores vibrantes y una nitidez excepcional, mientras que el chip A14 Bionic garantiza un rendimiento rápido y fluido. Ideal para quienes buscan la calidad y experiencia premium de Apple a un precio más accesible.', 17995.00, 1, 10.00, '2025-08-02 00:00:00', NULL, 1, 1, 2, 1, 18.00),
(3, 1, 'iPhone 12', 'El iPhone 12 combina potencia, elegancia y rendimiento en un diseño icónico. Este dispositivo se encuentra en condición Doble A (AA), lo que significa que luce casi como nuevo, con un funcionamiento impecable y solo ligeros signos de uso apenas perceptibles. Su pantalla Super Retina XDR ofrece colores vibrantes y una nitidez excepcional, mientras que el chip A14 Bionic garantiza un rendimiento rápido y fluido. Ideal para quienes buscan la calidad y experiencia premium de Apple a un precio más accesible.', 19495.00, 1, 0.00, '2025-08-02 04:00:00', NULL, 1, 1, 3, 1, 18.00),
(4, 2, 'iPhone 12 Pro', 'Este iPhone 12 Pro se presenta en condición \"Doble A\" (AA) o \"Triple A\" (AAA) — es decir, casi nuevo — sin rayones visibles en la pantalla ni en el chasis de acero inoxidable, cristal trasero intacto, sin abolladuras ni signos de uso intensivo. Su batería mantiene una salud alta (idealmente por encima del 85 %), y todos sus componentes — cámara, lector LiDAR, conexiones 5G, carga MagSafe, resistencia IP68 — funcionan perfectamente. En resumen: un dispositivo que luce y rinde como nuevo, aún cuando su fecha de fabricación ya tenga algunos años.', 21995.00, 1, 0.00, '2025-08-02 00:00:00', NULL, 1, 2, 2, 1, 18.00),
(5, 2, 'iPhone 12 Pro', 'Este iPhone 12 Pro se presenta en condición \"Doble A\" (AA) o \"Triple A\" (AAA) — es decir, casi nuevo — sin rayones visibles en la pantalla ni en el chasis de acero inoxidable, cristal trasero intacto, sin abolladuras ni signos de uso intensivo. Su batería mantiene una salud alta (idealmente por encima del 85 %), y todos sus componentes — cámara, lector LiDAR, conexiones 5G, carga MagSafe, resistencia IP68 — funcionan perfectamente. En resumen: un dispositivo que luce y rinde como nuevo, aún cuando su fecha de fabricación ya tenga algunos años.', 23995.00, 1, 0.00, '2025-08-01 20:00:00', NULL, 1, 2, 3, 1, 18.00),
(6, 3, 'iPhone 12 Pro Max', 'Este iPhone 12 Pro Max llega en condición \"Triple A (AAA)\" — prácticamente como nuevo — sin rayaduras visibles en la pantalla ni en el marco de acero inoxidable, vidrio trasero intacto, sin abolladuras ni signos de uso fuerte. Su batería mantiene una salud óptima (idealmente más del 85-90 %), y todas las funciones (cámaras, LiDAR, 5G, MagSafe, resistencia IP68) operan perfectamente. En resumen: un dispositivo que sigue rindiendo como los modelos más recientes, aun cuando su fecha de lanzamiento sea de hace unos años.', 27495.00, 1, 0.00, '2025-08-01 20:00:00', NULL, 1, 2, 2, 1, 18.00),
(7, 3, 'iPhone 12 Pro Max', 'Este iPhone 12 Pro Max llega en condición \"Triple A (AAA)\" — prácticamente como nuevo — sin rayaduras visibles en la pantalla ni en el marco de acero inoxidable, vidrio trasero intacto, sin abolladuras ni signos de uso fuerte. Su batería mantiene una salud óptima (idealmente más del 85-90 %), y todas las funciones (cámaras, LiDAR, 5G, MagSafe, resistencia IP68) operan perfectamente. En resumen: un dispositivo que sigue rindiendo como los modelos más recientes, aun cuando su fecha de lanzamiento sea de hace unos años.', 28995.00, 1, 0.00, '2025-05-31 16:00:00', NULL, 1, 2, 3, 1, 18.00),
(8, 3, 'iPhone 12 Pro Max', 'Este iPhone 12 Pro Max llega en condición \"Triple A (AAA)\" — prácticamente como nuevo — sin rayaduras visibles en la pantalla ni en el marco de acero inoxidable, vidrio trasero intacto, sin abolladuras ni signos de uso fuerte. Su batería mantiene una salud óptima (idealmente más del 85-90 %), y todas las funciones (cámaras, LiDAR, 5G, MagSafe, resistencia IP68) operan perfectamente. En resumen: un dispositivo que sigue rindiendo como los modelos más recientes, aun cuando su fecha de lanzamiento sea de hace unos años.', 29995.00, 1, 0.00, '2025-05-01 16:00:00', NULL, 1, 2, 4, 1, 18.00),
(9, 4, 'iPhone 13', '\"Este iPhone 13 se encuentra en condición \"Doble A (AA)\", es decir, muy bueno, con mínimos signos de uso: pantalla sin rayones o muy leves, marco de aluminio intacto, la parte trasera de vidrio sin golpes visibles, batería que conserva buena salud (idealmente por encima del 85-90 %), todas sus funciones — cámara, Face ID, conectividad 5G, carga MagSafe — operando a la perfección. En resumen: un equipo que aún se siente actual y sólido para muchos años de uso.\"', 23995.00, 1, 0.00, '2025-05-01 20:00:00', NULL, 1, 1, 2, 1, 18.00),
(10, 4, 'iPhone 13', '\"Este iPhone 13 se encuentra en condición \"Doble A (AA)\", es decir, muy bueno, con mínimos signos de uso: pantalla sin rayones o muy leves, marco de aluminio intacto, la parte trasera de vidrio sin golpes visibles, batería que conserva buena salud (idealmente por encima del 85-90 %), todas sus funciones — cámara, Face ID, conectividad 5G, carga MagSafe — operando a la perfección. En resumen: un equipo que aún se siente actual y sólido para muchos años de uso.\"', 25495.00, 1, 0.00, '2025-05-01 16:00:00', NULL, 1, 1, 3, 1, 18.00),
(11, 5, 'iPhone 13 Pro', 'Este iPhone 13 Pro se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con una estética impecable y funcionamiento perfecto. No presenta rayones visibles en la pantalla ni en el cuerpo, conserva su brillo y acabado original, y su batería mantiene una salud superior al 90 %. Las cámaras, Face ID, conectividad 5G y carga inalámbrica funcionan sin inconvenientes. En conjunto, es un dispositivo que combina potencia, elegancia y excelente conservación, ofreciendo una experiencia prácticamente idéntica a la de un equipo recién salido de fábrica.', 28495.00, 1, 0.00, '2025-05-14 16:00:00', NULL, 1, 2, 2, 1, 18.00),
(12, 5, 'iPhone 13 Pro', 'Este iPhone 13 Pro se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con una estética impecable y funcionamiento perfecto. No presenta rayones visibles en la pantalla ni en el cuerpo, conserva su brillo y acabado original, y su batería mantiene una salud superior al 90 %. Las cámaras, Face ID, conectividad 5G y carga inalámbrica funcionan sin inconvenientes. En conjunto, es un dispositivo que combina potencia, elegancia y excelente conservación, ofreciendo una experiencia prácticamente idéntica a la de un equipo recién salido de fábrica.', 30995.00, 1, 0.00, '2025-03-11 16:00:00', NULL, 1, 2, 3, 1, 18.00),
(13, 6, 'iPhone 13 Pro Max', 'Este iPhone 13 Pro Max se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo. Presenta una apariencia impecable, sin rayones perceptibles en la pantalla ni en el cuerpo de acero inoxidable, y con la parte trasera de vidrio en perfecto estado. Su batería conserva una salud superior al 90 %, manteniendo una autonomía sobresaliente. Todas sus funciones — Face ID, 5G, MagSafe, cámaras, sensores LiDAR y resistencia IP68 — operan perfectamente. En resumen, un equipo que combina potencia, elegancia y conservación excepcional, ofreciendo una experiencia de uso tan fluida como la de un dispositivo recién salido de fábrica', 32995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 2, 2, 1, 18.00),
(14, 6, 'iPhone 13 Pro Max', 'Este iPhone 13 Pro Max se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo. Presenta una apariencia impecable, sin rayones perceptibles en la pantalla ni en el cuerpo de acero inoxidable, y con la parte trasera de vidrio en perfecto estado. Su batería conserva una salud superior al 90 %, manteniendo una autonomía sobresaliente. Todas sus funciones — Face ID, 5G, MagSafe, cámaras, sensores LiDAR y resistencia IP68 — operan perfectamente. En resumen, un equipo que combina potencia, elegancia y conservación excepcional, ofreciendo una experiencia de uso tan fluida como la de un dispositivo recién salido de fábrica', 35995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 2, 3, 1, 18.00),
(15, 6, 'iPhone 13 Pro Max', 'Este iPhone 13 Pro Max se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo. Presenta una apariencia impecable, sin rayones perceptibles en la pantalla ni en el cuerpo de acero inoxidable, y con la parte trasera de vidrio en perfecto estado. Su batería conserva una salud superior al 90 %, manteniendo una autonomía sobresaliente. Todas sus funciones — Face ID, 5G, MagSafe, cámaras, sensores LiDAR y resistencia IP68 — operan perfectamente. En resumen, un equipo que combina potencia, elegancia y conservación excepcional, ofreciendo una experiencia de uso tan fluida como la de un dispositivo recién salido de fábrica', 37495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 2, 4, 1, 18.00),
(16, 7, 'iPhone 14', 'Este iPhone 14 se encuentra en condición \"Doble A (AA)\", es decir, muy bueno para su edad: la pantalla está prácticamente sin rayones visibles, el cuerpo de aluminio y vidrio conserva buen aspecto, no hay abolladuras graves ni marcas destacadas, la batería mantiene una salud aceptable (idealmente por encima del 80 %), y todas sus funciones — cámara, Face ID, conectividad 5G, carga inalámbrica — operan correctamente. En resumen: un equipo que aún luce moderno y rinde bien, aunque ya tenga algún tiempo de uso.', 26495.00, 1, 0.00, '2023-01-01 20:00:00', NULL, 1, 1, 2, 1, 18.00),
(17, 7, 'iPhone 14 ', 'Este iPhone 14 se encuentra en condición \"Doble A (AA)\", es decir, muy bueno para su edad: la pantalla está prácticamente sin rayones visibles, el cuerpo de aluminio y vidrio conserva buen aspecto, no hay abolladuras graves ni marcas destacadas, la batería mantiene una salud aceptable (idealmente por encima del 80 %), y todas sus funciones — cámara, Face ID, conectividad 5G, carga inalámbrica — operan correctamente. En resumen: un equipo que aún luce moderno y rinde bien, aunque ya tenga algún tiempo de uso.', 27995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 1, 3, 1, 18.00),
(18, 8, 'iPhone 14 Plus', 'Este iPhone 14 Plus se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo, con una estética impecable y funcionamiento perfecto. La pantalla no presenta rayones ni marcas visibles, el chasis de aluminio mantiene su brillo original y la parte trasera de vidrio se conserva en excelente estado. Su batería ofrece una salud superior al 90 %, asegurando una duración prolongada, y todas las funciones — cámaras, Face ID, 5G, MagSafe y resistencia IP68 — operan sin ningún inconveniente. En conjunto, es un dispositivo que combina potencia, diseño elegante y un estado de conservación excepcional, ofreciendo una experiencia tan fluida como la de un equipo recién adquirido.', 28995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 1, 2, 1, 18.00),
(19, 8, 'iPhone 14 Plus', 'Este iPhone 14 Plus se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo, con una estética impecable y funcionamiento perfecto. La pantalla no presenta rayones ni marcas visibles, el chasis de aluminio mantiene su brillo original y la parte trasera de vidrio se conserva en excelente estado. Su batería ofrece una salud superior al 90 %, asegurando una duración prolongada, y todas las funciones — cámaras, Face ID, 5G, MagSafe y resistencia IP68 — operan sin ningún inconveniente. En conjunto, es un dispositivo que combina potencia, diseño elegante y un estado de conservación excepcional, ofreciendo una experiencia tan fluida como la de un equipo recién adquirido.', 30995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 1, 3, 1, 18.00),
(20, 9, 'iPhone 14 Pro ', 'Este iPhone 14 Pro se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con un aspecto impecable y un funcionamiento óptimo. La pantalla está libre de rayones visibles, el marco de acero inoxidable luce brillante y sin marcas, y el vidrio trasero se conserva intacto. Su batería mantiene una salud superior al 90 %, garantizando excelente autonomía. Todas las funciones — cámaras, Face ID, Dynamic Island, 5G, MagSafe y resistencia IP68 — operan perfectamente. En resumen, un equipo que ofrece rendimiento de élite, diseño elegante y conservación excepcional, prácticamente indistinguible de uno nuevo.', 34495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 2, 1, 18.00),
(21, 9, 'iPhone 14 Pro', 'Este iPhone 14 Pro se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con un aspecto impecable y un funcionamiento óptimo. La pantalla está libre de rayones visibles, el marco de acero inoxidable luce brillante y sin marcas, y el vidrio trasero se conserva intacto. Su batería mantiene una salud superior al 90 %, garantizando excelente autonomía. Todas las funciones — cámaras, Face ID, Dynamic Island, 5G, MagSafe y resistencia IP68 — operan perfectamente. En resumen, un equipo que ofrece rendimiento de élite, diseño elegante y conservación excepcional, prácticamente indistinguible de uno nuevo.', 36495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 3, 1, 18.00),
(22, 9, 'iPhone 14 Pro', 'Este iPhone 14 Pro se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con un aspecto impecable y un funcionamiento óptimo. La pantalla está libre de rayones visibles, el marco de acero inoxidable luce brillante y sin marcas, y el vidrio trasero se conserva intacto. Su batería mantiene una salud superior al 90 %, garantizando excelente autonomía. Todas las funciones — cámaras, Face ID, Dynamic Island, 5G, MagSafe y resistencia IP68 — operan perfectamente. En resumen, un equipo que ofrece rendimiento de élite, diseño elegante y conservación excepcional, prácticamente indistinguible de uno nuevo.', 38995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 4, 1, 18.00),
(23, 10, 'iPhone 14 Pro Max', 'Este iPhone 14 Pro Max se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo, con una apariencia impecable y un funcionamiento perfecto. La pantalla no presenta rayones visibles, el marco de acero inoxidable conserva su brillo original y el vidrio trasero se encuentra sin daños ni marcas. Su batería mantiene una salud superior al 90 %, garantizando un rendimiento energético excelente. Todas las funciones — cámaras, Face ID, Dynamic Island, conectividad 5G, MagSafe y resistencia IP68 — operan al 100 %. En conjunto, un dispositivo premium en todos los sentidos, que combina potencia, elegancia y un estado de conservación excepcional, ofreciendo una experiencia de uso idéntica a la de un equipo nuevo.', 41495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 2, 1, 18.00),
(24, 10, 'iPhone 14 Pro Max', 'Este iPhone 14 Pro Max se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo, con una apariencia impecable y un funcionamiento perfecto. La pantalla no presenta rayones visibles, el marco de acero inoxidable conserva su brillo original y el vidrio trasero se encuentra sin daños ni marcas. Su batería mantiene una salud superior al 90 %, garantizando un rendimiento energético excelente. Todas las funciones — cámaras, Face ID, Dynamic Island, conectividad 5G, MagSafe y resistencia IP68 — operan al 100 %. En conjunto, un dispositivo premium en todos los sentidos, que combina potencia, elegancia y un estado de conservación excepcional, ofreciendo una experiencia de uso idéntica a la de un equipo nuevo.', 43995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 3, 1, 18.00),
(25, 10, 'iPhone 14 Pro Max', 'Este iPhone 14 Pro Max se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo, con una apariencia impecable y un funcionamiento perfecto. La pantalla no presenta rayones visibles, el marco de acero inoxidable conserva su brillo original y el vidrio trasero se encuentra sin daños ni marcas. Su batería mantiene una salud superior al 90 %, garantizando un rendimiento energético excelente. Todas las funciones — cámaras, Face ID, Dynamic Island, conectividad 5G, MagSafe y resistencia IP68 — operan al 100 %. En conjunto, un dispositivo premium en todos los sentidos, que combina potencia, elegancia y un estado de conservación excepcional, ofreciendo una experiencia de uso idéntica a la de un equipo nuevo.', 46495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 1, 9, 4, 1, 18.00),
(26, 11, 'iPhone 15', 'Este iPhone 15 se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con un aspecto impecable y un funcionamiento totalmente óptimo. La pantalla no muestra rayones perceptibles, el marco de aluminio mantiene su color y brillo originales, y el vidrio trasero luce sin marcas ni signos de uso. La batería conserva una salud superior al 95 %, garantizando excelente autonomía. Todas sus funciones — cámaras, Face ID, Dynamic Island, USB-C, 5G y MagSafe — operan perfectamente. En resumen, un dispositivo moderno, elegante y en estado excepcional, que ofrece una experiencia de usuario equivalente a la de un equipo recién salido de fábrica.', 35995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 2, 1, 18.00),
(27, 11, 'iPhone 15', 'Este iPhone 15 se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con un aspecto impecable y un funcionamiento totalmente óptimo. La pantalla no muestra rayones perceptibles, el marco de aluminio mantiene su color y brillo originales, y el vidrio trasero luce sin marcas ni signos de uso. La batería conserva una salud superior al 95 %, garantizando excelente autonomía. Todas sus funciones — cámaras, Face ID, Dynamic Island, USB-C, 5G y MagSafe — operan perfectamente. En resumen, un dispositivo moderno, elegante y en estado excepcional, que ofrece una experiencia de usuario equivalente a la de un equipo recién salido de fábrica.', 37995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 1, 9, 3, 1, 18.00),
(28, 12, 'iPhone 15 Plus', 'Este iPhone 15 Plus se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo, con una estética impecable y un funcionamiento óptimo. La pantalla no presenta rayones visibles, el marco de aluminio conserva su acabado original, y el vidrio trasero se mantiene sin daños ni marcas de uso. Su batería posee una salud superior al 95 %, ofreciendo una excelente autonomía. Todas las funciones — cámaras, Face ID, Dynamic Island, conectividad 5G, MagSafe y USB-C — operan perfectamente. En conjunto, un dispositivo potente, moderno y en estado excepcional, que brinda una experiencia de usuario igual a la de un equipo completamente nuevo.', 38995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 9, 2, 1, 18.00),
(29, 12, 'iPhone 15 Plus', 'Este iPhone 15 Plus se encuentra en condición \"Triple A (AAA)\", lo que significa que está casi nuevo, con una estética impecable y un funcionamiento óptimo. La pantalla no presenta rayones visibles, el marco de aluminio conserva su acabado original, y el vidrio trasero se mantiene sin daños ni marcas de uso. Su batería posee una salud superior al 95 %, ofreciendo una excelente autonomía. Todas las funciones — cámaras, Face ID, Dynamic Island, conectividad 5G, MagSafe y USB-C — operan perfectamente. En conjunto, un dispositivo potente, moderno y en estado excepcional, que brinda una experiencia de usuario igual a la de un equipo completamente nuevo.', 42995.00, 1, 0.00, '2023-01-01 20:00:00', NULL, 1, 9, 4, 1, 18.00),
(32, 14, 'iPhone 15 Pro Max', 'Este iPhone 15 Pro Max se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con un aspecto impecable y un funcionamiento completamente óptimo. La pantalla está libre de rayones visibles, el marco de titanio conserva su acabado original sin marcas ni señales de uso, y el vidrio trasero se encuentra en excelente estado. Su batería mantiene una salud superior al 95 %, garantizando un rendimiento energético sobresaliente. Todas las funciones — cámaras, Face ID, Dynamic Island, botón de acción, 5G, MagSafe y USB-C — operan perfectamente. En conjunto, un dispositivo de gama ultra premium, que combina potencia, diseño y conservación excepcional, ofreciendo una experiencia idéntica a la de un equipo completamente nuevo.', 54995.00, 1, 0.00, '2023-01-01 20:00:00', NULL, 1, 3, 3, 1, 18.00),
(33, 14, 'iPhone 15 Pro Max', 'Este iPhone 15 Pro Max se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con un aspecto impecable y un funcionamiento completamente óptimo. La pantalla está libre de rayones visibles, el marco de titanio conserva su acabado original sin marcas ni señales de uso, y el vidrio trasero se encuentra en excelente estado. Su batería mantiene una salud superior al 95 %, garantizando un rendimiento energético sobresaliente. Todas las funciones — cámaras, Face ID, Dynamic Island, botón de acción, 5G, MagSafe y USB-C — operan perfectamente. En conjunto, un dispositivo de gama ultra premium, que combina potencia, diseño y conservación excepcional, ofreciendo una experiencia idéntica a la de un equipo completamente nuevo.', 57995.00, 1, 0.00, '2023-01-01 20:00:00', NULL, 1, 3, 4, 1, 18.00),
(34, 14, 'iPhone 15 Pro Max', 'Este iPhone 15 Pro Max se encuentra en condición \"Triple A (AAA)\", es decir, casi nuevo, con un aspecto impecable y un funcionamiento completamente óptimo. La pantalla está libre de rayones visibles, el marco de titanio conserva su acabado original sin marcas ni señales de uso, y el vidrio trasero se encuentra en excelente estado. Su batería mantiene una salud superior al 95 %, garantizando un rendimiento energético sobresaliente. Todas las funciones — cámaras, Face ID, Dynamic Island, botón de acción, 5G, MagSafe y USB-C — operan perfectamente. En conjunto, un dispositivo de gama ultra premium, que combina potencia, diseño y conservación excepcional, ofreciendo una experiencia idéntica a la de un equipo completamente nuevo.', 61995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 1, 5, 5, 1, 18.00),
(35, 15, 'iPhone 16', 'Este iPhone 16 se encuentra en condición \"Triple A (AAA)\", es decir, prácticamente nuevo: sin marcas visibles ni rayones en pantalla o cuerpo, batería con salud óptima (idealmente superior al 90 %), funcionamiento perfecto de cámara, Face ID, puerto USB-C, conectividad 5G y resistencia al polvo/agua IP68 tal como lo especifica Apple. En resumen: un equipo moderno (con chip A18 de 3 nm, pantalla Super Retina XDR de 6.1″, resolución 2556 × 1179 píxeles y protección Ceramic Shield), en estado de conservación excepcional, listo para ofrecer un rendimiento muy similar al que tendría al salir de fábrica.', 52495.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 15, 4, 1, 18.00),
(36, 16, 'iPhone 16E', 'Este iPhone 16e se presenta en condición \"Triple A (AAA)\", es decir, prácticamente como nuevo. El chasis de aluminio no presenta abolladuras ni rasguños significativos, el frente de vidrio está sin marcas visibles y la parte trasera de cristal se encuentra en excelentes condiciones. La batería aún conserva una buena salud (idealmente superior al 90 %), y todas sus funciones —procesador A18, pantalla OLED, conectividad 5G, USB-C, Face ID— operan correctamente. Es un dispositivo moderno, potente y en estado de conservación excepcional, listo para ofrecer una experiencia de uso de primer nivel.', 44995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 14, 3, 1, 18.00),
(37, 17, 'iPhone 16 Plus', 'Este iPhone 16 Plus se encuentra en condición \"Triple A (AAA)\", es decir, prácticamente como nuevo: la pantalla grande de 6,7 pulgadas no presenta rayones visibles ni marcas de uso, el marco de aluminio mantiene su acabado original sin desgaste, y la parte trasera de vidrio con infusión de color está impecable. La batería conserva una salud óptima (idealmente por encima del 90 %) y todas sus funciones —incluyendo Dynamic Island, conectividad 5G, puertos USB-C, cámaras de 48 MP + 12 MP, IP68— operan perfectamente. En resumen: un dispositivo moderno, potente y en estado de conservación excepcional, listo para regalar una experiencia de uso de primer nivel.', 54995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 15, 2, 1, 18.00),
(38, 18, 'iPhone 16 Pro Max', 'Este iPhone 16 Pro Max está en condición \"Triple A (AAA)\", es decir, prácticamente como nuevo. La pantalla de 6.9″ OLED Super Retina XDR no muestra rayones visibles ni marcas de uso; el marco de titanio está intacto y el vidrio mate texturizado en la parte trasera se encuentra sin abolladuras ni desgaste perceptible. La batería conserva una salud óptima, garantizando una autonomía sobresaliente, y todas las funciones —procesador A18 Pro, cámara de 48 MP + ultra-ancha + teleobjetivo 5×, display Always-On, puerto USB-C, conectividad 5G, resistencia IP68— operan sin problemas. En resumen: un equipo de gama máxima en estado de conservación excepcional, que ofrece una experiencia muy cercana a la de un dispositivo recién salido de fábrica.', 74995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 1, 14, 3, 1, 18.00),
(39, 18, 'iPhone 16 Pro Max', 'Este iPhone 16 Pro Max está en condición \"Triple A (AAA)\", es decir, prácticamente como nuevo. La pantalla de 6.9″ OLED Super Retina XDR no muestra rayones visibles ni marcas de uso; el marco de titanio está intacto y el vidrio mate texturizado en la parte trasera se encuentra sin abolladuras ni desgaste perceptible. La batería conserva una salud óptima, garantizando una autonomía sobresaliente, y todas las funciones —procesador A18 Pro, cámara de 48 MP + ultra-ancha + teleobjetivo 5×, display Always-On, puerto USB-C, conectividad 5G, resistencia IP68— operan sin problemas. En resumen: un equipo de gama máxima en estado de conservación excepcional, que ofrece una experiencia muy cercana a la de un dispositivo recién salido de fábrica.', 84995.00, 1, 0.00, '2025-03-01 16:00:00', '2025-10-23 00:02:00', 1, 14, 4, 1, 18.00),
(40, 19, 'SAMSUNG GALAXY S10 PLUS', 'Este Galaxy S10 Plus (8 GB/128 GB) se presenta en condición \"Doble A (AA)\" — lo que significa que está muy bien conservado, con ligeros signos de uso casi imperceptibles. La pantalla de 6,4 pulgadas Dynamic AMOLED está sin rayones graves ni marcas profundas; el marco de aluminio y la parte trasera de vidrio / cristal mantienen buen aspecto, sin abolladuras ni pérdidas de acabado significativas. La batería aún conserva buena salud para una segunda vida útil, todas las funciones (triple cámara trasera, lector de huellas bajo pantalla, entrada 3,5 mm, expansión microSD, resistencia IP68) siguen operando correctamente. En resumen: un dispositivo de gama alta de su época, que aún ofrece buen rendimiento y fiabilidad, ideal para quien busca una excelente opción de uso sin coste de lanzamiento.', 9995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 4, 22, 1, 18.00),
(41, 20, 'SAMSUNG GALAXY NOTE 10 PLUS', 'Este Galaxy Note10 Plus de 12 GB RAM y 256 GB de almacenamiento se encuentra en condición \"Doble A (AA)\" — es decir, muy bien conservado con signos mínimos de uso. La pantalla de 6,8″ Dynamic AMOLED mantiene muy buen aspecto, sin rayones profundos ni daños visibles, y la carcasa de aluminio/vidrio está prácticamente intacta, sin abolladuras ni perdidas de acabado. La batería aún conserva buena salud, y todas las funciones clave —S Pen con sus gestos, cámara cuádruple (12 + 12 + 16 + ToF), slot microSD, resistencia IP68— operan correctamente.', 13995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 6, 21, 1, 18.00),
(42, 21, 'SAMSUNG GALAXY NOTE 20 ULTRA', 'Este Galaxy Note 20 Ultra (12 GB RAM + 128 GB de almacenamiento) se encuentra en condición \"Doble A (AA)\", lo que significa que está muy bien conservado con señales de uso mínimas. La pantalla de 6,9″ Dynamic AMOLED con tasa de refresco de 120 Hz está libre de rayones importantes y mantiene excelente visibilidad; el marco de acero/vidrio conserva buen acabado sin abolladuras destacadas; la parte trasera de vidrio está intacta. Todos sus componentes clave —cámara principal de 108 MP, zoom óptico 5×, S Pen, resistencia IP68, expansión microSD— funcionan correctamente. La batería mantiene buena salud para uso diario. En resumen: un dispositivo premium de su época, que aún ofrece una experiencia de alto nivel y rendimiento sólido, ideal para quien busca calidad sin coste de lanzamiento.', 17995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 5, 20, 1, 18.00),
(43, 22, 'SAMSUNG GALAXY S21 ULTRA', 'Este Galaxy S21 Ultra (12 GB/128 GB) se presenta en condición \"Doble A (AA)\", lo que significa que está muy bien conservado con signos leves de uso. La pantalla de 6,8 pulgadas Dynamic AMOLED con tasa de refresco de 120 Hz funciona perfectamente; el marco y la parte trasera muestran mínimo desgaste —no abolladuras graves ni marcas destacadas—. La batería mantiene buena salud, y todos los componentes clave funcionan correctamente: cámara principal de 108 MP con zoom óptico hasta 10×, grabación 8K, conectividad 5G, protección IP68. En resumen: un equipo de gama alta de su época que aún ofrece rendimiento sólido y una experiencia de usuario de gran nivel.', 17995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 5, 20, 1, 18.00),
(44, 23, 'SAMSUNG GALAXY S23 ULTRA', 'Este Galaxy S23 Ultra 12 + 256 GB se encuentra en condición \"Doble A (AA)\" — es decir, muy bien conservado con mínimos signos de uso. La pantalla está libre de rayones importantes; el marco y la parte trasera muestran desgaste tenue, sin abolladuras o daños evidentes. Todos los componentes —cámaras, conectividad 5G, funciones premium, batería— funcionan correctamente, y su batería aún mantiene buena salud para dar un rendimiento elevado. En resumen: un dispositivo ultra-premium de su generación que sigue ofreciendo una experiencia de uso de alto nivel, ideal para quien busca lo mejor sin pagar lo de un equipo completamente nuevo.', 39495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 13, 18, 1, 18.00),
(45, 24, 'SAMSUNG GALAXY S25 ULTRA', 'Este Samsung Galaxy S25 Ultra (12 GB/512 GB) se encuentra en condición \"Triple A (AAA)\", es decir, prácticamente como nuevo. La pantalla de 6,9″ LTPO AMOLED 2X está libre de rayones visibles, el marco de titanio conserva su acabado original sin marcas de uso, y el cristal trasero permanece sin abolladuras ni desgaste perceptible. La batería aún mantiene una salud óptima, y todos sus componentes — cámara cuádruple de hasta 200 MP, zoom óptico 5×, procesador Snapdragon 8 Elite, conectividad 5G, resistencia al agua y al polvo IP68 — operan al 100 %. En resumen: un equipo estrella de última generación en estado de conservación excepcional, listo para ofrecer una experiencia de uso de alto nivel.', 84995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 13, 17, 1, 18.00),
(46, 25, 'SAMSUNG GALAXY A05', 'Este Galaxy A05 (6 + 128 GB) se presenta en condición \"Doble A (AA)\" — es decir, muy bien conservado con signos mínimos de uso. La pantalla de 6,7″ mantiene buen aspecto, sin rayones profundos ni marcas destacadas; el marco y la parte trasera están libres de abolladuras graves o desgaste evidente. La batería conserva buena salud para su rango de uso y todas las funciones — cámara principal de 50 MP + sensor de 2 MP, batería de 5.000 mAh con carga rápida de 25 W, expansión microSD, conector de 3,5 mm — operan correctamente. En resumen: un dispositivo de entrada/moderna gama que aún ofrece experiencia funcional sólida, ideal para uso diario sin coste elevado.', 7995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 2, 15, 1, 18.00),
(47, 25, 'SAMSUNG GALAXY A05', 'Este Samsung Galaxy A05 (4 GB RAM + 64 GB de almacenamiento) se encuentra en condición \"Doble A (AA)\", mostrando un excelente estado general con leves señales de uso. Su pantalla de 6,7 pulgadas ofrece buena visibilidad y brillo uniforme, sin rayones notables; el marco y la parte trasera mantienen una apariencia limpia y cuidada. La batería de 5.000 mAh conserva buen rendimiento, y todas sus funciones — cámara principal de 50 MP, procesador eficiente, expansión microSD y carga rápida de 25 W — operan correctamente. En conjunto, es un teléfono confiable, moderno y funcional, ideal para quienes buscan un dispositivo equilibrado y en muy buen estado a un precio accesible.', 6995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 1, 16, 1, 18.00),
(48, 26, 'SAMSUNG GALAXY A15', 'Samsung Galaxy A15 se encuentra en condición \"Doble A (AA)\", mostrando un estado muy bien conservado con ligeros signos de uso. La pantalla Super AMOLED de 6,5 pulgadas con tasa de refresco de 90 Hz luce nítida y sin rayones visibles; el marco y la parte trasera presentan un aspecto limpio, sin daños importantes. La batería de 5.000 mAh mantiene una excelente autonomía, y todas las funciones — cámara principal de 50 MP, carga rápida de 25 W, lector de huellas lateral y conectividad 4G — operan correctamente. En resumen, un dispositivo eficiente, moderno y en muy buenas condiciones, ideal para uso diario con un equilibrio perfecto entre rendimiento y diseño.', 8995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 2, 15, 1, 18.00),
(49, 27, 'SAMSUNG GALAXY A25 5G', 'Samsung Galaxy A25 5G se encuentra en condición \"Doble A (AA)\", es decir, en excelente estado con mínimos signos de uso. La pantalla Super AMOLED de 6,5 pulgadas con tasa de refresco de 120 Hz luce brillante y sin rayones visibles, ofreciendo una experiencia visual fluida y nítida. El marco y la parte trasera están muy bien conservados, sin golpes ni desgastes notables. La batería de 5.000 mAh conserva una excelente duración, y todas las funciones — cámara principal de 50 MP con estabilización óptica, procesador Exynos 1280, carga rápida de 25 W y conectividad 5G — funcionan perfectamente. En conjunto, es un teléfono moderno, potente y en óptimas condiciones, ideal para quienes buscan rendimiento y estilo a un precio competitivo.', 12995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 2, 4, 14, 1, 18.00),
(50, 28, 'XIAOMI REDMI NOTE 13 5G', 'Xiaomi Redmi Note 13 5G se encuentra en condición \"Doble A (AA)\", mostrando un estado excelente con apenas señales de uso. Su pantalla AMOLED de 6,6 pulgadas con tasa de refresco de 120 Hz luce impecable, sin rayones notables ni marcas de desgaste. El marco y la parte trasera mantienen un aspecto limpio y bien cuidado. La batería de 5.000 mAh conserva gran autonomía, y todas sus funciones — cámara principal de 108 MP, procesador MediaTek Dimensity 6100+, carga rápida de 33 W y conectividad 5G — operan sin inconvenientes. En conjunto, es un dispositivo moderno, fluido y en excelentes condiciones, ideal para quienes buscan un teléfono confiable con buen rendimiento y acabado premium.', 10995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 7, 1, 18.00),
(51, 29, 'XIAOMI REDMI NOTE 13 PRO PLUS 5G ', 'Xiaomi Redmi Note 13 Pro Plus 5G se encuentra en condición \"Doble A (AA)\", lo que significa que está muy bien conservado, con mínimos signos de uso. Su pantalla curva AMOLED de 6,67 pulgadas con 120 Hz luce impecable, sin rayones visibles ni desgaste en los bordes. El marco y la parte trasera presentan una apariencia limpia y cuidada, sin golpes ni marcas notables. La batería de 5.000 mAh ofrece excelente autonomía y mantiene buen rendimiento, mientras que todas sus funciones — cámara principal de 200 MP con estabilización óptica, carga ultrarrápida de 120 W, conectividad 5G y diseño resistente IP68 — operan perfectamente. En resumen, un equipo potente, moderno y con acabados de gama alta, que se mantiene en excelente estado.', 20995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 5, 7, 1, 18.00),
(52, 30, 'XIAOMI POCO X6 PRO', 'Xiaomi POCO X6 Pro se encuentra en condición \"Doble A (AA)\", mostrando un excelente estado general con leves señales de uso. Su pantalla AMOLED de 6,67 pulgadas con 120 Hz luce brillante y sin rayones importantes, ofreciendo una experiencia fluida y nítida. El marco y la parte trasera mantienen un aspecto bien cuidado, sin golpes ni marcas destacables. La batería de 5.000 mAh conserva muy buena autonomía, y todas sus funciones — procesador Dimensity 8300 Ultra, carga rápida de 67 W, cámara principal de 64 MP con estabilización, conectividad 5G y altavoces estéreo — operan correctamente. En conjunto, es un equipo moderno, potente y en excelente estado, ideal para quienes buscan gran rendimiento sin sacrificar diseño ni calidad.', 17495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 7, 1, 18.00),
(53, 31, 'XIAOMI REDMI 14C', 'Xiaomi Redmi 14C se encuentra en condición \"Doble A (AA)\", muy bien conservado y con signos leves de uso. Su pantalla de 6,74 pulgadas con 90 Hz mantiene buena nitidez y no presenta rayones importantes; el marco y la parte trasera lucen cuidados, sin golpes ni desgastes notorios. La batería de 5.000 mAh mantiene excelente duración, y todas sus funciones — cámara principal de 50 MP, procesador eficiente para el uso diario, carga rápida de 18 W y expansión microSD — operan sin inconvenientes. En resumen, es un teléfono moderno, funcional y en muy buenas condiciones, ideal para quienes buscan un dispositivo económico pero confiable.', 7495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 1, 15, 1, 18.00),
(54, 32, 'XIAOMI REDMI NOTE 14', 'Xiaomi Redmi Note 14 se encuentra en condición \"Doble A (AA)\", mostrando un estado excelente con apenas señales de uso. Su pantalla de 6,7 pulgadas con 90/120 Hz (según versión) luce limpia, sin rayones visibles ni pérdida de brillo. El marco y la parte trasera mantienen un aspecto cuidado, sin golpes ni marcas notables. La batería de 5.000 mAh conserva muy buena autonomía, y todas sus funciones — cámara principal de 108 MP, carga rápida, procesador eficiente y conectividad sólida — operan perfectamente. En conjunto, es un teléfono moderno, fluido y muy bien conservado, ideal para quienes buscan rendimiento confiable y buen estado físico.', 10495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 20, 1, 18.00),
(55, 32, 'XIAOMI REDMI NOTE 14', 'Xiaomi Redmi Note 14 se encuentra en condición \"Doble A (AA)\", mostrando un excelente estado con signos mínimos de uso. Su pantalla amplia y nítida mantiene un acabado limpio, sin rayones visibles ni desgaste notable. El marco y la parte trasera lucen cuidados, sin golpes ni marcas evidentes. La batería de 5.000 mAh conserva muy buena duración, y todas sus funciones — cámara principal de 108 MP, procesador eficiente, carga rápida y almacenamiento amplio — funcionan perfectamente. En conjunto, es un dispositivo moderno, fluido y bien conservado, ideal para quienes buscan rendimiento sólido y un equipo en muy buenas condiciones físicas.', 11995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 7, 1, 18.00),
(56, 33, 'XIAOMI REDMI NOTE 14 5G ', 'Xiaomi Redmi Note 14 5G se encuentra en condición \"Doble A (AA)\", mostrando un estado muy bien cuidado con señales mínimas de uso. Su pantalla ofrece una excelente nitidez y permanece libre de rayones importantes; el marco y la parte trasera conservan un acabado limpio, sin golpes ni marcas visibles. La batería de 5.000 mAh mantiene una autonomía sólida, y todas sus funciones — conectividad 5G', 13995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 5, 7, 1, 18.00),
(57, 34, 'XIAOMI REDMI NOTE 14 PRO ', 'Xiaomi Redmi Note 14 Pro se encuentra en condición \"Doble A (AA)\", mostrando un estado excelente con signos muy leves de uso. Su pantalla AMOLED de alta nitidez con tasa de refresco fluida luce impecable, sin rayones visibles ni desgaste en los bordes. El marco y la parte trasera mantienen un aspecto cuidado, sin golpes ni marcas notables. La batería de 5.000 mAh conserva una autonomía sólida, y todas sus funciones — cámara principal de alta resolución, carga rápida, procesador potente y conectividad moderna — operan perfectamente. En conjunto, es un dispositivo fluido, moderno y muy bien conservado, ideal para quien busca calidad y rendimiento en excelente estado físico.', 15995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 3, 7, 1, 18.00),
(58, 35, 'XIAOMI REDMI NOTE 14 PRO 5G', 'Xiaomi Redmi Note 14 Pro 5G se encuentra en condición \"Doble A (AA)\", presentando un estado muy bien conservado con señales mínimas de uso. Su pantalla AMOLED de alta calidad con tasa de refresco fluida luce impecable, sin rayones visibles ni desgaste notable en los bordes. El marco y la parte trasera mantienen un aspecto limpio, sin golpes ni marcas importantes. La batería de 5.000 mAh ofrece excelente autonomía, y todas sus funciones — conectividad 5G, cámara principal de alta resolución con gran nitidez, carga rápida, procesador sólido y audio de buena calidad — funcionan perfectamente. En conjunto, es un dispositivo moderno, potente y muy bien cuidado, ideal para quienes buscan rendimiento y estética en excelente estado físico.', 17995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 5, 7, 1, 18.00),
(59, 36, 'XIAOMI REDMI NOTE 14 PRO PLUS 5G', 'Xiaomi Redmi Note 14 Pro Plus 5G se encuentra en condición \"Triple A (AAA)\", mostrando un estado prácticamente como nuevo, con un nivel de conservación excepcional. Su pantalla AMOLED curva de alta resolución con tasa de refresco fluida luce impecable, sin rayones visibles ni marcas en los bordes. El marco y la parte trasera mantienen un acabado limpio y elegante, sin golpes ni señales de desgaste. La batería de 5.000 mAh conserva un rendimiento excelente, y todas sus funciones — conectividad 5G, cámara principal de alta resolución con estabilización avanzada, carga ultrarrápida, procesador potente y diseño resistente — operan al 100 %. En conjunto, es un equipo de gama media-premium muy moderno, elegante y en estado sobresaliente, ideal para quienes buscan un dispositivo prácticamente nuevo y con gran rendimiento.', 22995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 3, 6, 14, 1, 18.00),
(60, 37, 'Google Pixel 7 Pro', 'se encuentra en condición \"Doble A (AA)\", lo que indica que está muy bien conservado y presenta solo signos leves de uso. Su pantalla OLED de 6,7 pulgadas con tasa de refresco de 120 Hz luce impecable, sin rayones visibles ni desgaste en los bordes. El marco y la parte trasera mantienen un aspecto limpio y cuidado, sin golpes ni marcas significativas. La batería ofrece un rendimiento estable, y todas sus funciones — cámara con procesamiento computacional avanzado, procesador Google Tensor G2, resistencia IP68, carga rápida y sonido de alta calidad — operan perfectamente. En conjunto, es un dispositivo premium, fluido y muy bien conservado, ideal para quienes buscan calidad fotográfica y gran rendimiento en excelente estado físico.', 17495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 4, 13, 20, 1, 18.00),
(61, 38, 'Google Pixel 8 Pro', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado excelente con signos mínimos de uso. Su pantalla Super Actua OLED de 6,7 pulgadas luce impecable, sin rayones visibles ni desgaste en los bordes, ofreciendo brillo alto y colores precisos. El marco y la parte trasera mantienen un acabado limpio y bien cuidado, sin golpes ni marcas notables. La batería conserva un rendimiento sólido, y todas sus funciones — cámara de nivel profesional con procesamiento computacional avanzado, chip Google Tensor G3, resistencia IP68, carga rápida y audio de alta calidad — operan perfectamente. En conjunto, es un dispositivo premium, potente y muy bien conservado, ideal para quienes buscan lo último en fotografía y rendimiento en excelente estado físico.', 24995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 4, 13, 20, 1, 18.00),
(62, 39, 'INFINIX SMART 8', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado general muy bien conservado con signos leves de uso. Su pantalla de 6,6 pulgadas con buena respuesta táctil se mantiene limpia, sin rayones importantes ni pérdida de brillo. El marco y la parte trasera lucen cuidados, sin golpes ni marcas notables. La batería de 5.000 mAh mantiene un rendimiento sólido para el uso diario, y todas sus funciones — cámara principal de 13 MP, lector de huellas lateral, carga rápida y desempeño fluido para tareas básicas — operan correctamente. En conjunto, es un dispositivo confiable, económico y en muy buenas condiciones físicas.', 4995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 19, 1, 15, 1, 18.00),
(63, 40, 'INFINIX SMART 9', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado muy bien conservado con leves señales de uso. Su pantalla de 6,6 pulgadas mantiene buena nitidez y no presenta rayones importantes; el marco y la parte trasera lucen cuidados, sin golpes ni marcas visibles. La batería de 5.000 mAh ofrece un rendimiento estable para el uso diario, y todas sus funciones — cámara principal de buena calidad, desbloqueo rápido, carga eficiente y desempeño fluido para tareas básicas — operan sin inconvenientes. En conjunto, es un equipo práctico, económico y en excelente estado físico, ideal para usuarios que buscan funcionalidad y buen cuidado.', 5995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 19, 1, 15, 1, 18.00),
(64, 41, 'INFINIX HOT 50I', 'mostrando un estado muy bien conservado con señales mínimas de uso. Su pantalla de 6,6 pulgadas mantiene buena nitidez y brillo uniforme, sin rayones destacados ni desgaste visible. El marco y la parte trasera conservan un aspecto limpio, sin golpes ni marcas notables. La batería de 5.000 mAh ofrece excelente duración para el uso diario, y todas sus funciones — cámara principal de buena resolución, rendimiento fluido gracias a su memoria amplia, carga eficiente y seguridad rápida — operan correctamente. En conjunto, es un equipo moderno, espacioso y en muy buenas condiciones, ideal para quienes buscan gran capacidad y buen estado físico.', 7495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 19, 2, 31, 1, 18.00),
(65, 42, 'ZTE A35 CORE', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado muy bien cuidado con signos leves de uso. Su pantalla de 6,52 pulgadas se mantiene limpia, sin rayones importantes ni pérdida de brillo. El marco y la parte trasera conservan un aspecto ordenado, sin golpes ni marcas notables. La batería ofrece buen rendimiento para el uso diario, y todas sus funciones — cámara principal de buena calidad para su gama, desempeño estable, desbloqueo rápido y conectividad esencial — operan correctamente. En conjunto, es un dispositivo sencillo, confiable y en muy buenas condiciones físicas, ideal para quien necesita un equipo funcional y económico.', 3995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, 20, 1, 32, 1, 18.00),
(67, 44, 'ZTE BLADE V60', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado muy bien conservado con signos mínimos de uso. Su pantalla amplia y nítida luce limpia, sin rayones importantes ni desgaste visible en los bordes. El marco y la parte trasera mantienen un aspecto cuidado, sin golpes ni marcas notables. La batería ofrece excelente duración, y todas sus funciones — cámara principal de alta resolución, desempeño fluido gracias a su memoria amplia, carga rápida y conectividad estable — operan perfectamente. En conjunto, es un dispositivo moderno, versátil y en muy buenas condiciones físicas, ideal para quienes buscan rendimiento y buena capacidad de almacenamiento.', 7495.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 20, 2, 14, 1, 18.00),
(68, 45, 'ZTE NUBIA NEO 2 5G', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado muy bien conservado con signos leves de uso. Su pantalla de gran tamaño y buena tasa de refresco luce impecable, sin rayones importantes ni desgaste notable. El marco y la parte trasera presentan un diseño gaming muy bien cuidado, sin golpes ni marcas visibles. La batería ofrece excelente rendimiento, y todas sus funciones — conectividad 5G, procesador potente para juegos, gatillos táctiles, sistema de cámara competente y almacenamiento amplio — funcionan perfectamente. En conjunto, es un dispositivo moderno, llamativo y en muy buenas condiciones físicas, ideal para quienes buscan un equipo con estilo gamer y gran rendimiento.', 11995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 20, 4, 14, 1, 18.00),
(69, 84, 'MOTOROLA E14', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado muy bien conservado con señales mínimas de uso. Su pantalla mantiene un aspecto limpio, sin rayones importantes ni desgaste destacado; el marco y la parte trasera están en buen estado, sin golpes visibles o marcas significativas. La batería ofrece rendimiento adecuado para tareas básicas, y todas sus funciones — cámara principal funcional, almacenamiento ampliable, interfaz fluida para uso cotidiano — operan correctamente. En conjunto, es un dispositivo básico, funcional y en muy buenas condiciones físicas, ideal para usuarios que buscan una opción accesible y confiable para uso diario.', 4995.00, 1, 0.00, '2023-01-01 12:00:00', NULL, 10, 18, 16, 1, 18.00);
INSERT INTO `productos` (`id`, `movil_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `descuento`, `fecha`, `fecha_publicacion`, `marca_id`, `ram_id`, `almacenamiento_id`, `activo`, `impuesto`) VALUES
(70, 84, 'MOTOROLA G04', 'se encuentra en condición \"Doble A (AA)\", presentando un estado físico muy cuidado, con mínimos signos de uso. La pantalla luce limpia, sin rayones notorios ni marcas que afecten la visualización. El marco y la tapa trasera están bien conservados, sin golpes ni desgastes relevantes. A nivel funcional, el equipo responde de forma fluida para tareas cotidianas gracias a sus 4 GB de RAM, y el almacenamiento de 128 GB ofrece espacio suficiente para apps y fotos. La cámara, batería y conectividad funcionan correctamente, proporcionando una experiencia estable y confiable. En conjunto, es un equipo moderno, económico y en excelente estado físico, ideal para quien busca un', 5995.00, 1, 0.00, '2023-01-01 16:00:00', NULL, NULL, 1, 15, 1, 18.00),
(71, NULL, 'IPAD PRO 12.9-INCH 6TA GEN 128GB', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado físico sumamente cuidado. La pantalla Liquid Retina XDR luce impecable, sin rayones visibles ni sombras, conservando su brillo y contraste característicos. El marco y la parte trasera presentan un desgaste mínimo, sin golpes, hundimientos o marcas relevantes. En el apartado funcional, opera con total fluidez gracias al chip M2, ideal para tareas profesionales, edición, diseño y uso avanzado. La batería, cámaras, Face ID, altavoces y conectividad funcionan correctamente. En conjunto, es un dispositivo de gama alta en excelente estado, perfecto para quienes buscan alto rendimiento, calidad visual superior y un acabado prácticamente como nuevo.', 45995.00, 5, 0.00, '2023-01-01 08:00:00', '2025-10-24 21:31:00', 1, NULL, NULL, 1, 18.00),
(72, NULL, 'IPAD PRO 12.9 6TA GEN 256GB', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. Su pantalla Liquid Retina XDR se mantiene limpia, sin rayones marcados ni manchas, conservando el brillo y la nitidez característicos de este modelo. El marco y la parte trasera solo presentan señales leves de uso, sin abolladuras ni golpes. A nivel funcional, ofrece un rendimiento excepcional gracias al chip M2, ideal para multitarea, diseño, edición y aplicaciones profesionales. La batería, cámaras, Face ID, altavoces y puertos responden perfectamente. En general, es un equipo de gama alta en excelente estado, perfecto para quienes buscan potencia, calidad de pantalla superior y un acabado casi como nuevo.', 47495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(73, NULL, 'IPAD PRO M2 512GB 12.9 6TA GEN ', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. Su pantalla Liquid Retina XDR se mantiene limpia, sin rayones marcados ni manchas, conservando el brillo y la nitidez característicos de este modelo. El marco y la parte trasera solo presentan señales leves de uso, sin abolladuras ni golpes. A nivel funcional, ofrece un rendimiento excepcional gracias al chip M2, ideal para multitarea, diseño, edición y aplicaciones profesionales. La batería, cámaras, Face ID, altavoces y puertos responden perfectamente. En general, es un equipo de gama alta en excelente estado, perfecto para quienes buscan potencia, calidad de pantalla superior y un acabado casi como nuevo.', 49995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(74, NULL, 'IPAD PRO 13 PULGADAS M4 512GB', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. Su pantalla Liquid Retina XDR se mantiene limpia, sin rayones marcados ni manchas, conservando el brillo y la nitidez característicos de este modelo. El marco y la parte trasera solo presentan señales leves de uso, sin abolladuras ni golpes. A nivel funcional, ofrece un rendimiento excepcional gracias al chip M2, ideal para multitarea, diseño, edición y aplicaciones profesionales. La batería, cámaras, Face ID, altavoces y puertos responden perfectamente. En general, es un equipo de gama alta en excelente estado, perfecto para quienes buscan potencia, calidad de pantalla superior y un acabado casi como nuevo.', 57995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(75, NULL, 'IPAD PRO 13 PULGADAS M4 256GB', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. Su pantalla Liquid Retina XDR se mantiene limpia, sin rayones marcados ni manchas, conservando el brillo y la nitidez característicos de este modelo. El marco y la parte trasera solo presentan señales leves de uso, sin abolladuras ni golpes. A nivel funcional, ofrece un rendimiento excepcional gracias al chip M2, ideal para multitarea, diseño, edición y aplicaciones profesionales. La batería, cámaras, Face ID, altavoces y puertos responden perfectamente. En general, es un equipo de gama alta en excelente estado, perfecto para quienes buscan potencia, calidad de pantalla superior y un acabado casi como nuevo.', 54995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(76, NULL, 'IPAD 10 GEN 64GB', 'El iPad 10ma Generación (64GB) se encuentra en condición \"Doble A (AA)\", mostrando un excelente estado estético y funcional. La pantalla de 10.9 pulgadas está libre de rayaduras visibles y ofrece un brillo uniforme. El marco y la cubierta trasera pueden presentar mínimas marcas normales de uso, pero sin golpes ni abolladuras. En cuanto al rendimiento, funciona de manera fluida gracias al chip A14 Bionic, ideal para estudios, trabajo ligero, videollamadas, aplicaciones educativas, multimedia y redes sociales. Todos sus componentes —batería, cámaras, parlantes, micrófono, botones y conectividad USB-C— están probados y operando correctamente.', 23495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(79, NULL, 'AMAZON FIRE 8 32GB', 'está en condición \"Doble A (AA)\", mostrando un excelente estado tanto estético como funcional. Su pantalla de 8 pulgadas se mantiene sin rayaduras visibles y con buen brillo. La carcasa puede presentar marcas mínimas de uso, pero nada que afecte su aspecto general. En rendimiento, ofrece una experiencia fluida para tareas básicas gracias a su procesador de 6 núcleos, ideal para lectura, clases en línea, contenido multimedia, navegación y apps livianas. Todos los componentes —batería, cámara, parlantes, micrófono, botones y puerto USB-C— han sido verificados y funcionan correctamente.', 2995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 5, NULL, NULL, 1, 18.00),
(80, NULL, 'AMAZON FIRE 8 64GB', 'se encuentra en condición \"Doble A (AA)\", presentando un estado muy bien cuidado con señales mínimas de uso. Su pantalla de 8 pulgadas luce limpia y sin rayaduras notables, manteniendo buena calidad para leer, estudiar o disfrutar contenido multimedia. La carcasa muestra apenas marcas leves, sin golpes ni detalles que afecten su apariencia o funcionamiento. En desempeño, su procesador de seis núcleos ofrece fluidez para tareas cotidianas como navegación, apps básicas, videollamadas y reproducción de videos. La batería, los botones, cámaras, bocinas y el puerto USB-C han sido revisados y funcionan correctamente. En general, es una tablet práctica, ligera y en excelente estado para uso diario y entretenimiento.', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 5, NULL, NULL, 1, 18.00),
(81, NULL, 'ASTRO 8R 32G', 'se encuentra en condición \"Doble A (AA)\", conservando un estado general muy bien cuidado. Su pantalla de 8 pulgadas luce limpia, sin rayaduras visibles, ofreciendo una experiencia adecuada para lectura, clases, navegación y contenido multimedia. La carcasa puede mostrar leves señales de uso, pero nada que afecte su estética ni funcionalidad. En rendimiento, cumple perfectamente con tareas básicas gracias a su configuración ligera y eficiente, ideal para estudiantes, usuarios casuales y actividades del día a día. La batería mantiene una buena duración, y todos sus componentes —botones, bocinas, cámaras y puerto de carga— han sido verificados y funcionan sin problemas. Es una opción práctica y económica en muy buen estado.', 3495.00, 5, 0.00, '2025-03-30 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(82, NULL, 'XIAOMI REDMI PAD SE 8.7', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien conservado con apenas señales leves de uso. Su pantalla de 8.7 pulgadas se mantiene nítida, sin rayaduras visibles y con una excelente reproducción de colores, ideal para estudiar, trabajar ligero o disfrutar contenido multimedia. El cuerpo metálico luce limpio, sin golpes ni desgastes relevantes. En rendimiento, ofrece una experiencia fluida para tareas cotidianas gracias a su procesador eficiente y su buen manejo de apps, lectura y multitarea básica. La batería conserva una autonomía sólida, y todos sus componentes —botones, cámaras, parlantes estéreo, micrófono y puerto de carga— funcionan correctamente. En general, es una tablet moderna, práctica y en muy buen estado para uso diario.', 8495.00, 5, 0.00, '2023-01-01 12:00:00', '2025-10-24 20:46:00', 3, 1, 15, 1, 18.00),
(83, NULL, 'VORTEX T10 32GB ', 'se encuentra en condición \"Doble A (AA)\", conservando un aspecto general muy bien cuidado. Su pantalla de 10 pulgadas se mantiene limpia, sin rayaduras visibles, ofreciendo una visualización cómoda para estudiar, ver videos, leer o realizar tareas básicas. La carcasa presenta solo señales mínimas de uso, sin golpes ni detalles que afecten su funcionamiento. En rendimiento, cumple adecuadamente con actividades esenciales como navegación, aplicaciones ligeras, clases en línea y entretenimiento básico. La batería mantiene una duración estable, y todos sus componentes —botones físicos, cámaras, parlantes, micrófono y puerto de carga— han sido revisados y funcionan sin inconvenientes. En resumen, es una tablet práctica, económica y en muy buen estado para uso cotidiano.', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 6, NULL, NULL, 1, 18.00),
(84, NULL, 'HOTPEPPER 32GB ', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien conservado con marcas mínimas de uso. Su pantalla se mantiene limpia, sin rayaduras visibles, ofreciendo una experiencia adecuada para tareas básicas como navegación, redes sociales, lectura y uso cotidiano. La carcasa luce en buen estado, sin golpes ni detalles que afecten su estética. En rendimiento, ofrece lo necesario para actividades simples gracias a su configuración ligera y eficiente, ideal para usuarios que buscan un dispositivo funcional y económico. La batería mantiene un desempeño estable, y todos sus componentes —botones, cámara, parlantes, micrófono y puerto de carga— han sido probados y funcionan correctamente. En general, es un dispositivo práctico, accesible y en muy buen estado para el día a día.', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(85, NULL, 'X10MAX 64GB ', 'se encuentra en condición \"Doble A (AA)\", presentando un estado físico muy bien cuidado con señales mínimas de uso. Su pantalla de gran tamaño, ideal para clases, entretenimiento y multitarea básica, se mantiene limpia y sin rayaduras visibles. La carcasa conserva un aspecto sólido y sin golpes, manteniendo una apariencia general muy buena. En cuanto al rendimiento, ofrece fluidez para tareas esenciales como navegación, aplicaciones livianas, lectura, videollamadas y consumo de contenido multimedia. La batería brinda una autonomía estable, y todos sus componentes —botones, cámaras, parlantes, micrófono y puerto de carga— han sido revisados y funcionan correctamente. En resumen, es un dispositivo práctico, amplio y en excelente estado para uso diario.', 3995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(86, NULL, 'VORTEX T10 PRO MAX 64GB ', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien conservado con señales mínimas de uso. Su pantalla de 10 pulgadas luce limpia, sin rayaduras visibles y con buena calidad para estudiar, ver contenido, leer o realizar tareas diarias. La carcasa mantiene un aspecto sólido, sin golpes ni desgastes relevantes, ofreciendo una sensación robusta y bien cuidada. En rendimiento, cumple de manera eficiente con tareas básicas gracias a su configuración ligera, ideal para clases en línea, navegación, apps esenciales y entretenimiento general. La batería conserva una autonomía estable, y todos sus componentes —botones, cámaras, parlantes, micrófono y puerto de carga— han sido probados y funcionan correctamente. En conjunto, es una tablet práctica, accesible y en muy buen estado para el uso cotidiano.', 3995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 6, NULL, NULL, 1, 18.00),
(87, NULL, 'SKYPAD 10 32GB ', 'se encuentra en condición \"Doble A (AA)\", presentando un estado físico muy bien cuidado con apenas señales leves de uso. Su pantalla de 10 pulgadas se mantiene limpia y sin rayaduras visibles, ideal para estudiar, ver videos, leer o realizar actividades cotidianas. La carcasa luce sólida y sin golpes, conservando una apariencia general muy buena. En cuanto al rendimiento, ofrece lo necesario para tareas básicas como navegación, aplicaciones ligeras, clases en línea y entretenimiento sencillo, gracias a su configuración eficiente. La batería mantiene un desempeño estable, y todos sus componentes —botones, cámaras, parlantes, micrófono y puerto de carga— funcionan correctamente tras las pruebas realizadas. En resumen, es una tablet práctica, económica y en muy buen estado para el uso diario.', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 7, NULL, NULL, 1, 18.00),
(88, NULL, 'SKYPAD 10 PRO MAX 64GB ', 'está en condición \"Doble A (AA)\", mostrando un estado muy bien conservado con señales mínimas de uso. Su pantalla de 10 pulgadas se mantiene nítida, limpia y sin rayaduras visibles, perfecta para estudiar, ver contenido multimedia, leer o trabajar de manera ligera. La carcasa conserva un aspecto sólido y sin golpes, lo que refleja un cuidado adecuado del dispositivo. En rendimiento, ofrece fluidez suficiente para tareas cotidianas como navegación, aplicaciones esenciales, videollamadas y clases en línea, gracias a su configuración eficiente. La batería mantiene una autonomía estable, y todos sus componentes —botones, cámaras, parlantes, micrófono y puerto de carga— han sido verificados y funcionan correctamente. En conjunto, es una tablet práctica, accesible y en muy buen estado para el uso diario.', 3995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, 7, NULL, NULL, 1, 18.00),
(89, NULL, 'Macbook Pro 13-Inch 2020 i5-8ram 512GB', 'con procesador Intel Core i5, 8GB de RAM y 512GB de almacenamiento SSD se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado con señales mínimas de uso. Su pantalla Retina mantiene una nitidez impecable, sin rayaduras visibles, y el cuerpo de aluminio luce limpio, sin abolladuras ni marcas relevantes. En rendimiento, sigue siendo una máquina muy capaz para productividad, estudios, diseño ligero, edición básica y multitarea fluida gracias a su procesador Intel y su SSD rápido. El teclado, trackpad y parlantes funcionan perfectamente, al igual que los puertos Thunderbolt. La batería conserva un desempeño sólido, y todas sus funciones han sido verificadas. En resumen, es un portátil potente, elegante y en excelente estado, ideal para trabajo diario y uso profesional ligero.', 31995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(91, NULL, 'Macbook Pro 16-Inch 2019 i7-16ram 512GB', 'con procesador Intel Core i7, 16GB de RAM y 512GB SSD se encuentra en condición \"Doble A (AA)\", conservando un estado físico muy bien mantenido con señales mínimas de uso. Su amplia pantalla Retina de 16\" ofrece una calidad impecable, libre de rayaduras visibles, mientras que el cuerpo de aluminio luce sólido y sin abolladuras. En rendimiento, sigue siendo una máquina extremadamente potente, ideal para edición de video, diseño, producción musical, multitarea exigente y trabajo profesional avanzado, gracias a su procesador Intel de alto desempeño y su memoria de 16GB. El teclado, trackpad, parlantes y puertos funcionan a la perfección, y la batería mantiene un desempeño estable. En conjunto, es un portátil profesional de gran potencia, pantalla amplia y excelente estado, ideal para usuarios que requieren capacidad y calidad en su día a día.', 34995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(92, NULL, 'Macbook Pro 16-Inch 2019 i9-32Ram 512GB', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien conservado con apenas señales leves de uso. Su enorme pantalla Retina de 16\" se mantiene impecable, sin rayaduras visibles, ofreciendo una calidad visual profesional. El chasis de aluminio luce sólido, sin golpes ni desgastes relevantes. En rendimiento, es una máquina de alta gama diseñada para tareas exigentes como edición de video 4K, proyectos de audio profesionales, diseño avanzado, programación pesada y multitarea intensiva. Su procesador i9 junto con los 32GB de RAM garantizan potencia y fluidez incluso en cargas de trabajo muy altas. Todos sus componentes —teclado, trackpad, altavoces y puertos— funcionan correctamente, y la batería conserva un desempeño estable. En resumen, es un equipo profesional de máximo rendimiento, con una construcción premium y en excelente estado, ideal para quienes necesitan potencia real en su flujo de trabajo', 39995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(93, NULL, 'Macbook Pro 16-Inch 2019 i9-16Ram 1TB', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado con señales mínimas de uso. Su amplia pantalla Retina de 16\" se mantiene impecable, sin rayaduras visibles, y el cuerpo de aluminio conserva una apariencia sólida y profesional, libre de golpes o marcas importantes. En cuanto al rendimiento, es una máquina de alto nivel orientada a trabajos exigentes como edición de video, diseño, producción musical, animación, programación avanzada y multitarea pesada. Su procesador i9 y el generoso almacenamiento de 1TB SSD garantizan fluidez, rapidez y excelente capacidad para proyectos grandes. Todos sus elementos —teclado, trackpad, parlantes de alta fidelidad y puertos— funcionan perfectamente, y la batería mantiene un desempeño estable. En conjunto, es un portátil profesional potente, elegante y en excelente estado, ideal para quienes requieren desempeño serio y almacenamiento amplio en su día a día.', 41995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(94, NULL, 'Macbook Air M1 8Ram 256GB ', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien conservado con señales mínimas de uso. Su pantalla Retina de 13 pulgadas luce impecable, sin rayaduras visibles, y el cuerpo de aluminio mantiene un acabado limpio, sin golpes ni marcas relevantes. En cuanto al rendimiento, ofrece una experiencia excepcional gracias al chip Apple M1, que brinda potencia, velocidad y eficiencia incluso en multitarea, trabajos de oficina, clases, diseño ligero, edición básica y productividad diaria. Su funcionamiento es silencioso y fluido, con un desempeño muy superior al de los modelos Intel anteriores. Todos sus componentes —teclado, trackpad, parlantes, cámara, puertos y batería— han sido probados y funcionan correctamente, manteniendo una autonomía sobresaliente. En conjunto, es un equipo moderno, rápido y en excelente estado, perfecto para estudiantes, profesionales y usuarios que buscan portabilidad con alto rendimiento.', 44995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(96, NULL, 'Macbook Air 15-Inch M2 256GB ', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien conservado con señales mínimas de uso. Su amplia pantalla Retina de 15.3\" luce impecable, sin rayaduras visibles, ofreciendo una calidad visual nítida y vibrante. El cuerpo de aluminio mantiene un acabado limpio, sin golpes ni marcas relevantes, destacándose por su diseño delgado y elegante. En rendimiento, el chip Apple M2 brinda una experiencia fluida y potente para tareas de oficina, clases, multitarea, diseño ligero, edición básica y productividad diaria, combinando excelente velocidad con eficiencia energética. Todos sus componentes —teclado, trackpad, cámara, parlantes, puertos y batería— han sido probados y funcionan perfectamente, manteniendo una autonomía sólida. En conjunto, es un portátil moderno, silencioso y en excelente estado, ideal para quienes buscan una pantalla más grande sin sacrificar portabilidad ni rendimiento.', 54995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(97, NULL, 'HP Victus i5 12GEN 3050TI 8+512GB ', 'se encuentra en condición \"Doble A (AA)\", conservando un estado físico muy bien cuidado con señales mínimas de uso. Su pantalla ofrece una visualización clara y sin rayaduras visibles, y el chasis mantiene un acabado sólido, sin golpes ni marcas relevantes. En rendimiento, es una laptop potente ideal para gaming, diseño, edición, multitarea pesada y tareas profesionales gracias a la combinación del i5 de última generación y la tarjeta gráfica dedicada NVIDIA RTX 3050 Ti, capaz de manejar juegos modernos y aplicaciones exigentes con fluidez. La batería, el teclado retroiluminado, los puertos, la ventilación, los parlantes y todos los componentes han sido verificados y funcionan correctamente. En conjunto, es un equipo robusto, rápido y en excelente estado, perfecto para quienes buscan potencia real tanto para trabajo como para entretenimiento.', 33495.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 8, NULL, NULL, 1, 18.00),
(98, NULL, 'Asus Tuf Gaming F15 i5-12GEN 16Ram-3050 512GB', 'está en condición \"Doble A (AA)\", mostrando un estado físico muy bien conservado con marcas mínimas de uso. Su pantalla mantiene una excelente calidad, sin rayaduras visibles, y el chasis con diseño robusto típico de la línea TUF se conserva sólido, sin golpes ni detalles relevantes. En cuanto a rendimiento, es una máquina capaz de mover juegos modernos con fluidez y manejar tareas exigentes como edición, diseño, modelado 3D y multitarea pesada gracias a la combinación del procesador de 12va generación, la RTX 3050 y los 16GB de RAM. El teclado retroiluminado, el sistema de ventilación, los puertos, los parlantes y la batería funcionan perfectamente tras las pruebas realizadas. En conjunto, es una laptop potente, resistente y en excelente estado, ideal para gaming, uso profesional y productividad avanzada.', 39995.00, 3, 0.00, '2025-06-23 16:00:00', NULL, 9, NULL, NULL, 1, 18.00),
(100, NULL, 'HP i5 13GEN 8+256GB ', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado con señales mínimas de uso. Su pantalla mantiene una visualización clara y sin rayaduras visibles, mientras que el chasis conserva un aspecto limpio, sin golpes ni marcas relevantes. En rendimiento, ofrece una experiencia rápida y eficiente para tareas de oficina, estudios, multitarea, reuniones virtuales y aplicaciones cotidianas, gracias a la potencia del procesador de 13va generación y su SSD veloz. Todos sus componentes —teclado, trackpad, cámara, puertos, parlantes y batería— funcionan correctamente tras las pruebas realizadas. En conjunto, es una laptop moderna, ágil y en excelente estado, ideal para uso académico, laboral y personal.', 24995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 8, NULL, NULL, 1, 18.00),
(108, NULL, 'SAMSUNG GALAXY TAB A9+', 's', 11495.00, 5, 0.00, '2023-01-01 12:00:00', '2025-10-24 20:38:00', 2, 1, 12, 1, 18.00),
(109, NULL, 'SAMSUNG GALAXY TAB A9+ 128GB', 's', 13495.00, 5, 0.00, '2023-01-01 12:00:00', NULL, 2, 1, 6, 1, 18.00),
(121, NULL, 'Macbook Air 13-Inch 2020 i3 8+256GB ', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado con mínimos signos de uso. Su pantalla Retina está limpia y sin rayaduras, ofreciendo colores nítidos y buen brillo. El chasis de aluminio mantiene un aspecto impecable, sin golpes ni marcas visibles. En rendimiento, es ideal para tareas de oficina, navegación, videollamadas, estudio y trabajo ligero, ofreciendo fluidez y eficiencia gracias al procesador y su SSD rápido. Todos los componentes —teclado, trackpad, puertos, parlantes, batería y cámara— funcionan correctamente. En conjunto, es un equipo ligero, elegante y en excelente estado, perfecto para estudiantes y usuarios que buscan portabilidad con buen rendimiento diario.', 29495.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(122, NULL, 'Macbook Pro 16-Inch 2019 i7 16+512GB ', 'se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado con mínimas señales de uso. Su pantalla Retina de 16 pulgadas luce impecable, sin rayaduras, ofreciendo colores vibrantes y alto nivel de detalle. El chasis de aluminio se mantiene sólido, sin golpes ni marcas importantes. En rendimiento, es ideal para edición de video, diseño gráfico, producción musical, multitarea intensiva y tareas profesionales avanzadas, gracias a su procesador de alto desempeño y memoria amplia. Todos los componentes —teclado, trackpad, parlantes, puertos y batería— funcionan perfectamente y la autonomía se mantiene estable. En conjunto, es un equipo profesional potente, elegante y en excelente estado, listo para usuarios que requieren máximo rendimiento y confiabilidad.', 34995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(126, NULL, 'Macbook Pro M2 2022 8+256GB', 'condición de calidad AAA (Triple A), lo que garantiza que está prácticamente nuevo o con un uso mínimo imperceptible. Ha sido inspeccionado meticulosamente para asegurar una funcionalidad perfecta, una batería con ciclo de carga bajo y una estética impecable. La pantalla Retina con brillo de 500 nits, la barra táctil (Touch Bar) y el sistema de enfriamiento activo, que permite al chip M2 mantener un alto rendimiento durante períodos prolongados, confirman la calidad premium de este MacBook Pro. Es una elección robusta para quienes buscan tecnología de vanguardia y confiabilidad sin compromisos.', 51995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(131, NULL, 'HP i5-13Gen-8Ram HP 256GB ', 'condición de calidad Triple A (AAA), lo que implica un estado impecable, catalogado como casi nuevo o con el mínimo uso de exhibición. Ha pasado por una exhaustiva verificación para garantizar su plena funcionalidad y una apariencia estética libre de marcas significativas. Invertir en este portátil HP es asegurarte un dispositivo de última generación con la garantía de la máxima calidad disponible, perfecto para el ámbito profesional, académico o personal.', 24995.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 8, NULL, NULL, 1, 18.00),
(132, NULL, 'Lenovo i3-12GEN 8+256GB ', 'Este portátil se presenta en una condición de calidad Doble A (AA). Esto significa que está en un estado excelente, ha sido completamente revisado y certificado para tener una funcionalidad perfecta, con signos de uso muy leves que no afectan en absoluto su rendimiento ni su estética general. Es una solución de alta calidad y económica que brinda la durabilidad y el diseño práctico característico de Lenovo, listo para asumir tus tareas diarias desde el primer momento.', 21495.00, 3, 0.00, '2023-01-01 08:00:00', NULL, 10, NULL, NULL, 1, 18.00),
(133, NULL, 'SAMSUNG WATCH 6 CLASSIC', 'condición de calidad Triple A (AAA), lo que significa que está prácticamente nuevo, con una estética impecable y una funcionalidad del 100%. Ha sido verificado para garantizar que todos sus sensores, la corona giratoria y la batería funcionen de manera óptima. Adquirir el Watch 6 Classic es elegir un dispositivo de máxima calidad que equilibra perfectamente el estilo de un reloj clásico con las capacidades inteligentes de un wearable moderno de primer nivel.', 12995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(134, NULL, 'SAMSUNG WATCH 6', 'Este reloj inteligente se encuentra en una condición de calidad Triple A (AAA). Esto certifica que está en un estado impecable, casi nuevo, libre de rasguños visibles en la caja o el cristal, y con una salud de batería verificada como óptima. Ha sido sometido a rigurosas pruebas para asegurar que cada sensor y función operen con precisión de fábrica. Al elegir el Galaxy Watch 6 en esta condición, estás invirtiendo en un dispositivo de máxima calidad que combina funcionalidad de primer nivel y un estilo minimalista y sofisticado.', 11995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(135, NULL, 'SAMSUNG WATCH 7', 'Este dispositivo se ofrece en la condición de calidad Triple A (AAA), lo que en el caso de un modelo tan reciente, significa que es un artículo prácticamente nuevo o en condición de exhibición impecable. Está certificado para operar al 100% de su capacidad, con su cristal de zafiro (o material similar de alta resistencia) libre de imperfecciones y un rendimiento de batería óptimo. El Watch 7 combina un diseño elegante con la máxima durabilidad (certificación 5 ATM e IP68), siendo la opción definitiva de máxima calidad para aquellos que desean lo último en tecnología wearable de Samsung.', 15995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(136, NULL, 'Samsung Galaxy Buds 3', 'Dado que este es un modelo reciente, ofrecemos los Galaxy Buds 3 en una condición de calidad Triple A (AAA). Esto certifica que están en un estado prácticamente nuevo, con el estuche de carga y los auriculares libres de marcas notables. La funcionalidad está garantizada al 100%, incluyendo la duración óptima de la batería, la conectividad y la calidad del micrófono. Adquirir estos Buds 3 es invertir en el pináculo de la calidad de audio inalámbrico de Samsung, con la certeza de recibir un producto en condiciones inmejorables.', 8495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(137, NULL, 'Samsung Galaxy Buds 2', 'Dado que este es un modelo reciente, ofrecemos los Galaxy Buds 3 en una condición de calidad Triple A (AAA). Esto certifica que están en un estado prácticamente nuevo, con el estuche de carga y los auriculares libres de marcas notables. La funcionalidad está garantizada al 100%, incluyendo la duración óptima de la batería, la conectividad y la calidad del micrófono. Adquirir estos Buds 3 es invertir en el pináculo de la calidad de audio inalámbrico de Samsung, con la certeza de recibir un producto en condiciones inmejorables.', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(138, NULL, 'BEATS SOLO 4', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(139, NULL, 'BEATS STUDIO PRO', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(140, NULL, 'XIAOMI REDMI BUDS 4 ACTIVE', 'Ofrecemos estos Redmi Buds 4 Active en una condición de calidad Doble A (AA). Esto significa que están en un estado excelente, con una funcionalidad completa y signos de uso mínimos o casi imperceptibles en el estuche y los auriculares. Han sido probados meticulosamente para garantizar la conectividad Bluetooth, la calidad del audio y la vida útil óptima de la batería. Son una opción de gran valor y calidad para aquellos que buscan unos earbuds fiables y resistentes sin comprometer el rendimiento.', 1995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 3, NULL, NULL, 1, 18.00),
(142, NULL, 'AIRPODS GEN 2', 'Este set de AirPods de 2ª Generación se presenta en una condición de calidad Triple A (AAA). Esto significa que están en un estado prácticamente nuevo, con el estuche de carga y los auriculares cuidadosamente limpiados y desinfectados, y con mínimas o nulas marcas de uso. La batería ha sido verificada para garantizar una retención de carga óptima y su funcionalidad ha sido probada al 100%. Adquirir estos AirPods es obtener la reconocida calidad y conveniencia de Apple en un estado excepcional, listos para conectarse instantáneamente a tu vida digital.', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(143, NULL, 'AIRPODS GEN 3', 'Ofrecemos estos AirPods de 3ª Generación en una condición de calidad Triple A (AAA). Esto certifica un estado impecable, prácticamente nuevo, con el estuche de carga MagSafe y los auriculares libres de cualquier marca de desgaste notable. Han pasado por una rigurosa inspección para asegurar una duración óptima de la batería, una conectividad perfecta y una calidad de audio superior. Al elegir este modelo en condición AAA, estás invirtiendo en la última tecnología de audio de Apple con la garantía de recibir un producto en estado inmejorable.', 9995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(144, NULL, 'AIRPODS GEN 4 CANCELACION DE RUIDO', 'Dado que este es uno de los modelos más recientes de Apple, ofrecemos estos AirPods en una condición de calidad Triple A (AAA). Esto certifica que el producto está en un estado prácticamente nuevo, con el estuche de carga USB-C y los auriculares totalmente libres de cualquier signo de uso visible. Han sido exhaustivamente probados para confirmar que la función de Cancelación de Ruido, el modo de Transparencia y todas las demás capacidades operan a la perfección. Es una inversión en la máxima calidad de audio inalámbrico y la tecnología de vanguardia de Apple.', 12995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(145, NULL, 'AIRPODS PRO 2 TIPO C OPEN BOX', 'Este producto es \"Open Box\" y se ofrece en una condición de calidad Triple A (AAA). Esto significa que, aunque la caja fue abierta, el producto está prácticamente nuevo, con un uso mínimo o nulo. Han sido certificados por nuestro equipo como impecables en apariencia y rendimiento, asegurando que todas las funciones, incluyendo la ANC, el chip U1 para Búsqueda Precisa en el estuche y el puerto USB-C, operan perfectamente. Es la oportunidad ideal para adquirir la máxima calidad de sonido y la tecnología más reciente de Apple a un valor excepcional.', 10995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(146, NULL, 'RAZER BARRACUDA X', 'Este producto se encuentra en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con una funcionalidad garantizada y mínimos signos de uso que no afectan en absoluto la calidad de su construcción ni su rendimiento de audio. Han sido revisados para asegurar la perfecta operación de su micrófono desmontable y la duración óptima de su batería. El Razer Barracuda X es una opción de alta calidad y gran valor para los gamers y usuarios que buscan un auricular versátil, fiable y con el rendimiento característico de Razer.', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(147, NULL, 'APPLE WATCH SE 2', 'se ofrece en una condición de calidad Triple A (AAA). Esto significa que está en un estado prácticamente nuevo, con el cuerpo de aluminio y el cristal Ion-X libres de rasguños significativos. Ha sido rigurosamente inspeccionado para garantizar una funcionalidad del 100%, una duración de batería óptima y la precisión de todos sus sensores de movimiento y salud. Adquirir el Watch SE (2ª Gen) en esta condición es invertir en la máxima calidad y fiabilidad de Apple, obteniendo un dispositivo robusto que te ayuda a llevar un estilo de vida más saludable a un valor excepcional.', 10495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(148, NULL, 'APPLE WATCH SERIE 7', 'se ofrece en una condición de calidad Triple A (AAA). Esto certifica un estado impecable, casi nuevo, con el cristal y la caja libres de marcas visibles y con una salud de batería verificada para un rendimiento óptimo. Ha pasado por una minuciosa inspección para garantizar la perfecta operatividad de sus sensores avanzados y la fluidez de su sistema operativo. Es una excelente oportunidad para adquirir la reconocida calidad y las funciones de salud premium de Apple en un estado inmejorable.', 12994.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(149, NULL, 'APPLE WATCH SERIE 8', 'se presenta en una condición de calidad Triple A (AAA). Esto garantiza que el dispositivo está en un estado prácticamente nuevo, con una estética impecable y un funcionamiento certificado al 100%. Ha sido sometido a una inspección rigurosa para asegurar que la batería, la pantalla y todos los sensores de salud de precisión operen perfectamente. Es una inversión en la máxima calidad y la tecnología de bienestar más reciente de Apple, proporcionando seguridad, conectividad y estilo en tu muñeca.', 14495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(150, NULL, 'APPLE WATCH SERIE ULTRA', 'Este dispositivo, que representa el más alto estándar de durabilidad y tecnología de Apple, se ofrece en una condición de calidad Triple A (AAA). Esto certifica que está en un estado impecable, prácticamente nuevo, con la caja de titanio y los componentes internos funcionando al 100% de su capacidad. Ha sido rigurosamente inspeccionado para asegurar la funcionalidad de sus sensores de inmersión, brújula y sirena de emergencia. Adquirir el Apple Watch Ultra en condición AAA es asegurar la máxima calidad, rendimiento extremo y la vanguardia de la tecnología wearable.', 24995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(151, NULL, 'APPLE WATCH SERIE 9', 'Este smartwatch de última generación se ofrece en una condición de calidad Triple A (AAA). Esto certifica un estado impecable, catalogado como prácticamente nuevo, con una estética perfecta y una funcionalidad del 100%. Ha sido sometido a rigurosas pruebas para asegurar la perfecta operación del chip S9, la precisión de sus sensores y la salud óptima de la batería. Adquirir el Series 9 en esta condición es asegurar la máxima calidad, lo último en tecnología de Apple y el rendimiento más rápido para tu vida conectada y saludable.', 16495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 1, NULL, NULL, 1, 18.00),
(152, NULL, 'Smart TV Onn 32 Pulgadas', 'Este Smart TV Onn se presenta en una condición de calidad Doble A (AA). Esto significa que está en un estado excelente, con el panel de la pantalla libre de píxeles muertos o rayones significativos y el control remoto incluido. Ha sido probado meticulosamente para asegurar que todas las funciones inteligentes, los puertos HDMI y la conectividad Wi-Fi operen perfectamente. Es una solución de alta calidad y gran valor para quienes buscan funcionalidad inteligente y confiabilidad en un formato compacto.', 9995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 14, NULL, NULL, 1, 18.00),
(153, NULL, 'Smart TV Onn 43 Pulgadas', 'Este Smart TV Onn se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de la pantalla libre de cualquier defecto visual y el marco del televisor con mínimos o nulos signos de manipulación. Ha sido exhaustivamente probado para asegurar que la funcionalidad inteligente, la calidad de la imagen y la conectividad (Wi-Fi, HDMI) sean óptimas. Es una opción de alta calidad y excepcional valor para aquellos que buscan una pantalla de buen tamaño con funcionalidad smart completa.', 14995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 14, NULL, NULL, 1, 18.00),
(154, NULL, 'Smart TV Onn 65 Pulgadas', 'Este Smart TV Onn se presenta en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel LCD o LED libre de píxeles defectuosos o imperfecciones que afecten la calidad de la imagen. Ha sido cuidadosamente inspeccionado y probado para asegurar que todos los puertos, la conectividad y las funciones inteligentes operen a la perfección. Adquirir este televisor es una excelente manera de obtener una pantalla gigante de alta calidad y funcionalidad 4K a un valor insuperable.', 28995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 14, NULL, NULL, 1, 18.00),
(155, NULL, 'Smart TV Onn 75 Pulgadas', 'Este Smart TV Onn se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de 75 pulgadas totalmente libre de imperfecciones o rayones significativos. Ha sido rigurosamente inspeccionado para garantizar una imagen y sonido perfectos, así como la funcionalidad óptima de todos sus componentes inteligentes y conectividad. Es una oportunidad de alta calidad y gran impacto visual para quienes buscan llevar el cine a casa a un valor excepcional.', 36995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 14, NULL, NULL, 1, 18.00),
(156, NULL, 'Smart TV Phillips 32 Pulgadas', 'Este Smart TV Philips se presenta en una condición de calidad Doble A (AA). Esto significa que está en un estado excelente, con el panel de la pantalla libre de defectos visuales y el equipo en general con mínimos o nulos signos de uso significativo. Ha sido completamente revisado para asegurar el funcionamiento óptimo de sus funciones inteligentes, la calidad de la imagen y todos los puertos de conexión. Es una opción de alta calidad y durabilidad que ofrece entretenimiento inteligente y confiable.', 9995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(157, NULL, 'Smart TV TCL Androide 32 Pulgadas', 'se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de visualización sin defectos y el televisor con signos de uso mínimos o superficiales. Ha sido rigurosamente inspeccionado para garantizar la perfecta operatividad del sistema operativo Android, la conectividad Wi-Fi, la calidad de la imagen y el sonido. Es una excelente opción de alta calidad que combina la fiabilidad de TCL con la inteligencia y flexibilidad del ecosistema Android.', 10995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(158, NULL, 'Smart TV TCL Roku 43 Pulgadas', 'se presenta en una condición de calidad Doble A (AA). Esto significa que está en un estado excelente, con el panel de la pantalla libre de cualquier imperfección visual y el televisor con mínimos o nulos signos de manipulación. Ha sido exhaustivamente probado para asegurar el perfecto funcionamiento del sistema Roku TV, la conectividad Wi-Fi y la calidad de la imagen y el sonido. Es una excelente opción de alta calidad y funcionalidad smart, ideal para quienes buscan simplicidad y un vasto catálogo de contenido.', 16495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(159, NULL, 'Smart TV TCL Roku 55 Pulgadas', 'Este Smart TV TCL se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de 55 pulgadas libre de defectos de imagen o rayones notables. Ha sido rigurosamente inspeccionado y probado para asegurar que la funcionalidad de Roku TV, la conectividad y la calidad de la imagen 4K operen a su máximo potencial. Es una inversión de alta calidad que proporciona una pantalla grande y la mejor funcionalidad smart a un precio inmejorable.', 23995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(160, NULL, 'Smart TV TCL Google 55 Pulgadas', 'Este Smart TV TCL se presenta en una condición de calidad Doble A (AA). Esto significa que está en un estado excelente, con el panel de 55 pulgadas libre de defectos de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K y todas las opciones de conectividad. Es una opción de alta calidad que combina la robustez de TCL con la inteligencia y personalización del ecosistema de Google.', 24995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(161, NULL, 'Smart TV TCL Fire TV 58 Pulgadas', 'se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de 58 pulgadas libre de cualquier defecto de píxel o rayón notable. Ha sido rigurosamente inspeccionado para asegurar la perfecta funcionalidad del sistema Fire TV, la calidad de la imagen 4K y la conectividad. Es una opción de alta calidad que combina un gran tamaño de pantalla con la inteligencia fluida y centralizada del ecosistema de Amazon.', 27495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(162, NULL, 'Smart TV TCL Roku 65 Pulgadas', 'se presenta en una condición de calidad Doble A (AA). Esto significa que está en un estado excelente, con el panel de 65 pulgadas libre de defectos de imagen o marcas notables. Ha sido exhaustivamente probado para asegurar la perfecta operatividad del sistema Roku TV, la conectividad Wi-Fi y la calidad de la imagen 4K a gran escala. Es una inversión de alta calidad y valor excepcional que te ofrece un tamaño de cine y funcionalidad smart de primer nivel.', 30995.00, 2, 0.00, '2025-03-14 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(163, NULL, 'Smart TV TCL Google 65 Pulgadas', 'se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de 65 pulgadas libre de cualquier imperfección visual y el televisor con mínimos signos de uso. Ha sido rigurosamente inspeccionado para asegurar la funcionalidad óptima del sistema Google TV, la calidad de la imagen 4K y su rendimiento general. Es una opción de alta calidad que fusiona el gran tamaño de pantalla de TCL con la inteligencia avanzada y la personalización de Google.', 34995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(164, NULL, 'Smart TV TCL Roku 85 Pulgadas', 'se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel gigante libre de cualquier defecto de imagen o marcas notables. Ha sido exhaustivamente revisado para asegurar el funcionamiento perfecto del sistema Roku TV, la conectividad y la calidad de la imagen 4K a esta escala masiva. Es una opción de alta calidad para quienes buscan un tamaño de pantalla definitivo con la funcionalidad inteligente más amigable del mercado.', 74995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(165, NULL, 'Smart TV WESTINGHOUSE ROKU 43 Pulgadas', 'se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de 43 pulgadas libre de defectos o rayones significativos. Ha sido minuciosamente inspeccionado para asegurar que el sistema Roku TV funcione perfectamente, que la conectividad Wi-Fi sea estable y que la calidad de la imagen y el sonido sean óptimas. Es una opción de alta calidad y gran valor que combina la confiabilidad de Westinghouse con la mejor funcionalidad smart del mercado.', 14995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 13, NULL, NULL, 1, 18.00),
(166, NULL, 'Smart TV WESTINGHOUSE ROKU 65 Pulgadas', 'se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de 65 pulgadas libre de defectos de imagen o marcas notables. Ha sido rigurosamente inspeccionado para garantizar el perfecto funcionamiento del sistema Roku TV, la conectividad y la calidad de la imagen 4K a gran escala. Es una inversión de alta calidad y excepcional valor que combina un tamaño de pantalla premium con una funcionalidad smart de uso fácil.', 28495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 13, NULL, NULL, 1, 18.00),
(167, NULL, 'Smart TV HISENSE GOOGLE 43 Pulgadas', 'se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de 43 pulgadas libre de cualquier imperfección visual y el televisor con mínimos o nulos signos de uso. Ha sido minuciosamente inspeccionado para asegurar la perfecta funcionalidad del sistema Google TV, la calidad de la imagen y la conectividad. Es una opción de alta calidad que combina la confiabilidad de Hisense con la inteligencia avanzada y la personalización de Google.', 16995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(168, NULL, 'Smart TV HISENSE GOOGLE QLED D5 43 Pulgadas', 'se ofrece en una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED libre de píxeles muertos o rayones notables. Ha sido rigurosamente inspeccionado para asegurar que la funcionalidad de Google TV, la calidad de imagen QLED 4K (común en QLEDs) y la conectividad operen perfectamente. Es una opción de alta calidad y tecnología avanzada que ofrece un rendimiento de color premium a un valor accesible.', 18995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(169, NULL, 'Smart TV HISENSE A7 Google 50 Pulgadas', 'presenta en una condición de calidad Doble A (AA). Esto significa que está en un estado excelente, con el panel de 50 pulgadas libre de defectos de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K y la conectividad. Es una opción de alta calidad que ofrece un gran tamaño de pantalla y la inteligencia de Google para mejorar tu experiencia de visualización.', 21495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(170, NULL, 'Smart TV HISENSE QLED QD5 2024 55 Pulgadas', 'siendo un modelo reciente, se ofrece en una condición de calidad Triple A (AAA). Esto certifica un estado impecable, catalogado como prácticamente nuevo o de exhibición con un uso mínimo. Ha sido rigurosamente inspeccionado para asegurar la perfecta funcionalidad del panel QLED, el sistema operativo Google TV y la conectividad. Es una inversión en la máxima calidad de imagen, tecnología de vanguardia y rendimiento inteligente del año 2024.', 27495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00);
INSERT INTO `productos` (`id`, `movil_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `descuento`, `fecha`, `fecha_publicacion`, `marca_id`, `ram_id`, `almacenamiento_id`, `activo`, `impuesto`) VALUES
(171, NULL, 'Smart TV HISENSE QLED D5 GOOGLE 65 Pulgadas', 'una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED de 65 pulgadas libre de defectos de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K QLED y su rendimiento general. Es una opción de alta calidad y gran tamaño que ofrece una tecnología de color premium a un valor accesible.', 37495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(172, NULL, 'Smart TV HISENSE S7N CANVAS QLED GOOGLE 65 Pulgadas', 'condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED de 65 pulgadas libre de defectos de imagen o marcas notables. Ha sido rigurosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K QLED y su rendimiento general. Es una opción de alta calidad y diseño premium que ofrece la mejor tecnología de color y una funcionalidad inteligente avanzada en un formato impresionante.', 62495.00, 2, 0.00, '2023-01-01 12:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(173, NULL, 'Smart TV HISENSE A7 Google 75 Pulgadas', 'condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel de 75 pulgadas libre de defectos de imagen o marcas notables. Ha sido rigurosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K y su rendimiento general. Es una opción de alta calidad que combina un tamaño de pantalla definitivo con la inteligencia de Google para una experiencia de visualización superior.', 42995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(174, NULL, 'Smart TV HISENSE QLED QD6 GOOGLE 75 Pulgadas', 'condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED libre de cualquier defecto de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K QLED a esta escala masiva y su conectividad. Es una opción de alta calidad y rendimiento visual extremo para quienes buscan un tamaño de cine en casa.', 49995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(175, NULL, 'Smart TV HISENSE A7 Google 85 Pulgadas', 'una condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED libre de cualquier defecto de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K QLED a esta escala masiva y su conectividad. Es una opción de alta calidad y rendimiento visual extremo para quienes buscan un tamaño de cine en casa.', 82995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 12, NULL, NULL, 1, 18.00),
(176, NULL, 'Smart TV SAMSUNG SERIE 7 2024 55 Pulgadas', 'condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED libre de cualquier defecto de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K QLED a esta escala masiva y su conectividad. Es una opción de alta calidad y rendimiento visual extremo para quienes buscan un tamaño de cine en casa.', 28995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(177, NULL, 'Smart TV SAMSUNG QLED Q6 55 Pulgadas', 'condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED libre de cualquier defecto de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K QLED a esta escala masiva y su conectividad. Es una opción de alta calidad y rendimiento visual extremo para quienes buscan un tamaño de cine en casa.', 34995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(178, NULL, 'Smart TV SAMSUNG DU7200 2024 65 Pulgadas', 'condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED libre de cualquier defecto de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K QLED a esta escala masiva y su conectividad. Es una opción de alta calidad y rendimiento visual extremo para quienes buscan un tamaño de cine en casa.', 36495.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(179, NULL, 'Smart TV SAMSUNG 75 Pulgadas', 'condición de calidad Doble A (AA). Esto certifica un estado excelente, con el panel QLED libre de cualquier defecto de imagen o marcas notables. Ha sido minuciosamente inspeccionado para asegurar la perfecta operatividad del sistema Google TV, la calidad de la imagen 4K QLED a esta escala masiva y su conectividad. Es una opción de alta calidad y rendimiento visual extremo para quienes buscan un tamaño de cine en casa.', 54995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(180, NULL, 'Aire Acondicionado Inverter D WORLD 12000', 'una condición de calidad Doble A (AA). Esto certifica que el equipo está en un estado excelente, ha sido revisado por técnicos especializados para garantizar su eficiencia de enfriamiento, el funcionamiento de la tecnología Inverter y la integridad de la unidad exterior e interior. Es una inversión de alta calidad y eficiencia que te proporcionará un ambiente fresco y confortable mientras optimizas tu consumo eléctrico.', 20995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(181, NULL, 'Aire Acondicionado Inverter GBR 18000', 'una condición de calidad Doble A (AA). Esto certifica que el equipo está en un estado excelente, ha sido revisado por técnicos especializados para garantizar su eficiencia de enfriamiento, el funcionamiento de la tecnología Inverter y la integridad de la unidad exterior e interior. Es una inversión de alta calidad y eficiencia que te proporcionará un ambiente fresco y confortable mientras optimizas tu consumo eléctrico.', 32495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(182, NULL, 'Aire Acondicionado Inverter TCL 24000', 'una condición de calidad Doble A (AA). Esto certifica que el equipo está en un estado excelente, ha sido revisado por técnicos especializados para garantizar su eficiencia de enfriamiento, el funcionamiento de la tecnología Inverter y la integridad de la unidad exterior e interior. Es una inversión de alta calidad y eficiencia que te proporcionará un ambiente fresco y confortable mientras optimizas tu consumo eléctrico.', 44495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 11, NULL, NULL, 1, 18.00),
(183, NULL, 'Aire Acondicionado Inverter Black+Decker 12000', 'una condición de calidad Doble A (AA). Esto certifica que el equipo está en un estado excelente, ha sido revisado por técnicos especializados para garantizar su eficiencia de enfriamiento, el funcionamiento de la tecnología Inverter y la integridad de la unidad exterior e interior. Es una inversión de alta calidad y eficiencia que te proporcionará un ambiente fresco y confortable mientras optimizas tu consumo eléctrico.', 23495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(184, NULL, 'PlayStation 5 Slim', 'Esta PlayStation 5 Slim se encuentra en condición \"Triple A (AAA)\", lo que significa que está prácticamente nueva, con un estado de conservación excepcional. La consola ha sido minuciosamente revisada para garantizar que todos sus componentes —unidad de procesamiento, lector de discos, puertos HDMI y USB, sistema de ventilación— funcionen perfectamente. El control DualSense incluido también está en estado impecable, con los gatillos adaptativos y la vibración háptica operando al 100%. Es la consola de última generación de Sony en su versión más compacta y eficiente, lista para ofrecer la mejor experiencia gaming con gráficos en 4K, tiempos de carga ultrarrápidos y una amplia biblioteca de juegos exclusivos.', 33995.00, 4, 0.00, '2025-03-13 08:00:00', NULL, 15, NULL, NULL, 1, 18.00),
(185, NULL, 'Onyx Studio 8', 'Este altavoz Bluetooth Onyx Studio 8 se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado con señales mínimas de uso. Su diseño robusto y resistente al agua mantiene una apariencia impecable, sin golpes ni marcas relevantes. El sonido ofrece graves profundos y claridad excepcional característicos de la marca, con una autonomía de batería que conserva su duración original. Todas las funciones —conectividad Bluetooth, entrada auxiliar, controles táctiles— operan perfectamente. En conjunto, es un altavoz premium, potente y en excelente estado, ideal para disfrutar música de alta calidad en cualquier entorno.', 12995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(186, NULL, 'Subwofer Barra de Sonido LG', 'Esta barra de sonido LG con subwoofer se encuentra en condición \"Doble A (AA)\", presentando un estado físico muy bien conservado. El sistema de audio ofrece un sonido envolvente y de alta calidad, con graves profundos gracias al subwoofer independiente. Todos los puertos HDMI, óptico y Bluetooth funcionan correctamente, permitiendo múltiples opciones de conexión. El control remoto incluido está en buen estado. Es una solución de audio completa y en excelentes condiciones, perfecta para mejorar significativamente la experiencia de entretenimiento en casa.', 7995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(187, NULL, 'Samsung Barra de Sonido iHome 120w', 'Esta barra de sonido Samsung iHome de 120W se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. El sistema de audio ofrece un sonido claro y potente, ideal para películas, música y gaming. La conectividad Bluetooth y las entradas auxiliares funcionan perfectamente, proporcionando versatilidad de conexión. El diseño slim se integra fácilmente en cualquier espacio. En resumen, es una barra de sonido confiable, de buena potencia y en excelente estado, que mejora notablemente la calidad de audio de tu TV.', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(188, NULL, 'Samsung Barra de Sonido iHome 180w', 'Esta barra de sonido Samsung iHome de 180W se encuentra en condición \"Doble A (AA)\", presentando un estado físico impecable. Con mayor potencia que el modelo de 120W, ofrece un sonido más envolvente y dinámico, perfecto para espacios grandes. Todas las funciones —Bluetooth, entradas HDMI, modo cine, equalizadores— operan correctamente. El diseño moderno y los materiales de calidad se mantienen en excelente estado. Es una opción premium de audio que combina potencia, claridad y un estado de conservación excepcional.', 7995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(189, NULL, 'Freidora de Aire Brentwood 4L', 'Esta freidora de aire Brentwood de 4L se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. El interior antiadherente está impecable, sin rayones ni signos de desgaste. Todos los controles digitales, el temporizador y las funciones de temperatura operan perfectamente. La canasta y los accesorios se incluyen en buen estado. Es un electrodoméstico moderno, eficiente y en excelentes condiciones, ideal para cocinar de manera más saludable con poco o nada de aceite.', 3995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(190, NULL, 'Freidora de Aire Ninja Speed 6L', 'Esta freidora de aire Ninja Speed de 6L se encuentra en condición \"Doble A (AA)\", presentando un estado físico excepcional. Con mayor capacidad que el modelo estándar, permite preparar porciones más grandes. La tecnología de circulación de aire Cyclonic garantiza una cocción uniforme y crujiente. Todos los presets digitales, el panel de control y las funciones avanzadas operan perfectamente. Es un electrodoméstico de gama alta, versátil y en excelente estado, perfecto para familias o quienes cocinan con frecuencia.', 7495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(191, NULL, 'Microonda Sokany', 'Este microondas Sokany se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien conservado. El interior está limpio y sin olores, el plato giratorio funciona correctamente y la puerta cierra herméticamente. Todos los controles, el temporizador digital y las funciones de descongelado operan perfectamente. El diseño moderno se mantiene sin rayones ni marcas relevantes. Es un electrodoméstico funcional, confiable y en excelente estado, listo para uso diario.', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(192, NULL, 'MOUSE RAZER DEATHADDER ESSENTIAL', 'Este mouse gaming Razer DeathAdder Essential se encuentra en condición \"Doble A (AA)\", presentando un estado físico muy bien cuidado. El sensor óptico de 6.400 DPI ofrece precisión impecable para gaming, y los botones responden perfectamente sin doble clic. El cable no presenta torceduras y la iluminación RGB funciona correctamente. La ergonomía diestra se mantiene cómoda y sin desgaste. Es un periférico confiable, preciso y en excelente estado, ideal para gamers que buscan rendimiento a un precio accesible.', 2495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(193, NULL, 'TECLADO RAZER ORNATA V3', 'Este teclado gaming Razer Ornata V3 se encuentra en condición \"Doble A (AA)\", mostrando un estado físico impecable. La membrana híbrida Mecha-Membrane ofrece un tacto satisfactorio con la durabilidad de membrana. La iluminación RGB Chroma funciona perfectamente con personalización completa. Todas las teclas responden correctamente y no presentan desgaste visible. El reposamuñadas incluido está en buen estado. Es un teclado gaming versátil, cómodo y en excelentes condiciones, perfecto para largas sesiones de juego.', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(194, NULL, 'JBL FLIP 5', 'Este altavoz Bluetooth JBL Flip 5 se encuentra en condición \"Doble A (AA)\", presentando un estado físico muy bien cuidado. El sonido JBL Original Pro ofrece graves profundos y audio nítido característico de la marca. La resistencia al agua IPX7 se mantiene intacta, permitiendo uso en exteriores. La batería conserva una autonomía excelente y la conectividad Bluetooth funciona perfectamente. Es un altavoz portátil, potente y en excelente estado, ideal para música en cualquier lugar.', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(195, NULL, 'JBL PARTYBOX ON-THE-GO', 'Este altavoz party JBL PartyBox On-The-Go se encuentra en condición \"Doble A (AA)\", mostrando un estado físico excepcional. Con sonido JBL Pro y bajos potentes, es perfecto para fiestas y eventos. Las luces LED party funcionan correctamente, creando ambiente. La batería ofrece larga duración y incluye karaoke con entrada micrófono. Es un altavoz todo-en-uno, potente y en excelente estado, diseñado para llevar la fiesta a cualquier parte.', 19995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(196, NULL, 'JBL BOOMBOX3', 'Este altavoz portátil JBL Boombox 3 se encuentra en condición \"Doble A (AA)\", presentando un estado físico impecable. El sonido JBL Original Pro con bajos profundos y claridad excepcional ofrece una experiencia auditiva premium. La resistencia IP67 a polvo y agua permite uso en cualquier entorno. La batería de larga duración y la conectividad Bluetooth funcionan perfectamente. Es el altavoz portátil definitivo, potente y en estado excepcional, para los amantes del audio de alta calidad.', 26495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(197, NULL, 'JBL CHARGE 5', 'Este altavoz Bluetooth JBL Charge 5 se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. El sonido JBL Original Pro con driver racetrack-shaped ofrece audio potente y claro. La resistencia IP67 a agua y polvo está intacta, ideal para exteriores. La función powerbank permite cargar otros dispositivos y la batería mantiene excelente autonomía. Es un altavoz versátil, resistente y en excelente estado, perfecto para uso diario y aventuras.', 9495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(198, NULL, 'JBL CLIP 4', 'Este altavoz portátil JBL Clip 4 se encuentra en condición \"Doble A (AA)\", presentando un estado físico impecable. El diseño compacto con clip integrado lo hace perfecto para llevar a cualquier parte. El sonido JBL Original Pro ofrece audio sorprendentemente potente para su tamaño. La resistencia IP67 a agua y polvo permite uso en condiciones adversas. La batería conserva buena autonomía. Es el compañero audio ideal para deportes, viajes y actividades al aire libre, en excelente estado.', 4495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(199, NULL, 'JBL GO 3', 'Este altavoz ultra-portátil JBL Go 3 se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. El diseño compacto y colorido mantiene su apariencia original sin desgaste. El sonido JBL Original Pro ofrece audio sorprendente para su tamaño mini. La resistencia IP67 a agua y polvo permite uso en cualquier entorno. La conectividad Bluetooth funciona perfectamente. Es un altavoz económico, funcional y en excelente estado, ideal para música personal en movimiento.', 2995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 18, NULL, NULL, 1, 18.00),
(200, NULL, 'SONY SRS-XG500', 'Este altavoz party Sony SRS-XG500 se encuentra en condición \"Doble A (AA)\", presentando un estado físico excepcional. El sonido Extra Bass ofrece graves profundos y potencia ideal para fiestas. Las luces multicolor y el efecto strobe funcionan correctamente, creando ambiente. La batería de larga duración y la resistencia al agua permiten uso en exteriores. Es un altavoz party premium, potente y en excelente estado, diseñado para eventos y reuniones sociales.', 22495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, 15, NULL, NULL, 1, 18.00),
(201, NULL, 'ANIKER SOUNDCORE', 'Este altavoz Bluetooth Anker Soundcore se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. El sonido ofrece buen balance y claridad para su categoría de precio. La conectividad Bluetooth funciona establemente y la batería conserva autonomía adecuada. El diseño compacto y robusto se mantiene sin marcas relevantes. Es un altavoz económico, confiable y en excelente estado, perfecto para uso casual y portátil.', 2995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(202, NULL, 'SOUNDCORE BOOM 2 PLUS', 'Este altavoz Soundcore Boom 2 Plus se encuentra en condición \"Doble A (AA)\", presentando un estado físico impecable. El sonido ofrece potencia y claridad mejoradas con tecnología BassUp para graves intensos. La resistencia IPX7 al agua permite uso en piscina o playa. La batería de larga duración y la conectividad Bluetooth funcionan perfectamente. Es un altavoz potente, resistente y en excelente estado, ideal para quienes buscan audio de calidad en exteriores.', 14995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL, NULL, 1, 18.00),
(203, NULL, 'Monitor Asus VG1B 27 Pulgada 165HZ', 'Este monitor gaming Asus VG1B de 27 pulgadas 165Hz se encuentra en condición \"Doble A (AA)\", mostrando un estado físico muy bien cuidado. La pantalla IPS ofrece colores vibrantes y ángulos de visión amplios, sin píxeles muertos ni retroiluminación irregular. La tasa de refresco de 165Hz garantiza fluidez en gaming y contenido dinámico. Todos los puertos DisplayPort y HDMI funcionan correctamente. El soporte ajustable mantiene su funcionalidad completa. Es un monitor gaming de alto rendimiento, con excelente relación calidad-precio y en estado impecable.', 14995.00, 2, 0.00, '2023-01-01 08:00:00', '2025-11-26 09:16:00', 9, NULL, NULL, 1, 18.00),
(204, NULL, 'Monitor LG Ultragear 34 Pulgada 160HZ', 'Este monitor ultrawide LG Ultragear de 34 pulgadas 160Hz se encuentra en condición \"Doble A (AA)\", presentando un estado físico excepcional. La pantalla curva IPS ofrece una experiencia gaming inmersiva con colores precisos y alto contraste. La tasa de refresco de 160Hz y tecnología AMD FreeSync garantizan gameplay suave sin tearing. La relación de aspecto 21:9 proporciona espacio adicional para multitarea. Todos los puertos y controles OSD funcionan perfectamente. Es un monitor premium, versátil y en excelente estado, ideal gaming y productividad.', 24995.00, 2, 0.00, '2023-01-01 12:00:00', '2025-04-30 04:17:00', 2, NULL, NULL, 1, 18.00),
(206, NULL, 'Monitor Samsung G4 ODYSSEEY 27 Pulgada 240HZ', 'Este monitor gaming Samsung G4 Odyssey de 27 pulgadas 240Hz se encuentra en condición \"Doble A (AA)\", mostrando un estado físico impecable. La pantalla ofrece colores vibrantes y una tasa de refresco ultra rápida de 240Hz, perfecta para gaming competitivo. La tecnología AMD FreeSync Premium elimina tearing y stuttering. El diseño gaming con base sólida se mantiene sin marcas. Todos los puertos y funciones operan correctamente. Es un monitor de alto rendimiento, rápido y en excelente estado, diseñado para gamers exigentes.', 19995.00, 2, 0.00, '2023-01-01 12:00:00', NULL, 2, NULL, NULL, 1, 18.00),
(207, NULL, 'Monitor Samsung G5 ODYSSEY 32 Pulgada 165HZ', 'Este monitor gaming Samsung G5 Odyssey de 32 pulgadas 165Hz se encuentra en condición \"Doble A (AA)\", presentando un estado físico excepcional. La pantalla curva VA de 1000R ofrece una experiencia visual envolvente con alto contraste y colores profundos. La tasa de refresco de 165Hz con AMD FreeSync Premium garantiza gameplay fluido. La resolución QHD proporciona mayor claridad y espacio de trabajo. Todos los puertos, incluido DisplayPort y HDMI, funcionan perfectamente. Es un monitor gaming premium, inmersivo y en estado impecable, ideal para quienes buscan tamaño y rendimiento.', 22995.00, 2, 0.00, '2025-12-10 20:00:00', '2025-11-23 05:05:00', 2, NULL, NULL, 1, 18.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p_marcas`
--

CREATE TABLE `p_marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `p_marcas`
--

INSERT INTO `p_marcas` (`id`, `nombre`, `activo`) VALUES
(1, 'Apple', 1),
(2, 'Samsung', 1),
(3, 'Xiaomi', 1),
(4, 'Google', 1),
(5, 'Amazon', 1),
(6, 'Vortex', 1),
(7, 'Skypad', 1),
(8, 'HP', 1),
(9, 'Asus', 1),
(10, 'Lenovo', 1),
(11, 'TCL', 1),
(12, 'Hisense', 1),
(13, 'Westinghouse', 1),
(14, 'Onn', 1),
(15, 'Sony', 1),
(18, 'JBL', 1),
(19, 'Infinix', 1),
(20, 'ZTE', 1);

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
(382, 1, 'blanco', 1, 'https://tecfys.com/290-medium_default/iphone-12-reacondicionado-128-gb-blanco.jpg'),
(383, 1, 'negro', 4, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/a75941f0-0032-4680-bda0-ba070e5f9982.jpg'),
(384, 1, 'verde', 2, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg'),
(385, 2, 'verde', 2, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg'),
(386, 2, 'pupura', 2, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/b01801bc-4c3c-411e-9ff0-dac6b4e34a87.jpg'),
(387, 3, 'blanco', 3, 'https://i.ebayimg.com/images/g/PfsAAOSwAuBlaMk9/s-l400.jpg'),
(388, 3, 'rojo', 3, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/859d07b9-f8a1-43bc-b8c3-ff09652e2c26.jpg'),
(389, 4, 'negro', 5, 'https://i.ebayimg.com/images/g/6VEAAOSwcrlhP6ad/s-l1600.webp'),
(390, 4, 'blanco', 4, 'https://i.ebayimg.com/images/g/WloAAOSwcU9hP6ap/s-l1600.webp'),
(391, 5, 'azul', 0, 'https://i.ebayimg.com/images/g/9PsAAOSwnh5hP6a7/s-l1600.webp'),
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
(402, 11, 'Verde alpino', 3, 'https://m.media-amazon.com/images/I/31zjY4rISlL._AC_SR400,400_.jpg'),
(403, 11, 'azul', 2, 'https://m.media-amazon.com/images/I/31ZMD4DfG9L.jpg'),
(404, 12, 'gris', 2, 'https://i.ebayimg.com/images/g/eeYAAeSw4S9obXlU/s-l960.webp'),
(405, 12, 'blanco', 3, 'https://i.ebayimg.com/images/g/FkcAAeSwvgNobXlS/s-l960.webp'),
(406, 13, 'oro', 3, 'https://i.ebayimg.com/images/g/FkcAAeSwvgNobXlS/s-l960.webp'),
(409, 14, 'gris', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Grey.jpg'),
(410, 14, 'oro', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Gold.jpg'),
(411, 15, 'blanco', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Silver.jpg'),
(412, 15, 'verde', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Green.jpg'),
(413, 16, 'negro', 2, 'https://i.ebayimg.com/images/g/AKQAAOSwn51oE~FN/s-l1600.webp'),
(414, 16, 'blanco', 4, '/uploads/1761357162243_iPhone_14_Starlight_PDP_Image_Position-1A_COES_7e10f08c-1fb7-436c-988c-b60ed9e536e4-convertido-a-400x400.jpeg'),
(415, 17, 'Rojo', 4, 'https://i.ebayimg.com/images/g/pcQAAeSwYfpozHz8/s-l400.jpg'),
(416, 17, 'azul', 4, 'https://www.mylar.es/37903-medium_default/SMARTPHONE-APPLE-IPHONE-14-PRO-256GB-BLUE-MPWP3QL-A.jpg'),
(417, 18, 'amarillo', 4, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--V33EemrL0m.webp'),
(418, 18, 'Prupura', 2, 'https://i.ebayimg.com/images/g/hZAAAOSwbu5mxjdc/s-l400.jpg'),
(419, 19, 'Purpura', 6, 'https://d3c745jesl5pj3.cloudfront.net/model-image/iphone-14-plus.png'),
(420, 19, 'Rojo', 4, 'https://itpro.com.uy/wp-content/uploads/2024/11/wooc-155.jpeg'),
(421, 20, 'negro', 1, 'https://i.ebayimg.com/images/g/o~UAAOSwVB1kXRSz/s-l1600.webp'),
(422, 20, 'blanco', 4, 'https://i.ebayimg.com/images/g/sI4AAOSwi5lkXRTg/s-l1600.webp'),
(423, 21, 'oro', 4, 'https://i.ebayimg.com/images/g/-FYAAOSw8UNkXRT4/s-l1600.webp'),
(424, 21, 'blanco', 1, 'https://i.ebayimg.com/images/g/sI4AAOSwi5lkXRTg/s-l1600.webp'),
(425, 22, 'gris', 4, 'https://i.ebayimg.com/images/g/ml4AAOSwQJZkXRUR/s-l1600.webp'),
(426, 22, 'negro', 4, 'https://i.ebayimg.com/images/g/o~UAAOSwVB1kXRSz/s-l140.webp'),
(427, 26, 'Negro', 3, 'https://claroperupoc.vteximg.com.br/arquivos/ids/2540982/052283676.jpg'),
(428, 26, 'Verde', 4, 'https://covercompany.com.uy/cdn/shop/files/17045_17258_0.jpg?v=1726762823&width=400'),
(429, 27, 'Azul', 4, 'https://covercompany.com.uy/cdn/shop/files/17045_17046_0.jpg?v=1726762823&width=400'),
(430, 27, 'Amarillo', 2, 'https://celucambio.com/cdn/shop/files/15amarillo.webp?v=1740154478&width=480'),
(431, 28, 'Negro', 4, 'https://itpro.com.uy/wp-content/uploads/2024/04/wooc-492.jpeg'),
(432, 28, 'Rosado', 2, 'https://itpro.com.uy/wp-content/uploads/2025/03/wooc-881.jpeg'),
(433, 29, 'Amarillo', 4, 'https://www.trippodo.com/872471-medium_default/apple-iphone-15-plus-17-cm-67-sim-doble-ios-17-5g-.jpg'),
(434, 29, 'verde', 3, 'https://www.dealsmagnet.com/images/apple-iphone-15-plus-128-gb-o-196TMi7h.jpg'),
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
(454, 39, 'Blanco titanio', 5, 'https://target.scene7.com/is/image/Target/GUEST_c7ba2917-3af0-46b3-afc1-8283206fdd4d'),
(455, 40, 'negro', 4, '/uploads/1761843123664_Adobe Express - file.jpg'),
(456, 40, 'azul', 4, '/uploads/1761843187330_Adobe Express - file (1).jpg'),
(457, 41, 'Negro', 3, 'https://i.ebayimg.com/images/g/XqYAAOSwSSVnyAr~/s-l400.jpg'),
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
(482, 62, 'Negro', 3, 'https://images.bidcom.com.ar/resize?src=https://static.bidcom.com.ar/publicacionesML/productos/LCINFSM8X/1000x1000-LCINFSM8N.jpg&h=400&q=100'),
(483, 63, 'Oro arenisca', 2, 'https://i.ebayimg.com/images/g/dV0AAeSwpxFn0ZAS/s-l400.jpg'),
(484, 64, 'negro', 4, 'https://i.ebayimg.com/images/g/QwUAAOSwE~doRmVm/s-l1600.webp'),
(485, 65, 'verde', 4, 'https://i.ebayimg.com/images/g/zKIAAOSwkOdoVDu2/s-l1600.webp'),
(487, 67, 'blanco', 4, 'https://i.ebayimg.com/images/g/JmYAAOSw7YZoN8ef/s-l1600.webp'),
(488, 68, 'negro', 2, 'https://i.ebayimg.com/images/g/trcAAOSwvNJoSn1R/s-l1600.webp'),
(489, 69, 'negro', 3, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--1V-V3-7SKQ.webp'),
(490, 70, 'Verde', 4, 'https://www.lacuracao.pe/media/catalog/product/o/r/orig_images2fproducts2fjzmtzopo0-motog04verde_515201.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
(491, 71, 'Rosado', 1, 'https://i.ebayimg.com/images/g/ybcAAeSwsqto-AFl/s-l400.jpg'),
(492, 72, 'blanco', 4, 'https://i.ebayimg.com/images/g/-H4AAeSwMRhob-jD/s-l1600.webp'),
(493, 73, 'blanco', 2, 'https://i.ebayimg.com/images/g/9hAAAeSw~GBof9Dw/s-l960.webp'),
(494, 74, 'negro', 4, 'https://http2.mlstatic.com/D_Q_NP_2X_646175-MLA83298052986_042025-AB.webp'),
(495, 75, 'negro', 3, 'https://i.ebayimg.com/images/g/x5cAAOSwJEtoKoWg/s-l500.jpg'),
(496, 76, 'gris', 3, 'https://5.imimg.com/data5/SELLER/Default/2025/3/496156846/CR/ZD/VS/143240964/apple-ipad-10th-generation-500x500.jpeg'),
(497, 79, 'negro', 4, 'https://bestmart.cl/cdn/shop/products/tablet-amazon-fire-hd-8-version-2022-32gb-negro-1214629_400x.jpg?v=1758551816'),
(498, 80, 'Azul', 3, 'https://i.ebayimg.com/images/g/Fn8AAOSw4cFoLMzb/s-l400.jpg'),
(499, 81, 'negro', 4, 'https://clickventasrd.com/cdn/shop/files/31hc5NtHrXL._SS400.jpg?v=1716643691'),
(500, 82, 'gris', 2, 'https://mediamax.ba/wp-content/uploads/2024/10/pad-se-87inch-graz.jpg'),
(501, 83, 'azul', 4, 'https://i.ebayimg.com/images/g/IsUAAOSwf0tml-Vu/s-l1600.webp'),
(502, 85, 'gris', 3, 'https://vivaelectronics.am/Api/FetchImgBinBySKU/11930/tablet-xmobile-x10max.png'),
(503, 86, 'azul', 4, 'https://locosphone.com/wp-content/uploads/2023/11/TABLET-VORTEX.webp'),
(504, 87, 'negro', 4, 'https://i.ebayimg.com/images/g/G~cAAOSwqy1nYE2d/s-l500.jpg'),
(505, 88, 'negro', 4, '/uploads/1761352499202_1745940979-003.TBTCL141-1.jpg'),
(506, 89, 'gris', 3, 'https://i.ebayimg.com/images/g/XX0AAOSwI0JmHwCc/s-l1600.webp'),
(508, 91, 'gris', 2, 'https://i.ebayimg.com/images/g/sikAAOSwlgtl63K6/s-l1600.webp'),
(509, 92, 'gris', 4, 'https://cartlow.gumlet.io/prod/product/10946420001/96dcbea1-ee10-4967-a381-4108c6fef86a.jpg?width=400&height=0'),
(510, 93, 'gris', 2, 'https://i.ebayimg.com/images/g/6ZQAAOSwmIhhFik4/s-l400.jpg'),
(511, 94, 'Gris', 1, 'https://i.ebayimg.com/images/g/e1QAAeSwiNNowbjX/s-l400.jpg'),
(514, 97, 'negro', 3, 'https://i.ebayimg.com/images/g/0UAAAOSwqXpmCh5A/s-l400.jpg'),
(515, 98, 'negro', 3, 'https://i.ebayimg.com/images/g/vEwAAOSwN8xmzoR0/s-l400.jpg'),
(517, 100, 'gris', 4, 'https://i.ebayimg.com/images/g/7~4AAOSw7-1mTMYP/s-l400.jpg'),
(518, 108, 'gris', 2, 'https://http2.mlstatic.com/D_Q_NP_2X_966054-MRD92550029082_092025-N.webp'),
(519, 109, 'gris', 4, 'https://tienda.composystem.com.uy/thumb/B193C2793F5D4D6CA6FF672253F677D7_400x400.jpg'),
(522, 132, 'gris', 3, 'https://i.ebayimg.com/images/g/ieYAAOSwU4hl32rq/s-l1600.webp'),
(523, 133, 'gris', 3, 'https://i.ebayimg.com/images/g/Dm0AAOSwe~1mPAUU/s-l1600.webp'),
(524, 134, 'negro', 3, 'https://ss7.vzw.com/is/image/VerizonWireless/samsung-galaxy-watch-6-classic-pre-order-graphite-43mm-smr955uzkv-a?wid=400&hei=400&fmt=webp-alpha'),
(525, 135, 'negro', 4, 'https://i.ebayimg.com/images/g/qh4AAOSwOVlnR1HZ/s-l1600.webp'),
(526, 136, 'negro', 3, 'https://i.ebayimg.com/images/g/H4sAAOSw3OBoRaW1/s-l1600.webp'),
(528, 137, 'blanco', 3, 'https://avechi.co.ke/wp-content/uploads/2021/12/Samsung-Galaxy-Buds-2-1.jpg'),
(529, 138, 'blanco', 2, 'https://target.scene7.com/is/image/Target/GUEST_d5f1b26d-c961-4a56-93d9-2c461e6040e5'),
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
(552, 157, 'negro', 2, 'https://i.ebayimg.com/images/g/YbsAAOSwBxNk-eiA/s-l1600.webp'),
(553, 158, 'negro', 4, 'https://i5.walmartimages.com/seo/TCL-43-Class-4K-UHD-LED-Smart-Roku-TV-4-Series-43S425_93d834c1-6e8e-4db0-82d6-07677b99557a.26c2883c14fea6b281164c87d09725c5.jpeg'),
(554, 159, 'negro', 4, 'https://i.ebayimg.com/images/g/xGsAAeSw1ZlogQVA/s-l1600.webp'),
(555, 160, 'negro', 1, 'https://m.media-amazon.com/images/I/71Fqi90oSgL._SS400_.jpg'),
(556, 161, 'negro', 4, 'https://images-na.ssl-images-amazon.com/images/I/71TTN7b+o0L._AC_UL495_SR435,495_.jpg'),
(557, 162, 'negro', 4, 'https://i.ebayimg.com/images/g/fAcAAeSwFZFogXYH/s-l1600.webp'),
(558, 163, 'negro', 4, 'https://www.efe.com.pe/media/catalog/product/6/5/65p7kjc_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
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
(577, 184, 'blanco', 3, 'https://media.direct.playstation.com/is/image/sierialto/ps5-slim-model-hero-new'),
(578, 185, 'azul', 4, 'https://i.ebayimg.com/images/g/b4YAAOSwGV5kGfaQ/s-l400.png'),
(579, 186, 'negro', 2, 'https://images-na.ssl-images-amazon.com/images/I/51h48onuf5L._SS400_.jpg'),
(580, 187, 'negro', 4, 'https://m.media-amazon.com/images/I/31dC-vrN7CL._UF894,1000_QL80_.jpg'),
(581, 188, 'negro', 4, 'https://casacuesta.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/3/3/3344574-1__1725558716.jpg'),
(582, 189, 'negro', 4, 'https://m.media-amazon.com/images/I/61oOTu-kfDL._UF894,1000_QL80_.jpg'),
(583, 190, 'gris', 4, 'https://m.media-amazon.com/images/I/51KfYfuFpSL._UF894,1000_QL80_.jpg'),
(584, 191, 'blanco', 4, 'https://img.yfisher.com/m6289/1749537156900-00/jpg70-t4-width440.webp'),
(585, 192, 'negro', 4, 'https://m.media-amazon.com/images/I/415qavdCboL._SS400_.jpg'),
(586, 193, 'negro', 4, 'https://geeky.sfo2.cdn.digitaloceanspaces.com/geekydrop_production/thumbnail--RmRLKDHTiQ.png'),
(587, 194, 'negro', 3, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw5bf3296f/JBL_CHARGE5_HERO_BLACK_0046_x1.png?sw=400&sh=400&sm=fit&sfrm=png'),
(588, 194, 'azul', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwb72930cc/JBL_Flip5_Product%20Photo_Hero_RiverTeal-1605x1605-hero.png?sw=400&sh=400&sm=fit&sfrm=png'),
(589, 195, 'negro', 4, 'https://target.scene7.com/is/image/Target/GUEST_b93c5d96-f2ab-4cf5-a83b-d95c7221dd18'),
(590, 196, 'verde', 4, 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwcf80711d/1_JBL_BOOMBOX_3_SQUAD_HERO_33262_x2.png?sw=400&sh=400&sm=fit&sfrm=png'),
(591, 197, 'negro', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwcbb4fd11/1_JBL_BOOMBOX_3_HERO_BLACK_33216_x2.png?sw=400&sh=400&sm=fit&sfrm=png'),
(592, 198, 'negro', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw962d962e/JBL_CLIP4_HERO_STANDARD_TRIPLE_BLACK_0737_x1.png?sw=400&sh=400&sm=fit&sfrm=png'),
(593, 199, 'negro', 4, 'https://www.jbl.es/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwafaeef0d/JBL_GO_4_HERO_BLACK_48156_x4.png?sw=400&sh=400&sm=fit&sfrm=png'),
(594, 200, 'negro', 4, '/uploads/1761354978109_PROD-71.jpg'),
(595, 201, 'negro', 3, 'https://m.media-amazon.com/images/I/51QReosscPL._UF894,1000_QL80_.jpg'),
(596, 202, 'negro', 4, 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/37316ee8-f080-4809-a447-98bd68af8441.png;maxHeight=828;maxWidth=400?format=webp'),
(597, 203, 'negro', 3, 'https://www.asus.com/media/global/gallery/0osdprj9mpap1rub_setting_xxx_0_90_end_2000.png'),
(598, 204, 'negro', 4, 'https://windigitalpc.com/wp-content/uploads/2025/05/Monitor-LG-UltraGear-Curvo-34-QHD-VA-160Hz1.png'),
(600, 206, 'negro', 4, 'https://covercompany.com.uy/cdn/shop/files/19950_19951_3.jpg?v=1726589380&width=400'),
(601, 207, 'negro', 3, 'https://casacuesta.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/3/3/3344468-1__1715126132.jpg'),
(602, 131, 'Gris', 2, 'https://http2.mlstatic.com/D_Q_NP_2X_680852-MRD69531082702_052023-N.webp'),
(603, 84, 'Gris', 4, 'https://mobilestoreonline.com/wp-content/uploads/2025/04/Andriod-13-400x400.png'),
(605, 121, 'Rosado', 2, 'https://i.ebayimg.com/images/g/gN0AAOSwy3Rl12Xi/s-l400.jpg'),
(606, 122, 'Gris', 3, 'https://i.ebayimg.com/images/g/nUoAAeSwABJow0IF/s-l400.jpg'),
(610, 126, 'Gris', 1, 'https://i.ebayimg.com/images/g/sOcAAeSw8hNo4ffQ/s-l400.jpg'),
(613, 96, 'Negro', 2, 'https://5.imimg.com/data5/ANDROID/Default/2025/2/487652080/GA/JV/TB/234503777/product-jpeg-500x500.jpg'),
(614, 174, 'Negro', 2, 'https://hisense.com.pe/static/1fee299aec5f19ca4ecea543fbc6bb4f/cd18a/75Q6.jpg'),
(615, 175, 'Negro', 2, 'https://www.megaaudio.com.mx/cdn/shop/files/Pantalla-Hisense-85A7H_01.jpg?v=1736465649&width=416'),
(623, 1, 'Rojo', 2, 'https://target.scene7.com/is/image/Target/GUEST_58d0978e-bfe1-4ad0-b2bf-e3b5f49546f9');

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

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('mKWFA9Z4b0lDt0OtsSliuikz3KgyOn9j', 1767031953, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-12-29T17:19:29.044Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"admin\":{\"id\":90,\"username\":\"nilrad\",\"rol\":\"admin\"}}'),
('n7sJVMXbbyn3z78EFMJdXMae007L5bFF', 1767036180, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-12-29T18:25:41.771Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"admin\":{\"id\":81,\"username\":\"darlin\",\"rol\":\"superadmin\"}}'),
('Rszs1QgMOywIeHrR9m-um73p4kbdnhon', 1767039537, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-12-29T19:31:02.867Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"admin\":{\"id\":81,\"username\":\"darlin\",\"rol\":\"superadmin\"}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('cliente','superadmin','admin','ventas','transportista','soporte','editor') DEFAULT current_timestamp(),
  `activo` tinyint(1) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `rol`, `activo`, `fecha_creacion`) VALUES
(79, 'darlin', 'nilradlvaldez@gmail.com', '$2b$10$H1yfTCPuSSNEJZrRr0l7S.ZrzWvU3VVmpyEoFPgBnJ01uGhKMuUqO', 'cliente', 1, '2025-10-28 01:12:38'),
(81, 'darlin', NULL, '$2b$10$lmcVwVAdk3yIZIleXMx9y.kUDuHzIHY2g/yvuwZGQdQGyQVYt0w5S', 'superadmin', 1, '2025-11-29 17:25:16'),
(90, 'nilrad', NULL, '$2b$10$SNb9XcPSDkXyZzTkLz6ak.YDjIMrRbmrMYmDRyGFXvbp1Ho9OA7BG', 'admin', 0, '2025-11-29 18:02:05'),
(98, 'darlin', 'darlinlvaldez@gmail.com', '$2b$10$cJkJ1Bz/V66nde.3qZ8PJekLjcLnRgVuz6vHPrs8aMq4QhUV5l4RC', 'cliente', 1, '2025-12-14 21:21:39');

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
  ADD KEY `fk_pedidos_ciudad_envio` (`ciudad_envio_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `ciudades_envio`
--
ALTER TABLE `ciudades_envio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=261;

--
-- AUTO_INCREMENT de la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `envios`
--
ALTER TABLE `envios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `fav`
--
ALTER TABLE `fav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=806;

--
-- AUTO_INCREMENT de la tabla `gpu`
--
ALTER TABLE `gpu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `moviles`
--
ALTER TABLE `moviles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT de la tabla `pantalla`
--
ALTER TABLE `pantalla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

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
  ADD CONSTRAINT `fk_pedidos_ciudad_envio` FOREIGN KEY (`ciudad_envio_id`) REFERENCES `ciudades_envio` (`id`) ON UPDATE CASCADE,
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
-- Filtros para la tabla `p_variantes`
--
ALTER TABLE `p_variantes`
  ADD CONSTRAINT `fk_variante_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
