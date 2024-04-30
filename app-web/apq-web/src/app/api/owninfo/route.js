import { NextResponse } from 'next/server';
import { conn } from "@/libs/mysql"

export async function POST(request) {
    try {
        const { Correo } = await request.json(); // Extrae el correo del cuerpo de la solicitud

        const result = await conn.query("SELECT * FROM usuario WHERE Correo = ?", [
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

        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
