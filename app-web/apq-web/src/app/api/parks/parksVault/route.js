import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"


export async function GET() {
    try {
        const results = await conn.query("SELECT parqueo.*, usuario_has_parqueo.* FROM parqueo JOIN usuario_has_parqueo ON parqueo.idParqueo = usuario_has_parqueo.parqueo_idParqueo WHERE parqueo.Aprobacion = 1 AND parqueo.Estado = 0 AND usuario_has_parqueo.Co_cuidador = 0");
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

//SEARCH

export async function POST(request) {
    try {
        const data = await request.json();
        const { Titulo, Tipo_Parqueo_idTipo_Parqueo, idParqueo } = data;

        let query = "SELECT parqueo.*, usuario_has_parqueo.* FROM parqueo JOIN usuario_has_parqueo ON parqueo.idParqueo = usuario_has_parqueo.parqueo_idParqueo WHERE parqueo.Aprobacion = 1 AND parqueo.Estado = 0 AND usuario_has_parqueo.Co_cuidador = 0";

        if (Titulo) {
            query += ` AND parqueo.Titulo LIKE '%${Titulo}%'`;
        }
        if (Tipo_Parqueo_idTipo_Parqueo) {
            query += ` AND parqueo.Tipo_Parqueo_idTipo_Parqueo = ${Tipo_Parqueo_idTipo_Parqueo}`;
        }
        if (idParqueo) {
            query += ` AND parqueo.idParqueo = ${idParqueo}`;
        }

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