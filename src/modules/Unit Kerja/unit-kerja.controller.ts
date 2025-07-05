import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUnitKerjaInput } from "./unit-kerja.schema";
import { errorFilter } from "../../middlewares/error-handling";
import UnitKerjaService from "./unit-kerja.service";

export async function createUnitKerjaHandler(
    request: FastifyRequest<{
        Body: CreateUnitKerjaInput;
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body;
        const unitKerja = await UnitKerjaService.createUnitKerja(data);

        reply.status(201).send({
            data: unitKerja,
            message: "Unit Kerja created successfully",
            status: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function connectAnggotaHandler(
    request: FastifyRequest<{
        Params: { unitKerjaId: string };
        Body: { anggotaId: string[] };
    }>,
    reply: FastifyReply
) {
    try {
        const { unitKerjaId } = request.params;
        const { anggotaId } = request.body;
        const unitKerja = await UnitKerjaService.connectAnggota(unitKerjaId, anggotaId);

        reply.status(200).send({
            data: unitKerja,
            message: "Anggota connected successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function disconnectAnggotaHandler(
    request: FastifyRequest<{
        Params: { unitKerjaId: string };
        Body: { anggotaId: string[] };
    }>,
    reply: FastifyReply
) {
    try {
        const { unitKerjaId } = request.params;
        const { anggotaId } = request.body;
        const unitKerja = await UnitKerjaService.disconnectAnggota(unitKerjaId, anggotaId);

        reply.status(200).send({
            data: unitKerja,
            message: "Anggota disconnected successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function connectKepalaUnitKerjaHandler(
    request: FastifyRequest<{
        Params: { unitKerjaId: string };
        Body: { kepalaUnitKerjaId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { unitKerjaId } = request.params;
        const { kepalaUnitKerjaId } = request.body;
        const unitKerja = await UnitKerjaService.connectKepalaUnitKerja(unitKerjaId, kepalaUnitKerjaId);

        reply.status(200).send({
            data: unitKerja,
            message: "Kepala Unit Kerja connected successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function disconnectKepalaUnitKerjaHandler(
    request: FastifyRequest<{
        Params: { unitKerjaId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { unitKerjaId } = request.params;
        const unitKerja = await UnitKerjaService.disconnectKepalaUnitKerja(unitKerjaId);

        reply.status(200).send({
            data: unitKerja,
            message: "Kepala Unit Kerja disconnected successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getAllUnitKerjaHandler(
    request: FastifyRequest<{
        Querystring: { name?: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { name } = request.query;
        const unitKerja = await UnitKerjaService.getAllUnitKerja(name);

        reply.status(200).send({
            data: unitKerja,
            message: "Unit Kerja fetched successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getUnitKerjaByIdHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const unitKerja = await UnitKerjaService.getUnitKerjaById(id);

        reply.status(200).send({
            data: unitKerja,
            message: "Unit Kerja fetched successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function updateUnitKerjaHandler(
    request: FastifyRequest<{
        Params: { id: string };
        Body: CreateUnitKerjaInput;
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const data = request.body;
        const unitKerja = await UnitKerjaService.updateUnitKerja(id, data);

        reply.status(200).send({
            data: unitKerja,
            message: "Unit Kerja updated successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function deleteUnitKerjaHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const unitKerja = await UnitKerjaService.deleteUnitKerja(id);

        reply.status(200).send({
            data: unitKerja,
            message: "Unit Kerja deleted successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}