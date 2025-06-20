-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2025 a las 20:06:10
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
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
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
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`id`, `usuario_id`, `producto_id`, `colorSeleccionado`, `cantidad`, `descuento`, `precio`, `imagen`, `nombre`, `fecha_agregado`) VALUES
(1214, 75, 1, 'azul', 2, 20.00, 15995.00, 'https://hsi.com.co/wp-content/uploads/2022/03/Apple-iPhone-12-128GB-Usado-B-Azul-400x400.jpg', 'iPhone 12 64GB', '2025-06-08 01:51:48'),
(1215, 75, 2, 'blanco', 2, 0.00, 17995.00, 'https://rukminim2.flixcart.com/image/850/1000/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8dkyh2zgrh.jpeg?q=90&crop=false', 'iPhone 12 128GB', '2025-06-10 17:16:53'),
(1218, 75, 1, 'negro espacial', 3, 20.00, 15995.00, 'https://www.trippodo.com/997943-medium_default/apple-iphone-12-155-cm-61-sim-doble-ios-14-5g-128-.jpg', 'iPhone 12 64GB', '2025-06-14 16:31:06');

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
(664, 75, 1, 'purpura', 20.00, 15995.00, 'https://www.artefacta.com/media/catalog/product/1/4/148658_2_.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400', 'iPhone 12 64GB', '2025-06-07 15:22:34'),
(666, 75, 1, 'negro espacial', 20.00, 15995.00, 'https://www.trippodo.com/997943-medium_default/apple-iphone-12-155-cm-61-sim-doble-ios-14-5g-128-.jpg', 'iPhone 12 64GB', '2025-06-12 00:29:26'),
(667, 75, 2, 'blanco', 0.00, 17995.00, 'https://rukminim2.flixcart.com/image/850/1000/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8dkyh2zgrh.jpeg?q=90&crop=false', 'iPhone 12 128GB', '2025-06-13 00:02:03'),
(669, 75, 3, 'dorado', 0.00, 19495.00, 'https://www.cnet.com/a/img/resize/f3c42740a704792b25be68e230db619993cd564f/hub/2020/11/09/d0f15941-5210-4a0b-ab66-78a2e58dd245/16-iphone-12-pro-max.jpg?auto=webp&fit=crop&height=900&width=1200', 'iPhone 12 256GB', '2025-06-14 17:34:50');

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
  `marca_id` int(11) DEFAULT NULL,
  `año` int(11) DEFAULT NULL,
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

INSERT INTO `moviles` (`id`, `marca_id`, `año`, `cpu_id`, `camara_id`, `bateria_id`, `gpu_id`, `conectividad_id`, `dimensionespeso_id`, `pantalla_id`) VALUES
(1, 1, 2020, 1, 1, 1, 1, 1, 1, NULL),
(2, 1, 2020, 1, 2, 3, 1, 1, 2, NULL),
(3, 1, 2020, 1, 3, 2, 1, 1, 3, NULL),
(4, 1, 2021, 2, 1, 4, 2, 1, 4, NULL),
(5, 1, 2021, 2, 4, 4, 2, 1, 5, NULL),
(6, 1, 2021, 2, 4, 5, 2, 1, 6, NULL),
(7, 1, 2022, 2, 1, 6, 2, 1, 7, NULL),
(8, 1, 2022, 2, 1, 7, 2, 5, 8, NULL),
(9, 1, 2022, 3, 5, 8, 2, 5, 9, NULL),
(10, 1, 2022, 3, 5, 9, 2, 5, 10, NULL),
(11, 1, 2023, 2, 7, 10, 2, 5, 11, NULL),
(12, 1, 2023, 2, 7, 11, 2, 2, 12, NULL),
(13, 1, 2023, 4, 6, 12, 3, 2, 13, NULL),
(14, 1, 2023, 4, 8, 9, 3, 2, 14, NULL),
(15, 1, 2025, 5, 7, 13, 2, 3, 15, NULL),
(16, 1, 2025, 2, 7, 14, 2, 5, 16, NULL),
(17, 1, 2025, 5, 7, 15, 2, 3, 17, NULL),
(18, 1, 2025, 5, 8, 16, 3, 4, 18, NULL),
(19, 1, 2019, 7, 9, 2, 5, 4, 19, NULL),
(20, 1, 2019, 7, 9, 3, 5, 4, 3, NULL),
(21, 1, 2020, 6, 9, 5, 4, 1, 6, NULL),
(22, 1, 2021, 6, 9, 7, 4, 1, 8, NULL),
(23, 1, 2023, 8, 10, 17, 6, 2, 12, NULL),
(24, 1, 2025, 8, 10, 17, 6, 3, 18, NULL),
(25, 1, 2023, 6, 11, 14, 4, 4, 15, NULL),
(26, 1, 2023, 6, 11, 18, 4, 1, 16, NULL),
(27, 1, 2023, 6, 11, 18, 4, 1, 17, NULL),
(28, 1, 2024, 10, 12, 19, 8, 1, 15, NULL),
(29, 1, 2024, 12, 13, 20, 10, 1, 16, NULL),
(30, 1, 2024, 11, 13, 19, 9, 1, 15, NULL),
(31, 1, 2024, 9, 12, 19, 7, 4, 13, NULL),
(32, 1, 2025, 10, 12, 19, 8, 4, 15, NULL),
(33, 1, 2025, 10, 12, 19, 8, 1, 15, NULL),
(34, 1, 2025, 11, 13, 20, 9, 4, 16, NULL),
(35, 1, 2025, 11, 13, 20, 9, 1, 16, NULL),
(36, 1, 2025, 12, 14, 21, 10, 1, 17, NULL),
(37, 1, 2022, 13, 15, 15, 3, 2, 13, NULL),
(38, 1, 2023, 14, 16, 16, 3, 3, 14, NULL),
(39, 1, 2023, 15, 17, 22, 11, 4, 15, NULL),
(40, 1, 2024, 15, 17, 22, 11, 4, 15, NULL),
(41, 1, 2024, 15, 18, 23, 11, 4, 16, NULL),
(42, 1, 2023, 16, 19, 22, 12, 4, 17, NULL),
(43, 1, 2023, 16, 19, 22, 12, 4, 17, NULL),
(44, 1, 2024, 15, 18, 22, 11, 4, 16, NULL),
(45, 1, 2024, 17, 18, 25, 13, 1, 18, NULL),
(46, 1, 2024, 18, 19, 24, 14, 4, 19, NULL),
(47, 1, 2024, 18, 17, 24, 14, 4, 15, NULL),
(48, 1, 2022, 19, 20, 26, 15, 6, 20, NULL),
(49, 1, 2022, 19, 20, 26, 15, 6, 20, NULL),
(50, 1, 2024, 20, 20, 27, 16, 6, 21, NULL),
(51, 1, 2022, 1, 21, 28, 1, 6, 22, NULL),
(52, 1, 2022, 21, 22, 29, 17, 8, 23, NULL),
(53, 1, 2021, 22, 23, 30, 11, 8, 24, NULL),
(54, 1, 2023, 23, 25, 31, 7, 8, 25, NULL),
(55, 1, 2024, 24, 24, 30, 18, 8, 24, NULL),
(56, 1, 2023, 24, 24, 32, 18, 8, 24, NULL),
(57, 1, 2020, 22, 23, 30, 11, 9, 26, NULL),
(58, 1, 2023, 22, 23, 30, 11, 9, 26, NULL),
(59, 1, 2025, 24, 24, 32, 18, 8, 26, NULL),
(60, 1, 0, 22, 23, 30, 11, 9, 26, NULL),
(61, 1, 2023, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `direccion` mediumtext NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `distrito` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `horario_entrega` varchar(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pendiente',
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `nombre`, `apellido`, `email`, `direccion`, `ciudad`, `distrito`, `telefono`, `horario_entrega`, `total`, `status`, `fecha_creacion`) VALUES
(129, 75, 'Nilrad', 'L. Valdez', 'darlinlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'LA VEGA', 'LA VEGA', '8295524400', '8-12', 17995.00, 'pagado', '2025-06-07 20:27:28'),
(130, 75, 'Nilrad', 'L. Valdez', 'nilradlvaldez@gmail.com', 'PRESIDENTE ESPAILLAT #10', 'LA VEGA', 'LA VEGA', '8295524400', '8-12', 12796.00, 'pagado', '2025-06-07 20:33:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
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
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `producto_id`, `nombre_producto`, `cantidad`, `precio_unitario`, `descuento`, `subtotal`, `colorSeleccionado`) VALUES
(138, 129, 2, 'iPhone 12 128GB', 1, 17995.00, 0.00, 17995.00, 'blanco'),
(139, 130, 1, 'iPhone 12 64GB', 1, 15995.00, 20.00, 12796.00, 'azul');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `metodo_pago` varchar(50) NOT NULL,
  `estado_pago` varchar(50) DEFAULT 'pendiente',
  `paypal_order_id` varchar(100) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `metodo_pago`, `estado_pago`, `paypal_order_id`, `fecha_pago`) VALUES
(53, 129, 'paypal', 'completado', '5FG890261R382094E', '2025-06-07 20:27:28'),
(54, 130, 'paypal', 'completado', '0EJ95689727963838', '2025-06-07 20:33:14');

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
  `marca_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `movil_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `descuento`, `fecha`, `marca_id`) VALUES
