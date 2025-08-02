import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { CreateKendaraanSchema } from "./kendaraan.schema";

class KendaraanRepository {
    static async Insert(data: CreateKendaraanSchema, file?: FileEntries) {
        const kendaraan = await db.kendaraan.create({
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                namaPemilik: data.namaPemilik.value,
                nomorKendaraan: data.nomorKendaraan?.value,
                merek: data.merek?.value,
                jenis: data.jenis?.value,
                ...((file) && {
                    dokumenKendaraan: {
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

        return kendaraan;
    }

    static async FindAllByUserId(userId: string) {
        const kendaraanList = await db.kendaraan.findMany({
            where: {
                userId: userId
            },
            include: {
                dokumen: true
            }
        });
        return kendaraanList;
    }

    static async FindById(id: string) {
        const kendaraan = await db.kendaraan.findUnique({
            where: {
                id: id
            },
            include: {
                dokumen: true
            }
        });
        return kendaraan;
    }

    static async Update(id: string, data: CreateKendaraanSchema, file?: FileEntries) {
        const kendaraan = await db.kendaraan.update({
            where: {
                id: id
            },
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                namaPemilik: data.namaPemilik.value,
                nomorKendaraan: data.nomorKendaraan?.value,
                merek: data.merek?.value,
                jenis: data.jenis?.value,
                ...((file) && {
                    dokumen: {
                        upsert: {
                            where: {
                                Kendaraan: {
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
        return kendaraan;
    }

    static async Delete(id: string) {
        const kendaraan = await db.kendaraan.delete({
            where: {
                id: id
            }
        });
        return kendaraan;
    }

}

export default KendaraanRepository;