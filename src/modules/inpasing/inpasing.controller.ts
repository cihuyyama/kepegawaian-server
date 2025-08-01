import { FastifyReply, FastifyRequest } from "fastify";
import { CreateInpasingSchema } from "./inpasing.schema";
import InpasingService from "./inpasing.service";
import { errorFilter } from "../../middlewares/error-handling";
import { MultipartFile } from "@fastify/multipart";

export async function createInpasingHandler(
    request: FastifyRequest<{
        Body: CreateInpasingSchema
        File: MultipartFile;
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body;
        const file = request.body.file;
        const inpasing = await InpasingService.createInpasing(data, file);

        reply.send({
            data: inpasing,
            message: "Inpasing created successfully",
            code: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getAllInpasingByUserIdHandler(
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const inpasingList = await InpasingService.getAllInpasingByUserId(userId);

        reply.send({
            data: inpasingList,
            message: "Inpasing list retrieved successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getInpasingByIdHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const inpasing = await InpasingService.getInpasingById(id);

        reply.send({
            data: inpasing,
            message: "Inpasing retrieved successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function updateInpasingHandler(
    request: FastifyRequest<{
        Body: CreateInpasingSchema;
        File: MultipartFile;
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const data = request.body;
        const file = request.body.file;
        const updatedInpasing = await InpasingService.updateInpasing(id, data, file);

        reply.send({
            data: updatedInpasing,
            message: "Inpasing updated successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function deleteInpasingHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        await InpasingService.deleteInpasing(id);

        reply.send({
            message: "Inpasing deleted successfully",
            code: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}