import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
        const result = await conn.query("SELECT * FROM horarios_atencion WHERE parqueo_idParqueo = ?", [
            params.id,
        ]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Usuario no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(result); // Devuelve todos los resultados
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
        const result = await conn.query("UPDATE horarios_atencion SET ? WHERE idHorario = ?", [
            data,
            params.id,
        ]);
        if (result.affectedRows === 0) {
            return NextResponse.json( 
                {
                    message: "Horario no encontrado",
                },
                {
                    status: 404,
                }
            );
        }
        const updatedUser = await conn.query("SELECT * FROM horarios_atencion WHERE idHorario = ?", [params.id]);

        return NextResponse.json(updatedUser[0]);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}