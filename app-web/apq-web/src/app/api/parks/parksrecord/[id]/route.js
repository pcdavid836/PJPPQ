import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
        const results = await conn.query(
            `
            SELECT
            r.idReserva,
            r.Parqueo_idParqueo AS Reserva_Parqueo_idParqueo,
            r.Usuario_idUsuario AS Reserva_Usuario_idUsuario,
            r.Estado AS Reserva_Estado,
            r.Fecha_Creacion AS Reserva_Fecha_Creacion,
            r.Fecha_Reserva AS Reserva_Fecha_Reserva,
            r.Hora_Reserva_Inicio AS Reserva_Hora_Reserva_Inicio,
            r.Hora_Reserva_Fin AS Reserva_Hora_Reserva_Fin,
            r.Rechazado AS Reserva_Rechazado,
            r.Cancelado AS Reserva_Cancelado,
            r.Fecha_Actualizacion AS Reserva_Fecha_Actualizacion,
            r.vehiculo_idVehiculo AS Reserva_vehiculo_idVehiculo,
            r.Realizado AS Reserva_Realizado,
            pv.idParqueo_Vehiculo AS PV_idParqueo_Vehiculo,
            pv.Parqueo_idParqueo AS PV_Parqueo_idParqueo,
            pv.ConfirmacionEntrada AS PV_ConfirmacionEntrada,
            pv.Estado AS PV_Estado,
            pv.Fecha_Creacion AS PV_Fecha_Creacion,
            pv.Fecha_Actualizacion AS PV_Fecha_Actualizacion,
            pv.Hora_Ingreso AS PV_Hora_Ingreso,
            pv.Hora_Salida AS PV_Hora_Salida,
            pv.Url_imagen_ingreso AS PV_Url_imagen_ingreso,
            pv.ConfirmacionSalida AS PV_ConfirmacionSalida,
            pv.Cancelado AS PV_Cancelado,
            pv.reserva_idReserva AS PV_reserva_idReserva,
            pv.vehiculo_idVehiculo AS PV_vehiculo_idVehiculo,
            qr.idQR AS QR_idQR,
            qr.Monto AS QR_Monto,
            qr.Comprobante AS QR_Comprobante,
            qr.idParqueo_Vehiculo AS QR_idParqueo_Vehiculo,
            qr.Estado AS QR_Estado,
            qr.Confirmacion AS QR_Confirmacion,
            u.Nombres AS Usuario_Nombres,
            u.Primer_Apellido AS Usuario_Primer_Apellido,
            u.Segundo_Apellido AS Usuario_Segundo_Apellido,
            pq.Titulo AS Parqueo_Titulo,
            v.idVehiculo AS Vehiculo_idVehiculo,
            v.Placa AS Vehiculo_Placa,
            v.Color AS Vehiculo_Color,
            v.Marca AS Vehiculo_Marca,
            v.Descripcion AS Vehiculo_Descripcion,
            v.Estado AS Vehiculo_Estado,
            v.Tipo_Vehiculo_idTipo_Vehiculo AS Vehiculo_Tipo_Vehiculo_idTipo_Vehiculo,
            v.Url_imagen AS Vehiculo_Url_imagen,
            v.Fecha_Creacion AS Vehiculo_Fecha_Creacion,
            v.Fecha_Actualizacion AS Vehiculo_Fecha_Actualizacion,
            v.usuario_idUsuario AS Vehiculo_usuario_idUsuario
            FROM reserva AS r
            LEFT JOIN parqueo_vehiculo AS pv ON r.idReserva = pv.reserva_idReserva
            LEFT JOIN qr ON pv.idParqueo_Vehiculo = qr.idParqueo_Vehiculo
            LEFT JOIN usuario AS u ON r.Usuario_idUsuario = u.idUsuario
            LEFT JOIN parqueo AS pq ON r.Parqueo_idParqueo = pq.idParqueo
            LEFT JOIN vehiculo AS v ON r.vehiculo_idVehiculo = v.idVehiculo
            WHERE r.Parqueo_idParqueo = 1
            ORDER BY r.Fecha_Reserva DESC;
            `,
            [params.id]
        );

        if (results.length === 0) {
            return NextResponse.json(
                {
                    message: "Parqueo no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}
