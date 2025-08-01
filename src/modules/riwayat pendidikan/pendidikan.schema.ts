import { MultipartFile } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createDokumenRiwayatPendidikanSchema = z.object({
    pendidikanId: z.string({
        required_error: "Pendidikan ID is required",
    }),
    pendidikan: z.string().optional(),
    namaInstitusi: z.string().optional(),
    tahunLulus: z.number().optional(),
    namaDokumen: z.string().optional(),
    file: z.custom<MultipartFile>(),
})

const createRiwayatPendidikanSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
    }),
    pendidikan: z.string({
        required_error: "Pendidikan is required",
    }),
    namaInstitusi: z.string().optional(),
    tahunLulus: z.number().optional(),
    namaDokumen: z.string().optional(),
    file: z.custom<MultipartFile>().optional(),
})

export type CreateRiwayatPendidikanSchema = z.infer<typeof createRiwayatPendidikanSchema>;
export type CreateDokumenRiwayatPendidikanSchema = z.infer<typeof createDokumenRiwayatPendidikanSchema>;

export const { schemas: riwayatPendidikanSchemas, $ref } = buildJsonSchemas(
    {
        createRiwayatPendidikanSchema,
        createDokumenRiwayatPendidikanSchema,
    },
    {
        $id: "RiwayatPendidikanSchema",
    }
)