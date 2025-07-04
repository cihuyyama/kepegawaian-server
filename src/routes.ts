import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userSchemas } from "./modules/user/user.schema";
import { authRoutes, userRoutes } from "./modules/user/user.route";

export async function serverRoutes(app: FastifyInstance) {
    for (const schema of [
        ...userSchemas,
    ]) {
        app.addSchema(schema)
    }

    app.get('/', async () => {
        return { health: 'Ok' }
    })

    app.register(authRoutes, { prefix: '/api/v1/auth' })
    app.register(userRoutes, { prefix: '/api/v1/users' })
}