import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userSchemas } from "./modules/user/user.schema";
import { authRoutes, userRoutes } from "./modules/user/user.route";
import { unitKerjaSchemas } from "./modules/Unit Kerja/unit-kerja.schema";
import unitKerjaRoutes from "./modules/Unit Kerja/unit-kerja.route";
import { userInfoSchemas } from "./modules/userinfo/userinfo.schema";
import userInfoRoutes from "./modules/userinfo/userinfo.route";

export async function serverRoutes(app: FastifyInstance) {
    for (const schema of [
        ...userSchemas,
        ...unitKerjaSchemas,
        ...userInfoSchemas,
    ]) {
        app.addSchema(schema)
    }

    app.get('/', async () => {
        return { health: 'Ok' }
    })

    app.register(authRoutes, { prefix: '/api/v1/auth' })
    app.register(userRoutes, { prefix: '/api/v1/users' })
    app.register(unitKerjaRoutes, { prefix: '/api/v1/unit-kerja' })
    app.register(userInfoRoutes, { prefix: '/api/v1/userinfo' })
}