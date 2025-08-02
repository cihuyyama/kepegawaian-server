import { FastifyReply, FastifyRequest } from "fastify"
import { CreateDokumenRiwayatPendidikanSchema, CreateRiwayatPendidikanSchema } from "./pendidikan.schema"
import RiwayatPendidikanService from "./pendidikan.service"
import { errorFilter } from "../../middlewares/error-handling"
import { MultipartFile } from "@fastify/multipart"
import { createReadStream } from "fs"

export async function createRiwayatPendidikanHandler(
    request: FastifyRequest<{
        Body: CreateRiwayatPendidikanSchema
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body
        const file = request.body.file
        const pendidikan = await RiwayatPendidikanService.createRiwayatPendidikan(data, file)

        reply.send({
            data: pendidikan,
            message: "Riwayat pendidikan berhasil dibuat",
            code: 201,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function createDokumenRiwayatPendidikanHandler(
    request: FastifyRequest<{
        Body: CreateDokumenRiwayatPendidikanSchema
        Params: {
            pendidikanId: string
        }
        File: MultipartFile
    }>,
    reply: FastifyReply
) {
    try {
        const { pendidikanId } = request.params
        const file = request.body.file
        const data = request.body

        const pendidikan = await RiwayatPendidikanService.createDokumenRiwayatPendidikan(file, pendidikanId, data)

        reply.send({
            data: pendidikan,
            message: "Dokumen riwayat pendidikan berhasil dibuat",
            code: 201,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}

export async function streamDokumenRiwayatPendidikanHandler(
    request: FastifyRequest<{
        Params: { documentId: string }
    }>,
    reply: FastifyReply
) {
    try {
        const { documentId } = request.params
        const { filePath, document } = await RiwayatPendidikanService.streamDokumenRiwayatPendidikan(documentId)

        if (!filePath || !document) {
            return reply.status(404).send({
                message: "Document not found",
                status: 404,
            })
        }

        reply
            .header("Content-Type", document.mimetype)
            .header("Content-Disposition", `inline; filename="${document.originalName}"`)

        return reply.send(createReadStream(filePath))
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

export async function deleteDokumenRiwayatPendidikanHandler(
    request: FastifyRequest<{
        Params: {
            documentId: string
        }
    }>,
    reply: FastifyReply
) {
    try {
        const { documentId } = request.params
        const document = await RiwayatPendidikanService.deleteDokumenRiwayatPendidikan(documentId)

        reply.send({
            data: document,
            message: "Dokumen riwayat pendidikan berhasil dihapus",
            code: 200,
        })
    } catch (error) {
        errorFilter(error, reply)
    }
}