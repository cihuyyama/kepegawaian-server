import { MultipartFile } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createJabatanStrukturalSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
    }),
    namaJabatan: z.string({
        required_error: "Nama Jabatan is required",
    }),
    nomorSK: z.string().optional(),
    periodeMenjabat: z.string().optional(),
    skPemberhentian: z.string().optional(),
    tmtPemberhentian: z.string().optional(),
    tunjanganTetap: z.string().optional(),
    tunjanganVariabel: z.string().optional(),
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