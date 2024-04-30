import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const { idUsuario, Codigo, Contrasena } = await request.json(); // Extrae los datos del cuerpo de la solicitud

        // Verificar si el idUsuario y Codigo existen en la base de datos
        const result = await conn.query("SELECT * FROM Usuario WHERE idUsuario = ? AND Codigo = ?", [
            idUsuario,
            Codigo,
        ]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Usuario no encontrado o código incorrecto",
                },
                {
                    status: 404,
                }
            );
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Contrasena, salt);

        // Actualizar la contraseña del usuario
        await conn.query("UPDATE Usuario SET Contrasena = ? WHERE idUsuario = ?", [hashedPassword, idUsuario]);

        // Obtener el usuario actualizado
        const updatedUser = await conn.query("SELECT * FROM Usuario WHERE idUsuario = ?", [idUsuario]);

        return NextResponse.json(updatedUser[0]);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
