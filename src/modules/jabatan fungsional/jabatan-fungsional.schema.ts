import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createJabatanFungsionalSchema = z.object({
    userId: z.custom<MultipartValue<string>>(),
    jabatanFungsional: z.custom<MultipartValue<string>>(),
    nomorSK: z.custom<MultipartValue<string>>(),
    tanggalSK: z.custom<MultipartValue<string>>(),
    tmt: z.custom<MultipartValue<string>>(),
    jenis: z.custom<MultipartValue<string>>(),
    angkaKredit: z.custom<MultipartValue<string>>(),
    fileSK: z.custom<MultipartFile>(),
})

export type JabatanFungsionalSchema = z.infer<typeof createJabatanFungsionalSchema>;

export const { schemas: jabatanFungsionalSchemas, $ref } = buildJsonSchemas(
    {
        createJabatanFungsionalSchema
    },
    {
        $id: "JabatanFungsionalSchema",
    }
);
