import { FastifyReply, FastifyRequest } from "fastify";
import { JabatanFungsionalSchema } from "./jabatan-fungsional.schema";
import { MultipartFile } from "@fastify/multipart";
import JabatanFungsionalService from "./jabatan-fungsional.service";
import { errorFilter } from "../../middlewares/error-handling";
import { createReadStream } from "fs";

export async function createJabatanFungsionalHandler(
    request: FastifyRequest<{
        Body: JabatanFungsionalSchema;
        File: MultipartFile;
        Params: {
            userId: string;
        };
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body;
        const file = request.body.fileSK;

        const jabatanFungsional = await JabatanFungsionalService.createJabatanFungsional(request.params.userId, data, file);

        reply.status(201).send({
            data: jabatanFungsional,
            message: "Jabatan Fungsional created successfully",
            status: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function streamDokumenHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const { filePath, document } = await JabatanFungsionalService.streamDokumenSK(id);
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

export async function getAllJabatanFungsionalHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const jabatanFungsional = await JabatanFungsionalService.getAllJabatanFungsional();
        reply.status(200).send({
            data: jabatanFungsional,
            message: "Jabatan Fungsional retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getJabatanFungsionalByIdHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const jabatanFungsional = await JabatanFungsionalService.getJabatanFungsionalById(request.params.id);
        reply.status(200).send({
            data: jabatanFungsional,
            message: "Jabatan Fungsional retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getJabatanFungsionalByUserIdHandler(
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const jabatanFungsional = await JabatanFungsionalService.getJabatanFungsionalByUserId(request.params.userId);
        reply.status(200).send({
            data: jabatanFungsional,
            message: "Jabatan Fungsional retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function updateJabatanFungsionalHandler(
    request: FastifyRequest<{
        Body: JabatanFungsionalSchema;
        File: MultipartFile;
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const data = request.body;
        const file = request.body.fileSK;

        const updatedJabatanFungsional = await JabatanFungsionalService.updateJabatanFungsional(id, data, file);

        reply.status(200).send({
            data: updatedJabatanFungsional,
            message: "Jabatan Fungsional updated successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function deleteJabatanFungsionalHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const deletedJabatanFungsional = await JabatanFungsionalService.deleteJabatanFungsional(id);

        reply.status(200).send({
            data: deletedJabatanFungsional,
            message: "Jabatan Fungsional deleted successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}