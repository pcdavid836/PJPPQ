import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function POST(request) {
    try {
        const data = await request.json();
        const { usuario_idUsuario, parqueo_idParqueo, Estado } = data;
        const result = await conn.query("UPDATE usuario_has_parqueo SET Estado = ? WHERE usuario_idUsuario = ? AND parqueo_idParqueo = ?", [Estado, usuario_idUsuario, parqueo_idParqueo]);
        
        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Update failed, no matching record found",
                },
                {
                    status: 404,
                }
            );
        }
        return NextResponse.json({ message: "Actualizado correctamente" });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 }
        );
    }
}
