import { FastifyInstance } from "fastify";
import { $ref } from "./user.schema";
import { deleteUserHandler, getAllUsersHandler, getUserByIdHandler, getUserByTokenHandler, loginUserHandler, logoutUserHandler, registerUserHandler, streamPhotoHandler, updateUserHandler, updateUserPhotoHandler } from "./user.controller";

async function authRoutes(server: FastifyInstance) {
    server.post(
        "/register",
        {
            schema: {
                tags: ["Auth"],
                summary: "*Userinfo / Unit Kerja / Role(admin by default) => Optional*",
                body: $ref("createUserSchema"),
            }
        },
        registerUserHandler
    )

    server.post(
        "/login",
        {
            schema: {
                tags: ["Auth"],
                body: $ref("loginUserSchema"),
            }
        },
        loginUserHandler
    )

    server.post(
        "/logout",
        {
            schema: {
                tags: ["Auth"],
            },
            preHandler: [server.authenticate]
        },
        logoutUserHandler
    )
}

async function userRoutes(server: FastifyInstance) {
    server.get(
        "/",
        {
            schema: {
                tags: ["User"],
                querystring: {
                    type: "object",
                    properties: {
                        username: { type: "string" },
                    },
                },
            }
        },
        getAllUsersHandler
    )

    server.get(
        "/:id",
        {
            schema: {
                tags: ["User"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getUserByIdHandler
    )

    server.get(
        "/access-token",
        {
            schema: {
                tags: ["User"],
            },
            preHandler: [server.authenticate]
        },
        getUserByTokenHandler
    )

    server.put(
        "/:id",
        {
            schema: {
                tags: ["User"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: $ref("createUserSchema"),
            }
        },
        updateUserHandler
    )

    server.put(
        "/:id/photo",
        {
            schema: {
                tags: ["User"],
                summary: "Update User Photo",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: $ref("updateUserPhotoSchema"),
            },
        },
        updateUserPhotoHandler
    )

    server.get(
        "/:id/photo",
        {
            schema: {
                tags: ["User"],
                summary: "Get User Photo",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        streamPhotoHandler
    )

    server.delete(
        "/:id",
        {
            schema: {
                tags: ["User"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteUserHandler
    )
}

export {
    authRoutes,
    userRoutes,
};