import { FastifyReply, FastifyRequest } from "fastify";
import { CreateJabatanStrukturalSchema } from "./jabatan-struktural.schema";
import JabatanStrukturalService from "./jabatan-struktural.service";
import { errorFilter } from "../../middlewares/error-handling";

export async function createJabatanStrukturalHandler(
    request: FastifyRequest<{
        Body: CreateJabatanStrukturalSchema;
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body;
        const file = request.body.file;
        const jabatanStruktural = await JabatanStrukturalService.createJabatanStruktural(data, file);

        reply.send({
            data: jabatanStruktural,
            message: "Jabatan Struktural created successfully",
            code: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getAllJabatanStrukturalByUserIdHandler(
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const jabatanStrukturalList = await JabatanStrukturalService.getAllJabatanStrukturalByUserId(userId);

        reply.send({
            data: jabatanStrukturalList,
            message: "Jabatan Struktural list retrieved successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getJabatanStrukturalByIdHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const jabatanStruktural = await JabatanStrukturalService.getJabatanStrukturalById(id);

        reply.send({
            data: jabatanStruktural,
            message: "Jabatan Struktural retrieved successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function updateJabatanStrukturalHandler(
    request: FastifyRequest<{
        Params: { id: string };
        Body: CreateJabatanStrukturalSchema;
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const data = request.body;
        const file = request.body.file;
        const jabatanStruktural = await JabatanStrukturalService.updateJabatanStruktural(id, data, file);

        reply.send({
            data: jabatanStruktural,
            message: "Jabatan Struktural updated successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function deleteJabatanStrukturalHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const result = await JabatanStrukturalService.deleteJabatanStruktural(id);

        reply.send({
            data: result,
            message: "Jabatan Struktural deleted successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}