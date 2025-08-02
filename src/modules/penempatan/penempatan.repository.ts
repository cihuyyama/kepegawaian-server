import { create } from "domain";
import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { CreatePenempatanSchema } from "./penempatan.schema";

class PenempatanRepository {
    static async Insert(data: CreatePenempatanSchema, file?: FileEntries) {
        const penempatan = await db.penempatan.create({
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                unitKerja: data.unitKerja.value,
                nomorSK: data.nomorSK?.value,
                tanggalSK: data.tanggalSK?.value ? new Date(data.tanggalSK.value) : undefined,
                tmt: data.tmt?.value ? new Date(data.tmt.value) : undefined,
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
        });
        return penempatan;
    }

    static async InsertDocument(penempatanId: string, file: FileEntries) {
        const penempatan = await db.penempatan.update({
            where: {
                id: penempatanId
            },
            data: {
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
            }
        });
        return penempatan;
    }

    static async FindAllByUserId(userId: string) {
        const penempatanList = await db.penempatan.findMany({
            where: {
                userId: userId
            },
            include: {
                dokumenSK: true
            }
        });
        return penempatanList;
    }

    static async FindById(id: string) {
        const penempatan = await db.penempatan.findUnique({
            where: {
                id: id
            },
            include: {
                dokumenSK: true
            }
        });
        return penempatan;
    }

    static async Update(id: string, data: CreatePenempatanSchema, file?: FileEntries) {
        const penempatan = await db.penempatan.update({
            where: {
                id: id
            },
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                unitKerja: data.unitKerja.value,
                nomorSK: data.nomorSK?.value,
                tanggalSK: data.tanggalSK?.value ? new Date(data.tanggalSK.value) : undefined,
                tmt: data.tmt?.value ? new Date(data.tmt.value) : undefined,
                ...((file) && {
                    dokumenSK: {
                        upsert: {
                            where: {
                                Penempatan: {
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
        return penempatan;
    }

    static async Delete(id: string) {
        const penempatan = await db.penempatan.delete({
            where: {
                id: id
            }
        });
        return penempatan;
    }
}

export default PenempatanRepository;