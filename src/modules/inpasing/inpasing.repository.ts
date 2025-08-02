import path from "path";
import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { CreateInpasingSchema } from "./inpasing.schema";

class InpasingRepository {
    static async Insert(data: CreateInpasingSchema, file?: FileEntries) {
        const inpasing = await db.inpasing.create({
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                nomorSK: data.nomorSK?.value,
                tanggalSK: data.tanggalSK ? new Date(data.tanggalSK.value) : undefined,
                tmt: data.tmt ? new Date(data.tmt.value) : undefined,
                kepangkatan: data.kepangkatan.value,
                ...((file) && {
                    dokumenSK: {
                        create: {
                            filename: file.filename,
                            originalName: file.originalName,
                            mimetype: file.mimetype,
                            size: file.size,
                            extension: file.extension,
                            path: file.path,
                        }
                    }
                })
            }
        })
        return inpasing;
    }

    static async getAllByUserId(userId: string) {
        const inpasingList = await db.inpasing.findMany({
            where: {
                userId: userId
            },
            include: {
                dokumenSK: true
            }
        });
        return inpasingList;
    }

    static async FindById(id: string) {
        const inpasing = await db.inpasing.findUnique({
            where: {
                id: id
            },
            include: {
                dokumenSK: true
            }
        });
        return inpasing;
    }

    static async Update(id: string, data: CreateInpasingSchema, file?: FileEntries) {
        const inpasing = await db.inpasing.update({
            where: {
                id: id
            },
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                nomorSK: data.nomorSK?.value,
                tanggalSK: data.tanggalSK ? new Date(data.tanggalSK.value) : undefined,
                tmt: data.tmt ? new Date(data.tmt.value) : undefined,
                kepangkatan: data.kepangkatan.value,
                ...((file) && {
                    dokumenSK: {
                        upsert: {
                            where: {
                                Inpasing: {
                                    id: id
                                }
                            },
                            create: {
                                filename: file.filename,
                                originalName: file.originalName,
                                mimetype: file.mimetype,
                                size: file.size,
                                extension: file.extension,
                                path: file.path,
                            },
                            update: {
                                filename: file.filename,
                                originalName: file.originalName,
                                mimetype: file.mimetype,
                                size: file.size,
                                extension: file.extension,
                                path: file.path,
                            }
                        }
                    }
                })
            }
        });
        return inpasing;
    }

    static async Delete(id: string) {
        const inpasing = await db.inpasing.delete({
            where: {
                id: id
            }
        });
        return inpasing;
    }
}

export default InpasingRepository;