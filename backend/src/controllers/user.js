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
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Usuario WHERE Correo = ? AND Contraseña = ? AND Estado = 1;", [
        req.body.Correo,
        req.body.Contraseña,
    ]);
    res.json(rows);
}

export const createUser = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.execute("INSERT INTO Usuario (Correo, Nombres, Primer_Apellido, Segundo_Apellido, Celular, CI, Contraseña, Estado, Creacion, Tipo_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, 1)", [
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
    await connection.query('UPDATE Usuario SET ? WHERE idUsuario = ?', [
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
};