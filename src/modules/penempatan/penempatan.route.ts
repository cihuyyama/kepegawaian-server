import { FastifyInstance } from "fastify";
import { createPenempatanHandler, deletePenempatanHandler, getAllPenempatanByUserIdHandler, getPenempatanByIdHandler, updatePenempatanHandler } from "./penempatan.controller";
import { $ref } from "./penempatan.schema";

async function penempatanRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Penempatan"],
                body: $ref("createPenempatanSchema"),
            }
        },
        createPenempatanHandler
    );

    app.get(
        "/user/:userId",
        {
            schema: {
                tags: ["Penempatan"],
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        getAllPenempatanByUserIdHandler
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["Penempatan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getPenempatanByIdHandler
    );

    app.put(
        "/:id",
        {
            schema: {
                tags: ["Penempatan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: $ref("createPenempatanSchema"),
            }
        },
        updatePenempatanHandler
    );

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Penempatan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deletePenempatanHandler
    );  
}

export default penempatanRoutes;