import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"


export async function GET() {
    try {
        const results = await conn.query("SELECT parqueo.*, usuario_has_parqueo.* FROM parqueo JOIN usuario_has_parqueo ON parqueo.idParqueo = usuario_has_parqueo.parqueo_idParqueo WHERE parqueo.Aprobacion = 1 AND parqueo.Estado = 1 AND usuario_has_parqueo.Co_cuidador = 0");
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
