import fastifyMultipart from "@fastify/multipart";
import { FastifyInstance } from "fastify";

const multipartOptions = {
    attachFieldsToBody: true,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    }
}

export function registerMultipartPlugin(app: FastifyInstance) {
    app.register(fastifyMultipart, multipartOptions)
}