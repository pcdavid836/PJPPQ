import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"

//OBTENGO USUARIOS

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

//SEARCH
export async function POST(request) {
    try {
        const data = await request.json();
        const { idUsuario, Nombres, Primer_Apellido, Celular, CI, Estado, Ban, Correo } = data;

        let query = "SELECT u.*, (SELECT COUNT(DISTINCT rup.idReporteParqueo) FROM reporte_parqueo_usuario rup WHERE rup.Valido = 0 AND rup.Estado = 1 AND rup.usuario_idUsuario = u.idUsuario) AS reporte_count FROM usuario u WHERE 1=1";

        if (idUsuario) {
            query += ` AND u.idUsuario = ${idUsuario}`;
        }
        if (Nombres) {
            query += ` AND u.Nombres LIKE '%${Nombres}%'`;
        }
        if (Primer_Apellido) {
            query += ` AND u.Primer_Apellido LIKE '%${Primer_Apellido}%'`;
        }
        if (Celular) {
            query += ` AND u.Celular LIKE '%${Celular}%'`;
        }
        if (CI) {
            query += ` AND u.CI LIKE '%${CI}%'`;
        }
        if (Estado) {
            query += ` AND u.Estado = ${Estado}`;
        }
        if (Ban) {
            query += ` AND u.Ban = ${Ban}`;
        }
        if (Correo) {
            query += ` AND u.Correo LIKE '%${Correo}%'`;
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
