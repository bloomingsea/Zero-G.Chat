import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const publicPaths = ["/", "/login", "/register"]
            const isPublicPath = publicPaths.includes(nextUrl.pathname)

            if (isPublicPath) {
                if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
                    return Response.redirect(new URL("/chat", nextUrl))
                }
                return true
            }

            return isLoggedIn
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig
