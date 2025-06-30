import fastifyJwt from "@fastify/jwt"
import { FastifyInstance } from "fastify"

const jwtOptions = {
    secret: process.env.JWT_SECRET || 'supersecret',
}


export function registerJwtPlugin(app: FastifyInstance) {
    app.register(fastifyJwt, jwtOptions)
} 