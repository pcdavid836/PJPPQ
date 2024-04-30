import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"

export async function GET() {
    try {
        const results = await conn.query("SELECT v.*, u.Nombres, u.Primer_Apellido, u.Segundo_Apellido FROM vehiculo v INNER JOIN usuario u ON v.usuario_idUsuario = u.idUsuario WHERE v.Estado = 1 ORDER BY v.Fecha_Creacion DESC;");
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