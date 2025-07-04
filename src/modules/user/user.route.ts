import { FastifyInstance } from "fastify";
import { $ref } from "./user.schema";
import { deleteUserHandler, getAllUsersHandler, getUserByIdHandler, getUserByTokenHandler, loginUserHandler, logoutUserHandler, registerUserHandler, updateUserHandler } from "./user.controller";

async function authRoutes(server: FastifyInstance) {
    server.post(
        "/register",
        {
            schema: {
                tags: ["Auth"],
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