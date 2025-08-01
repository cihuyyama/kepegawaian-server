import { FastifyInstance } from "fastify";
import { $ref } from "./inpasing.schema";
import { createInpasingHandler, deleteInpasingHandler, getAllInpasingByUserIdHandler, getInpasingByIdHandler, updateInpasingHandler } from "./inpasing.controller";

async function inpasingRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Inpasing"],
                body: $ref("createInpasingSchema"),
            },
        },
        createInpasingHandler
    )

    app.get(
        "/user/:userId",
        {
            schema: {
                tags: ["Inpasing"],
                params: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                    },
                },
            },
        },
        getAllInpasingByUserIdHandler
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["Inpasing"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            },
        },
        getInpasingByIdHandler
    );

    app.put(
        "/:id",
        {
            schema: {
                tags: ["Inpasing"],
                body: $ref("createInpasingSchema"),
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            },
        },
        updateInpasingHandler
    )

    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Inpasing"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                },
            },
        },
        deleteInpasingHandler
    )
}

export default inpasingRoutes;