import { connect } from "../database"

export const getUser = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM Usuario')
    res.json(rows);
}

export const getUserid = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Usuario WHERE idUsuario = ?", [
        req.params.id,
    ]);
    res.json(rows);
}

export const getUserMail = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute("SELECT * FROM Usuario WHERE Correo = ? AND Contraseña = ? AND Estado = 1;", [
            req.body.Correo, 
            req.body.Contraseña
        ]);
        //console.log(rows);
        if (rows.length === 1) {
            const user = rows[0];
            const userInfo = {
                idUsuario: user.idUsuario, // Asumiendo que el ID es un campo en la tabla Usuario
                Correo: user.Correo, // ... Agregar otros campos relevantes aquí si es necesario
                Contraseña: user.Contraseña,
                Nombres: user.Nombres,
                Primer_Apellido: user.Primer_Apellido,
                Segundo_Apellido: user.Segundo_Apellido,
                CI: user.CI,
                Celular: user.Celular,
                Url_imagen: user.Url_imagen,
                idRol: user.Tipo_Usuario_idTipo_Usuario,
            };
            
            res.json(userInfo);
        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};


export const createUser = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.execute("INSERT INTO Usuario (Correo, Nombres, Primer_Apellido, Segundo_Apellido, Celular, CI, Contraseña, Estado, FechaCreacion, Tipo_Usuario_idTipo_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, 1)", [
            req.body.Correo,
            req.body.Nombres,
            req.body.Primer_Apellido,
            req.body.Segundo_Apellido,
            req.body.Celular,
            req.body.CI,
            req.body.Contraseña
        ]);

        const newUser = {
            id: results.insertId,
            ...req.body,
        };
        res.json(newUser);
    } catch (error) {
        console.error(error);
    }
};

export const deleteUser = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE Usuario SET Estado = 0 WHERE idUsuario = ?', [
        req.params.id
    ]);
    res.sendStatus(204);
};

export const updateUser = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE Usuario SET Nombres = ?, Primer_Apellido = ?, Segundo_Apellido = ?, CI = ?, Celular = ?, FechaActualizacion = CURRENT_TIMESTAMP WHERE idUsuario = ?', [
        req.body.Nombres,
        req.body.Primer_Apellido,
        req.body.Segundo_Apellido,
        req.body.CI,
        req.body.Celular,
        req.params.id
    ]);
    res.sendStatus(204);
};

export const updateImageUser = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE Usuario SET Url_imagen = ?, FechaActualizacion = CURRENT_TIMESTAMP WHERE idUsuario = ?', [
        req.body.Url_imagen,
        req.params.id
    ]);
    res.sendStatus(204);
};