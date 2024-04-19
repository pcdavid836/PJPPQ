import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/libs/db'

/* EN CASO DE QUE EN UN FUTURO SE QUIERA UTILIZAR EL ROL ADMINISTRADOR EN AMBAS APLICACIONES CAMBIAR bcrypt A CryptoES Y SE EMPEZARA A ENCRIPTAR CONTRASEñAS CON
HASH256
*/

export async function POST(request) {
    try {
        const data = await request.json();

        const userFound = await db.usuario.findUnique({
            where: {
                Correo: data.Correo
            }
        })

        if (userFound) {
            return NextResponse.json({
                message: "Ese correo electronico ya existe"
            }, {
                status: 400
            })
        }
        const Default = "default";
        const Activated = false;
        const Rol = 3;
        const Code = '******';
        console.log(data);
        const hashedPassword = await bcrypt.hash(data.Contrasena, 10)
        const newUser = await db.usuario.create({
            data: {
                Correo: data.Correo,
                Contrasena: hashedPassword,
                Nombres: data.Nombres,
                Primer_Apellido: data.Primer_Apellido,
                Segundo_Apellido: data.Segundo_Apellido,
                Celular: data.Celular,
                CI: data.CI,
                Estado: Activated,
                Url_Imagen: Default,
                Tipo_Usuario_idTipo_Usuario: Rol,
                Codigo: Code,
                Correo_Externo: Activated,
                Ban: Activated
            }
        })

        const { Contrasena: _, ...usuario } = newUser

        return NextResponse.json(usuario);

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