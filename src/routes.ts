import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function serverRoutes(app: FastifyInstance) {
    for (const schema of [
    ]) {
        app.addSchema(schema)
    }

    app.get('/', async () => {
        return { health: 'Ok' }
    })

}