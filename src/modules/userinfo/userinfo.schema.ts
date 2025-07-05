import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createUserInfoSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
    }),
    NIP: z.string().optional(),
    GelarDepan: z.string().optional(),
    GelarBelakang: z.string().optional(),
    JenisKelamin: z.string().optional(),
    TempatLahir: z.string().optional(),
    TanggalLahir: z.string().optional(),
    Alamat: z.string().optional(),
    Phone: z.string().optional(),
    NBM: z.string().optional(),
    NIDN: z.string().optional(),
    NIDK: z.string().optional(),
    NUPTK: z.string().optional(),
    IDScholar: z.string().optional(),
    IDScopus: z.string().optional(),
    IDShinta: z.string().optional(),
    IDGaruda: z.string().optional(),
    NPWP: z.string().optional(),
    NIK: z.string().optional(),
    JabatanStruktural: z.string().optional(),
    JabatanFungsional: z.string().optional(),
    WorkEmail: z.string().optional(),
})

const createDokumenSchema = z.object({
    id: z.custom<MultipartValue<string>>(),
    files: z.custom<MultipartFile[]>()
})

export type CreateUserInfoInput = z.infer<typeof createUserInfoSchema>;
export type CreateDokumenInput = z.infer<typeof createDokumenSchema>;

export const { schemas: userInfoSchemas, $ref } = buildJsonSchemas(
    {
        createUserInfoSchema,
        createDokumenSchema,
    },
    {
        $id: "userInfoSchemas",
    }
)