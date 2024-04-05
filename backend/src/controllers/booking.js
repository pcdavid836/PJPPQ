import { connect } from "../database"

export const createBook = async (req, res) => {
    try {
        const connection = await connect();

        const insertReservaQuery = "INSERT INTO reserva (Parqueo_idParqueo, Usuario_idUsuario, Estado, Fecha_Creacion, Fecha_Reserva, Hora_Reserva_Inicio, Hora_Reserva_Fin, Rechazado, Cancelado, vehiculo_idVehiculo, Realizado) VALUES (?, ?, 1, CURRENT_TIMESTAMP, ?, ?, ?, 0, 0, ?, 0)";

        // Insertar el registro en la tabla 'reserva'
        const [resultsReserva] = await connection.execute(insertReservaQuery, [
            req.body.Parqueo_idParqueo,
            req.body.Usuario_idUsuario,
            req.body.Fecha_Reserva,
            req.body.Hora_Reserva_Inicio,
            req.body.Hora_Reserva_Fin,
            req.body.vehiculo_idVehiculo
        ]);

        const newReservaId = resultsReserva.insertId; // Obtener la nueva ID de 'reserva'

        // Continuar con la inserción en la tabla 'parqueo_vehiculo'

        const insertParqueoVehiculoQuery = "INSERT INTO parqueo_vehiculo (Parqueo_idParqueo, ConfirmacionEntrada, Estado, Fecha_Creacion, Hora_Ingreso, Hora_Salida, Url_imagen_ingreso, vehiculo_idVehiculo, ConfirmacionSalida, Cancelado, reserva_idReserva) VALUES (?, 0, 1, CURRENT_TIMESTAMP, NULL, NULL, 'defaultVehicle', ?, 0, 0, ?)";

        // Insertar el registro en la tabla 'parqueo_vehiculo'
        const [resultsParqueoVehiculo] = await connection.execute(insertParqueoVehiculoQuery, [
            req.body.Parqueo_idParqueo,
            req.body.vehiculo_idVehiculo,
            newReservaId // Utiliza la nueva ID de 'reserva' como reserva_idReserva
        ]);

        const newReserva = {
            idReserva: newReservaId,
            ...req.body,
        };

        res.json(newReserva);
    } catch (error) {
        console.error(error);
    }
};


export const getBookByUser = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT r.idReserva, r.Parqueo_idParqueo, r.Usuario_idUsuario, r.Estado, r.Fecha_Reserva, r.Hora_Reserva_Inicio, r.Hora_Reserva_Fin, r.Rechazado, r.Cancelado, r.vehiculo_idVehiculo, r.Realizado, v.Tipo_Vehiculo_idTipo_Vehiculo AS Tipo_Vehiculo_id, p.Titulo, p.Tipo_Parqueo_idTipo_Parqueo, p.Url_imagen AS Url_imagen_Parqueo, p.Ubicacion FROM reserva r JOIN vehiculo v ON r.vehiculo_idVehiculo = v.idVehiculo JOIN parqueo p ON r.Parqueo_idParqueo = p.idParqueo WHERE r.Usuario_idUsuario = ? ORDER BY r.Estado DESC, r.idReserva DESC;", [
        req.params.id,
    ]);
    res.json(rows);
}

export const getBookByUserTrue = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT r.idReserva, r.Parqueo_idParqueo, r.Usuario_idUsuario, r.Estado, r.Fecha_Reserva, r.Hora_Reserva_Inicio, r.Hora_Reserva_Fin, r.Rechazado, r.Cancelado, r.vehiculo_idVehiculo, r.Realizado, v.Tipo_Vehiculo_idTipo_Vehiculo AS Tipo_Vehiculo_id, p.Titulo, p.Tipo_Parqueo_idTipo_Parqueo, p.Url_imagen AS Url_imagen_Parqueo, p.Ubicacion FROM reserva r JOIN vehiculo v ON r.vehiculo_idVehiculo = v.idVehiculo JOIN parqueo p ON r.Parqueo_idParqueo = p.idParqueo WHERE r.Usuario_idUsuario = ? AND r.Estado = 1 ORDER BY r.Estado DESC, r.idReserva DESC;", [
        req.params.id,
    ]);
    res.json(rows);
}


export const getBookByPark = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query(`
        SELECT 
            r.*, 
            v.Tipo_Vehiculo_idTipo_Vehiculo AS Tipo_Vehiculo_id, 
            v.Color, v.Placa, 
            v.Url_imagen AS Url_imagen_Vehiculo, 
            v.Descripcion,
            u.idUsuario,
            u.Nombres,
            u.Primer_Apellido,
            u.Segundo_Apellido,
            u.Celular
        FROM 
            reserva r 
        JOIN 
            vehiculo v ON r.vehiculo_idVehiculo = v.idVehiculo 
        JOIN 
            usuario u ON r.Usuario_idUsuario = u.idUsuario
        WHERE 
            r.Parqueo_idParqueo = ? 
        ORDER BY 
            r.Estado DESC, r.idReserva DESC
    `, [
        req.params.id,
    ]);
    res.json(rows);
};

export const cancelBook = async (req, res) => {
    const connection = await connect();

    // Actualizar la tabla 'parqueo_vehiculo'
    await connection.query('UPDATE parqueo_vehiculo SET Estado = 0, Cancelado = 1 WHERE reserva_idReserva = ?', [req.params.id]);

    // Actualizar la tabla 'reserva'
    await connection.query('UPDATE reserva SET Estado = 0, Cancelado = 1 WHERE idReserva = ?', [req.params.id]);

    res.sendStatus(204);
};

export const denyBook = async (req, res) => {
    const connection = await connect();

    // Actualizar la tabla 'parqueo_vehiculo'
    await connection.query('UPDATE parqueo_vehiculo SET Estado = 0, Cancelado = 1 WHERE reserva_idReserva = ?', [req.params.id]);

    // Actualizar la tabla 'reserva'
    await connection.query('UPDATE reserva SET Estado = 0, Rechazado = 1 WHERE idReserva = ?', [req.params.id]);

    res.sendStatus(204);
};

export const getFilteredParkBooks = async (req, res) => {
    const connection = await connect();
    const { Parqueo_idParqueo, Estado, Fecha_Reserva, Rechazado, Cancelado, Realizado } = req.body;

    const [rows] = await connection.query(`
        SELECT 
            r.*, 
            v.Tipo_Vehiculo_idTipo_Vehiculo AS Tipo_Vehiculo_id, 
            v.Color, v.Placa, 
            v.Url_imagen AS Url_imagen_Vehiculo, 
            v.Descripcion,
            u.idUsuario,
            u.Nombres,
            u.Primer_Apellido,
            u.Segundo_Apellido,
            u.Celular
        FROM 
            reserva r 
        JOIN 
            vehiculo v ON r.vehiculo_idVehiculo = v.idVehiculo 
        JOIN 
            usuario u ON r.Usuario_idUsuario = u.idUsuario
        WHERE 
            r.Parqueo_idParqueo = ? 
            AND r.Estado = ? 
            AND r.Fecha_Reserva = ? 
            AND (r.Rechazado = ? OR r.Cancelado = ?) 
            AND r.Realizado = ? 
        ORDER BY 
            r.idReserva DESC
    `, [
        Parqueo_idParqueo, Estado, Fecha_Reserva, Rechazado, Cancelado, Realizado
    ]);

    res.json(rows);
};
