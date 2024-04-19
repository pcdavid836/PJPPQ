import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/libs/db'
import bcrypt from 'bcrypt'

/* EN CASO DE QUE EN UN FUTURO SE QUIERA UTILIZAR EL ROL ADMINISTRADOR EN AMBAS APLICACIONES CAMBIAR bcrypt A CryptoES Y SE EMPEZARA A ENCRIPTAR CONTRASEñAS CON
HASH256
*/

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                Correo: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
                Contrasena: { label: "Password", type: "password", placeholder: "**********" },
            },
            async authorize(credentials, req) {
                console.log(credentials)

                const userFound = await db.usuario.findUnique({
                    where: {
                        Correo: credentials.Correo
                    }
                })

                if (!userFound) throw new Error('Usuario no registrado')

                if (userFound.Ban == 1) throw new Error('Credenciales no admitidas!')

                console.log(userFound)

                const matchPassword = await bcrypt.compare(credentials.Contrasena, userFound.Contrasena)

                if (!matchPassword) throw new Error('Contraseña Incorrecta!')

                return {
                    id: userFound.idUsuario,
                    name: userFound.Nombres,
                    email: userFound.Correo,
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
