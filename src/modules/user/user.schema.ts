import { MultipartFile } from "@fastify/multipart";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createUserInfoSchema = z.object({
    NIP: z.string().optional(),
    GelarDepan: z.string().optional(),
    GelarBelakang: z.string().optional(),
    JenisKelamin: z.string().optional(),
    TempatLahir: z.string().optional(),
    TanggalLahir: z.string().optional(),
    Alamat: z.string().optional(),
    agama: z.string().optional(),
    golonganDarah: z.string().optional(),
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

const createUserSchema = z.object({
    username: z.string({
        required_error: "Username is required",
    }),
    email: z.string({
        required_error: "Email is required",
    }).email({ message: "Invalid email format" }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, { message: "Password must be at least 6 characters long" }),
    role: z.string().optional(),
    unitKerjaId: z.string().optional(),
    userinfo: createUserInfoSchema.optional(),
})


const loginUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({ message: "Invalid email format" }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, { message: "Password must be at least 6 characters long" }),
})

const updateUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({ message: "Invalid email format" }),
    username: z.string().optional(),
    role: z.string().optional(),
    unitKerjaId: z.string().optional(),
})

const changePasswordSchema = z.object({
    oldPassword: z.string({
        required_error: 'Old password is required',
    }).min(6),
    newPassword: z.string({
        required_error: 'New password is required',
    }).min(6),
})

const updateUserPhotoSchema = z.object({
    image: z.custom<MultipartFile>()
})

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateUserInfoInput = z.infer<typeof createUserInfoSchema>;
export type UpdateUserPhotoInput = z.infer<typeof updateUserPhotoSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
    {
        createUserSchema,
        loginUserSchema,
        changePasswordSchema,
        updateUserSchema,
        updateUserPhotoSchema,
    },
    {
        $id: "userSchemas",
    }
)