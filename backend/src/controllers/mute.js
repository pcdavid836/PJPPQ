import { connect } from "../database"

export const createMute = async (req, res) => {
    try {
        const connection = await connect();

        // Verifica si el registro ya existe en 'silenciado'
        const [existingEntries] = await connection.query('SELECT * FROM silenciado WHERE usuario_idUsuario = ? AND parqueo_idParqueo = ?;', [
            req.body.usuario_idUsuario,
            req.body.parqueo_idParqueo
        ]);

        if (existingEntries.length > 0) {
            // Si el registro existente tiene Estado = 0
            if (existingEntries[0].Estado === 0) {
                // Actualiza Estado a 1
                await connection.query('UPDATE silenciado SET Estado = 1 WHERE usuario_idUsuario = ? AND parqueo_idParqueo = ?;', [
                    req.body.usuario_idUsuario,
                    req.body.parqueo_idParqueo
                ]);

                res.status(200).json({ mensaje: "El usuario ha sido silenciado exitosamente." });
            } else {
                res.status(400).json({ mensaje: "El usuario ya fue silenciado anteriormente." });
            }
        } else {
            // Si no existe, crea un nuevo registro en 'silenciado'
            await connection.query('INSERT INTO silenciado (usuario_idUsuario, parqueo_idParqueo, Estado) VALUES (?, ?, 1);', [
                req.body.usuario_idUsuario,
                req.body.parqueo_idParqueo
            ]);

            res.status(201).json({ mensaje: "El usuario ha sido silenciado y se ha creado un nuevo registro." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const getStunnedsFromPark = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query(`
            SELECT s.usuario_idUsuario, s.parqueo_idParqueo, s.Estado, 
            u.Nombres, u.Primer_Apellido, u.Segundo_Apellido, u.Celular, u.Correo, u.Url_imagen 
            FROM silenciado s 
            JOIN usuario u ON s.usuario_idUsuario = u.idUsuario 
            WHERE s.parqueo_idParqueo = ? AND s.Estado = 1;
        `, [req.params.id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const removeMute = async (req, res) => {
    try {
        const connection = await connect();

        // Verifica si el registro ya existe en 'silenciado'
        const [existingEntries] = await connection.query('SELECT * FROM silenciado WHERE usuario_idUsuario = ? AND parqueo_idParqueo = ?;', [
            req.body.usuario_idUsuario,
            req.body.parqueo_idParqueo
        ]);

        if (existingEntries.length > 0) {
            // Si el registro existente tiene Estado = 1
            if (existingEntries[0].Estado === 1) {
                // Actualiza Estado a 0
                await connection.query('UPDATE silenciado SET Estado = 0 WHERE usuario_idUsuario = ? AND parqueo_idParqueo = ?;', [
                    req.body.usuario_idUsuario,
                    req.body.parqueo_idParqueo
                ]);

                res.sendStatus(204); // Devuelve un código de estado 204 para indicar que la actualización fue exitosa
            } else {
                res.status(400).json({ mensaje: "El usuario ya no está silenciado." });
            }
        } else {
            res.status(400).json({ mensaje: "No se encontró un registro para el usuario en este parqueo." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
