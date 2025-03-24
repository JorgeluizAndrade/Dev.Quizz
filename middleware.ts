import { NextResponse } from "next/server";
import { withAuth } from 'next-auth/middleware'
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./src/routes";

const allowedOrigins = [`${process.env.API_URL}`]

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const publicRoutes = ['/']
const protectedRoutes = ["/quiz", "play"]


export default withAuth(
    function middleware(req) {
        const { nextUrl } = req;
        const isLoggedIn = !!req.nextauth.token;
        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.some(route => nextUrl.pathname === route || nextUrl.pathname.startsWith('/education'));
        const isAuthRoute = authRoutes.includes(nextUrl.pathname);
        const isProtectedRoute = protectedRoutes.some((route, id) =>
            nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/${id}`)
        );

        const res = NextResponse.next();

        if (isAuthRoute) {
            if (isLoggedIn) {
                return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
            }
            return res;
        }

        if (isProtectedRoute) {
            if (!isLoggedIn) {
                return Response.redirect(new URL('/', req.url));
            }
        }

        if (!isLoggedIn && !isPublicRoute) {
            return Response.redirect(new URL('/', req.url));
        }


        res.headers.append('Access-Control-Allow-Credentials', "true")
        res.headers.append('Access-Control-Allow-Origin', `${process.env.API_URL as string}`) // replace this your actual origin
        res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
        res.headers.append(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )


        return res;
    },
    {
        callbacks: {
            async authorized({ req, token }) {
                return !!token;
            },
        },
    }
)

export const config = {
    matcher: ["/dashboard", "/quiz", "/play:slug", "/api/questions", "/api/game"]
}
