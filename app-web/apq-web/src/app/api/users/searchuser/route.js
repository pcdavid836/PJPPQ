import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"

export async function POST(request) {
    try {
        const data = await request.json();
        const { idUsuario, Nombres, Primer_Apellido, Celular, CI, Estado, Ban, Correo, Tipo_Usuario_idTipo_Usuario } = data;

        let query = "SELECT * FROM usuario WHERE 1=1";

        if (idUsuario) {
            query += ` AND idUsuario = ${idUsuario}`;
        }
        if (Nombres) {
            query += ` AND Nombres LIKE '%${Nombres}%'`;
        }
        if (Primer_Apellido) {
            query += ` AND Primer_Apellido LIKE '%${Primer_Apellido}%'`;
        }
        if (Celular) {
            query += ` AND Celular LIKE '%${Celular}%'`;
        }
        if (CI) {
            query += ` AND CI LIKE '%${CI}%'`;
        }
        if (Estado) {
            query += ` AND Estado = ${Estado}`;
        }
        if (Ban) {
            query += ` AND Ban = ${Ban}`;
        }
        if (Correo) {
            query += ` AND Correo LIKE '%${Correo}%'`;
        }
        if (Tipo_Usuario_idTipo_Usuario) {
            query += ` AND Tipo_Usuario_idTipo_Usuario = ${Tipo_Usuario_idTipo_Usuario}`;
        }

        query += " ORDER BY idUsuario ASC;";

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
