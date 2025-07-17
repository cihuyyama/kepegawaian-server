import { FastifyReply, FastifyRequest } from "fastify";
import { CreateDokumenInput, CreateUserInfoInput } from "./userinfo.schema";
import { errorFilter } from "../../middlewares/error-handling";
import UserInfoService from "./userinfo.service";
import { UserDocuments } from "../../utils/types";

export async function upsertUserInfoHandler(
    request: FastifyRequest<{
        Body: CreateUserInfoInput;
    }>,
    reply: FastifyReply
) {
    try {
        const data = request.body;
        const userInfo = await UserInfoService.upsertUserInfo(data);

        reply.status(201).send({
            data: userInfo,
            message: "User Info created successfully",
            status: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function upsertDocumentsHandler(
    request: FastifyRequest<{
        Params: {
            userId: string;
        },
        Body: CreateDokumenInput
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const { documentsType: documents } = request.body;
        const file = request.body.file;

        const documentTypes = UserDocuments[documents];

        const newFile = await UserInfoService.upsertDocuments(userId, documentTypes, file);

        reply.status(201).send({
            data: newFile,
            message: "Document uploaded successfully",
            status: 201,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getUserInfoByUserIdHandler(
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const userInfo = await UserInfoService.getUserInfoByUserId(userId);

        reply.status(200).send({
            data: userInfo,
            message: "User Info retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getUserInfoByIdHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const userInfo = await UserInfoService.getUserInfoById(id);

        reply.status(200).send({
            data: userInfo,
            message: "User Info retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function getAllUserInfosHandler(
    request: FastifyRequest<{
        Querystring: { search?: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { search } = request.query;
        const userInfos = await UserInfoService.getAllUserInfos(search);

        reply.status(200).send({
            data: userInfos,
            message: "User Infos retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}

export async function deleteUserInfoByUserIdHandler(
    request: FastifyRequest<{
        Params: { userId: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const userInfo = await UserInfoService.deleteUserInfoByUserId(userId);

        reply.status(200).send({
            data: userInfo,
            message: "User Info deleted successfully",
            status: 200,
        });
    } catch (error) {
        errorFilter(error, reply);
    }
}