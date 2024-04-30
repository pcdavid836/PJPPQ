import axios from 'axios';
import { getServerSession } from "next-auth/next";
import NextAuth, { authOptions } from 'next-auth'


async function callOwnData() {
    const session = await getServerSession(authOptions);
    //console.log(session)

    if (session.user.email) {
        const { data } = await axios.post(`${process.env.NEXTAUTH_URL}/api/owninfo`, { Correo: session.user.email });
        //console.log('Data from API:', data); // Agrega esta línea
        return data;
    }
    console.log('Email is undefined');
    return null;
}


export default callOwnData;
