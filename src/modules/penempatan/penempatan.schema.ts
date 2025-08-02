import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createPenempatanSchema = z.object({
    userId: z.custom<MultipartValue<string>>(),
    unitKerja: z.custom<MultipartValue<string>>(),
    nomorSK: z.custom<MultipartValue<string>>().optional(),
    tanggalSK: z.custom<MultipartValue<string>>().optional(),
    tmt: z.custom<MultipartValue<string>>().optional(),
    file: z.custom<MultipartFile>()
})

export type CreatePenempatanSchema = z.infer<typeof createPenempatanSchema>;

export const { schemas: penempatanSchemas, $ref } = buildJsonSchemas(
    {
        createPenempatanSchema,
    },
    {
        $id: "PenempatanSchema",
    }
);