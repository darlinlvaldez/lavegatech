-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2025 a las 20:21:11
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
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `created_at`, `is_active`) VALUES
(1, 'darlin', '$2b$10$Ok1XvBwTGA.u.fapoo2L0ekADvsCq.a8Pkka6Pf3b.iFETqF.1Ia6', '2025-07-13 16:39:48', 1);

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
(1, '64 GB', 'NVMe'),
(2, '128 GB', 'NVMe'),
(3, '256 GB', 'NVMe'),
(4, '512 GB', 'NVMe'),
(5, '1 TB', 'NVMe'),
(6, '128 GB', 'UFS 2.2'),
(7, '256 GB', 'UFS 3.1'),
(8, '512 GB', 'UFS 3.1'),
(9, '1 TB', 'UFS 4.0');

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
  `colorSeleccionado` varchar(100) DEFAULT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `descuento` decimal(10,2) DEFAULT 0.00,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `fecha_agregado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id`, `usuario_id`, `producto_id`, `colorSeleccionado`, `cantidad`, `descuento`, `precio`, `imagen`, `nombre`, `fecha_agregado`) VALUES
(1251, 78, 2, 'verde', 1, 0.00, 17995.00, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg', 'iPhone 12 128GB', '2025-07-23 04:34:41'),
(1259, 75, 1, 'verde', 1, 20.00, 15995.00, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg', 'iPhone 12 64GB', '2025-07-23 06:43:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `imagen` varchar(250) NOT NULL
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

--
-- Volcado de datos para la tabla `clasificacion`
--

INSERT INTO `clasificacion` (`id`, `producto_id`, `usuario_id`, `calificacion`, `comentario`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(45, 1, 75, 3, 'Buenisimo!', '2025-07-09 21:00:43', '2025-07-23 02:48:31');

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
  `order_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `nombre_producto` varchar(150) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) DEFAULT 0.00,
  `subtotal` decimal(10,2) NOT NULL,
  `colorSeleccionado` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_pedido`
--

INSERT INTO `detalles_pedido` (`id`, `order_id`, `producto_id`, `nombre_producto`, `cantidad`, `precio_unitario`, `descuento`, `subtotal`, `colorSeleccionado`) VALUES
(159, 146, 1, 'iPhone 12 64GB', 1, 15995.00, 20.00, 12796.00, 'blanco'),
(160, 147, 2, 'iPhone 12 128GB', 1, 17995.00, 0.00, 17995.00, 'verde'),
(161, 148, 4, 'iPhone 12 Pro 128GB', 1, 21995.00, 0.00, 21995.00, 'negro'),
(162, 149, 6, 'iPhone 12 Pro Max 128GB ', 1, 27495.00, 0.00, 27495.00, 'gris'),
(163, 150, 9, 'iPhone 13 128GB ', 1, 23995.00, 0.00, 23995.00, 'Rojo'),
(164, 151, 19, 'iPhone 14 Plus 256GB ', 1, 30995.00, 0.00, 30995.00, 'negro'),
(165, 152, 1, 'iPhone 12 64GB', 1, 15995.00, 20.00, 12796.00, 'blanco');

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
  `empresa_envio` varchar(100) DEFAULT NULL,
  `estado_envio` varchar(50) DEFAULT 'pendiente',
  `codigo_seguimiento` varchar(100) DEFAULT NULL,
  `costo_envio` decimal(10,2) DEFAULT 0.00,
  `fecha_envio` datetime DEFAULT NULL,
  `fecha_entrega_estimada` datetime DEFAULT NULL,
  `fecha_entregado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fav`
--

CREATE TABLE `fav` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `colorSeleccionado` varchar(100) DEFAULT NULL,
  `descuento` decimal(10,2) DEFAULT 0.00,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `fecha_agregado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fav`
--

INSERT INTO `fav` (`id`, `usuario_id`, `producto_id`, `colorSeleccionado`, `descuento`, `precio`, `imagen`, `nombre`, `fecha_agregado`) VALUES
(700, 75, 1, 'blanco', 20.00, 15995.00, 'https://tecfys.com/290-medium_default/iphone-12-reacondicionado-128-gb-blanco.jpg', 'iPhone 12 64GB', '2025-07-23 06:43:09'),
(701, 75, 1, 'verde', 20.00, 15995.00, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg', 'iPhone 12 64GB', '2025-07-23 06:43:11'),
(702, 75, 1, 'negro', 20.00, 15995.00, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/a75941f0-0032-4680-bda0-ba070e5f9982.jpg', 'iPhone 12 64GB', '2025-07-23 06:43:14');

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
(16, 4),
(17, 4),
(18, 6),
(19, 1),
(19, 6),
(20, 1),
(21, 3);

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
(1, 1, 1, 1, 1, 1, 1, NULL),
(2, 1, 2, 3, 1, 1, 2, NULL),
(3, 1, 3, 2, 1, 1, 3, NULL),
(4, 2, 1, 4, 2, 1, 4, NULL),
(5, 2, 4, 4, 2, 1, 5, NULL),
(6, 2, 4, 5, 2, 1, 6, NULL),
(7, 2, 1, 6, 2, 1, 7, NULL),
(8, 2, 1, 7, 2, 5, 8, NULL),
(9, 3, 5, 8, 2, 5, 9, NULL),
(10, 3, 5, 9, 2, 5, 10, NULL),
(11, 2, 7, 10, 2, 5, 11, NULL),
(12, 2, 7, 11, 2, 2, 12, NULL),
(13, 4, 6, 12, 3, 2, 13, NULL),
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
(44, 15, 18, 22, 11, 4, 16, NULL),
(45, 17, 25, 13, 13, 4, 7, 2),
(46, 22, 19, 24, 14, 4, 19, 2),
(47, 22, 25, 6, 13, 4, 15, 2),
(48, 19, 20, 26, 15, 6, 20, NULL),
(49, 19, 20, 26, 15, 6, 20, NULL),
(50, 20, 20, 27, 16, 6, 21, NULL),
(51, 1, 21, 28, 1, 6, 22, NULL),
(52, 21, 22, 29, 17, 8, 23, NULL),
(53, 22, 23, 30, 11, 8, 24, NULL),
(54, 23, 25, 31, 7, 8, 25, NULL),
(55, 24, 24, 30, 18, 8, 24, NULL),
(56, 24, 24, 32, 18, 8, 24, NULL),
(57, 22, 23, 30, 11, 9, 26, NULL),
(58, 22, 23, 30, 11, 9, 26, NULL),
(59, 24, 24, 32, 18, 8, 26, NULL),
(60, 22, 23, 30, 11, 9, 26, NULL),
(61, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `metodo_pago` varchar(50) NOT NULL,
  `estado_pago` varchar(50) DEFAULT 'pendiente',
  `paypal_order_id` varchar(100) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `order_id`, `metodo_pago`, `estado_pago`, `paypal_order_id`, `fecha_pago`) VALUES
(70, 146, 'paypal', 'completado', '6JD02214X2638905A', '2025-07-23 02:02:12'),
(71, 147, 'paypal', 'completado', '5GW102228B381114D', '2025-07-23 02:09:40'),
(72, 148, 'paypal', 'completado', '87Y15664575013401', '2025-07-23 02:17:50'),
(73, 149, 'paypal', 'completado', '9W151508TM7272941', '2025-07-23 02:21:57'),
(74, 150, 'paypal', 'completado', '85D84198L0894323T', '2025-07-23 02:24:01'),
(75, 151, 'paypal', 'completado', '6AD12795MU113220L', '2025-07-23 02:28:51'),
(76, 152, 'paypal', 'completado', '7XK41110RU677240G', '2025-07-23 02:41:24');

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
(2, '70', '1444p', 'ips', '60 hz', 'gorila');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `direccion` mediumtext NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `distrito` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pendiente',
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `ciudad_envio_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `user_id`, `nombre`, `apellido`, `email`, `direccion`, `ciudad`, `distrito`, `telefono`, `total`, `status`, `fecha_creacion`, `ciudad_envio_id`) VALUES
(146, 75, 'Nilrad', 'L. Valdez', 'darlinlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'La Vega', 'LA VEGA', '8295542244', 12846.00, 'pagado', '2025-07-23 02:02:12', NULL),
(147, 75, 'Nilrad', 'L. Valdez', 'darlinlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'La Vega', 'LA VEGA', '8295542244', 18045.00, 'pagado', '2025-07-23 02:09:40', 1),
(148, 75, 'Nilrad', 'L. Valdez', 'darlinlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'La Vega', 'LA VEGA', '8295542244', 22045.00, 'pagado', '2025-07-23 02:17:50', 1),
(149, 75, 'Nilrad', 'L. Valdez', 'darlinlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'Espaillat', 'LA VEGA', '8295542244', 27655.00, 'pagado', '2025-07-23 02:21:57', 8),
(150, 75, 'Nilrad', 'L. Valdez', 'darlinlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'La Vega', 'LA VEGA', '8295542244', 24045.00, 'pagado', '2025-07-23 02:24:01', 1),
(151, 75, 'Nilrad', 'L. Valdez', 'darlinlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'Santo Domingo', 'LA VEGA', '8295542244', 31245.00, 'pagado', '2025-07-23 02:28:51', 3),
(152, 75, 'Nilrad', 'L. Valdez', 'darlinlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'San Cristóbal', 'LA VEGA', '8295542244', 13016.00, 'pagado', '2025-07-23 02:41:24', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `movil_id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `precio` decimal(10,2) DEFAULT 0.00,
  `categoria_id` int(11) DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT 0.00,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `marca_id` int(11) DEFAULT NULL,
  `ram_id` int(11) DEFAULT NULL,
  `almacenamiento_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `movil_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `descuento`, `fecha`, `marca_id`, `ram_id`, `almacenamiento_id`) VALUES
(1, 1, 'iPhone 12 64GB', '', 15995.00, 1, 20.00, '2025-05-31 11:06:10', 1, NULL, NULL),
(2, 1, 'iPhone 12 128GB', '', 17995.00, 1, 0.00, '2025-05-31 08:00:00', 1, NULL, NULL),
(3, 1, 'iPhone 12 256GB', '', 19495.00, 1, 0.00, '2025-05-31 08:00:00', 1, NULL, NULL),
(4, 2, 'iPhone 12 Pro 128GB', '', 21995.00, 1, 0.00, '2025-05-31 08:00:00', 1, NULL, NULL),
(5, 2, 'iPhone 12 Pro 256GB', '', 23995.00, 1, 0.00, '2025-05-31 08:00:00', 1, NULL, NULL),
(6, 3, 'iPhone 12 Pro Max 128GB ', '', 27495.00, 1, 0.00, '2025-05-31 08:00:00', 1, NULL, NULL),
(7, 3, 'iPhone 12 Pro Max 256GB ', '', 28995.00, 1, 0.00, '2025-05-31 08:00:00', 1, NULL, NULL),
(8, 3, 'iPhone 12 Pro Max 512GB', '', 29995.00, 1, 0.00, '2025-05-01 08:00:00', 1, NULL, NULL),
(9, 4, 'iPhone 13 128GB ', '', 23995.00, 1, 0.00, '2025-05-01 08:00:00', 1, NULL, NULL),
(10, 4, 'iPhone 13 256GB ', '', 25495.00, 1, 0.00, '2025-05-01 08:00:00', 1, NULL, NULL),
(11, 5, 'iPhone 13 Pro 128GB ', '', 28495.00, 1, 0.00, '2025-05-14 08:00:00', 1, NULL, NULL),
(12, 5, 'iPhone 13 Pro 256GB ', '', 30995.00, 1, 0.00, '2025-03-11 08:00:00', 1, NULL, NULL),
(13, 6, 'iPhone 13 Pro Max 128GB ', '', 32995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(14, 6, 'iPhone 13 Pro Max 256GB ', '', 35995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(15, 6, 'iPhone 13 Pro Max 512GB ', '', 37495.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(16, 7, 'iPhone 14 128GB ', '', 26495.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(17, 7, 'iPhone 14 256GB ', '', 27995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(18, 8, 'iPhone 14 Plus 128GB ', '', 28995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(19, 8, 'iPhone 14 Plus 256GB ', '', 30995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(20, 9, 'iPhone 14 Pro 128GB ', '', 34495.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(21, 9, 'iPhone 14 Pro 256GB ', '', 36495.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(22, 9, 'iPhone 14 Pro 512GB ', '', 38995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(23, 10, 'iPhone 14 Pro Max 128GB ', '', 41495.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(24, 10, 'iPhone 14 Pro Max 256GB ', '', 43995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(25, 10, 'iPhone 14 Pro Max 512GB ', '', 46495.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(26, 11, 'iPhone 15 128GB ', '', 35995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(27, 11, 'iPhone 15 256GB ', '', 37995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(28, 12, 'iPhone 15 Plus 128GB ', '', 38995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(29, 12, 'iPhone 15 Plus 512GB ', '', 42995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(32, 14, 'iPhone 15 Pro Max 256GB', '', 54995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(33, 14, 'iPhone 15 Pro Max 512GB ', '', 57995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(34, 14, 'iPhone 15 Pro Max 1TB ', '', 61995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(35, 15, 'iPhone 16 128GB ', '', 52495.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(36, 16, 'iPhone 16E 256GB', '', 44995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(37, 17, 'iPhone 16 Plus 128GB ', '', 54995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(38, 18, 'iPhone 16 Pro Max 256GB ', '', 74995.00, 1, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(39, 18, 'iPhone 16 Pro Max 512GB ', '', 84995.00, 1, 0.00, '2025-03-01 08:00:00', 1, NULL, NULL),
(40, 19, 'SAMSUNG GALAXY S10 PLUS 8+128GB', '', 9995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(41, 20, 'SAMSUNG GALAXY NOTE 10 PLUS 12+256GB', '', 13995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(42, 21, 'SAMSUNG GALAXY NOTE 20 ULTRA 12+128GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(43, 22, 'SAMSUNG GALAXY S21 ULTRA 12+128GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(44, 23, 'SAMSUNG GALAXY S23 ULTRA 12+256GB', '', 39495.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(45, 24, 'SAMSUNG GALAXY S25 ULTRA 12+512GB ', '', 84995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(46, 25, 'SAMSUNG GALAXY A05 6+128GB ', '', 7995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(47, 25, 'SAMSUNG GALAXY A05 4+64GB ', '', 6995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(48, 26, 'SAMSUNG GALAXY A15 6+128GB ', '', 8995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(49, 27, 'SAMSUNG GALAXY A25 5G 8+256GB ', '', 12995.00, 1, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(50, 28, 'XIAOMI REDMI NOTE 13 5G 8+256GB', '', 10995.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(51, 29, 'XIAOMI REDMI NOTE 13 PRO PLUS 5G 12+256GB', '', 20995.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(52, 30, 'XIAOMI POCO X6 PRO 8+256 GB', '', 17495.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(53, 31, 'XIAOMI REDMI 14C 4+128GB', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(54, 32, 'XIAOMI REDMI NOTE 14 8+128GB', '', 10495.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(55, 32, 'XIAOMI REDMI NOTE 14 8+256GB', '', 11995.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(56, 33, 'XIAOMI REDMI NOTE 14 5G 12+256GB', '', 13995.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(57, 34, 'XIAOMI REDMI NOTE 14 PRO 8+256GB', '', 15995.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(58, 35, 'XIAOMI REDMI NOTE 14 PRO 5G 12+256GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(59, 36, 'XIAOMI REDMI NOTE 14 PRO PLUS 5G 12+256GB', '', 22995.00, 1, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(60, 37, 'Google Pixel 7 Pro 12+128GB', '', 17495.00, 1, 0.00, '2023-01-01 08:00:00', 4, NULL, NULL),
(61, 38, 'Google Pixel 8 Pro 12+128GB', '', 24995.00, 1, 0.00, '2023-01-01 08:00:00', 4, NULL, NULL),
(62, 39, 'INFINIX SMART 8 4+128GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', 19, NULL, NULL),
(63, 40, 'INFINIX SMART 9 4+128GB', '', 5995.00, 1, 0.00, '2023-01-01 08:00:00', 19, NULL, NULL),
(64, 41, 'INFINIX HOT 50I 6+256GB', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', 19, NULL, NULL),
(65, 42, 'ZTE A35 CORE 4+64GB', '', 3995.00, 1, 0.00, '2023-01-01 08:00:00', 20, NULL, NULL),
(66, 43, 'ZTE A35 4+64GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', 20, NULL, NULL),
(67, 44, 'ZTE BLADE V60 6+256GB ', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', 20, NULL, NULL),
(68, 45, 'ZTE NUBIA NEO 2 5G 8+256GB', '', 11995.00, 1, 0.00, '2023-01-01 08:00:00', 20, NULL, NULL),
(69, 46, 'MOTOROLA E14 2+64GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(70, 47, 'MOTOROLA G04 4+128GB', '', 5995.00, 1, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(71, 0, 'IPAD PRO 12.9-INCH 6TA GEN 128GB', '', 45995.00, 5, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(72, 0, 'IPAD PRO 12.9 6TA GEN 256GB', '', 47495.00, 5, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(73, 0, 'IPAD PRO M2 512GB 12.9 6TA GEN ', '', 49995.00, 5, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(74, 0, 'IPAD PRO 13 PULGADAS M4 512GB', '', 57995.00, 5, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(75, 0, 'IPAD PRO 13 PULGADAS M4 256GB', '', 54995.00, 5, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(76, 0, 'IPAD 10 GEN 64GB', '', 23495.00, 5, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(79, 0, 'AMAZON FIRE 8 32GB', '', 2995.00, 5, 0.00, '2023-01-01 08:00:00', 5, NULL, NULL),
(80, 0, 'AMAZON FIRE 8 64GB', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', 5, NULL, NULL),
(81, 0, 'ASTRO 8R 32G', '', 3495.00, 5, 0.00, '2025-03-30 08:00:00', NULL, NULL, NULL),
(82, 0, 'XIAOMI REDMI PAD SE 8.7 128GB ', '', 8495.00, 5, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(83, 0, 'VORTEX T10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', 6, NULL, NULL),
(84, 0, 'HOTPEPPER 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(85, 0, 'X10MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(86, 0, 'VORTEX T10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', 6, NULL, NULL),
(87, 0, 'SKYPAD 10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', 7, NULL, NULL),
(88, 0, 'SKYPAD 10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', 7, NULL, NULL),
(89, 0, 'Macbook Pro 13-Inch 2020 i5-8ram 512GB', '', 31995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(90, 0, 'Macbook Air 13-Inch 2020 i3-8ram 256GB', '', 29495.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(91, 0, 'Macbook Pro 16-Inch 2019 i7-16ram 512GB', '', 34995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(92, 0, 'Macbook Pro 16-Inch 2019 i9-32Ram 512GB', '', 39995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(93, 0, 'Macbook Pro 16-Inch 2019 i9-16Ram 1TB', '', 41995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(94, 0, 'Macbook Air M1 8Ram 256GB ', '', 44995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(95, 0, 'Macbook Pro M2 2022 8-Ram 256GB', '', 51995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(96, 0, 'Macbook Air 15-Inch M2 256GB ', '', 54995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(97, 0, 'HP Victus i5 12GEN 3050TI 8+512GB ', '', 33495.00, 3, 0.00, '2023-01-01 08:00:00', 8, NULL, NULL),
(98, 0, 'Asus Tuf Gaming F15 i5-12GEN 16Ram-3050 512GB', 'waos', 39995.00, 3, 0.00, '2025-06-23 16:00:00', 9, NULL, NULL),
(99, 0, 'HP 15.6Inch i5 12GEN 8+256GB ', '', 23995.00, 3, 0.00, '2023-01-01 08:00:00', 8, NULL, NULL),
(100, 0, 'HP i5 13GEN 8+256GB ', '', 24995.00, 3, 0.00, '2023-01-01 08:00:00', 8, NULL, NULL),
(108, 0, 'SAMSUNG GALAXY TAB A9+ 64GB ', '', 11495.00, 5, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(109, 0, 'SAMSUNG GALAXY TAB A9+ 128GB ', '', 13495.00, 5, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(120, 0, 'Macbook Pro 13-Inch 2020 i5 8+512GB', '', 31995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(121, 0, 'Macbook Air 13-Inch 2020 i3 8+256GB ', '', 29495.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(122, 0, 'Macbook Pro 16-Inch 2019 i7 16+512GB ', '', 34995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(123, 0, 'Macbook Pro 16-Inch 2019 i9 32+512GB ', '', 39995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(124, 0, 'Macbook Pro 16-Inch 2019 i9 16+1TB', '', 41995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(125, 0, 'Macbook Air M1 8+256GB ', '', 44995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(126, 0, 'Macbook Pro M2 2022 8+256GB', '', 51995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(127, 0, 'Macbook Air 15-Inch M2 256GB', '', 54995.00, 3, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(128, 0, 'HP Victus i5 12GEN 3050TI 8+512GB ', '', 33495.00, 3, 0.00, '2023-01-01 08:00:00', 8, NULL, NULL),
(130, 0, 'HP 15.6Inch i5 12GEN 8+256GB ', '', 23995.00, 3, 0.00, '2023-01-01 08:00:00', 8, NULL, NULL),
(131, 0, 'HP i5-13Gen-8Ram HP 256GB ', '', 24995.00, 3, 0.00, '2023-01-01 08:00:00', 8, NULL, NULL),
(132, 0, 'Lenovo i3-12GEN 8+256GB ', '', 21495.00, 3, 0.00, '2023-01-01 08:00:00', 10, NULL, NULL),
(133, 0, 'SAMSUNG WATCH 6 CLASSIC', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(134, 0, 'SAMSUNG WATCH 6', '', 11995.00, 6, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(135, 0, 'SAMSUNG WATCH 7', '', 15995.00, 6, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(136, 0, 'Samsung Galaxy Buds 3', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(137, 0, 'Samsung Galaxy Buds 2', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(138, 0, 'BEATS SOLO 4', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(139, 0, 'BEATS STUDIO PRO', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(140, 0, 'XIAOMI REDMI BUDS 4 ACTIVE', '', 1995.00, 6, 0.00, '2023-01-01 08:00:00', 3, NULL, NULL),
(142, 0, 'AIRPODS GEN 2', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(143, 0, 'AIRPODS GEN 3', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(144, 0, 'AIRPODS GEN 4 CANCELACION DE RUIDO', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(145, 0, 'AIRPODS PRO 2 TIPO C OPEN BOX', '', 10995.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(146, 0, 'RAZER BARRACUDA X', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(147, 0, 'APPLE WATCH SE 2', '', 10495.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(148, 0, 'APPLE WATCH SERIE 7', '', 12994.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(149, 0, 'APPLE WATCH SERIE 8', '', 14495.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(150, 0, 'APPLE WATCH SERIE ULTRA', '', 24995.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(151, 0, 'APPLE WATCH SERIE 9', '', 16495.00, 6, 0.00, '2023-01-01 08:00:00', 1, NULL, NULL),
(152, 0, 'Smart TV Onn 32 Pulgadas', '', 9995.00, 2, 0.00, '2023-01-01 08:00:00', 14, NULL, NULL),
(153, 0, 'Smart TV Onn 43 Pulgadas', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', 14, NULL, NULL),
(154, 0, 'Smart TV Onn 65 Pulgadas', '', 28995.00, 2, 0.00, '2023-01-01 08:00:00', 14, NULL, NULL),
(155, 0, 'Smart TV Onn 75 Pulgadas', '', 36995.00, 2, 0.00, '2023-01-01 08:00:00', 14, NULL, NULL),
(156, 0, 'Smart TV Phillips 32 Pulgadas', '', 9995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(157, 0, 'Smart TV TCL Androide 32 Pulgadas', '', 10995.00, 2, 0.00, '2023-01-01 08:00:00', 11, NULL, NULL),
(158, 0, 'Smart TV TCL Roku 43 Pulgadas', '', 16495.00, 2, 0.00, '2023-01-01 08:00:00', 11, NULL, NULL),
(159, 0, 'Smart TV TCL Roku 55 Pulgadas', '', 23995.00, 2, 0.00, '2023-01-01 08:00:00', 11, NULL, NULL),
(160, 0, 'Smart TV TCL Google 55 Pulgadas', '', 24995.00, 2, 0.00, '2023-01-01 08:00:00', 11, NULL, NULL),
(161, 0, 'Smart TV TCL Fire TV 58 Pulgadas', '', 27495.00, 2, 0.00, '2023-01-01 08:00:00', 11, NULL, NULL),
(162, 0, 'Smart TV TCL Roku 65 Pulgadas', '', 30995.00, 2, 0.00, '2025-03-14 08:00:00', 11, NULL, NULL),
(163, 0, 'Smart TV TCL Google 65 Pulgadas', '', 34995.00, 2, 0.00, '2023-01-01 08:00:00', 11, NULL, NULL),
(164, 0, 'Smart TV TCL Roku 85 Pulgadas', '', 74995.00, 2, 0.00, '2023-01-01 08:00:00', 11, NULL, NULL),
(165, 0, 'Smart TV WESTINGHOUSE ROKU 43 Pulgadas', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', 13, NULL, NULL),
(166, 0, 'Smart TV WESTINGHOUSE ROKU 65 Pulgadas', '', 28495.00, 2, 0.00, '2023-01-01 08:00:00', 13, NULL, NULL),
(167, 0, 'Smart TV HISENSE GOOGLE 43 Pulgadas', '', 16995.00, 2, 0.00, '2023-01-01 08:00:00', 12, NULL, NULL),
(168, 0, 'Smart TV HISENSE GOOGLE QLED D5 43 Pulgadas', '', 18995.00, 2, 0.00, '2023-01-01 08:00:00', 12, NULL, NULL),
(169, 0, 'Smart TV HISENSE A7 Google 50 Pulgadas', '', 21495.00, 2, 0.00, '2023-01-01 08:00:00', 12, NULL, NULL),
(170, 0, 'Smart TV HISENSE QLED QD5 2024 55 Pulgadas', '', 27495.00, 2, 0.00, '2023-01-01 08:00:00', 12, NULL, NULL),
(171, 0, 'Smart TV HISENSE QLED D5 GOOGLE 65 Pulgadas', '', 37495.00, 2, 0.00, '2023-01-01 08:00:00', 12, NULL, NULL),
(172, 0, 'Smart TV HISENSE S7N CANVAS QLED GOOGLE 65 Pulgadas', 'siuuuusaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 62495.00, 2, 0.00, '2023-01-01 12:00:00', 12, NULL, NULL),
(173, 0, 'Smart TV HISENSE A7 Google 75 Pulgadas', '', 42995.00, 2, 0.00, '2023-01-01 08:00:00', 12, NULL, NULL),
(174, 0, 'Smart TV HISENSE QLED QD6 GOOGLE 75 Pulgadas', '', 49995.00, 2, 0.00, '2023-01-01 08:00:00', 12, NULL, NULL),
(175, 0, 'Smart TV HISENSE A7 Google 85 Pulgadas', '', 82995.00, 2, 0.00, '2023-01-01 08:00:00', 12, NULL, NULL),
(176, 0, 'Smart TV SAMSUNG SERIE 7 2024 55 Pulgadas', '', 28995.00, 2, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(177, 0, 'Smart TV SAMSUNG QLED Q6 55 Pulgadas', '', 34995.00, 2, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(178, 0, 'Smart TV SAMSUNG DU7200 2024 65 Pulgadas', '', 36495.00, 2, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(179, 0, 'Smart TV SAMSUNG 75 Pulgadas', '', 54995.00, 2, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(180, 0, 'Aire Acondicionado Inverter D WORLD 12000', '', 20995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(181, 0, 'Aire Acondicionado Inverter GBR 18000', '', 32495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(182, 0, 'Aire Acondicionado Inverter TCL 24000', '', 44495.00, 6, 0.00, '2023-01-01 08:00:00', 11, NULL, NULL),
(183, 0, 'Aire Acondicionado Inverter Black+Decker 12000', '', 23495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(184, 0, 'PlayStation 5 Slim', '', 33995.00, 4, 0.00, '2025-03-13 08:00:00', 15, NULL, NULL),
(185, 0, 'Onyx Studio 8', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(186, 0, 'Subwofer Barra de Sonido LG', '', 7995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(187, 0, 'Samsung Barra de Sonido iHome 120w', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(188, 0, 'Samsung Barra de Sonido iHome 180w', '', 7995.00, 6, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(189, 0, 'Freidora de Aire Brentwood 4L', '', 3995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(190, 0, 'Freidora de Aire Ninja Speed 6L', '', 7495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(191, 0, 'Microonda Sokany', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(192, 0, 'MOUSE RAZER DEATHADDER ESSENTIAL', '', 2495.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(193, 0, 'TECLADO RAZER ORNATA V3', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(194, 0, 'JBL FLIP 5', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', 18, NULL, NULL),
(195, 0, 'JBL PARTYBOX ON-THE-GO', '', 19995.00, 6, 0.00, '2023-01-01 08:00:00', 18, NULL, NULL),
(196, 0, 'JBL BOOMBOX3', '', 26495.00, 6, 0.00, '2023-01-01 08:00:00', 18, NULL, NULL),
(197, 0, 'JBL CHARGE 5', '', 9495.00, 6, 0.00, '2023-01-01 08:00:00', 18, NULL, NULL),
(198, 0, 'JBL CLIP 4', '', 4495.00, 6, 0.00, '2023-01-01 08:00:00', 18, NULL, NULL),
(199, 0, 'JBL GO 3', '', 2995.00, 6, 0.00, '2023-01-01 08:00:00', 18, NULL, NULL),
(200, 0, 'SONY SRS-XG500', '', 22495.00, 6, 0.00, '2023-01-01 08:00:00', 15, NULL, NULL),
(201, 0, 'ANIKER SOUNDCORE', '', 2995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(202, 0, 'SOUNDCORE BOOM 2 PLUS', '', 14995.00, 6, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(203, 0, 'Monitor Asus VG1B 27 Pulgada 165HZ', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', 9, NULL, NULL),
(204, 0, 'Monitor LG Ultragear 34 Pulgada 160HZ', '', 24995.00, 2, 0.00, '2023-01-01 08:00:00', NULL, NULL, NULL),
(206, 0, 'Monitor Samsung G4 ODYSSEEY 27 Pulgada 240HZ', '', 19995.00, 2, 0.00, '2023-01-01 08:00:00', 2, NULL, NULL),
(207, 0, 'Monitor Samsung G5 ODYSSEY 32 Pulgada 165HZ', 'siuuuusaddddassdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdasdsiuuuusaddddassdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdasdsiuuuusaddddassdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdasdsiuuuusaddddassdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdasd', 22995.00, 2, 0.00, '2023-01-02 12:00:00', 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p_marcas`
--

CREATE TABLE `p_marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(20, 'ZTE', 'img/marcas/jbl.png'),
(21, 'cocacola', 'no sabe tu');

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
(377, 25, 'dorado', 1, 'https://i.ebayimg.com/images/g/0MgAAOSwWIpkW5u-/s-l1600.webp'),
(382, 1, 'blanco', 2, 'https://tecfys.com/290-medium_default/iphone-12-reacondicionado-128-gb-blanco.jpg'),
(383, 1, 'negro', 5, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/a75941f0-0032-4680-bda0-ba070e5f9982.jpg'),
(384, 1, 'verde', 4, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg'),
(385, 2, 'verde', 2, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/ac2bc9ad-acf2-445a-bb14-9ae431b02d5b.jpg'),
(386, 2, 'pupura', 4, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/b01801bc-4c3c-411e-9ff0-dac6b4e34a87.jpg'),
(387, 3, 'blanco', 2, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/6caf4891-9655-4247-a11c-9719a3db6244.jpg'),
(388, 3, 'rojo', 1, 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/3e753e1fb0e87cd42082ba1ad4cd117e/859d07b9-f8a1-43bc-b8c3-ff09652e2c26.jpg'),
(389, 4, 'negro', 5, 'https://i.ebayimg.com/images/g/6VEAAOSwcrlhP6ad/s-l1600.webp'),
(390, 4, 'blanco', 4, 'https://i.ebayimg.com/images/g/WloAAOSwcU9hP6ap/s-l1600.webp'),
(391, 5, 'azul', 2, 'https://i.ebayimg.com/images/g/9PsAAOSwnh5hP6a7/s-l1600.webp'),
(392, 5, 'verde', 4, 'https://i.ebayimg.com/images/g/s2MAAOSwugxhP6bJ/s-l1600.webp'),
(393, 6, 'gris', 2, 'https://i.ebayimg.com/images/g/QVEAAOSwbWdhQfcN/s-l1600.webp'),
(394, 6, 'oro', 4, 'https://i.ebayimg.com/images/g/l8AAAOSwrQlhQfcU/s-l1600.webp'),
(395, 7, 'blanco', 3, 'https://i.ebayimg.com/images/g/Yj4AAOSwmb5hQfca/s-l1600.webp'),
(396, 7, 'azul', 6, 'https://i.ebayimg.com/images/g/YZsAAOSwntxhQfch/s-l1600.webp'),
(397, 8, 'gris', 4, 'https://i.ebayimg.com/images/g/KSQAAOSwa4xhQfcO/s-l1600.webp'),
(398, 9, 'Rojo', 1, 'https://i.ebayimg.com/images/g/iZ4AAOSwk7pkwnXM/s-l1600.webp'),
(399, 9, 'azul', 4, 'https://i.ebayimg.com/images/g/rdMAAOSwjUFkwnXL/s-l1600.webp'),
(400, 10, 'blanco', 5, 'https://i.ebayimg.com/images/g/4pEAAOSwxchkwnXN/s-l1600.webp'),
(401, 10, 'pupura', 4, 'https://i.ebayimg.com/images/g/Yp4AAOSwPLNkwnXM/s-l1600.webp'),
(402, 11, 'verde', 6, 'https://i.ebayimg.com/images/g/Gq4AAeSwNhNobXlW/s-l960.webp'),
(403, 11, 'azul', 4, 'https://i.ebayimg.com/images/g/ScgAAeSwnqdobXlV/s-l960.webp'),
(404, 12, 'gris', 4, 'https://i.ebayimg.com/images/g/eeYAAeSw4S9obXlU/s-l960.webp'),
(405, 12, 'blanco', 1, 'https://i.ebayimg.com/images/g/FkcAAeSwvgNobXlS/s-l960.webp'),
(406, 13, 'oro', 4, 'https://i.ebayimg.com/images/g/FkcAAeSwvgNobXlS/s-l960.webp'),
(409, 14, 'gris', 6, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Grey.jpg'),
(410, 14, 'oro', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Gold.jpg'),
(411, 15, 'blanco', 4, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Silver.jpg'),
(412, 15, 'verde', 2, 'https://s3.amazonaws.com/iwm-ebay/images/products/iPhone+13+Pro+Max/iPhone+13+Pro+Max+Green.jpg'),
(413, 16, 'negro', 4, 'https://i.ebayimg.com/images/g/AKQAAOSwn51oE~FN/s-l1600.webp'),
(414, 16, 'blanco', 5, 'https://i.ebayimg.com/images/g/BvQAAOSwhH1mkSlU/s-l1600.webp'),
(415, 17, 'Rojo', 4, 'https://i.ebayimg.com/images/g/bg4AAOSw2g1mkSlx/s-l1600.webp'),
(416, 17, 'azul', 4, 'https://i.ebayimg.com/images/g/C-QAAOSw8l5mkSmR/s-l1600.webp'),
(417, 18, 'amarillo', 3, 'https://i.ebayimg.com/images/g/k-8AAOSwofxmkSoT/s-l1600.webp'),
(418, 18, 'pupura', 4, 'https://i.ebayimg.com/images/g/XPIAAOSwYEtmkSnd/s-l1600.webp'),
(419, 19, 'negro', 2, 'https://i.ebayimg.com/images/g/~RgAAOSwKkhl61i3/s-l1600.webp'),
(420, 19, 'azul', 4, 'https://i.ebayimg.com/images/g/C-QAAOSw8l5mkSmR/s-l1600.webp'),
(421, 20, 'negro', 4, 'https://i.ebayimg.com/images/g/o~UAAOSwVB1kXRSz/s-l1600.webp'),
(422, 20, 'blanco', 1, 'https://i.ebayimg.com/images/g/sI4AAOSwi5lkXRTg/s-l1600.webp'),
(423, 21, 'oro', 4, 'https://i.ebayimg.com/images/g/-FYAAOSw8UNkXRT4/s-l1600.webp'),
(424, 21, 'blanco', 1, 'https://i.ebayimg.com/images/g/sI4AAOSwi5lkXRTg/s-l1600.webp'),
(425, 22, 'gris', 2, 'https://i.ebayimg.com/images/g/ml4AAOSwQJZkXRUR/s-l1600.webp'),
(426, 22, 'negro', 4, 'https://i.ebayimg.com/images/g/o~UAAOSwVB1kXRSz/s-l140.webp'),
(433, 1, 'rojo', 2, 'https://images-cdn.ubuy.qa/636b9edfc1468339965d9f98-new-apple-iphone-12-64gb-productred.jpg');

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
(1, '4 GB', 'LPDDR4X'),
(2, '6 GB', 'LPDDR4X'),
(3, '8 GB', 'LPDDR5'),
(4, '8 GB', 'LPDDR4X'),
(5, '12 GB', 'LPDDR5'),
(6, '12 GB', 'LPDDR4X'),
(7, '16 GB', 'LPDDR5'),
(8, '4 GB', 'LPDDR4'),
(9, '6 GB', 'LPDDR5');

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
('099g6WylgoE1L8yclAPvBa7-9mnx4ANb', 1753295231, '{\"cookie\":{\"originalMaxAge\":3599999,\"expires\":\"2025-07-23T17:27:17.936Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"admin\":{\"id\":1,\"username\":\"darlin\"},\"user\":{\"id\":75,\"email\":\"darlinlvaldez@gmail.com\",\"username\":\"darlin\"}}'),
('vjzyv47T_tIUPdz7_CMhegPSHGdefxjn', 1753298327, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-07-23T18:31:32.711Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"admin\":{\"id\":1,\"username\":\"darlin\"}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `is_active`, `created_at`) VALUES
(75, 'darlin', 'darlinlvaldez@gmail.com', '$2b$10$daPgRMDJ07ah/gGuXRNP5unuAaS0HPGRBeVMQQx43y6.xe7o1D9ze', 1, '2025-05-26 00:18:31'),
(78, 'nilrad', 'nilradlvaldez@gmail.com', '$2b$10$7Tt9F/p5zZd.AQN3vRrMTeEI8QkxXZcOM7.i3fWBA74IZHNVJfrwi', 1, '2025-07-22 23:56:46');

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
(13, 2),
(13, 3),
(13, 4),
(18, 4),
(19, 2),
(20, 3),
(21, 2),
(22, 2),
(23, 3),
(24, 4),
(25, 1),
(25, 2),
(26, 0),
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
(46, 1),
(47, 2),
(53, 6),
(54, 2),
(55, 3);

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
(13, 3),
(18, 5),
(19, 4),
(20, 6),
(21, 6),
(21, 8),
(22, 6),
(23, 5),
(24, 7),
(25, 1),
(25, 2),
(26, 2),
(27, 3),
(28, 3),
(29, 5),
(30, 3),
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
(40, 1),
(41, 2),
(42, 1),
(43, 1),
(44, 2),
(45, 3),
(46, 8),
(47, 1),
(53, 1),
(54, 3),
(55, 1),
(56, 1),
(57, 2),
(58, 2),
(59, 1),
(60, 6),
(60, 9);

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
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `fk_cart_producto` (`producto_id`);

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
  ADD KEY `order_id` (`order_id`),
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
  ADD UNIQUE KEY `uniq_fav` (`usuario_id`,`producto_id`,`colorSeleccionado`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `producto_id` (`producto_id`);

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
  ADD KEY `order_id` (`order_id`);

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
  ADD KEY `fk_orders_usuario` (`user_id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `baterias`
--
ALTER TABLE `baterias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `camara`
--
ALTER TABLE `camara`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1260;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `conectividad`
--
ALTER TABLE `conectividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT de la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `fav`
--
ALTER TABLE `fav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=703;

--
-- AUTO_INCREMENT de la tabla `moviles`
--
ALTER TABLE `moviles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `pantalla`
--
ALTER TABLE `pantalla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT de la tabla `p_marcas`
--
ALTER TABLE `p_marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `p_variantes`
--
ALTER TABLE `p_variantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=434;

--
-- AUTO_INCREMENT de la tabla `ram`
--
ALTER TABLE `ram`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `fk_cart_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD CONSTRAINT `clasificacion_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `clasificacion_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD CONSTRAINT `detalles_pedido_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_items` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `envios`
--
ALTER TABLE `envios`
  ADD CONSTRAINT `envios_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`);

--
-- Filtros para la tabla `fav`
--
ALTER TABLE `fav`
  ADD CONSTRAINT `fk_fav` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_fav_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `marca_categoria`
--
ALTER TABLE `marca_categoria`
  ADD CONSTRAINT `marca_categoria_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `p_marcas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `marca_categoria_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_ciudad_envio` FOREIGN KEY (`ciudad_envio_id`) REFERENCES `ciudades_envio` (`id`),
  ADD CONSTRAINT `fk_orders_usuario` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_almacenamiento` FOREIGN KEY (`almacenamiento_id`) REFERENCES `almacenamiento` (`id`),
  ADD CONSTRAINT `fk_ram` FOREIGN KEY (`ram_id`) REFERENCES `ram` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
