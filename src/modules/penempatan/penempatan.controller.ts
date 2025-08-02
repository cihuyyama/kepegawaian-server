import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePenempatanSchema } from "./penempatan.schema";
import PenempatanService from "./penempatan.service";
import { errorFilter } from "../../middlewares/error-handling";
import { createReadStream } from "fs";

export async function createPenempatanHandler(
    request: FastifyRequest<{
        Body: CreatePenempatanSchema;
    }>,
    reply: FastifyReply
) {
    try {
        const { body } = request;
        const file = request.body.file;
        const penempatan = await PenempatanService.createPenempatan(body, file);

        reply.send({
            data: penempatan,
            message: "Penempatan created successfully",
            code: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function streamPenempatanDocumentHandler(
    request: FastifyRequest<{
        Params: { dokumenId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { dokumenId } = request.params;
        const { filePath, document } = await PenempatanService.streamDokumenSK(dokumenId);

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

export async function getAllPenempatanByUserIdHandler(
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const penempatanList = await PenempatanService.getAllPenempatanByUserId(userId);

        reply.send({
            data: penempatanList,
            message: "Penempatan list retrieved successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getPenempatanByIdHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const penempatan = await PenempatanService.getPenempatanById(id);

        reply.send({
            data: penempatan,
            message: "Penempatan retrieved successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function updatePenempatanHandler(
    request: FastifyRequest<{
        Params: { id: string };
        Body: CreatePenempatanSchema;
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const data = request.body;
        const file = request.body.file;
        const updatedPenempatan = await PenempatanService.updatePenempatan(id, data, file);

        reply.send({
            data: updatedPenempatan,
            message: "Penempatan updated successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function deletePenempatanHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const deletedPenempatan = await PenempatanService.deletePenempatan(id);

        reply.send({
            data: deletedPenempatan,
            message: "Penempatan deleted successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}