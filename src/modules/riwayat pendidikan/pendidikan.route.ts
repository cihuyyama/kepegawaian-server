import { FastifyInstance } from "fastify";
import { $ref } from "./pendidikan.schema";
import { createDokumenRiwayatPendidikanHandler, createRiwayatPendidikanHandler, deleteDokumenRiwayatPendidikanHandler, deleteRiwayatPendidikanHandler, getAllRiwayatPendidikanByUserIdHandler, getRiwayatPendidikanByIdHandler, updateRiwayatPendidikanHandler } from "./pendidikan.controller";

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

    app.post(
        "/dokumen/:pendidikanId",
        {
            schema: {
                tags: ["Riwayat Pendidikan"],
                body: $ref("createDokumenRiwayatPendidikanSchema"),
                params: {
                    type: "object",
                    properties: {
                        pendidikanId: { type: "string" },
                    },
                },
            }
        },
        createDokumenRiwayatPendidikanHandler
    )

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

    app.delete(
        "/dokumen/:documentId",
        {
            schema: {
                tags: ["Riwayat Pendidikan"],
                params: {
                    type: "object",
                    properties: {
                        documentId: { type: "string" },
                    },
                },
            }
        },
        deleteDokumenRiwayatPendidikanHandler
    );
}

export default riwayatPendidikanRoutes;