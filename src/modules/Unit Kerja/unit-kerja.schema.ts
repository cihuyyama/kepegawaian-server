import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createUnitKerjaSchema = z.object({
    name: z.string({
        required_error: "Nama unit kerja harus diisi",
    }),
    kepalaUnitKerjaId: z.string().optional(),
    anggota: z.array(z.string()).optional(),
})

export type CreateUnitKerjaInput = z.infer<typeof createUnitKerjaSchema>;

export const { schemas: unitKerjaSchemas, $ref } = buildJsonSchemas(
    {
        createUnitKerjaSchema,
    },
    {
        $id: "unitKerjaSchemas",
    }
)