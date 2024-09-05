import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"

//OBTENGO PARQUEOS

// GET
export async function GET() {
    try {
        const results = await conn.query("SELECT p.*, (SELECT COUNT(DISTINCT rup.idReporteUsuario) FROM reporte_usuario_parqueo rup WHERE rup.Valido = 0 AND rup.Estado = 1 AND rup.parqueo_idParqueo = p.idParqueo) AS reporte_count FROM parqueo p WHERE p.Estado = 1 AND p.Aprobacion = 1 ORDER BY reporte_count DESC;");
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

// SEARCH
export async function POST(request) {
    try {
        const data = await request.json();
        const { Titulo, Tipo_Parqueo_idTipo_Parqueo, idParqueo } = data;

        let query = "SELECT p.*, (SELECT COUNT(DISTINCT rup.idReporteUsuario) FROM reporte_usuario_parqueo rup WHERE rup.Valido = 0 AND rup.Estado = 1 AND rup.parqueo_idParqueo = p.idParqueo) AS reporte_count FROM parqueo p WHERE p.Estado = 1 AND p.Aprobacion = 1";

        if (Titulo) {
            query += ` AND p.Titulo LIKE '%${Titulo}%'`;
        }
        if (Tipo_Parqueo_idTipo_Parqueo) {
            query += ` AND p.Tipo_Parqueo_idTipo_Parqueo = ${Tipo_Parqueo_idTipo_Parqueo}`;
        }
        if (idParqueo) {
            query += ` AND p.idParqueo = ${idParqueo}`;
        }

        query += " ORDER BY reporte_count DESC";

        const results = await conn.query(query);
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
