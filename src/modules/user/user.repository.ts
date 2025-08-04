import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { CreateUserInfoInput, UpdateUserInput } from "./user.schema";

class UserRepository {
    static async Insert(
        email: string,
        password: string,
        salt: string,
        username: string,
        role?: string,
        unitKerjaId?: string,
        userinfo?: CreateUserInfoInput
    ) {
        const user = await db.user.create({
            data: {
                email,
                password,
                salt,
                username,
                role,
                ...(unitKerjaId && {
                    UnitKerja: {
                        connect: {
                            id: unitKerjaId,
                        }
                    }
                }),
                ...(userinfo && {
                    UserInfo: {
                        create: {
                            ...userinfo,
                        }
                    }
                })
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

    static async UpdatePhoto(userId: string, imageFile: FileEntries) {
        const user = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                imgUrl: `api/v1/users/${userId}/photo`,
                photoFile: {
                    upsert: {
                        where: {
                            userPhotoId: userId,
                        },
                        create: {
                            filename: imageFile.filename,
                            mimetype: imageFile.mimetype,
                            size: imageFile.size,
                            originalName: imageFile.originalName,
                            extension: imageFile.extension,
                            path: imageFile.path,
                        },
                        update: {
                            filename: imageFile.filename,
                            mimetype: imageFile.mimetype,
                            size: imageFile.size,
                            originalName: imageFile.originalName,
                            extension: imageFile.extension,
                            path: imageFile.path,
                        }
                    },
                },
            },
            select: {
                id: true,
                email: true,
                username: true,
                photoFile: true,
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

    static async FindAllByKaprodi(kaprodiId: string) {
        const kaprodi = await db.user.findMany({
            where: {
                KepalaUnitKerja: {
                    id: kaprodiId,
                }
            },
            include: {
                UnitKerja: {
                    include: {
                        Anggota: {
                            include: {
                                UserInfo: true,
                            }
                        }
                    }
                }
            }
        })

        return kaprodi;
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
                imgUrl: true,
                role: true,
                UserInfo: {
                    include: {
                        KTP: true,
                        BPJSKesehatan: true,
                        BPJSKetenagakerjaan: true,
                        DocNBM: true,
                        DocNIDN: true,
                        SertifikasiDosen: true,
                        Passport: true,
                    }
                },
                KepalaUnitKerja: {
                    include: {
                        Anggota: {
                            include: {
                                UserInfo: true,
                            }
                        }
                    }
                },
                UnitKerja: true,
                photoFile: true,
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
                KepalaUnitKerja: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
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
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return user;
    }

    static async Update(id: string, data: UpdateUserInput) {
        const {
            username,
            email,
            role,
            unitKerjaId,
        } = data;
        const user = await db.user.update({
            where: {
                id,
            },
            data: {
                username,
                email,
                role,
                ...(unitKerjaId && {
                    UnitKerja: {
                        connect: {
                            id: unitKerjaId,
                        }
                    }
                })
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                UnitKerja: true,
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