import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"
import bcrypt from 'bcrypt';

export async function GET() {
    try {
        const results = await conn.query("SELECT * FROM usuario WHERE Estado = 1 AND Ban = 0 AND Tipo_Usuario_idTipo_Usuario = 1 OR Tipo_Usuario_idTipo_Usuario = 2 ORDER BY idUsuario ASC");
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
        const { Nombres, Primer_Apellido, Segundo_Apellido, Celular, CI, Correo, Contrasena, Estado, Tipo_Usuario_idTipo_Usuario, Url_Imagen } = await request.json();

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(Contrasena, 10);

        const result = await conn.query("INSERT INTO usuario SET ?", {
            Nombres,
            Primer_Apellido,
            Segundo_Apellido,
            Celular,
            CI,
            Correo,
            Contrasena: hashedPassword,
            Estado,
            Tipo_Usuario_idTipo_Usuario,
            Url_Imagen
        });

        return NextResponse.json({
            Nombres,
            Primer_Apellido,
            Segundo_Apellido,
            Celular,
            CI,
            Correo,
            Contrasena: hashedPassword,
            Estado,
            Tipo_Usuario_idTipo_Usuario,
            Url_Imagen,
            id: result.insertId,
        });
    } catch (error) {
        console.log(error);
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