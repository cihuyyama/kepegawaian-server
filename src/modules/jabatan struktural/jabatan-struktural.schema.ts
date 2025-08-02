import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createJabatanStrukturalSchema = z.object({
    userId: z.custom<MultipartValue<string>>(),
    namaJabatan: z.custom<MultipartValue<string>>(),
    nomorSK: z.custom<MultipartValue<string>>().optional(),
    periodeMenjabat: z.custom<MultipartValue<string>>().optional(),
    skPemberhentian: z.custom<MultipartValue<string>>().optional(),
    tmtPemberhentian: z.custom<MultipartValue<string>>().optional(),
    tunjanganTetap: z.custom<MultipartValue<string>>().optional(),
    tunjanganVariabel: z.custom<MultipartValue<string>>().optional(),
    file: z.custom<MultipartFile>()
})

export type CreateJabatanStrukturalSchema = z.infer<typeof createJabatanStrukturalSchema>;

export const { schemas: jabatanStrukturalSchemas, $ref } = buildJsonSchemas(
    {
        createJabatanStrukturalSchema,
    },
    {
        $id: "JabatanStrukturalSchema",
    }
);