-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2021 a las 00:21:54
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `udecsasbd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloque`
--

CREATE TABLE `bloque` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `descripcion` varchar(512) DEFAULT NULL,
  `codigoProyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bloque`
--

INSERT INTO `bloque` (`codigo`, `nombre`, `descripcion`, `codigoProyecto`) VALUES
(10, 'Bloque Campestre A', 'Bloque principal', 3),
(11, 'Bloque Campestre B', 'Bloque lateral a la recepción', 3),
(12, 'Bloque Campestre Z', 'Ultimo Bloque', 3),
(13, 'Edificio SmartFlat', 'Edificio con todos los apartamentos.', 6),
(14, 'Bloque Norte', 'Bloque con vista hacia el norte de la ciudad.', 5),
(15, 'Bloque Sur', 'Bloque con vista hacia el Sur de la ciudad.', 5),
(16, 'Bloque Este', 'Bloque con vista hacia el Estede la ciudad.', 5),
(17, 'Bloque Oeste', 'Bloque con vista hacia el Oestede la ciudad.', 5),
(18, 'Bloque Omega A', 'Bloque con 200 apartamentos, 1 piscina y 1 penhouse.', 4),
(19, 'Bloque Omega B', 'Bloque con cancha de tenis y 1 penhouse', 4),
(20, 'Bloque Omega J', 'Bloque con Jacussi en cada apartamento y 1 penhouse', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `codigoPais` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`codigo`, `nombre`, `codigoPais`) VALUES
(269405, 'Buenos Aires', 256),
(269406, 'Rosario', 256),
(269407, 'San Juan', 256),
(269408, 'Alice Town', 257),
(269409, 'Coopers Town', 257),
(269410, 'Freeport', 257),
(269411, 'Brasilia', 258),
(269412, 'Rio de Janeiro', 258),
(269413, 'San Paulo', 258),
(269414, 'Salvador de Bahía', 258),
(269415, 'Montreal', 259),
(269416, 'Toronto', 259),
(269417, 'Vancouver', 259),
(269418, 'Santiago de Chile', 260),
(269419, 'Viña del mar', 260),
(269420, 'Barranquilla', 261),
(269421, 'Bogotá', 261),
(269422, 'Calí', 261),
(269423, 'Cartagena', 261),
(269424, 'Medellín', 261),
(269425, 'Manizales', 261),
(269426, 'Pereira', 261),
(269427, 'Santa Marta', 261),
(269428, 'Alajuela', 262),
(269429, 'Cartago', 262),
(269430, 'Liberia', 262),
(269431, 'San José', 262),
(269432, 'Cienfuegos', 263),
(269433, 'La Habana', 263),
(269434, 'Santiago de Cuba', 263),
(269435, 'Ambato', 264),
(269436, 'Cuenca', 264),
(269437, 'Guayaquil', 264),
(269438, 'Quito', 264),
(269439, 'Santa Ana', 265),
(269440, 'Santa Tecla', 265),
(269441, 'San Salvador', 265),
(269442, 'Chicago', 266),
(269443, 'Nueva York', 266),
(269444, 'Miami', 266),
(269445, 'Washington', 266),
(269446, 'Alta Verapaz', 267),
(269447, 'Ciudad de Guatemala', 267),
(269448, 'Petén', 267),
(269449, 'Quezaltenango', 267),
(269450, 'Cabo Haitiano', 268),
(269451, 'Jacmel', 268),
(269452, 'Gonaives', 268),
(269453, 'Puerto Principe', 268),
(269454, 'Comayague', 269),
(269455, 'choluteca', 269),
(269456, 'La Ceiba', 269),
(269457, 'Tegucigalpa', 269),
(269458, 'San Pedro Sula', 269),
(269459, 'Bahía Montego', 270),
(269460, 'Kingston', 270),
(269461, 'Negril', 270),
(269462, 'Mandeville', 270),
(269463, 'Spanish Town', 270),
(269464, 'Ciudad de méxico', 271),
(269465, 'Guadalajara', 271),
(269466, 'Monterrey', 271),
(269467, 'Saltillo', 271),
(269468, 'Granada', 272),
(269469, 'León', 272),
(269470, 'Managua', 272),
(269471, 'Masaya', 272),
(269472, 'Colón', 273),
(269473, 'David', 273),
(269474, 'Panamá', 273),
(269475, 'Tocumen', 273),
(269476, 'Asunción', 274),
(269477, 'Ciudad del Este', 274),
(269478, 'Encarnación', 274),
(269479, 'Luque', 274),
(269480, 'Aequipa', 275),
(269481, 'Cusco', 275),
(269482, 'Lima', 275),
(269483, 'Trujillo', 275),
(269484, 'Colonia del sacramento', 276),
(269485, 'Maldonado', 276),
(269486, 'Montevideo', 276),
(269487, 'Caracas', 277),
(269488, 'Maracaibo', 277),
(269489, 'Maracay', 277),
(269490, 'Valencia', 277);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `Documento` int(11) NOT NULL,
  `Nombre` varchar(512) NOT NULL,
  `Apellido_1` varchar(512) NOT NULL,
  `Apellido_2` varchar(512) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `Foto` varchar(512) DEFAULT NULL,
  `Celular` varchar(14) NOT NULL,
  `Correo` varchar(512) NOT NULL,
  `Direccion` varchar(512) NOT NULL,
  `Total_Ingresos` int(11) NOT NULL,
  `Datos_Trabajo` varchar(50) NOT NULL,
  `Nombre_Ref_Familiar` varchar(512) NOT NULL,
  `Telefono_Ref_Familiar` varchar(13) NOT NULL,
  `Nombre_Ref_Personal` varchar(512) NOT NULL,
  `Telefono_Ref_Personal` varchar(13) NOT NULL,
  `documentoUsuario` int(11) DEFAULT NULL,
  `codigoCiudad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`Documento`, `Nombre`, `Apellido_1`, `Apellido_2`, `Fecha_Nacimiento`, `Foto`, `Celular`, `Correo`, `Direccion`, `Total_Ingresos`, `Datos_Trabajo`, `Nombre_Ref_Familiar`, `Telefono_Ref_Familiar`, `Nombre_Ref_Personal`, `Telefono_Ref_Personal`, `documentoUsuario`, `codigoCiudad`) VALUES
(750841516, 'Alejandra', 'Quesada', 'Orozco', '2000-10-10', '1625434506789-imagen_2021-07-04_163505.png', '3103694388', 'miguel.1701911153@ucaldas.edu.co', 'cll 47 c 22', 150000000, 'Trabaja en frisby', 'Marta', '3158457989', 'Andrea', '3103698989', 1020, 269444),
(1154872485, 'Carlos', 'Holmes', 'Trujillo', '1980-11-01', '1625434692047-imagen_2021-07-04_163810.png', '3103694388', 'miguel.1701911153@ucaldas.edu.co', 'cll 47 c 22', 12000000, 'Docente Fisica', 'Marta', '3158457989', 'Javier', '3148759585', 1020, 269425);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `codigo` int(11) NOT NULL,
  `identificador` varchar(512) NOT NULL,
  `valor` int(11) NOT NULL,
  `codigoBloque` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`codigo`, `identificador`, `valor`, `codigoBloque`) VALUES
(9, 'Casa Campestre N°1', 15000000, 10),
(10, 'Casa Campestre N°2', 15000000, 10),
(11, 'Casa Campestre N°3', 15000000, 10),
(12, 'Casa Campestre N°4', 15000000, 10),
(13, 'Casa Campestre N°5', 15000000, 10),
(14, 'Casa Campestre N°6', 15000000, 11),
(15, 'Casa Campestre N°7', 15000000, 11),
(16, 'Casa Campestre N°8', 15000000, 11),
(17, 'Casa Campestre N°9', 15000000, 11),
(18, 'Casa Campestre N°10', 15000000, 11),
(19, 'Casa Campestre N°11', 20000000, 12),
(20, 'Casa Campestre N°12', 20000000, 12),
(21, 'Casa Campestre N°13', 20000000, 12),
(22, 'Casa Campestre N°14', 20000000, 12),
(23, 'Casa Campestre N°15', 20000000, 12),
(24, 'Apartamento SmartFlat N° 201', 120000000, 13),
(25, 'Apartamento SmartFlat N° 202', 120000000, 13),
(26, 'Apartamento SmartFlat N° 301', 120000000, 13),
(27, 'Apartamento SmartFlat N° 304', 120000000, 13),
(28, 'Apartamento SmartFlat N° 401', 120000000, 13),
(29, 'Apartamento SmartFlat N° 402', 120000000, 13),
(30, 'Apartamento SmartFlat N° 501', 120000000, 13),
(31, 'Apartamento SmartFlat N° 601', 120000000, 13),
(32, 'Apartamento SmartFlat N° 602', 120000000, 13),
(33, 'Apartamento SmartFlat N° 701', 120000000, 13),
(34, 'Apartamento SmartFlat N° 702', 120000000, 13),
(35, 'Omega A N°1', 80000000, 18),
(36, 'Omega A N°2', 80000000, 18),
(37, 'Omega A PenHouse', 80000000, 18),
(38, 'Omega B PenHouse', 100000000, 19),
(39, 'Omega B N°1', 80000000, 19),
(40, 'Omega B N°2', 80000000, 19),
(41, 'Omega B N°3', 80000000, 19),
(42, 'Omega J PenHouse', 1200000000, 20),
(43, 'Omega J N°1', 1100000000, 20),
(44, 'Omega J N°2', 1100000000, 20),
(45, 'Omega J N°3', 1100000000, 20),
(46, 'Omega J N°4', 1100000000, 20),
(47, 'Omega J N°5', 1100000000, 20),
(48, 'Retiro Paz Norte N°1', 75000000, 14),
(49, 'Retiro Paz Norte N°2', 75000000, 14),
(50, 'Retiro Paz Norte N°3', 75000000, 14),
(51, 'Retiro Paz Norte N°4', 75000000, 14),
(52, 'Retiro Paz Norte N°5', 75000000, 14),
(53, 'Retiro Paz Sur N°5', 67000000, 15),
(54, 'Retiro Paz Sur N°4', 67000000, 15),
(55, 'Retiro Paz Sur N°3', 67000000, 15),
(56, 'Retiro Paz Sur N°2', 67000000, 15),
(57, 'Retiro Paz Sur N°1', 67000000, 15),
(58, 'Retiro Paz Este N°1', 82000000, 16),
(59, 'Retiro Paz Este N°2', 82000000, 16),
(60, 'Retiro Paz Este N°3', 82000000, 16),
(61, 'Retiro Paz Este N°4', 82000000, 16),
(62, 'Retiro Paz Este N°5', 82000000, 16),
(63, 'Retiro Paz Oeste N°5', 87000000, 17),
(64, 'Retiro Paz Oeste N°4', 87000000, 17),
(65, 'Retiro Paz Oeste N°3', 87000000, 17),
(66, 'Retiro Paz Oeste N°2', 87000000, 17),
(67, 'Retiro Paz Oeste N°1', 87000000, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `recibo_consignacion` varchar(255) NOT NULL,
  `valor` int(12) NOT NULL,
  `codigoSolicitud` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`recibo_consignacion`, `valor`, `codigoSolicitud`) VALUES
('1625437011772-recibo.pdf', 800000, 15),
('1625437119084-recibo.pdf', 75000000, 15),
('1625437165241-recibo.pdf', 100000000, 13),
('1625437204998-recibo.pdf', 147483647, 6),
('1625437248921-recibo.pdf', 100000000, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`codigo`, `nombre`) VALUES
(256, 'Argentina'),
(257, 'Bahamas'),
(258, 'Brazil'),
(259, 'Canadá'),
(260, 'Chile'),
(261, 'Colombia'),
(262, 'Costa Rica'),
(263, 'Cuba'),
(264, 'Ecuador'),
(265, 'El Salvador'),
(266, 'Estados Unidos'),
(267, 'Guatemala'),
(268, 'Haití'),
(269, 'Honduras'),
(270, 'Jamaica'),
(271, 'México'),
(272, 'Nicaragua'),
(273, 'Panamá'),
(274, 'Paraguay'),
(275, 'Perú'),
(276, 'Uruguay'),
(277, 'Venezuela');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `descripcion` varchar(512) DEFAULT NULL,
  `imagen` varchar(512) DEFAULT NULL,
  `documentoUsuario` int(11) DEFAULT NULL,
  `codigoCiudad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`codigo`, `nombre`, `descripcion`, `imagen`, `documentoUsuario`, `codigoCiudad`) VALUES
