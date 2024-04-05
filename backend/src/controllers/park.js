import { connect } from "../database"

//COMO DATO CURIOSO PUEDES HACER QUE EN CASO DE QUE EXISTA UNA RESERVA ANTIGUA PUEDES COMPROBAR EN LA CONSULTA DE ELEGIR HORARIO
//MOSTRAR UNA ALERTA QUE INDIQUE QYE YA EXISTE UNA RESERVA ANTERIOR ASI EVITAS QUE ALGUIEN INTENTE CREAR UNA RESERVA DOBLE

//EN POSTULACIONES AñADE EL BUSCAR CODIGO DE ESTABLECIMIENTO Y CREA A CADA PARQUEO 2 COLUMNAS UNA PARA ACTIVAR O DESACTIVAR CODIGOS Y OTRA PARA ALMACENAR EL CODIGO SECRETO

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
        const [results] = await connection.execute("INSERT INTO parqueo (Ubicacion, Tamaño, Descripcion, Disponibilidad, Estado, Tipo_Parqueo_idTipo_Parqueo, Titulo, Url_imagen, Url_validacion, Aprobacion, Fecha_Creacion, Latitud, Longitud, Lleno) VALUES (?, ?, ?, 0, 1, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, ?, ?, 0);", [
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
    await connection.query('UPDATE parqueo SET Ubicacion = ?, Descripcion = ?, Titulo = ?, Url_imagen = ?, Disponibilidad = ?, Lleno = ? WHERE idParqueo = ? AND Estado = 1 AND Aprobacion = 1;', [
        req.body.Ubicacion,
        req.body.Descripcion,
        req.body.Titulo,
        req.body.Url_imagen,
        req.body.Disponibilidad,
        req.body.Lleno,
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
                Disponibilidad: park.Disponibilidad,
                Lleno: park.Lleno,
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

//ESTO NO SE USA PARA NADA, SOLO FUE AGREGADO CON FINES DE APRENDISAJE
export const deletePark = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE Parqueo SET Estado = 0 WHERE idParqueo = ?', [
        req.params.id
    ]);
    res.sendStatus(204);
};
//


export const getMyAprobedPark = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT parqueo.* FROM parqueo INNER JOIN usuario_has_parqueo ON parqueo.idParqueo = usuario_has_parqueo.parqueo_idParqueo WHERE usuario_has_parqueo.usuario_idUsuario = ? AND parqueo.Aprobacion = 1 AND parqueo.Estado = 1;", [
        req.params.id,
    ]);
    res.json(rows)
}

export const getParkFilters = async (req, res) => {
    try {
        const { Disponibilidad, Tipo_Parqueo_idTipo_Parqueo, tipo_vehiculo_ids } = req.body;

        // Verificar que los datos necesarios estén presentes en la solicitud
        if (!Disponibilidad || !Tipo_Parqueo_idTipo_Parqueo || !tipo_vehiculo_ids) {
            return res.status(400).json({ mensaje: "Faltan datos requeridos en la solicitud" });
        }

        const connection = await connect();
        const [rows] = await connection.execute(`
            SELECT DISTINCT p.*
            FROM parqueo p
            JOIN vehiculos_filtro vf ON p.idParqueo = vf.parqueo_idParqueo
            WHERE p.Estado = 1
            AND p.Aprobacion = 1
            AND p.Disponibilidad IN (${Disponibilidad.map(() => '?').join(', ')})
            AND p.Tipo_Parqueo_idTipo_Parqueo = ?
            AND vf.Estado = 1
            AND vf.tipo_vehiculo_idTipo_Vehiculo IN (${tipo_vehiculo_ids.map(() => '?').join(', ')});
        `, [...Disponibilidad, Tipo_Parqueo_idTipo_Parqueo, ...tipo_vehiculo_ids]);
        if (rows.length > 0) {
            const parks = rows.map(park => ({
                idParqueo: park.idParqueo,
                Ubicacion: park.Ubicacion,
                Tamaño: park.Tamaño,
                Descripcion: park.Descripcion,
                Tipo_Parqueo_idTipo_Parqueo: park.Tipo_Parqueo_idTipo_Parqueo,
                Titulo: park.Titulo,
                Url_imagen: park.Url_imagen,
                Url_validacion: park.Url_validacion,
                Latitud: park.Latitud,
                Longitud: park.Longitud,
                Disponibilidad: park.Disponibilidad,
                Lleno: park.Lleno,
            }));
            return res.json(parks);
        } else {
            return res.status(404).json({ mensaje: "No se encontraron parqueos que coincidan con los criterios de búsqueda" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
