import { FastifyInstance } from "fastify";
import { $ref } from "./jabatan-fungsional.schema";
import { createJabatanFungsionalHandler, deleteJabatanFungsionalHandler, getAllJabatanFungsionalHandler, getJabatanFungsionalByIdHandler, getJabatanFungsionalByUserIdHandler, streamDokumenHandler, updateJabatanFungsionalHandler } from "./jabatan-fungsional.controller";

async function jabatanFungsionalRoutes(app: FastifyInstance) {
    app.post(
        "/:userId",
        {
            schema: {
                tags: ["Jabatan Fungsional"],
                body: $ref("createJabatanFungsionalSchema"),
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        createJabatanFungsionalHandler
    );

    app.get(
        "/",
        {
            schema: {
                tags: ["Jabatan Fungsional"],
            }
        },
        getAllJabatanFungsionalHandler
    );

    app.get(
        "/documents/:id",
        {
            schema: {
                tags: ["Jabatan Fungsional"],
                summary: "Get Jabatan Fungsional Document by ID",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        streamDokumenHandler
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["Jabatan Fungsional"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getJabatanFungsionalByIdHandler
    );

    app.get(
        "/user/:userId",
        {
            schema: {
                tags: ["Jabatan Fungsional"],
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        getJabatanFungsionalByUserIdHandler
    )

    app.put(
        "/:id",
        {
            schema: {
                tags: ["Jabatan Fungsional"],
                body: $ref("createJabatanFungsionalSchema"),
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        updateJabatanFungsionalHandler
    );

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Jabatan Fungsional"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteJabatanFungsionalHandler
    );
}

export default jabatanFungsionalRoutes;