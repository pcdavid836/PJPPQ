import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
        const result = await conn.query(`
            SELECT 
                SUM(qr.Monto) AS total_amount
            FROM 
                parqueo
            JOIN 
                parqueo_vehiculo ON parqueo.idParqueo = parqueo_vehiculo.Parqueo_idParqueo
            JOIN 
                qr ON parqueo_vehiculo.idParqueo_Vehiculo = qr.idParqueo_Vehiculo
            WHERE 
                parqueo.idParqueo = ?
        `, [params.id]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "No se encontraron montos para este parqueo",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(result[0]); // Devuelve la suma de los montos
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
