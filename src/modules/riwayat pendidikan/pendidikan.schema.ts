import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createRiwayatPendidikanSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
    }),
    pendidikan: z.string({
        required_error: "Pendidikan is required",
    }),
    namaInstitusi: z.string().optional(),
    tahunLulus: z.number().optional(),
})

export type CreateRiwayatPendidikanSchema = z.infer<typeof createRiwayatPendidikanSchema>;

export const { schemas: riwayatPendidikanSchemas, $ref } = buildJsonSchemas(
    {
        createRiwayatPendidikanSchema,
    },
    {
        $id: "RiwayatPendidikanSchema",
    }
)