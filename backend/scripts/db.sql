CREATE DATABASE IF NOT EXISTS pqdb;

USE pqdb;

CREATE TABLE IF NOT EXISTS Usuario(
    idUsuario INT NOT NULL AUTO_INCREMENT,
    Nombres VARCHAR(45) NOT NULL,
    Primer_Apellido VARCHAR(45) NOT NULL,
    Segundo_Apellido VARCHAR(45) NOT NULL,
    Celular INT NOT NULL,
    CI VARCHAR(10) NOT NULL,
    Contraseña VARCHAR(30) NOT NULL,
    Estado TINYINT(1) NOT NULL,
    Creacion DATETIME NOT NULL,
    Tipo_Usuario INT NOT NULL,
    PRIMARY KEY(idUsuario)
)