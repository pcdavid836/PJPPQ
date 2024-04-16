import { connect } from "../database"
import crypto from 'crypto';

const textflow = require("textflow.js");

textflow.useKey("LBwi4AkaJN4GbT1Bc7wHD9mlTPmHNrwSf0wxISgIOcIg22AETl7vxJAXPvtY9V07");

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'crisisxd9@gmail.com',
        pass: 'wern djlb gyte hcxq'
    }
});


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
        const [rows] = await connection.execute("SELECT * FROM Usuario WHERE Correo = ? AND Contrasena = ? AND Estado = 1 AND Ban = 0;", [
            req.body.Correo,
            req.body.Contrasena
        ]);
        //console.log(rows);
        if (rows.length === 1) {
            const user = rows[0];
            const userInfo = {
                idUsuario: user.idUsuario, // Asumiendo que el ID es un campo en la tabla Usuario
                Correo: user.Correo, // ... Agregar otros campos relevantes aquí si es necesario
                Contrasena: user.Contrasena,
                Nombres: user.Nombres,
                Primer_Apellido: user.Primer_Apellido,
                Segundo_Apellido: user.Segundo_Apellido,
                CI: user.CI,
                Celular: user.Celular,
                Url_imagen: user.Url_imagen,
                idRol: user.Tipo_Usuario_idTipo_Usuario,
                Correo_Externo: user.Correo_Externo, // Añade la nueva columna aquí
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


export const getUserMailExistence = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute("SELECT * FROM Usuario WHERE Correo = ? OR Celular = ?;", [
            req.body.Correo,
            req.body.Celular
        ]);
        if (rows.length === 1) {
            res.json({ mensaje: "El correo electrónico o el número de celular ya están en uso" });
        } else {
            res.json({ mensaje: "El correo electrónico y el número de celular están disponibles" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};


export const sendVerificationSMS = async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos

    try {
        await textflow.sendSMS(phoneNumber, `Tu código de verificación es: ${verificationCode}`);
        res.json({ verificationCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al enviar el SMS de verificación" });
    }
};

export const createUser = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.execute("INSERT INTO Usuario (Correo, Nombres, Primer_Apellido, Segundo_Apellido, Celular, CI, Contrasena, Estado, FechaCreacion, Tipo_Usuario_idTipo_Usuario, Codigo, Correo_Externo, Url_Imagen) VALUES (?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, 1, 281201, ?, ?)", [
            req.body.Correo,
            req.body.Nombres,
            req.body.Primer_Apellido,
            req.body.Segundo_Apellido,
            req.body.Celular,
            req.body.CI,
            req.body.Contrasena,
            req.body.Correo_Externo, // Añade el valor de Correo_Externo aquí
            req.body.Url_imagen,
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

export const sendVerificationEmail = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute("SELECT * FROM Usuario WHERE Correo = ? AND Estado = 0 AND Ban = 0 AND Correo_Externo = 0;", [
            req.body.Correo
        ]);

        if (rows.length > 0) {
            const user = rows[0];
            const verificationCode = crypto.randomBytes(3).toString('hex'); // Genera un código de 6 dígitos

            // Guardar el código en la base de datos
            await connection.execute("UPDATE Usuario SET Codigo = ?, FechaActualizacion = CURRENT_TIMESTAMP WHERE idUsuario = ?", [
                verificationCode,
                user.idUsuario
            ]);

            // Enviar el correo
            let mailOptions = {
                from: 'crisisxd9@gmail.com',
                to: user.Correo,
                subject: 'Código de verificación',
                text: `Tu código de verificación es: ${verificationCode}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ mensaje: "Error al enviar el correo de verificación" });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({
                        mensaje: "Correo de verificación enviado",
                        usuario: user // Agrega la información del usuario a la respuesta
                    });
                }
            });
        } else {
            res.status(404).json({ mensaje: "No se encontró un usuario activo con ese correo electrónico" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute("SELECT * FROM Usuario WHERE idUsuario = ? AND Codigo = ?;", [
            req.body.idUsuario,
            req.body.Codigo
        ]);

        if (rows.length > 0) {
            const user = rows[0];
            const newCode = crypto.randomBytes(3).toString('hex'); // Genera un nuevo código de 6 dígitos

            // Actualizar la contraseña y el código en la base de datos
            await connection.execute("UPDATE Usuario SET Contrasena = ?, Codigo = ?, FechaActualizacion = CURRENT_TIMESTAMP WHERE idUsuario = ?", [
                req.body.Contrasena,
                newCode,
                user.idUsuario
            ]);

            res.json({
                mensaje: "Contraseña actualizada correctamente",
                usuario: user // Agrega la información del usuario a la respuesta
            });
        } else {
            res.status(404).json({ mensaje: "No se encontró un usuario con ese ID y código" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const getExternalMail = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.execute("SELECT * FROM Usuario WHERE Correo = ?;", [
            req.body.Correo
        ]);
        if (rows.length === 1) {
            const user = rows[0];
            const userInfo = {
                idUsuario: user.idUsuario,
                Correo: user.Correo,
                Contrasena: user.Contrasena,
                Nombres: user.Nombres,
                Primer_Apellido: user.Primer_Apellido,
                Segundo_Apellido: user.Segundo_Apellido,
                CI: user.CI,
                Celular: user.Celular,
                Url_imagen: user.Url_imagen,
                idRol: user.Tipo_Usuario_idTipo_Usuario,
                Correo_Externo: user.Correo_Externo,
                Estado: user.Estado,
                Ban: user.Ban,
            };
            res.json(userInfo);
        } else {
            res.status(404).json({ mensaje: "No se encontró ningún usuario con ese correo electrónico" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const updateEstate4Back = async (req, res) => {
    const connection = await connect();
    await connection.query('UPDATE Usuario SET Estado = 1, FechaActualizacion = CURRENT_TIMESTAMP, Correo_Externo = 1 WHERE idUsuario = ?', [
        req.params.id
    ]);
    res.sendStatus(204);
};
