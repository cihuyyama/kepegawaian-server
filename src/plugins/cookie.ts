import { FastifyInstance } from "fastify";
import fCookie from "@fastify/cookie"

const cookieOptions = {
        secret: process.env.COOKIE_SECRET || 'supersecret',
        hook: 'preHandler' as any,
    }

export function registerCookiePlugin (app: FastifyInstance) {
    app.register(fCookie, cookieOptions)
}