(3, 'Proyecto Flora Campestre', 'Conjunto  residencial apto para familias las cuales gusten de un ambiente limpio, caracterizándose por su gran vegetacion en los exteriores e interiores del conjunto residencial', '1625430373742-proyectos1.png', 12195, 269464),
(4, 'Proyecto Omega', 'Conjunto de edificios de gran altura, los cuales cuenta cada uno con cientos de apartamentos los cuales tienen un tamaño de 40 metros cuadrados cada uno, contando ademas cada edificio con un espectacular penhouse de lujó. ', '1625430605988-proyectos4.png', 12195, 269424),
(5, 'Proyecto Retiro en paz', 'Conjunto residencial ideal para vivir con tranquilidad, especialmente diseñado para aquellas personas retiradas que buscan la paz y tranquilidad.', '1625430866397-proyectos2.png', 12195, 269425),
(6, 'Proyecto SmartFlat', 'Conjunto de apartamentos inteligentes, los cuales cuentan con un sistema inteligente de uso de agua y uso de energia electrica, con bombillas que se encienden al permanecer alguien en las áreas comunes y apagan en su ausencia, ademas de contar con un control el cual permite controlar el uso/estado de cada componente del apartamento, desde luces, televisores hasta puertas. Adicional a esto el parqueadero cuenta con un sistema automatizado el cual te deja tu auto en la puerta del edificio con solo presionar u', '1625431293906-proyectos3.png', 12195, 269444);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudestudio`
--

CREATE TABLE `solicitudestudio` (
  `codigo` int(11) NOT NULL,
  `fechaSolicitud` date DEFAULT NULL,
  `ofertaEconomica` int(11) DEFAULT NULL,
  `estado` varchar(25) DEFAULT 'En Estudio',
  `documentoCliente` int(11) DEFAULT NULL,
  `codigoInmueble` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `solicitudestudio`
--

INSERT INTO `solicitudestudio` (`codigo`, `fechaSolicitud`, `ofertaEconomica`, `estado`, `documentoCliente`, `codigoInmueble`) VALUES
(5, '0000-00-00', 2147483647, 'En Estudio', 750841516, 37),
(6, '0000-00-00', 2147483647, 'Aceptada', 750841516, 42),
(7, '0000-00-00', 2147483647, 'En Estudio', 750841516, 38),
(8, '0000-00-00', 120000000, 'En Estudio', 1154872485, 24),
(9, '0000-00-00', 120000000, 'Rechazada', 1154872485, 34),
(10, '0000-00-00', 120000000, 'Aceptada', 1154872485, 28),
(11, '0000-00-00', 150000000, 'En Estudio', 1154872485, 48),
(12, '0000-00-00', 150000000, 'En Estudio', 1154872485, 63),
(13, '0000-00-00', 150000000, 'Aceptada', 1154872485, 55),
(14, '0000-00-00', 82000000, 'En Estudio', 750841516, 20),
(15, '0000-00-00', 82000000, 'Aceptada', 750841516, 17),
(16, '0000-00-00', 82000000, 'Rechazada', 750841516, 19),
(17, '0000-00-00', 82000000, 'Rechazada', 750841516, 10),
(18, '0000-00-00', 85000000, 'En Estudio', 750841516, 13),
(19, '0000-00-00', 85000000, 'En Estudio', 750841516, 22),
(20, '0000-00-00', 90000000, 'En Estudio', 750841516, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Documento` int(11) NOT NULL,
  `Nombre` varchar(512) NOT NULL,
  `Apellido_1` varchar(512) NOT NULL,
  `Apellido_2` varchar(512) NOT NULL,
  `Correo` varchar(512) DEFAULT NULL,
  `Celular` varchar(20) DEFAULT NULL,
  `Rol` varchar(512) NOT NULL DEFAULT 'Vendedor',
  `Usuario` varchar(512) NOT NULL,
  `Contrasena` varchar(512) NOT NULL,
  `Ciudad` varchar(512) NOT NULL,
  `codigoCiudad` int(11) DEFAULT NULL
) ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Documento`, `Nombre`, `Apellido_1`, `Apellido_2`, `Correo`, `Celular`, `Rol`, `Usuario`, `Contrasena`, `Ciudad`, `codigoCiudad`) VALUES
(1020, 'Miguen Angel', 'Restrepo', 'Henao', 'miguel.1701911153@ucaldas.edu.co', '3103694388', 'Vendedor', 'migue121959', 'U2FsdGVkX1/tloMbsNUMCpjh6+FU68lpTjTM45kWJJc=', '297', NULL),
(12195, 'Julian Andres', 'Florez', 'Cendalez', 'miguel.1701911153@ucaldas.edu.co', '3103694388', 'Administrador', 'C880', 'U2FsdGVkX1/tloMbsNUMCpjh6+FU68lpTjTM45kWJJc=', 'Buenos aires', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bloque`
--
ALTER TABLE `bloque`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fk_proyecto_Id` (`codigoProyecto`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fk_pais_Id` (`codigoPais`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`Documento`),
  ADD KEY `fk_usuarios_Id2` (`documentoUsuario`),
  ADD KEY `fk_ciudad_codigo` (`codigoCiudad`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fk_bloque_Id` (`codigoBloque`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`recibo_consignacion`),
  ADD KEY `fk_solicitud_Id` (`codigoSolicitud`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fk_usuarios_Id` (`documentoUsuario`),
  ADD KEY `fk_ciudad_codigo2` (`codigoCiudad`);

--
-- Indices de la tabla `solicitudestudio`
--
ALTER TABLE `solicitudestudio`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fk_cliente_Id` (`documentoCliente`),
  ADD KEY `fk_inmueble_Id` (`codigoInmueble`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Documento`),
  ADD UNIQUE KEY `Usuario` (`Usuario`),
  ADD KEY `fk_ciudad_Id` (`codigoCiudad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bloque`
--
ALTER TABLE `bloque`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=269491;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `Documento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1154872486;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=278;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `solicitudestudio`
--
ALTER TABLE `solicitudestudio`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Documento` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bloque`
--
ALTER TABLE `bloque`
  ADD CONSTRAINT `fk_proyecto_Id` FOREIGN KEY (`codigoProyecto`) REFERENCES `proyectos` (`codigo`);

--
-- Filtros para la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD CONSTRAINT `fk_pais_Id` FOREIGN KEY (`codigoPais`) REFERENCES `pais` (`codigo`);

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_ciudad_codigo` FOREIGN KEY (`codigoCiudad`) REFERENCES `ciudad` (`codigo`),
  ADD CONSTRAINT `fk_usuarios_Id2` FOREIGN KEY (`documentoUsuario`) REFERENCES `usuarios` (`Documento`);

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `fk_bloque_Id` FOREIGN KEY (`codigoBloque`) REFERENCES `bloque` (`codigo`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `fk_solicitud_Id` FOREIGN KEY (`codigoSolicitud`) REFERENCES `solicitudestudio` (`codigo`);

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `fk_ciudad_codigo2` FOREIGN KEY (`codigoCiudad`) REFERENCES `ciudad` (`codigo`),
  ADD CONSTRAINT `fk_usuarios_Id` FOREIGN KEY (`documentoUsuario`) REFERENCES `usuarios` (`Documento`);

--
-- Filtros para la tabla `solicitudestudio`
--
ALTER TABLE `solicitudestudio`
  ADD CONSTRAINT `fk_cliente_Id` FOREIGN KEY (`documentoCliente`) REFERENCES `cliente` (`Documento`),
  ADD CONSTRAINT `fk_inmueble_Id` FOREIGN KEY (`codigoInmueble`) REFERENCES `inmueble` (`codigo`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_ciudad_Id` FOREIGN KEY (`codigoCiudad`) REFERENCES `ciudad` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
