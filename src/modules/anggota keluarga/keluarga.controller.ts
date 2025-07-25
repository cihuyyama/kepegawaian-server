import { FastifyReply, FastifyRequest } from "fastify";
import { CreateKeluargaSchema } from "./keluarga.schema";
import { errorFilter } from "../../middlewares/error-handling";
import KeluargaService from "./keluarga.service";

export async function createKeluargaHandler(
    request: FastifyRequest<{
        Params: {
            userId: string
        },
        Body: CreateKeluargaSchema
    }>,
    reply: FastifyReply
) {
    try {
        const {userId } = request.params
        const data = request.body
        const keluarga = await KeluargaService.createKeluarga(userId, data)

        reply.send({
            data: keluarga,
            message: "data keluarga telah di simpan",
            code: 201,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}