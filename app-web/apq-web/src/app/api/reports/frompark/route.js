import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"

export async function GET() {
    try {
        const results = await conn.query("SELECT p.*, (SELECT COUNT(DISTINCT rup.idReporteUsuario) FROM reporte_usuario_parqueo rup WHERE rup.Valido = 0 AND rup.Estado = 1 AND rup.parqueo_idParqueo = p.idParqueo) AS reporte_count FROM parqueo p ORDER BY reporte_count DESC;");
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
