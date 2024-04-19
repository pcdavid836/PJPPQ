-- CreateTable
CREATE TABLE `usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `Correo` VARCHAR(191) NOT NULL,
    `Nombres` VARCHAR(191) NOT NULL,
    `Primer_Apellido` VARCHAR(191) NOT NULL,
    `Segundo_Apellido` VARCHAR(191) NOT NULL,
    `CI` VARCHAR(191) NOT NULL,
    `Celular` VARCHAR(191) NOT NULL,
    `Contrasena` VARCHAR(191) NOT NULL,
    `Estado` BOOLEAN NOT NULL,
    `Tipo_Usuario_idTipo_Usuario` INTEGER NOT NULL,
    `Url_Imagen` VARCHAR(191) NOT NULL,
    `FechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaActualizacion` DATETIME(3) NOT NULL,
    `Ban` BOOLEAN NOT NULL,
    `Codigo` VARCHAR(191) NOT NULL,
    `Correo_Externo` BOOLEAN NOT NULL,

    UNIQUE INDEX `usuario_Correo_key`(`Correo`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
