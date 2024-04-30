import EmailTemplate from '../../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

//IMPORTANTE LOS EMAIL NO FUNCIONAN POR CUESTIONES DE DOMINIOS EN CASO DE QUERER CAMBIAS A NODEMAILER ES VALIDO

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
    try {
        const body = await req.json();  // Read the request body
        const usuario = body.usuario;
        const codigo = body.codigo;  // Get 'codigo' from the request body

        const data = await resend.emails.send({
            from: 'PJAPQ <onboarding@resend.dev>',
            to: ["pcdavid836@gmail.com"], //AQUI EL EMAIL { usuario: usuario }
            subject: 'PROYECTO APQ Codigo de Registro',
            react: EmailTemplate({ codigo: codigo }),
        });

        console.log(usuario);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
