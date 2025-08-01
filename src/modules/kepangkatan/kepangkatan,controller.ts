import { FastifyReply, FastifyRequest } from "fastify";
import { KepangkatanSchema } from "./kepangkatan.schema";
import { MultipartFile } from "@fastify/multipart";
import KepangkatanService from "./kepangkatan.service";
import { errorFilter } from "../../middlewares/error-handling";
import { createReadStream } from "fs";

export async function createKepangkatanHandler(
    request: FastifyRequest<{
        Body: KepangkatanSchema;
        Params: {
            userId: string;
        },
        File: MultipartFile;
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body;
        const file = request.body.fileSK;
        const { userId } = request.params;

        const kepangkatan = await KepangkatanService.createKepangkatan(userId, data, file);

        reply.status(201).send({
            data: kepangkatan,
            message: "Kepangkatan created successfully",
            status: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function streamDokumenHandler(
    request: FastifyRequest<{
        Params: { 
            id: string;
         };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const { filePath, document } = await KepangkatanService.streamDokumenSK(id);
        if (!filePath || !document) {
            return reply.status(404).send({
                message: "Document not found",
                status: 404,
            });
        }

        reply
            .header("Content-Type", document.mimetype)
            .header("Content-Disposition", `inline; filename="${document.originalName}"`)

        return reply.send(createReadStream(filePath));
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getAllKepangkatanHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const kepangkatanList = await KepangkatanService.getAllKepangkatan();
        reply.status(200).send({
            data: kepangkatanList,
            message: "Kepangkatan retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getKepangkatanByIdHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const kepangkatan = await KepangkatanService.getKepangkatanById(id);
        reply.status(200).send({
            data: kepangkatan,
            message: "Kepangkatan retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getKepangkatanByUserIdHandler(
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const kepangkatan = await KepangkatanService.getKepangkatanByUserId(userId);
        reply.status(200).send({
            data: kepangkatan,
            message: "Kepangkatan retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function updateKepangkatanHandler(
    request: FastifyRequest<{
        Body: KepangkatanSchema;
        Params: { id: string };
        File: MultipartFile;
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params; 
        const data = request.body;
        const file = request.body.fileSK;

        const updatedKepangkatan = await KepangkatanService.updateKepangkatan(id, data, file);

        reply.status(200).send({
            data: updatedKepangkatan,
            message: "Kepangkatan updated successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function deleteKepangkatanHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        await KepangkatanService.deleteKepangkatan(id);
        reply.status(200).send({
            message: "Kepangkatan deleted successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}