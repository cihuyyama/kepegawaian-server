import { FastifyInstance } from "fastify";

export function registerSwaggerProvider(app: FastifyInstance) {
    app.register(import("@fastify/swagger"), {
        swagger: {
            info: {
                title: "SERTIFIKASI API",
                description: "",
                version: "0.1.0",
            },
            externalDocs: {
                url: "",
                description: "Find more info here",
            },
            host: `${process.env.NODE_ENV === 'production' ? process.env.BACKEND_DOMAIN : 'localhost:5000'}`,
            schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],
            consumes: ["application/json", "multipart/form-data"],
            produces: ["application/json"],
        }
    });

    app.register(import("@fastify/swagger-ui"), {
        routePrefix: "/docs",
        uiConfig: {
            deepLinking: false,
        },
        uiHooks: {
            onRequest: (request, reply, next) => {
                next()
            },
            preHandler: (request, reply, next) => {
                next()
            },
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
    })

    app.ready(err => {
        if (err) throw err
        app.swagger()
    })
}