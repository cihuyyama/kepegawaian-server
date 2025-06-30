import { FastifyInstance } from "fastify"
import cors from '@fastify/cors'

const corsOption = {
    origin: `${process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:3000'}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}


export function registerCorsPlugin(app: FastifyInstance) {
    app.register(cors, corsOption)
}