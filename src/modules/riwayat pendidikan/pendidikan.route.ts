import { FastifyInstance } from "fastify";
import { $ref } from "./pendidikan.schema";
import { createRiwayatPendidikanHandler, deleteRiwayatPendidikanHandler, getAllRiwayatPendidikanByUserIdHandler, getRiwayatPendidikanByIdHandler, updateRiwayatPendidikanHandler } from "./pendidikan.controller";

async function riwayatPendidikanRoutes(app: FastifyInstance) {
    app.post(
        "/:userId",
        {
            schema: {
                tags: ["Riwayat Pendidikan"],
                body: $ref("createRiwayatPendidikanSchema"),
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        createRiwayatPendidikanHandler
    );

    app.get(
        "/user/:userId",
        {
            schema: {
                tags: ["Riwayat Pendidikan"],
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            }
        },
        getAllRiwayatPendidikanByUserIdHandler
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["Riwayat Pendidikan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getRiwayatPendidikanByIdHandler
    );

    app.put(
        "/:id",
        {
            schema: {
                tags: ["Riwayat Pendidikan"],
                body: $ref("createRiwayatPendidikanSchema"),
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        updateRiwayatPendidikanHandler
    );

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Riwayat Pendidikan"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteRiwayatPendidikanHandler
    );
}

export default riwayatPendidikanRoutes;