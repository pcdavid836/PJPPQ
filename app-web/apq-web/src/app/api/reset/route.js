import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const { Correo } = await request.json(); // Extrae el correo del cuerpo de la solicitud

        const result = await conn.query("SELECT * FROM Usuario WHERE Correo = ? AND Estado = 1 AND Ban = 0 AND Correo_Externo = 0 AND Tipo_Usuario_idTipo_Usuario IN (3, 4);", [
            Correo,
        ]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Usuario no encontrado",
                },
                {
                    status: 404,
                }
            );
        }


        // Generar un código de 6 caracteres aleatorios
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(Correo, salt);
        const codigo = hash.slice(-6); // Tomamos los últimos 6 caracteres del hash

        // Almacenar el código en la columna 'Codigo'
        await conn.query("UPDATE Usuario SET Codigo = ? WHERE Correo = ?", [codigo, Correo]);


        // Obtener el usuario actualizado
        const updatedUser = await conn.query("SELECT * FROM Usuario WHERE Correo = ?", [Correo]);

        return NextResponse.json(updatedUser[0]);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
