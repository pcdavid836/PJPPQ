import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"

export async function GET() {
    try {
        const results = await conn.query("SELECT parqueo.*, usuario_has_parqueo.usuario_idUsuario FROM parqueo JOIN usuario_has_parqueo ON parqueo.idParqueo = usuario_has_parqueo.parqueo_idParqueo WHERE parqueo.Aprobacion = 0 AND parqueo.Estado = 1");
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
        const { parqueo_idParqueo, hora_apertura, hora_cierre, Estado, cantidad } = data;

        for (let diasSemanaIdDia = 1; diasSemanaIdDia <= cantidad; diasSemanaIdDia++) {
            const result = await conn.query("INSERT INTO horarios_atencion SET ?", {
                parqueo_idParqueo,
                dias_semana_idDia: diasSemanaIdDia,
                hora_apertura,
                hora_cierre,
                Estado
            });

            if (result.affectedRows === 0) {
                return NextResponse.json(
                    {
                        message: "Insert failed",
                    },
                    {
                        status: 404,
                    }
                );
            }
        }

        return NextResponse.json({ message: "Insertado correctamente" });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}

