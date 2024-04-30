import { connect } from "../database"

export const getSideKicksFromPark = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query(`
            SELECT uhp.usuario_idUsuario, uhp.parqueo_idParqueo, uhp.Co_cuidador, uhp.Estado, 
            u.Nombres, u.Primer_Apellido, u.Segundo_Apellido, u.Celular, u.Correo, u.Url_imagen 
            FROM usuario_has_parqueo uhp 
            JOIN usuario u ON uhp.usuario_idUsuario = u.idUsuario 
            WHERE uhp.parqueo_idParqueo = ? AND uhp.Estado = 1;
        `, [req.params.id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};


export const createSideKick = async (req, res) => {
    try {
        const connection = await connect();

        // Primero, busca el parqueo con el código proporcionado
        const [parqueos] = await connection.query('SELECT * FROM parqueo WHERE Codigo = ? AND Compartir = 1;', [req.body.Codigo]);
        if (parqueos.length > 0) {
            const parqueo = parqueos[0];

            // Verifica si el registro ya existe en 'usuario_has_parqueo'
            const [existingEntries] = await connection.query('SELECT * FROM usuario_has_parqueo WHERE usuario_idUsuario = ? AND parqueo_idParqueo = ?;', [
                req.body.usuario_idUsuario,
                parqueo.idParqueo
            ]);

            if (existingEntries.length > 0) {
                // Si el registro existente tiene Estado = 0
                if (existingEntries[0].Estado === 0) {
                    // Actualiza Estado a 1
                    await connection.query('UPDATE usuario_has_parqueo SET Estado = 1 WHERE usuario_idUsuario = ? AND parqueo_idParqueo = ?;', [
                        req.body.usuario_idUsuario,
                        parqueo.idParqueo
                    ]);

                    // Obtiene el tipo de usuario
                    const [usuarios] = await connection.query('SELECT * FROM usuario WHERE idUsuario = ?;', [
                        req.body.usuario_idUsuario
                    ]);
                    const usuario = usuarios[0];

                    // Si el tipo de usuario es 1, lo actualiza a 2
                    if (usuario.Tipo_Usuario_idTipo_Usuario === 1) {
                        await connection.query('UPDATE usuario SET Tipo_Usuario_idTipo_Usuario = 2 WHERE idUsuario = ?;', [
                            req.body.usuario_idUsuario
                        ]);
                    }

                    res.status(200).json({ mensaje: "Usuario retorno a establecimiento" }); // Devuelve un código de estado 200 para indicar que la actualización fue exitosa
                } else {
                    res.status(400).json({ mensaje: "El usuario ya se unió a esta ubicación." });
                }
            } else {
                // Si no existe, crea un nuevo registro en 'usuario_has_parqueo'
                await connection.query('INSERT INTO usuario_has_parqueo (usuario_idUsuario, parqueo_idParqueo, Co_cuidador, Estado) VALUES (?, ?, 1, 1);', [
                    req.body.usuario_idUsuario,
                    parqueo.idParqueo
                ]);

                // Actualiza 'Tipo_Usuario_idTipo_Usuario' en la tabla 'usuario'
                await connection.query('UPDATE usuario SET Tipo_Usuario_idTipo_Usuario = 2 WHERE idUsuario = ?;', [
                    req.body.usuario_idUsuario
                ]);

                res.sendStatus(201); // Devuelve un código de estado 201 para indicar que se creó un nuevo recurso
            }
        } else {
            res.status(400).json({ mensaje: "No se encontró un parqueo con el código proporcionado o el parqueo no está compartido." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};



export const removeSidekick = async (req, res) => {
    try {
        const connection = await connect();

        // Actualiza el valor de Estado a 0 para el registro que coincide con usuario_idUsuario y parqueo_idParqueo
        await connection.query(`
            UPDATE usuario_has_parqueo 
            SET Estado = 0 
            WHERE usuario_idUsuario = ? AND parqueo_idParqueo = ?;
        `, [req.body.usuario_idUsuario, req.body.parqueo_idParqueo]);

        // Busca si existen otros registros para el mismo usuario_idUsuario donde Estado sea 1
        const [rows] = await connection.query(`
            SELECT * FROM usuario_has_parqueo 
            WHERE usuario_idUsuario = ? AND Estado = 1;
        `, [req.body.usuario_idUsuario]);

        // Si no existen tales registros, actualiza el valor de Tipo_Usuario_idTipo_Usuario a 1 en la tabla usuario
        if (rows.length === 0) {
            await connection.query(`
                UPDATE usuario 
                SET Tipo_Usuario_idTipo_Usuario = 1 
                WHERE idUsuario = ?;
            `, [req.body.usuario_idUsuario]);
        }

        res.sendStatus(204); // Devuelve un código de estado 204 para indicar que la actualización fue exitosa
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
