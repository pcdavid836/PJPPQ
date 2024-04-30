import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
        const result = await conn.query(
            "SELECT parqueo.*, usuario.idUsuario, usuario.Nombres, usuario.Primer_Apellido, usuario.Segundo_Apellido FROM parqueo JOIN usuario_has_parqueo ON parqueo.idParqueo = usuario_has_parqueo.parqueo_idParqueo JOIN usuario ON usuario.idUsuario = usuario_has_parqueo.usuario_idUsuario WHERE usuario_has_parqueo.Co_cuidador = 0 AND parqueo.idParqueo = ?",
            [params.id]
        );

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

        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