(1, 1, 'iPhone 12 64GB', '', 15995.00, 1, 20.00, '2025-05-31 11:06:10', 1),
(2, 1, 'iPhone 12 128GB', '', 17995.00, 1, 0.00, '2025-05-31 08:00:00', 1),
(3, 1, 'iPhone 12 256GB', '', 19495.00, 1, 0.00, '2025-05-31 08:00:00', 1),
(4, 2, 'iPhone 12 Pro 128GB', '', 21995.00, 1, 0.00, '2025-05-31 08:00:00', 1),
(5, 2, 'iPhone 12 Pro 256GB', '', 23995.00, 1, 0.00, '2025-05-31 08:00:00', 1),
(6, 3, 'iPhone 12 Pro Max 128GB ', '', 27495.00, 1, 0.00, '2025-05-31 08:00:00', 1),
(7, 3, 'iPhone 12 Pro Max 256GB ', '', 28995.00, 1, 0.00, '2025-05-31 08:00:00', 1),
(8, 3, 'iPhone 12 Pro Max 512GB', '', 29995.00, 1, 0.00, '2025-05-01 08:00:00', 1),
(9, 4, 'iPhone 13 128GB ', '', 23995.00, 1, 0.00, '2025-05-01 08:00:00', 1),
(10, 4, 'iPhone 13 256GB ', '', 25495.00, 1, 0.00, '2025-05-01 08:00:00', 1),
(11, 5, 'iPhone 13 Pro 128GB ', '', 28495.00, 1, 0.00, '2025-05-14 08:00:00', 1),
(12, 5, 'iPhone 13 Pro 256GB ', '', 30995.00, 1, 0.00, '2025-03-11 08:00:00', 1),
(13, 6, 'iPhone 13 Pro Max 128GB ', '', 32995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(14, 6, 'iPhone 13 Pro Max 256GB ', '', 35995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(15, 6, 'iPhone 13 Pro Max 512GB ', '', 37495.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(16, 7, 'iPhone 14 128GB ', '', 26495.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(17, 7, 'iPhone 14 256GB ', '', 27995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(18, 8, 'iPhone 14 Plus 128GB ', '', 28995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(19, 8, 'iPhone 14 Plus 256GB ', '', 30995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(20, 9, 'iPhone 14 Pro 128GB ', '', 34495.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(21, 9, 'iPhone 14 Pro 256GB ', '', 36495.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(22, 9, 'iPhone 14 Pro 512GB ', '', 38995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(23, 10, 'iPhone 14 Pro Max 128GB ', '', 41495.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(24, 10, 'iPhone 14 Pro Max 256GB ', '', 43995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(25, 10, 'iPhone 14 Pro Max 512GB ', '', 46495.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(26, 11, 'iPhone 15 128GB ', '', 35995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(27, 11, 'iPhone 15 256GB ', '', 37995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(28, 12, 'iPhone 15 Plus 128GB ', '', 38995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(29, 12, 'iPhone 15 Plus 512GB ', '', 42995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(30, 13, 'iPhone 15 Pro 128GB ', '', 41995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(31, 14, 'iPhone 15 Pro Max 256GB ', '', 52995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(32, 14, 'iPhone 15 Pro Max 256GB', '', 54995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(33, 14, 'iPhone 15 Pro Max 512GB ', '', 57995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(34, 14, 'iPhone 15 Pro Max 1TB ', '', 61995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(35, 15, 'iPhone 16 128GB ', '', 52495.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(36, 16, 'iPhone 16E 256GB', '', 44995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(37, 17, 'iPhone 16 Plus 128GB ', '', 54995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(38, 18, 'iPhone 16 Pro Max 256GB ', '', 74995.00, 1, 0.00, '2023-01-01 08:00:00', 1),
(39, 18, 'iPhone 16 Pro Max 512GB ', '', 84995.00, 1, 0.00, '2025-03-01 08:00:00', 1),
(40, 19, 'SAMSUNG GALAXY S10 PLUS 8+128GB', '', 9995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(41, 20, 'SAMSUNG GALAXY NOTE 10 PLUS 12+256GB', '', 13995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(42, 21, 'SAMSUNG GALAXY NOTE 20 ULTRA 12+128GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(43, 22, 'SAMSUNG GALAXY S21 ULTRA 12+128GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(44, 23, 'SAMSUNG GALAXY S23 ULTRA 12+256GB', '', 39495.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(45, 24, 'SAMSUNG GALAXY S25 ULTRA 12+512GB ', '', 84995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(46, 25, 'SAMSUNG GALAXY A05 6+128GB ', '', 7995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(47, 25, 'SAMSUNG GALAXY A05 4+64GB ', '', 6995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(48, 26, 'SAMSUNG GALAXY A15 6+128GB ', '', 8995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(49, 27, 'SAMSUNG GALAXY A25 5G 8+256GB ', '', 12995.00, 1, 0.00, '2023-01-01 08:00:00', 2),
(50, 28, 'XIAOMI REDMI NOTE 13 5G 8+256GB', '', 10995.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(51, 29, 'XIAOMI REDMI NOTE 13 PRO PLUS 5G 12+256GB', '', 20995.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(52, 30, 'XIAOMI POCO X6 PRO 8+256 GB', '', 17495.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(53, 31, 'XIAOMI REDMI 14C 4+128GB', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(54, 32, 'XIAOMI REDMI NOTE 14 8+128GB', '', 10495.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(55, 32, 'XIAOMI REDMI NOTE 14 8+256GB', '', 11995.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(56, 33, 'XIAOMI REDMI NOTE 14 5G 12+256GB', '', 13995.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(57, 34, 'XIAOMI REDMI NOTE 14 PRO 8+256GB', '', 15995.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(58, 35, 'XIAOMI REDMI NOTE 14 PRO 5G 12+256GB', '', 17995.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(59, 36, 'XIAOMI REDMI NOTE 14 PRO PLUS 5G 12+256GB', '', 22995.00, 1, 0.00, '2023-01-01 08:00:00', 3),
(60, 37, 'Google Pixel 7 Pro 12+128GB', '', 17495.00, 1, 0.00, '2023-01-01 08:00:00', 4),
(61, 38, 'Google Pixel 8 Pro 12+128GB', '', 24995.00, 1, 0.00, '2023-01-01 08:00:00', 4),
(62, 39, 'INFINIX SMART 8 4+128GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', 19),
(63, 40, 'INFINIX SMART 9 4+128GB', '', 5995.00, 1, 0.00, '2023-01-01 08:00:00', 19),
(64, 41, 'INFINIX HOT 50I 6+256GB', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', 19),
(65, 42, 'ZTE A35 CORE 4+64GB', '', 3995.00, 1, 0.00, '2023-01-01 08:00:00', 20),
(66, 43, 'ZTE A35 4+64GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', 20),
(67, 44, 'ZTE BLADE V60 6+256GB ', '', 7495.00, 1, 0.00, '2023-01-01 08:00:00', 20),
(68, 45, 'ZTE NUBIA NEO 2 5G 8+256GB', '', 11995.00, 1, 0.00, '2023-01-01 08:00:00', 20),
(69, 46, 'MOTOROLA E14 2+64GB', '', 4995.00, 1, 0.00, '2023-01-01 08:00:00', NULL),
(70, 47, 'MOTOROLA G04 4+128GB', '', 5995.00, 1, 0.00, '2023-01-01 08:00:00', NULL),
(71, 48, 'IPAD PRO 12.9-INCH 6TA GEN 128GB', '', 45995.00, 5, 0.00, '2023-01-01 08:00:00', 1),
(72, 48, 'IPAD PRO 12.9 6TA GEN 256GB', '', 47495.00, 5, 0.00, '2023-01-01 08:00:00', 1),
(73, 49, 'IPAD PRO M2 512GB 12.9 6TA GEN ', '', 49995.00, 5, 0.00, '2023-01-01 08:00:00', 1),
(74, 50, 'IPAD PRO 13 PULGADAS M4 512GB', '', 57995.00, 5, 0.00, '2023-01-01 08:00:00', 1),
(75, 50, 'IPAD PRO 13 PULGADAS M4 256GB', '', 54995.00, 5, 0.00, '2023-01-01 08:00:00', 1),
(76, 51, 'IPAD 10 GEN 64GB', '', 23495.00, 5, 0.00, '2023-01-01 08:00:00', 1),
(79, 52, 'AMAZON FIRE 8 32GB', '', 2995.00, 5, 0.00, '2023-01-01 08:00:00', 5),
(80, 52, 'AMAZON FIRE 8 64GB', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', 5),
(81, 53, 'ASTRO 8R 32G', '', 3495.00, 5, 0.00, '2025-03-30 08:00:00', NULL),
(82, 54, 'XIAOMI REDMI PAD SE 8.7 128GB ', '', 8495.00, 5, 0.00, '2023-01-01 08:00:00', 3),
(83, 55, 'VORTEX T10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', 6),
(84, 56, 'HOTPEPPER 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', NULL),
(85, 57, 'X10MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', NULL),
(86, 58, 'VORTEX T10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', 6),
(87, 59, 'SKYPAD 10 32GB ', '', 3495.00, 5, 0.00, '2023-01-01 08:00:00', 7),
(88, 60, 'SKYPAD 10 PRO MAX 64GB ', '', 3995.00, 5, 0.00, '2023-01-01 08:00:00', 7),
(89, NULL, 'Macbook Pro 13-Inch 2020 i5-8ram 512GB', '', 31995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(90, NULL, 'Macbook Air 13-Inch 2020 i3-8ram 256GB', '', 29495.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(91, NULL, 'Macbook Pro 16-Inch 2019 i7-16ram 512GB', '', 34995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(92, NULL, 'Macbook Pro 16-Inch 2019 i9-32Ram 512GB', '', 39995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(93, NULL, 'Macbook Pro 16-Inch 2019 i9-16Ram 1TB', '', 41995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(94, NULL, 'Macbook Air M1 8Ram 256GB ', '', 44995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(95, NULL, 'Macbook Pro M2 2022 8-Ram 256GB', '', 51995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(96, NULL, 'Macbook Air 15-Inch M2 256GB ', '', 54995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(97, NULL, 'HP Victus i5 12GEN 3050TI 8+512GB ', '', 33495.00, 3, 0.00, '2023-01-01 08:00:00', 8),
(98, NULL, 'Asus Tuf Gaming F15 i5-12GEN 16Ram-3050 512GB', '', 39995.00, 3, 0.00, '2025-05-23 08:00:00', 9),
(99, NULL, 'HP 15.6Inch i5 12GEN 8+256GB ', '', 23995.00, 3, 0.00, '2023-01-01 08:00:00', 8),
(100, NULL, 'HP i5 13GEN 8+256GB ', '', 24995.00, 3, 0.00, '2023-01-01 08:00:00', 8),
(108, 61, 'SAMSUNG GALAXY TAB A9+ 64GB ', '', 11495.00, 5, 0.00, '2023-01-01 08:00:00', 2),
(109, 61, 'SAMSUNG GALAXY TAB A9+ 128GB ', '', 13495.00, 5, 0.00, '2023-01-01 08:00:00', 2),
(120, NULL, 'Macbook Pro 13-Inch 2020 i5 8+512GB', '', 31995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(121, NULL, 'Macbook Air 13-Inch 2020 i3 8+256GB ', '', 29495.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(122, NULL, 'Macbook Pro 16-Inch 2019 i7 16+512GB ', '', 34995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(123, NULL, 'Macbook Pro 16-Inch 2019 i9 32+512GB ', '', 39995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(124, NULL, 'Macbook Pro 16-Inch 2019 i9 16+1TB', '', 41995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(125, NULL, 'Macbook Air M1 8+256GB ', '', 44995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(126, NULL, 'Macbook Pro M2 2022 8+256GB', '', 51995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(127, NULL, 'Macbook Air 15-Inch M2 256GB', '', 54995.00, 3, 0.00, '2023-01-01 08:00:00', 1),
(128, NULL, 'HP Victus i5 12GEN 3050TI 8+512GB ', '', 33495.00, 3, 0.00, '2023-01-01 08:00:00', 8),
(130, NULL, 'HP 15.6Inch i5 12GEN 8+256GB ', '', 23995.00, 3, 0.00, '2023-01-01 08:00:00', 8),
(131, NULL, 'HP i5-13Gen-8Ram HP 256GB ', '', 24995.00, 3, 0.00, '2023-01-01 08:00:00', 8),
(132, NULL, 'Lenovo i3-12GEN 8+256GB ', '', 21495.00, 3, 0.00, '2023-01-01 08:00:00', 10),
(133, NULL, 'SAMSUNG WATCH 6 CLASSIC', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', 2),
(134, NULL, 'SAMSUNG WATCH 6', '', 11995.00, 6, 0.00, '2023-01-01 08:00:00', 2),
(135, NULL, 'SAMSUNG WATCH 7', '', 15995.00, 6, 0.00, '2023-01-01 08:00:00', 2),
(136, NULL, 'Samsung Galaxy Buds 3', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', 2),
(137, NULL, 'Samsung Galaxy Buds 2', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', 2),
(138, NULL, 'BEATS SOLO 4', '', 8495.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(139, NULL, 'BEATS STUDIO PRO', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(140, NULL, 'XIAOMI REDMI BUDS 4 ACTIVE', '', 1995.00, 6, 0.00, '2023-01-01 08:00:00', 3),
(142, NULL, 'AIRPODS GEN 2', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(143, NULL, 'AIRPODS GEN 3', '', 9995.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(144, NULL, 'AIRPODS GEN 4 CANCELACION DE RUIDO', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(145, NULL, 'AIRPODS PRO 2 TIPO C OPEN BOX', '', 10995.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(146, NULL, 'RAZER BARRACUDA X', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(147, NULL, 'APPLE WATCH SE 2', '', 10495.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(148, NULL, 'APPLE WATCH SERIE 7', '', 12994.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(149, NULL, 'APPLE WATCH SERIE 8', '', 14495.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(150, NULL, 'APPLE WATCH SERIE ULTRA', '', 24995.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(151, NULL, 'APPLE WATCH SERIE 9', '', 16495.00, 6, 0.00, '2023-01-01 08:00:00', 1),
(152, NULL, 'Smart TV Onn 32 Pulgadas', '', 9995.00, 2, 0.00, '2023-01-01 08:00:00', 14),
(153, NULL, 'Smart TV Onn 43 Pulgadas', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', 14),
(154, NULL, 'Smart TV Onn 65 Pulgadas', '', 28995.00, 2, 0.00, '2023-01-01 08:00:00', 14),
(155, NULL, 'Smart TV Onn 75 Pulgadas', '', 36995.00, 2, 0.00, '2023-01-01 08:00:00', 14),
(156, NULL, 'Smart TV Phillips 32 Pulgadas', '', 9995.00, 2, 0.00, '2023-01-01 08:00:00', NULL),
(157, NULL, 'Smart TV TCL Androide 32 Pulgadas', '', 10995.00, 2, 0.00, '2023-01-01 08:00:00', 11),
(158, NULL, 'Smart TV TCL Roku 43 Pulgadas', '', 16495.00, 2, 0.00, '2023-01-01 08:00:00', 11),
(159, NULL, 'Smart TV TCL Roku 55 Pulgadas', '', 23995.00, 2, 0.00, '2023-01-01 08:00:00', 11),
(160, NULL, 'Smart TV TCL Google 55 Pulgadas', '', 24995.00, 2, 0.00, '2023-01-01 08:00:00', 11),
(161, NULL, 'Smart TV TCL Fire TV 58 Pulgadas', '', 27495.00, 2, 0.00, '2023-01-01 08:00:00', 11),
(162, NULL, 'Smart TV TCL Roku 65 Pulgadas', '', 30995.00, 2, 0.00, '2025-03-14 08:00:00', 11),
(163, NULL, 'Smart TV TCL Google 65 Pulgadas', '', 34995.00, 2, 0.00, '2023-01-01 08:00:00', 11),
(164, NULL, 'Smart TV TCL Roku 85 Pulgadas', '', 74995.00, 2, 0.00, '2023-01-01 08:00:00', 11),
(165, NULL, 'Smart TV WESTINGHOUSE ROKU 43 Pulgadas', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', 13),
(166, NULL, 'Smart TV WESTINGHOUSE ROKU 65 Pulgadas', '', 28495.00, 2, 0.00, '2023-01-01 08:00:00', 13),
(167, NULL, 'Smart TV HISENSE GOOGLE 43 Pulgadas', '', 16995.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(168, NULL, 'Smart TV HISENSE GOOGLE QLED D5 43 Pulgadas', '', 18995.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(169, NULL, 'Smart TV HISENSE A7 Google 50 Pulgadas', '', 21495.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(170, NULL, 'Smart TV HISENSE QLED QD5 2024 55 Pulgadas', '', 27495.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(171, NULL, 'Smart TV HISENSE QLED D5 GOOGLE 65 Pulgadas', '', 37495.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(172, NULL, 'Smart TV HISENSE S7N CANVAS QLED GOOGLE 65 Pulgadas', '', 62495.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(173, NULL, 'Smart TV HISENSE A7 Google 75 Pulgadas', '', 42995.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(174, NULL, 'Smart TV HISENSE QLED QD6 GOOGLE 75 Pulgadas', '', 49995.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(175, NULL, 'Smart TV HISENSE A7 Google 85 Pulgadas', '', 82995.00, 2, 0.00, '2023-01-01 08:00:00', 12),
(176, NULL, 'Smart TV SAMSUNG SERIE 7 2024 55 Pulgadas', '', 28995.00, 2, 0.00, '2023-01-01 08:00:00', 2),
(177, NULL, 'Smart TV SAMSUNG QLED Q6 55 Pulgadas', '', 34995.00, 2, 0.00, '2023-01-01 08:00:00', 2),
(178, NULL, 'Smart TV SAMSUNG DU7200 2024 65 Pulgadas', '', 36495.00, 2, 0.00, '2023-01-01 08:00:00', 2),
(179, NULL, 'Smart TV SAMSUNG 75 Pulgadas', '', 54995.00, 2, 0.00, '2023-01-01 08:00:00', 2),
(180, NULL, 'Aire Acondicionado Inverter D WORLD 12000', '', 20995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(181, NULL, 'Aire Acondicionado Inverter GBR 18000', '', 32495.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(182, NULL, 'Aire Acondicionado Inverter TCL 24000', '', 44495.00, 6, 0.00, '2023-01-01 08:00:00', 11),
(183, NULL, 'Aire Acondicionado Inverter Black+Decker 12000', '', 23495.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(184, NULL, 'PlayStation 5 Slim', '', 33995.00, 4, 0.00, '2025-03-13 08:00:00', 15),
(185, NULL, 'Onyx Studio 8', '', 12995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(186, NULL, 'Subwofer Barra de Sonido LG', '', 7995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(187, NULL, 'Samsung Barra de Sonido iHome 120w', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', 2),
(188, NULL, 'Samsung Barra de Sonido iHome 180w', '', 7995.00, 6, 0.00, '2023-01-01 08:00:00', 2),
(189, NULL, 'Freidora de Aire Brentwood 4L', '', 3995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(190, NULL, 'Freidora de Aire Ninja Speed 6L', '', 7495.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(191, NULL, 'Microonda Sokany', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(192, NULL, 'MOUSE RAZER DEATHADDER ESSENTIAL', '', 2495.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(193, NULL, 'TECLADO RAZER ORNATA V3', '', 4995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(194, NULL, 'JBL FLIP 5', '', 5995.00, 6, 0.00, '2023-01-01 08:00:00', 18),
(195, NULL, 'JBL PARTYBOX ON-THE-GO', '', 19995.00, 6, 0.00, '2023-01-01 08:00:00', 18),
(196, NULL, 'JBL BOOMBOX3', '', 26495.00, 6, 0.00, '2023-01-01 08:00:00', 18),
(197, NULL, 'JBL CHARGE 5', '', 9495.00, 6, 0.00, '2023-01-01 08:00:00', 18),
(198, NULL, 'JBL CLIP 4', '', 4495.00, 6, 0.00, '2023-01-01 08:00:00', 18),
(199, NULL, 'JBL GO 3', '', 2995.00, 6, 0.00, '2023-01-01 08:00:00', 18),
(200, NULL, 'SONY SRS-XG500', '', 22495.00, 6, 0.00, '2023-01-01 08:00:00', 15),
(201, NULL, 'ANIKER SOUNDCORE', '', 2995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(202, NULL, 'SOUNDCORE BOOM 2 PLUS', '', 14995.00, 6, 0.00, '2023-01-01 08:00:00', NULL),
(203, NULL, 'Monitor Asus VG1B 27 Pulgada 165HZ', '', 14995.00, 2, 0.00, '2023-01-01 08:00:00', 9),
(204, NULL, 'Monitor LG Ultragear 34 Pulgada 160HZ', '', 24995.00, 2, 0.00, '2023-01-01 08:00:00', NULL),
(205, NULL, 'Monitor Samsung G3 ODYSSEY 27 Pulgada 165HZ', '', 17495.00, 2, 0.00, '2023-01-01 08:00:00', 2),
(206, NULL, 'Monitor Samsung G4 ODYSSEEY 27 Pulgada 240HZ', '', 19995.00, 2, 0.00, '2023-01-01 08:00:00', 2),
(207, NULL, 'Monitor Samsung G5 ODYSSEY 32 Pulgada 165HZ', '', 22995.00, 2, 0.00, '2023-01-01 08:00:00', 2);

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
(20, 'ZTE', 'img/marcas/jbl.png');

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
-- Estructura de tabla para la tabla `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `calificacion` tinyint(3) UNSIGNED DEFAULT NULL COMMENT 'Valor del 1 al 5',
  `comentario` mediumtext DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Volcado de datos para la tabla `ratings`
--

INSERT INTO `ratings` (`id`, `producto_id`, `usuario_id`, `calificacion`, `comentario`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(29, 1, 75, 5, 'El CHECK en SQL es una restricción que se usa para asegurar que los datos que se ingresan en una columna cumplan ciertas condiciones. Es como una regla que impone el mismo motor de base de datos para evitar que se guarden datos inválidos.', '2025-06-11 19:31:49', '2025-06-12 14:04:45'),
(30, 3, 75, 5, 'claro', '2025-06-11 20:11:27', '2025-06-12 14:04:48'),
(31, 1, 75, 5, 'no sabe tu', '2025-06-11 21:24:23', '2025-06-12 14:04:51'),
(33, 1, 75, 5, 'tengo hambre', '2025-06-11 21:26:16', '2025-06-12 14:04:54'),
(34, 1, 75, 5, 'que duro', '2025-06-11 21:26:16', '2025-06-12 14:06:13'),
(35, 1, 75, 4, 'potente', '2025-06-11 21:26:16', '2025-06-12 14:04:59'),
(36, 1, 75, 4, 'te entro?', '2025-06-11 21:26:16', '2025-06-12 14:05:02'),
(37, 1, 75, 4, 'que calor', '2025-06-11 21:26:16', '2025-06-12 14:06:35'),
(38, 1, 75, 2, 'vete', '2025-06-11 21:26:16', '2025-06-12 14:05:08'),
(39, 1, 75, 3, 'fo', '2025-06-11 21:26:16', '2025-06-12 14:05:12');

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
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `is_verified`, `created_at`) VALUES
(75, 'darlin', 'darlinlvaldez@gmail.com', '$2b$10$qpDJEVg64kzCvn990CmOOe9wS2JFzAsREDj9QF8b0jMB5lr77giau', 1, '2025-05-26 00:18:31');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variantes`
--

INSERT INTO `variantes` (`id`, `producto_id`, `color`, `stock`, `img`) VALUES
(372, 1, 'negro espacial', 6, 'https://www.trippodo.com/997943-medium_default/apple-iphone-12-155-cm-61-sim-doble-ios-14-5g-128-.jpg'),
(373, 1, 'azul', 5, 'https://hsi.com.co/wp-content/uploads/2022/03/Apple-iPhone-12-128GB-Usado-B-Azul-400x400.jpg'),
(374, 98, 'blanco', 9, 'https://globaliraq.net/cdn/shop/files/1bbcf8d6-eaea-4f46-96e5-e4aee2924baa_2048x.jpg?v=1710541301'),
(375, 1, 'purpura', 3, 'https://www.artefacta.com/media/catalog/product/1/4/148658_2_.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=400&width=400&canvas=400:400'),
(376, 2, 'blanco', 3, 'https://rukminim2.flixcart.com/image/850/1000/kg8avm80/mobile/j/f/9/apple-iphone-12-dummyapplefsn-original-imafwg8dkyh2zgrh.jpeg?q=90&crop=false'),
(377, 3, 'dorado', 4, 'https://www.cnet.com/a/img/resize/f3c42740a704792b25be68e230db619993cd564f/hub/2020/11/09/d0f15941-5210-4a0b-ab66-78a2e58dd245/16-iphone-12-pro-max.jpg?auto=webp&fit=crop&height=900&width=1200'),
(382, 1, 'blanco', 8, 'https://tecfys.com/290-medium_default/iphone-12-reacondicionado-128-gb-blanco.jpg');

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
(55, 6),
(56, 6),
(57, 2),
(58, 2),
(59, 6),
(60, 2);

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
(10, 2),
(11, 2),
(12, 2),
(13, 3),
(18, 5),
(19, 4),
(20, 6),
(21, 6),
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
(60, 2);

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
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `fk_cart_producto` (`producto_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `ID_Marca` (`marca_id`),
  ADD KEY `fk_moviles_cpu` (`cpu_id`),
  ADD KEY `fk_moviles_camara` (`camara_id`),
  ADD KEY `fk_moviles_bateria` (`bateria_id`),
  ADD KEY `fk_moviles_gpu` (`gpu_id`),
  ADD KEY `fk_moviles_conectividad` (`conectividad_id`),
  ADD KEY `fk_dimensionespeso_cpu` (`dimensionespeso_id`),
  ADD KEY `fk_moviles_pantalla` (`pantalla_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_usuario` (`user_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `fk_order_items` (`producto_id`);

--
-- Indices de la tabla `pantalla`
--
ALTER TABLE `pantalla`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `marca_id` (`marca_id`),
  ADD KEY `fk_productos_moviles` (`movil_id`);

--
-- Indices de la tabla `p_marcas`
--
ALTER TABLE `p_marcas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `usuario_id` (`usuario_id`);

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
-- Indices de la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `baterias`
--
ALTER TABLE `baterias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `camara`
--
ALTER TABLE `camara`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1219;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `conectividad`
--
ALTER TABLE `conectividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `dimensionespeso`
--
ALTER TABLE `dimensionespeso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `fav`
--
ALTER TABLE `fav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=670;

--
-- AUTO_INCREMENT de la tabla `moviles`
--
ALTER TABLE `moviles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT de la tabla `pantalla`
--
ALTER TABLE `pantalla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

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
-- AUTO_INCREMENT de la tabla `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `variantes`
--
ALTER TABLE `variantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=383;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `fk_cart_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `fk_moviles_pantalla` FOREIGN KEY (`pantalla_id`) REFERENCES `pantalla` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_moviles_pmarcas` FOREIGN KEY (`marca_id`) REFERENCES `p_marcas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_usuario` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_moviles` FOREIGN KEY (`movil_id`) REFERENCES `moviles` (`id`),
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`marca_id`) REFERENCES `p_marcas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD CONSTRAINT `variantes_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `variantes_almacenamiento`
--
ALTER TABLE `variantes_almacenamiento`
  ADD CONSTRAINT `variantes_almacenamiento_ibfk_1` FOREIGN KEY (`movil_id`) REFERENCES `moviles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `variantes_almacenamiento_ibfk_2` FOREIGN KEY (`almacenamiento_id`) REFERENCES `almacenamiento` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `variantes_ram`
--
ALTER TABLE `variantes_ram`
  ADD CONSTRAINT `variantes_ram_ibfk_1` FOREIGN KEY (`movil_id`) REFERENCES `moviles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `variantes_ram_ibfk_2` FOREIGN KEY (`ram_id`) REFERENCES `ram` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
