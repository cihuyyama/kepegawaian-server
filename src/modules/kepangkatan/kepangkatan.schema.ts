import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const kepangkatanSchema = z.object({
    nama: z.custom<MultipartValue<string>>(),
    NomorSK: z.custom<MultipartValue<string>>(),
    TanggalSK: z.custom<MultipartValue<string>>(),
    TMT: z.custom<MultipartValue<string>>(),
    TanggalAkhirKontrak: z.custom<MultipartValue<string>>(),
    JenisSK: z.custom<MultipartValue<string>>(),
    GajiPokok: z.custom<MultipartValue<string>>(),
    fileSK: z.custom<MultipartFile>()
})

export type KepangkatanSchema = z.infer<typeof kepangkatanSchema>;

export const { schemas: kepangkatanSchemas, $ref } = buildJsonSchemas(
    {
        kepangkatanSchema
    },
    {
        $id: "KepangkatanSchema",
    }
)