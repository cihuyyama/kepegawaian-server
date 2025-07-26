import { FastifyReply, FastifyRequest } from "fastify"
import { CreateRiwayatPendidikanSchema } from "./pendidikan.schema"
import RiwayatPendidikanService from "./pendidikan.service"
import { errorFilter } from "../../middlewares/error-handling"

export async function createRiwayatPendidikanHandler(
    request: FastifyRequest<{
        Body: CreateRiwayatPendidikanSchema
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body
        const pendidikan = await RiwayatPendidikanService.createRiwayatPendidikan(data)

        reply.send({
            data: pendidikan,
            message: "Riwayat pendidikan berhasil dibuat",
            code: 201,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function getAllRiwayatPendidikanByUserIdHandler(
    request: FastifyRequest<{
        Params: {
            userId: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params
        const pendidikanList = await RiwayatPendidikanService.getAllRiwayatPendidikanByUserId(userId)

        reply.send({
            data: pendidikanList,
            message: "Riwayat pendidikan berhasil diambil",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function getRiwayatPendidikanByIdHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params
        const pendidikan = await RiwayatPendidikanService.getRiwayatPendidikanById(id)

        reply.send({
            data: pendidikan,
            message: "Riwayat pendidikan berhasil diambil",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function updateRiwayatPendidikanHandler(
    request: FastifyRequest<{
        Body: CreateRiwayatPendidikanSchema
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params
        const data = request.body
        const pendidikan = await RiwayatPendidikanService.updateRiwayatPendidikan(id, data)

        reply.send({
            data: pendidikan,
            message: "Riwayat pendidikan berhasil diperbarui",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function deleteRiwayatPendidikanHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params
        const pendidikan = await RiwayatPendidikanService.deleteRiwayatPendidikan(id)

        reply.send({
            data: pendidikan,
            message: "Riwayat pendidikan berhasil dihapus",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}