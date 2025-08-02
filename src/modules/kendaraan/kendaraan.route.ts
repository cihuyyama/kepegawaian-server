import { FastifyInstance } from "fastify";
import { createKendaraanHandler, deleteKendaraanHandler, getAllKendaraanByUserIdHandler, getKendaraanByIdHandler, updateKendaraanHandler } from "./kendaraan.controller";
import { $ref } from "./kendaraan.schema";

async function kendaraanRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Kendaraan"],
                body: $ref("createKendaraanSchema"),
            },
        },
        createKendaraanHandler
    )

    app.get(
        "/user/:userId",
        {
            schema: {
                tags: ["Kendaraan"],
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        getAllKendaraanByUserIdHandler
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["Kendaraan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getKendaraanByIdHandler
    );

    app.put(
        "/:id",
        {
            schema: {
                tags: ["Kendaraan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: $ref("createKendaraanSchema"),
            }
        },
        updateKendaraanHandler
    );

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Kendaraan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteKendaraanHandler
    );
}

export default kendaraanRoutes;