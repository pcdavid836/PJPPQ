import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"

export async function GET() {
    try {
        const results = await conn.query("SELECT u.*, (SELECT COUNT(DISTINCT rup.idReporteParqueo) FROM reporte_parqueo_usuario rup WHERE rup.Valido = 0 AND rup.Estado = 1 AND rup.usuario_idUsuario = u.idUsuario) AS reporte_count FROM usuario u ORDER BY reporte_count DESC;");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        )
    }
}