import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
        const result = await conn.query(`
            SELECT 
                (SELECT COUNT(*) FROM reporte_parqueo_usuario WHERE usuario_idUsuario = ? AND Valido = 0 AND Estado = 1) AS Reporte_Pendiente,
                (SELECT COUNT(*) FROM reporte_parqueo_usuario WHERE usuario_idUsuario = ? AND Valido = 1 AND Estado = 0) AS Reporte_Valido,
                (SELECT COUNT(*) FROM reporte_parqueo_usuario WHERE usuario_idUsuario = ? AND Valido = 0 AND Estado = 0) AS Reporte_Rechazado
        `, [params.id, params.id, params.id]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "No se encontraron reportes para este usuario",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(result[0]); // Devuelve el conteo de reportes en diferentes estados
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
