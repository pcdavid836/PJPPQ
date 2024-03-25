import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"


//MODIFICAR
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


//
export async function POST(request) {
    try {
        const data = await request.json();
        const result = await conn.query("INSERT INTO vehiculos_filtro SET ?", data);
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
        return NextResponse.json({ message: "Insertado correctamente" });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}