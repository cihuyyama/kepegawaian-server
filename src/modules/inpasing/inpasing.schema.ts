import { MultipartFile } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createInpasingSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
    }),
    kepangkatan: z.string({
        required_error: "Kepangkatan is required",
    }),
    nomorSK: z.string().optional(),
    tanggalSK: z.string().optional(),
    tmt: z.string().optional(),
    file: z.custom<MultipartFile>()
})

export type CreateInpasingSchema = z.infer<typeof createInpasingSchema>;

export const { schemas: inpasingSchemas, $ref } = buildJsonSchemas(
    {
        createInpasingSchema,
    },
    {
        $id: "InpasingSchema",
    }
);