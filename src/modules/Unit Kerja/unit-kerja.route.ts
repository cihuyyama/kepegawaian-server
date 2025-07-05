import { FastifyInstance } from "fastify";
import { $ref } from "./unit-kerja.schema";
import { connectAnggotaHandler, connectKepalaUnitKerjaHandler, createUnitKerjaHandler, deleteUnitKerjaHandler, disconnectAnggotaHandler, disconnectKepalaUnitKerjaHandler, getAllUnitKerjaHandler, getUnitKerjaByIdHandler, updateUnitKerjaHandler } from "./unit-kerja.controller";

async function unitKerjaRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            schema: {
                tags: ["Unit Kerja"],
                body: $ref("createUnitKerjaSchema"),
            }
        },
        createUnitKerjaHandler
    )

    server.get(
        "/:id",
        {
            schema: {
                tags: ["Unit Kerja"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        getUnitKerjaByIdHandler
    )

    server.get(
        "/",
        {
            schema: {
                tags: ["Unit Kerja"],
                querystring: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                    },
                },
            }
        },
        getAllUnitKerjaHandler
    )

    server.post(
        "/anggota/:id",
        {
            schema: {
                tags: ["Unit Kerja"],
                summary: "Connect Anggota to Unit Kerja",
                description: "string of anggota IDs to connect to the unit kerja",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: {
                    type: "array",
                    items: { type: "string" },
                },
            }
        },
        connectAnggotaHandler
    )

    server.delete(
        "/anggota/:id",
        {
            schema: {
                tags: ["Unit Kerja"],
                summary: "Disconnect Anggota from Unit Kerja",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: {
                    type: "array",
                    items: { type: "string" },
                },
            }
        },
        disconnectAnggotaHandler
    )

    server.post(
        "kepala/:id",
        {
            schema: {
                tags: ["Unit Kerja"],
                summary: "Set Kepala Unit Kerja",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: {
                    type: "object",
                    properties: {
                        kepalaUnitKerjaId: { type: "string" },
                    },
                    required: ["kepalaUnitKerjaId"],
                },
            }
        },
        connectKepalaUnitKerjaHandler
    )

    server.delete(
        "/kepala/:id",
        {
            schema: {
                tags: ["Unit Kerja"],
                summary: "Disconnect Kepala Unit Kerja",
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        disconnectKepalaUnitKerjaHandler
    )

    server.put(
        "/:id",
        {
            schema: {
                tags: ["Unit Kerja"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
                body: $ref("createUnitKerjaSchema"),
            }
        },
        updateUnitKerjaHandler
    )

    server.delete(
        "/:id",
        {
            schema: {
                tags: ["Unit Kerja"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            }
        },
        deleteUnitKerjaHandler
    )
} 

export default unitKerjaRoutes