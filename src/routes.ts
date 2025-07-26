import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userSchemas } from "./modules/user/user.schema";
import { authRoutes, userRoutes } from "./modules/user/user.route";
import { unitKerjaSchemas } from "./modules/Unit Kerja/unit-kerja.schema";
import unitKerjaRoutes from "./modules/Unit Kerja/unit-kerja.route";
import { userInfoSchemas } from "./modules/userinfo/userinfo.schema";
import userInfoRoutes from "./modules/userinfo/userinfo.route";
import { kepangkatanSchemas } from "./modules/kepangkatan/kepangkatan.schema";
import kepangkatanRoutes from "./modules/kepangkatan/kepangkatan.route";
import { keluargaSchemas } from "./modules/anggota keluarga/keluarga.schema";
import keluargaRoutes from "./modules/anggota keluarga/keluarga.route";
import { riwayatPendidikanSchemas } from "./modules/riwayat pendidikan/pendidikan.schema";
import riwayatPendidikanRoutes from "./modules/riwayat pendidikan/pendidikan.route";

export async function serverRoutes(app: FastifyInstance) {
    for (const schema of [
        ...userSchemas,
        ...unitKerjaSchemas,
        ...userInfoSchemas,
        ...kepangkatanSchemas,
        ...keluargaSchemas,
        ...riwayatPendidikanSchemas,
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
    app.register(kepangkatanRoutes, { prefix: '/api/v1/kepangkatan' })
    app.register(keluargaRoutes, { prefix: '/api/v1/keluarga' })
    app.register(riwayatPendidikanRoutes, { prefix: '/api/v1/pendidikan' })
}