import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createDokumenRiwayatPendidikanSchema = z.object({
    pendidikanId: z.custom<MultipartValue<string>>(),
    pendidikan: z.custom<MultipartValue<string>>().optional(),
    namaInstitusi: z.custom<MultipartValue<string>>().optional(),
    tahunLulus: z.custom<MultipartValue<string>>().optional(),
    namaDokumen: z.custom<MultipartValue<string>>().optional(),
    file: z.custom<MultipartFile>(),
})

const createRiwayatPendidikanSchema = z.object({
    userId: z.custom<MultipartValue<string>>(),
    pendidikan: z.custom<MultipartValue<string>>(),
    namaInstitusi: z.custom<MultipartValue<string>>().optional(),
    tahunLulus: z.custom<MultipartValue<string>>().optional(),
    namaDokumen: z.custom<MultipartValue<string>>().optional(),
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