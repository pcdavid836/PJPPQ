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

export async function POST(request) {
    try {
        const data = await request.json();
        const { Tipo_Vehiculo_idTipo_Vehiculo, Placa, IdVehiculo, Descripcion, Estado } = data;

        let query = "SELECT v.*, u.Nombres, u.Primer_Apellido, u.Segundo_Apellido FROM vehiculo v INNER JOIN usuario u ON v.usuario_idUsuario = u.idUsuario WHERE v.Estado = 1";

        if (Tipo_Vehiculo_idTipo_Vehiculo) {
            query += ` AND v.Tipo_Vehiculo_idTipo_Vehiculo = ${Tipo_Vehiculo_idTipo_Vehiculo}`;
        }
        if (Placa) {
            query += ` AND v.Placa LIKE '%${Placa}%'`;
        }
        if (IdVehiculo) {
            query += ` AND v.idVehiculo = ${IdVehiculo}`;
        }
        if (Descripcion) {
            query += ` AND v.Descripcion LIKE '%${Descripcion}%'`;
        }
        if (Estado) {
            query += ` AND v.Estado = ${Estado}`;
        }

        query += " ORDER BY v.Fecha_Creacion DESC;";

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
