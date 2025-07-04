import { db } from "../../config/prisma";
import { CreateUserInput, UpdateUserInput } from "./user.schema";

class UserRepository {
    static async Insert(email: string, password: string, salt: string, username?: string, role?: string) {
        const user = await db.user.create({
            data: {
                email,
                password,
                salt,
                username,
                role
            },

            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return user;
    }

    static async FindAll(email?: string) {
        const users = await db.user.findMany({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return users;
    }

    static async FindById(id: string) {
        const user = await db.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return user;
    }
    static async FindByIdPrivate(id: string) {
        const user = await db.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                password: true,
                salt: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return user;
    }

    static async FindByEmail(email: string) {
        const user = await db.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
                salt: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return user;
    }

    static async Update(id: string, data: UpdateUserInput) {
        const user = await db.user.update({
            where: {
                id,
            },
            data,
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return user;
    }

    static async UpdatePassword(id: string, password: string, salt: string) {
        return db.user.update({
            where: {
                id
            },
            data: {
                password,
                salt
            }
        })
    }

    static async Delete(id: string) {
        const user = await db.user.delete({
            where: {
                id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return user;
    }
}

export default UserRepository;