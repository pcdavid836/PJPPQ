import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";


export async function GET(request, { params }) {
    try {
        const result = await conn.query(`
            SELECT 
                v.*, 
                u.Nombres, 
                u.Primer_Apellido, 
                u.Segundo_Apellido 
            FROM 
                vehiculo AS v
            JOIN 
                usuario AS u ON v.usuario_idUsuario = u.idUsuario
            WHERE 
                v.idVehiculo = ?
        `, [params.id]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Vehículo o usuario no encontrado",
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


export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const result = await conn.query("UPDATE vehiculo SET ? WHERE idVehiculo = ?", [
            data,
            params.id,
        ]);
        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Usuario no encontrado",
                },
                {
                    status: 404,
                }
            );
        }
        const updatedUser = await conn.query("SELECT * FROM vehiculo WHERE idVehiculo = ?", [params.id]);

        return NextResponse.json(updatedUser[0]);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
