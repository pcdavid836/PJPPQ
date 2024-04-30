import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";


export async function GET(request, { params }) {
    try {
        const result = await conn.query("SELECT usuario_has_parqueo.*, usuario.Nombres, usuario.Primer_Apellido, usuario.Segundo_Apellido FROM usuario_has_parqueo JOIN usuario ON usuario_has_parqueo.usuario_idUsuario = usuario.idUsuario WHERE parqueo_idParqueo = ?", [
            params.id,
        ]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Parqueo no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(result); // Devuelve todos los registros que coinciden
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
