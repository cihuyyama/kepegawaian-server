import { FastifyInstance } from "fastify";
import { $ref } from "./kepangkatan.schema";
import { createKepangkatanHandler, deleteKepangkatanHandler, getAllKepangkatanHandler, getKepangkatanByIdHandler, getKepangkatanByUserIdHandler, updateKepangkatanHandler } from "./kepangkatan,controller";

async function kepangkatanRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Kepangkatan"],
                body: $ref("kepangkatanSchema"),
            }
        },
        createKepangkatanHandler
    );

    app.get(
        "/",
        {
            schema: {
                tags: ["Kepangkatan"],
            }
        },
        getAllKepangkatanHandler
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["Kepangkatan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getKepangkatanByIdHandler
    );

    app.put(
        "/user/:userId",
        {
            schema: {
                tags: ["Kepangkatan"],
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
                body: $ref("kepangkatanSchema"),
            }
        },
        getKepangkatanByUserIdHandler
    )

    app.put(
        "/:id",
        {
            schema: {
                tags: ["Kepangkatan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: $ref("kepangkatanSchema"),
            }
        },
        updateKepangkatanHandler
    );

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Kepangkatan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteKepangkatanHandler
    );
}

export default kepangkatanRoutes;