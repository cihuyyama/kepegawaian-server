import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createInpasingSchema = z.object({
    userId: z.custom<MultipartValue<string>>(),
    kepangkatan: z.custom<MultipartValue<string>>(),
    nomorSK: z.custom<MultipartValue<string>>().optional(),
    tanggalSK: z.custom<MultipartValue<string>>().optional(),
    tmt: z.custom<MultipartValue<string>>().optional(),
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