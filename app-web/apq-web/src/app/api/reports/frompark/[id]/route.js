import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
        const result = await conn.query(`
            SELECT r.*, u.Nombres, u.Primer_Apellido, u.Segundo_Apellido, p.Titulo
            FROM reporte_usuario_parqueo r
            JOIN usuario u ON r.usuario_idUsuario = u.idUsuario
            JOIN parqueo p ON r.parqueo_idParqueo = p.idParqueo
            WHERE r.parqueo_idParqueo = ?
            ORDER BY r.FechaCreacion DESC
        `, [params.id]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "No se encontraron reportes para este parqueo",
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


export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const result = await conn.query("UPDATE reporte_usuario_parqueo SET ? WHERE idReporteUsuario = ?", [
            data,
            params.id,
        ]);
        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Reporte no encontrado",
                },
                {
                    status: 404,
                }
            );
        }
        return NextResponse.json({
            message: 'Actualización exitosa',
        });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
