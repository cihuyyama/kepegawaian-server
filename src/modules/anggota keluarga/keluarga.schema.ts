import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createkeluargaSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
    }),
    nama: z.string({
        required_error: "Nama is required",
    }),
    tempatLahir: z.string().optional(),
    agama: z.string().optional(),
    jenisKelamin: z.string().optional(),
    nik: z.string().optional(),
    pendidikan: z.string().optional(),
    hubunganKeluarga: z.string().optional(),
    tunjanganBeras: z.string().optional(),
    tunjanganKeluarga: z.string().optional(),
    potonganAsuransi: z.string().optional(),
    tanggunganPajak: z.string().optional(),
})

export type CreateKeluargaSchema = z.infer<typeof createkeluargaSchema>;

export const { schemas: keluargaSchemas, $ref } = buildJsonSchemas(
    {
        createkeluargaSchema,
    },
    {
        $id: "KeluargaSchema",
    }
)