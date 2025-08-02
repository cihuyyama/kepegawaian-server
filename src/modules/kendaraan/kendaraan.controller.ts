import { FastifyReply, FastifyRequest } from "fastify";
import { CreateKendaraanSchema } from "./kendaraan.schema";
import KendaraanService from "./kendaraan.service";
import { errorFilter } from "../../middlewares/error-handling";
import { createReadStream } from "fs";

export async function createKendaraanHandler(
    request: FastifyRequest<{
        Body: CreateKendaraanSchema;
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body;
        const file = request.body.file;
        const kendaraan = await KendaraanService.createKendaraan(data, file);

        reply.send({
            data: kendaraan,
            message: "Kendaraan created successfully",
            code: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function streamKendaraanDocumentHandler(
    request: FastifyRequest<{
        Params: { dokumenId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { dokumenId } = request.params;
        const { filePath, document } = await KendaraanService.streamDokumenKendaraan(dokumenId);

        if (!filePath || !document) {
            return reply.status(404).send({
                message: "Document not found",
                status: 404,
            });
        }

        reply
            .header("Content-Type", document.mimetype)
            .header("Content-Disposition", `inline; filename="${document.originalName}"`);

        return reply.send(createReadStream(filePath));
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getAllKendaraanByUserIdHandler(
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const kendaraanList = await KendaraanService.getAllKendaraanByUserId(userId);

        reply.send({
            data: kendaraanList,
            message: "Kendaraan list retrieved successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getKendaraanByIdHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const kendaraan = await KendaraanService.getKendaraanById(id);

        reply.send({
            data: kendaraan,
            message: "Kendaraan retrieved successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function updateKendaraanHandler(
    request: FastifyRequest<{
        Body: CreateKendaraanSchema;
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const data = request.body;
        const file = request.body.file;
        const kendaraan = await KendaraanService.updateKendaraan(id, data, file);

        reply.send({
            data: kendaraan,
            message: "Kendaraan updated successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function deleteKendaraanHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        await KendaraanService.deleteKendaraan(id);

        reply.send({
            message: "Kendaraan deleted successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}