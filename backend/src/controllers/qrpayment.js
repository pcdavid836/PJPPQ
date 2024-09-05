import { connect } from "../database"

export const createQR = async (req, res) => {
    try {
        const connection = await connect();

        // Insertar un nuevo registro en la tabla qr
        const [results] = await connection.execute("INSERT INTO qr (Monto, Comprobante, idParqueo_Vehiculo, Estado, Confirmacion) VALUES (0.00, 'none', ?, 1, 0);", [
            req.body.idParqueo_Vehiculo,
        ]);

        // Actualizar el valor de 'PagoQR' en la tabla 'parqueo_vehiculo'
        await connection.execute("UPDATE parqueo_vehiculo SET PagoQR = 1, Fecha_Actualizacion = CURRENT_TIMESTAMP WHERE idParqueo_Vehiculo = ?;", [
            req.body.idParqueo_Vehiculo,
        ]);

        // Obtener la nueva ID del QR
        const newQRId = results.insertId;

        const newQR = {
            id: newQRId, // Utiliza la nueva ID generada
            Monto: 0.00,
            Comprobante: 'none',
            idParqueo_Vehiculo: req.body.idParqueo_Vehiculo,
            Estado: 1,
            Confirmacion: 0,
        };
        res.json({ message: 'QR creado exitosamente', data: newQR });
    } catch (error) {
        console.error(error);
    }
};

export const cancelQRPayment = async (req, res) => {
    try {
        const connection = await connect();

        // Actualizar 'Fecha_Actualizacion' y 'PagoQR' en la tabla 'parqueo_vehiculo'
        await connection.execute("UPDATE parqueo_vehiculo SET Fecha_Actualizacion = CURRENT_TIMESTAMP, PagoQR = 0 WHERE idParqueo_Vehiculo = ?;", [
            req.params.id,
        ]);

        res.json({ message: 'Pago QR cancelado exitosamente', id: req.params.id });
    } catch (error) {
        console.error(error);
    }
};

export const reviveQRPayment = async (req, res) => {
    try {
        const connection = await connect();

        // Actualizar 'Fecha_Actualizacion' y 'PagoQR' en la tabla 'parqueo_vehiculo'
        await connection.execute("UPDATE parqueo_vehiculo SET Fecha_Actualizacion = CURRENT_TIMESTAMP, PagoQR = 1 WHERE idParqueo_Vehiculo = ?;", [
            req.params.id,
        ]);

        res.json({ message: 'Pago QR revivido exitosamente', id: req.params.id });
    } catch (error) {
        console.error(error);
    }
};

export const sendCommonVerification = async (req, res) => {
    const connection = await connect();
    // Primera consulta para actualizar Comprobante en la tabla qr
    await connection.query('UPDATE qr SET Comprobante = ?, Monto = ? WHERE idQR = ?;', [
        req.body.Comprobante,
        req.body.Monto,
        req.params.id
    ]);
    await connection.query('UPDATE Parqueo_Vehiculo SET Fecha_Actualizacion = CURRENT_TIMESTAMP WHERE idParqueo_Vehiculo = ?;', [
        req.body.idParqueo_Vehiculo
    ]);

    res.sendStatus(204);
};

export const fastUpdateQrAmmount = async (req, res) => {
    const connection = await connect();
    // Primera consulta para actualizar Comprobante en la tabla qr
    await connection.query('UPDATE qr SET Monto = ? WHERE idQR = ?;', [
        req.body.Monto,
        req.params.id
    ]);
    await connection.query('UPDATE Parqueo_Vehiculo SET Fecha_Actualizacion = CURRENT_TIMESTAMP WHERE idParqueo_Vehiculo = ?;', [
        req.body.idParqueo_Vehiculo
    ]);

    res.sendStatus(204);
};

