import { FastifyInstance } from "fastify";
import { deleteUserInfoByUserIdHandler, getAllUserInfosHandler, getUserInfoByIdHandler, upsertDocumentsHandler, upsertUserInfoHandler } from "./userinfo.controller";
import { $ref } from "./userinfo.schema";

async function userInfoRoutes(app: FastifyInstance) {
    app.put(
        "/",
        {
            schema: {
                tags: ["User Info"],
                body: $ref("createUserInfoSchema"),
            }
        },
        upsertUserInfoHandler
    )

    app.put(
        "/documents/:userId",
        {
            schema: {
                tags: ["User Info"],
                body: $ref("createDokumenSchema"),
                summary: 'Upload User Document with document type("KTP" | "DocNBM" | "DocNIDN" | "SertifikasiDosen" | "Passport" | "BPJSKesehatan" | "BPJSKetenagakerjaan")',
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        upsertDocumentsHandler
    )

    app.get(
        "/",
        {
            schema: {
                tags: ["User Info"],
                summary: "Get All User Infos",
                querystring: {
                    type: "object",
                    properties: {
                        search: { type: "string", nullable: true },
                    },
                },
            }
        },
        getAllUserInfosHandler
    )

    app.get(
        "/:id",
        {
            schema: {
                tags: ["User Info"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getUserInfoByIdHandler
    )

    app.get(
        "/user/:userId",
        {
            schema: {
                tags: ["User Info"],
                summary: "Get User Info by User ID",
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        getUserInfoByIdHandler
    )

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["User Info"],
                summary: "Delete User Info by ID",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteUserInfoByUserIdHandler
    )
}

export default userInfoRoutes;