import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

//IMPORTANTE ESTE NO ES EL DE ID

export async function GET() {
    try {
        const results = await conn.query(`
        SELECT
        r.idReserva,
        r.Parqueo_idParqueo,
        r.Usuario_idUsuario,
        r.Estado AS Estado_Reserva,
        r.Fecha_Creacion AS Fecha_Creacion_Reserva,
        r.Fecha_Reserva,
        r.Hora_Reserva_Inicio,
        r.Hora_Reserva_Fin,
        r.Rechazado,
        r.Cancelado AS Cancelado_Reserva,
        r.Fecha_Actualizacion AS Fecha_Actualizacion_Reserva,
        r.vehiculo_idVehiculo,
        r.Realizado,
        q.idQR,
        q.Monto,
        q.Comprobante,
        q.idParqueo_Vehiculo,
        q.Estado AS Estado_QR,
        q.Confirmacion,
        pv.idParqueo_Vehiculo,
        pv.Parqueo_idParqueo,
        pv.ConfirmacionEntrada,
        pv.Estado AS Estado_Parqueo_Vehiculo,
        pv.Fecha_Creacion AS Fecha_Creacion_Parqueo_Vehiculo,
        pv.Fecha_Actualizacion AS Fecha_Actualizacion_Parqueo_Vehiculo,
        pv.Hora_Ingreso,
        pv.Hora_Salida,
        pv.Url_imagen_ingreso,
        pv.ConfirmacionSalida,
        pv.Cancelado AS Cancelado_Parqueo_Vehiculo,
        pv.reserva_idReserva,
        pv.vehiculo_idVehiculo
    FROM
        reserva AS r
    LEFT JOIN
        QR AS q ON r.vehiculo_idVehiculo = q.idParqueo_Vehiculo
    LEFT JOIN
        parqueo_vehiculo AS pv ON r.vehiculo_idVehiculo = pv.vehiculo_idVehiculo;
        `);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
