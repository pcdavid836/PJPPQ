export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/dashboard/:path*", "/accountValidation/:path*"]
}

// EN CASO DE QUERER COLOCAR MAS RUTAS : matcher: ["/dashboard/:path*", "/ejemplo/:path*"]