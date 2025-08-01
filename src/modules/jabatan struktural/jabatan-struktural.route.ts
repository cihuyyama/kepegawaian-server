import { FastifyInstance } from "fastify";
import { $ref } from "./jabatan-struktural.schema";
import { createJabatanStrukturalHandler, deleteJabatanStrukturalHandler, getAllJabatanStrukturalByUserIdHandler, getJabatanStrukturalByIdHandler, updateJabatanStrukturalHandler } from "./jabatan-struktural.controller";

async function jabatanStrukturalRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Jabatan Struktural"],
                body: $ref("createJabatanStrukturalSchema"),
            }
        },
        createJabatanStrukturalHandler
    );

    app.get(
        "/user/:userId",
        {
            schema: {
                tags: ["Jabatan Struktural"],
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        getAllJabatanStrukturalByUserIdHandler
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["Jabatan Struktural"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getJabatanStrukturalByIdHandler
    )

    app.put(
        "/:id",
        {
            schema: {
                tags: ["Jabatan Struktural"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: $ref("createJabatanStrukturalSchema"),
            }
        },
        updateJabatanStrukturalHandler
    );

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Jabatan Struktural"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteJabatanStrukturalHandler
    );

}

export default jabatanStrukturalRoutes;