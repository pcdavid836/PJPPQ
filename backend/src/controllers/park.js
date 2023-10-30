import { connect } from "../database"

export const getPark = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM parqueo WHERE Estado = 1 AND Aprobacion = 1 AND Disponibilidad = 1;')
    res.json(rows);
}

export const getParkid = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Parqueo WHERE idParqueo = ? AND Estado = 1;", [
        req.params.id,
    ]);
    res.json(rows);
}

export const getMyPark = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT parqueo.* FROM parqueo INNER JOIN usuario_has_parqueo ON parqueo.idParqueo = usuario_has_parqueo.parqueo_idParqueo WHERE usuario_has_parqueo.usuario_idUsuario = ? AND parqueo.Aprobacion = 0 AND parqueo.Estado = 1;", [
        req.params.id,
    ]);
    res.json(rows)
}

export const createPark = async (req, res) => {
    try {
        const connection = await connect();

        // Insertar un nuevo registro en la tabla parqueo
        const [results] = await connection.execute("INSERT INTO parqueo (Ubicacion, Tamaño, Descripcion, Disponibilidad, Estado, Tipo_Parqueo_idTipo_Parqueo, Titulo, Url_imagen, Url_validacion, Aprobacion, Fecha_Creacion, Latitud, Longitud) VALUES (?, ?, ?, 0, 1, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, ?, ?);", [
            req.body.Ubicacion,
            req.body.Tamaño,
            req.body.Descripcion,
            req.body.Tipo_Parqueo_idTipo_Parqueo,
            req.body.Titulo,
            req.body.Url_imagen,
            req.body.Url_validacion,
            req.body.Latitud,
            req.body.Longitud,
        ]);

        // Obtener la nueva ID del parqueo
        const newParkId = results.insertId;

        // Insertar un registro en la tabla usuario_has_parqueo con la nueva ID
        await connection.execute("INSERT INTO usuario_has_parqueo (usuario_idUsuario, parqueo_idParqueo) VALUES (?, ?);", [
            req.body.usuario_idUsuario, // Reemplaza con el valor correcto
            newParkId,
        ]);

        const newPark = {
            id: newParkId, // Utiliza la nueva ID generada
            ...req.body,
        };
        res.json(newPark);
    } catch (error) {
        console.error(error);
    }
};

export const updatePostPark = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE parqueo SET Ubicacion = ?, Tamaño = ?, Descripcion = ?, Tipo_Parqueo_idTipo_Parqueo = ?, Titulo = ?, Url_imagen = ?, Url_validacion = ?, Latitud = ?, Longitud = ? WHERE idParqueo = ? AND Estado = 1 AND Aprobacion = 0;    ', [
        req.body.Ubicacion,
        req.body.Tamaño,
        req.body.Descripcion,
        req.body.Tipo_Parqueo_idTipo_Parqueo,
        req.body.Titulo,
        req.body.Url_imagen,
        req.body.Url_validacion,
        req.body.Latitud,
        req.body.Longitud,
        req.params.id
    ]);
    res.sendStatus(204);
};

export const updatePark = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE parqueo SET Ubicacion = ?, Descripcion = ?, Titulo = ?, Url_imagen = ?, Disponibilidad = ? WHERE idParqueo = ? AND Estado = 1 AND Aprobacion = 1;', [
        req.body.Ubicacion,
        req.body.Descripcion,
        req.body.Titulo,
        req.body.Url_imagen,
        req.body.Disponibilidad,
        req.params.id
    ]);
    res.sendStatus(204);
};

export const getPostPark = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute("SELECT * FROM Parqueo WHERE idParqueo = ? AND Estado = 1;", [
            req.body.idParqueo,
        ]);
        //console.log(rows);
        if (rows.length === 1) {
            const park = rows[0];
            const parkinfo = {
                idParqueo: park.idParqueo, // Asumiendo que el ID es un campo en la tabla Usuario
                Ubicacion: park.Ubicacion, // ... Agregar otros campos relevantes aquí si es necesario
                Tamaño: park.Tamaño,
                Descripcion: park.Descripcion,
                Tipo_Parqueo_idTipo_Parqueo: park.Tipo_Parqueo_idTipo_Parqueo,
                Titulo: park.Titulo,
                Url_imagen: park.Url_imagen,
                Url_validacion: park.Url_validacion,
                Latitud: park.Latitud,
                Longitud: park.Longitud,
                Disponibilidad: park.Disponibilidad, // ...
            };

            res.json(parkinfo);
        } else {
            res.status(401).json({ mensaje: "id invalida" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const deletePark = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE Parqueo SET Estado = 0 WHERE idParqueo = ?', [
        req.params.id
    ]);
    res.sendStatus(204);
};

export const getMyAprobedPark = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT parqueo.* FROM parqueo INNER JOIN usuario_has_parqueo ON parqueo.idParqueo = usuario_has_parqueo.parqueo_idParqueo WHERE usuario_has_parqueo.usuario_idUsuario = ? AND parqueo.Aprobacion = 1 AND parqueo.Estado = 1;", [
        req.params.id,
    ]);
    res.json(rows)
}