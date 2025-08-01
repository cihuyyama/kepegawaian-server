import { ResponseError } from "../errors/response-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FastifyReply } from "fastify";
import { ZodError } from "zod";

export const errorFilter = (e: unknown, res: FastifyReply) => {
  if (e instanceof ResponseError) {
    return res.code(e.statusCode).send({
      errors: e.message,
    });
  } else if (e instanceof ZodError) {
    const errors = [];

    for (let i = 0; i < e.errors.length; i++) {
      errors.push({
        message: e.errors[i].message,
        path: e.errors[i].path,
      });
    }

    return res.code(400).send({
      errors,
    });
  } else if (e instanceof PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return res.code(400).send({
        errors: "data already exists",
      });
    }
    if (e.code === "P2025") {
      return res.code(400).send({
        errors: "Record to delete does not exist.",
        model: e.meta?.modelName,
      });
    }
    return res.code(400).send({
      errors: e.meta?.cause || e.message || "Unkwon Prisma Client Error",
      model: e.meta?.modelName,
      code: e.code,
    })
  } else {
    return res.code(500).send(e);
  }
};