import { FastifyInstance } from "fastify";
import { $ref } from "./keluarga.schema";
import { createKeluargaHandler, deleteKeluargaHandler, getAllKeluargaByUserIdHandler, getKeluargaByIdHandler, updateKeluargaHandler } from "./keluarga.controller";

async function keluargaRoutes(app: FastifyInstance) {
    app.post(
        "/:userId",
        {
            schema: {
                tags: ["Keluarga"],
                body: $ref("createkeluargaSchema"),
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        createKeluargaHandler
    );

    app.get(
        "user/:userId",
        {
            schema: {
                tags: ["Keluarga"],
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        getAllKeluargaByUserIdHandler
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["Keluarga"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getKeluargaByIdHandler
    );

    app.put(
        "/:id",
        {
            schema: {
                tags: ["Keluarga"],
                body: $ref("createkeluargaSchema"),
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        updateKeluargaHandler
    );

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Keluarga"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteKeluargaHandler
    );
}

export default keluargaRoutes;