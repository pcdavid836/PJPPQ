import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"


export async function GET() {
    try {
        const results = await conn.query("SELECT * FROM horarios_atencion;");
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
