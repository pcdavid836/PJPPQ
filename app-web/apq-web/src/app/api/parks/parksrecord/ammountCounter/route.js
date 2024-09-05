import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function POST(request) {
    try {
        const data = await request.json();
        const { id, fechaInicio, fechaFin } = data;

        const result = await conn.query(`
            SELECT 
                SUM(qr.Monto) AS total_amount
            FROM 
                reserva AS r
            JOIN 
                parqueo_vehiculo AS pv ON r.idReserva = pv.reserva_idReserva
            JOIN 
                qr ON pv.idParqueo_Vehiculo = qr.idParqueo_Vehiculo
            WHERE 
                r.Parqueo_idParqueo = ?
            AND 
                r.Fecha_Reserva BETWEEN ? AND ?
            AND 
                pv.PagoQR = 1
        `, [id, fechaInicio, fechaFin]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "No se encontraron montos para este rango de fechas con PagoQR activo",
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
