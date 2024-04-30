import { connect } from "../database"

export const createRecord = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.execute("INSERT INTO parqueo_vehiculo (Parqueo_idParqueo, ConfirmacionEntrada, Estado, Fecha_Creacion, Url_imagen_ingreso, vehiculo_idVehiculo, ConfirmacionSalida, Cancelado, reserva_idReserva) VALUES (?, 0, 1, CURRENT_TIMESTAMP, 'defaultVehicle', ?, 0, 0, ?);", [
            req.body.Parqueo_idParqueo,
            req.body.Url_imagen_ingreso,
            req.body.vehiculo_idVehiculo,
            req.body.reserva_idReserva,
        ]);

        const newRecord = {
            id: results.insertId,
            ...req.body,
        };
        res.json(newRecord);
    } catch (error) {
        console.error(error);
    }
};

export const postEnter = async (req, res) => {
    const connection = await connect();
    // Primera consulta para actualizar Url_imagen_ingreso y ConfirmacionEntrada
    await connection.query('UPDATE parqueo_vehiculo SET Url_imagen_ingreso = ?, Hora_Ingreso = CURRENT_TIMESTAMP, Fecha_Actualizacion = CURRENT_TIMESTAMP, ConfirmacionEntrada = 1 WHERE reserva_idReserva = ?;', [
        req.body.Url_imagen_ingreso,
        req.params.id
    ]);
    // Segunda consulta para actualizar Realizado a 1 si Estado es 0
    await connection.query('UPDATE reserva SET Realizado = 1, Estado = 0, Fecha_Actualizacion = CURRENT_TIMESTAMP WHERE idReserva = ?;', [
        req.params.id
    ]);

    res.sendStatus(204);
};

export const getParkVehicleByParkId = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query(`
        SELECT 
            v.Placa, v.Color, v.Descripcion, 
            v.Tipo_Vehiculo_idTipo_Vehiculo AS idTipo_Vehiculo, 
            v.Url_imagen AS Url_Imagen, 
            r.Fecha_Reserva, r.Hora_Reserva_Inicio, r.Hora_Reserva_Fin,
            u.Nombres, u.Primer_Apellido, u.Segundo_Apellido, u.idUsuario, u.Celular,
            pv.* 
        FROM 
            vehiculo v 
        JOIN 
            reserva r ON v.idVehiculo = r.vehiculo_idVehiculo 
        JOIN 
            parqueo_vehiculo pv ON r.Parqueo_idParqueo = pv.Parqueo_idParqueo AND r.idReserva = pv.reserva_idReserva 
        JOIN
            usuario u ON r.Usuario_idUsuario = u.idUsuario
        WHERE 
            pv.ConfirmacionEntrada = 1 
            AND pv.Cancelado = 0 
            AND pv.Parqueo_idParqueo = ? 
        ORDER BY 
            pv.Estado DESC, pv.idParqueo_Vehiculo DESC
    `, [
        req.params.id,
    ]);
    res.json(rows);
};


export const getFilteredParkVehicleByParkId = async (req, res) => {
    const connection = await connect();
    const { Parqueo_idParqueo, Fecha_Creacion, Estado, ConfirmacionSalida, Cancelado } = req.body; // Ahora los datos vienen del cuerpo de la solicitud

    const [rows] = await connection.query(`
        SELECT 
            v.Placa, v.Color, v.Descripcion, 
            v.Tipo_Vehiculo_idTipo_Vehiculo AS idTipo_Vehiculo, 
            v.Url_imagen AS Url_Imagen, 
            r.Fecha_Reserva, r.Hora_Reserva_Inicio, r.Hora_Reserva_Fin, 
            u.Nombres, u.Primer_Apellido, u.Segundo_Apellido, u.idUsuario, u.Celular,
            pv.* 
        FROM 
            vehiculo v 
        JOIN 
            reserva r ON v.idVehiculo = r.vehiculo_idVehiculo 
        JOIN 
            parqueo_vehiculo pv ON r.Parqueo_idParqueo = pv.Parqueo_idParqueo AND r.idReserva = pv.reserva_idReserva 
        JOIN
            usuario u ON r.Usuario_idUsuario = u.idUsuario
        WHERE 
            DATE(pv.Fecha_Creacion) = ? 
            AND pv.ConfirmacionSalida = ? 
            AND pv.Estado = ? 
            AND pv.Parqueo_idParqueo = ? 
            AND pv.Cancelado = ? 
        ORDER BY 
            pv.Estado DESC, pv.idParqueo_Vehiculo DESC
    `, [
        Fecha_Creacion, ConfirmacionSalida, Estado, Parqueo_idParqueo, Cancelado
    ]);

    res.json(rows);
};



export const denyAparkment = async (req, res) => {
    const connection = await connect();
    const { idParqueo_Vehiculo, idReserva } = req.body;

    await connection.query('START TRANSACTION');
    try {
        await connection.query('UPDATE parqueo_vehiculo SET Cancelado = 1, Estado = 0, Fecha_Actualizacion = CURRENT_TIMESTAMP WHERE idParqueo_Vehiculo = ?;', [idParqueo_Vehiculo]);
        await connection.query('UPDATE reserva SET Realizado = 0, Rechazado = 1, Fecha_Actualizacion = CURRENT_TIMESTAMP WHERE idReserva = ?;', [idReserva]);
        await connection.query('COMMIT');
    } catch (error) {
        await connection.query('ROLLBACK');
        throw error;
    }

    res.sendStatus(204);
};


export const aprobeAparkment = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE parqueo_vehiculo SET Hora_Salida = CURRENT_TIMESTAMP, Estado = 0, ConfirmacionSalida = 1, Fecha_Actualizacion = CURRENT_TIMESTAMP WHERE idParqueo_Vehiculo = ?;', [
        req.params.id
    ]);
    res.sendStatus(204);
};