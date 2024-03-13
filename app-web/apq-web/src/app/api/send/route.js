import EmailTemplate from '../../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
    try {
        const body = await req.json();  // Read the request body
        const codigo = body.codigo;  // Get 'codigo' from the request body

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['pcdavid836@gmail.com'],
            subject: 'PROYECTO APQ Codigo de Registro',
            react: EmailTemplate({ codigo: codigo }),
        });

        console.log(codigo);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
