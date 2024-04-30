import { NextResponse } from 'next/server';
import { conn } from "@/libs/mysql";

export async function PUT(request, { params }) {
    try {
        const data = await request.json(); // Extrae los datos del cuerpo de la solicitud

        const result = await conn.query("UPDATE usuario SET ? WHERE idUsuario = ?", [
            data,
            params.id,
        ]);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Usuario no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        const updatedUser = await conn.query("SELECT * FROM usuario WHERE idUsuario = ?", [params.id]);

        return NextResponse.json(updatedUser[0]);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
