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

export async function getAllKeluargaByUserIdHandler(
    request: FastifyRequest<{
        Params: {
            userId: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params
        const keluarga = await KeluargaService.getAllKeluargaByUserId(userId)

        reply.send({
            data: keluarga,
            message: "data keluarga berhasil diambil",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function getKeluargaByIdHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params
        const keluarga = await KeluargaService.getKeluargaById(id)

        reply.send({
            data: keluarga,
            message: "data keluarga berhasil diambil",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function updateKeluargaHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        },
        Body: CreateKeluargaSchema
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params
        const data = request.body
        const keluarga = await KeluargaService.updateKeluarga(id, data)

        reply.send({
            data: keluarga,
            message: "data keluarga berhasil diupdate",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function deleteKeluargaHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params
        const keluarga = await KeluargaService.deleteKeluarga(id)

        reply.send({
            data: keluarga,
            message: "data keluarga berhasil dihapus",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}