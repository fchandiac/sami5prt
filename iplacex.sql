CREATE TABLE `persona` (
  `rut` varchar(12) NOT NULL ,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT NULL,
  PRIMARY KEY (`rut`)
);

CREATE TABLE `usuario` (
  `rut` varchar(12) NOT NULL ,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
    FOREIGN KEY (`rut`) REFERENCES `persona` (`rut`) 
) 