import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createKendaraanSchema = z.object({
    userId: z.custom<MultipartValue<string>>(),
    namaPemilik: z.custom<MultipartValue<string>>(),
    nomorKendaraan: z.custom<MultipartValue<string>>().optional(),
    merek: z.custom<MultipartValue<string>>().optional(),
    jenis: z.custom<MultipartValue<string>>().optional(),
    file: z.custom<MultipartFile>()
})

export type CreateKendaraanSchema = z.infer<typeof createKendaraanSchema>;

export const { schemas: kendaraanSchemas, $ref } = buildJsonSchemas(
    {
        createKendaraanSchema,
    },
    {
        $id: "KendaraanSchema",
    }
);