import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

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
    username: z.string({
        required_error: "Username is required",
    }),
    email: z.string({
        required_error: "Email is required",
    }).email({ message: "Invalid email format" }),
    role: z.string().optional(),
})

const changePasswordSchema = z.object({
    oldPassword: z.string({
        required_error: 'Old password is required',
    }).min(6),
    newPassword: z.string({
        required_error: 'New password is required',
    }).min(6),
})

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
    {
        createUserSchema,
        loginUserSchema,
        changePasswordSchema,
        updateUserSchema,
    },
    {
        $id: "userSchemas",
    }
)