import { connect } from "../database"

export const reportParkToUser = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.execute("INSERT INTO reporte_parqueo_usuario (Motivo, Descripcion, usuario_idUsuario, parqueo_idParqueo, Valido) VALUES (?, ?, ?, ?, 0);", [
            req.body.Motivo,
            req.body.Descripcion,
            req.body.usuario_idUsuario,
            req.body.parqueo_idParqueo,
        ]);

        const newReport = {
            id: results.insertId,
            ...req.body,
        };
        res.json(newReport);
    } catch (error) {
        console.error(error);
    }
};

export const reportUserToPark = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.execute("INSERT INTO reporte_usuario_parqueo (Motivo, Descripcion, usuario_idUsuario, parqueo_idParqueo, Valido) VALUES (?, ?, ?, ?, 0);", [
            req.body.Motivo,
            req.body.Descripcion,
            req.body.usuario_idUsuario,
            req.body.parqueo_idParqueo,
        ]);

        const newReport = {
            id: results.insertId,
            ...req.body,
        };
        res.json(newReport);
    } catch (error) {
        console.error(error);
    }
};

