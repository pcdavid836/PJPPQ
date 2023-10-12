import { connect } from "../database";

export const getCarsid = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Vehiculo WHERE Usuario_idUsuario = ? AND Estado = 1", [
        req.params.id,
    ]);
    res.json(rows);
}

export const getCarid = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Vehiculo WHERE idVehiculo = ? AND Estado = 1", [
        req.params.id,
    ]);
    res.json(rows);
}

export const createVehicle = async (req, res) => {
    try {
        const connection = await connect();
        
        // Verifica si los valores en req.body están definidos
        const {
            Placa,
            Color,
            Marca,
            Descripcion,
            Tipo_Vehiculo_idTipo_Vehiculo,
            Usuario_idUsuario,
            Usuario_Tipo_Usuario_idTipo_Usuario,
            Url_imagen
        } = req.body;
        
        if (
            Placa === undefined ||
            Color === undefined ||
            Marca === undefined ||
            Descripcion === undefined ||
            Tipo_Vehiculo_idTipo_Vehiculo === undefined ||
            Usuario_idUsuario === undefined ||
            Usuario_Tipo_Usuario_idTipo_Usuario === undefined ||
            Url_imagen === undefined
        ) {
            console.log('Valores faltantes en la solicitud:');
            console.log('Placa:', Placa);
            console.log('Color:', Color);
            console.log('Marca:', Marca);
            console.log('Descripcion:', Descripcion);
            console.log('Tipo_Vehiculo_idTipo_Vehiculo:', Tipo_Vehiculo_idTipo_Vehiculo);
            console.log('Usuario_idUsuario:', Usuario_idUsuario);
            console.log('Usuario_Tipo_Usuario_idTipo_Usuario:', Usuario_Tipo_Usuario_idTipo_Usuario);
            console.log('Url_Imagen:', Url_imagen);
            // Alguno de los valores está ausente, puedes manejar este caso apropiadamente
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        const [results] = await connection.execute("INSERT INTO Vehiculo (Placa, Color, Marca, Descripcion, Estado, Tipo_Vehiculo_idTipo_Vehiculo, Usuario_idUsuario, Usuario_Tipo_Usuario_idTipo_Usuario, Url_imagen, Fecha_Creacion) VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, CURRENT_TIMESTAMP)", [
            Placa,
            Color,
            Marca,
            Descripcion,
            Tipo_Vehiculo_idTipo_Vehiculo,
            Usuario_idUsuario,
            Usuario_Tipo_Usuario_idTipo_Usuario,
            Url_imagen
        ]);

        const newVehicle = {
            id: results.insertId,
            ...req.body,
        };
        res.json(newVehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getUserVehicle = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute("SELECT * FROM Vehiculo WHERE idVehiculo = ? AND Estado = 1;", [
            req.body.idVehiculo, 
        ]);
        //console.log(rows);
        if (rows.length === 1) {
            const vehicle = rows[0];
            const vehicleInfo = {
                idVehiculo: vehicle.idVehiculo, // Asumiendo que el ID es un campo en la tabla Usuario
                Placa: vehicle.Placa, // ... Agregar otros campos relevantes aquí si es necesario
                Color: vehicle.Color,
                Marca: vehicle.Marca,
                Descripcion: vehicle.Descripcion,
                idTipoVehiculo: vehicle.Tipo_Vehiculo_idTipo_Vehiculo,
                Url_imagen: vehicle.Url_imagen,
                Fecha_Creacion: vehicle.Fecha_Creacion,
            };
            
            res.json(vehicleInfo);
        } else {
            res.status(401).json({ mensaje: "id invalida" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const updateVehicle = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE Vehiculo SET Placa = ?, Color = ?, Marca = ?, Descripcion = ?, Url_imagen = ?, Fecha_Actualizacion = CURRENT_TIMESTAMP  WHERE idVehiculo = ?', [
        req.body.Placa,
        req.body.Color,
        req.body.Marca,
        req.body.Descripcion,
        req.body.Url_imagen,
        req.params.id
    ]);
    res.sendStatus(204);
};

export const deleteVehicle = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE Vehiculo SET Estado = 0 WHERE idVehiculo = ?', [
        req.params.id
    ]);
    res.sendStatus(204);
};