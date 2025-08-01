import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { CreateJabatanStrukturalSchema } from "./jabatan-struktural.schema";

class JabatanStrukturalRepository {
    static async Insert(data: CreateJabatanStrukturalSchema, file?: FileEntries) {
        const jabatanStruktural = await db.jabatanStruktural.create({
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                namaJabatan: data.namaJabatan.value,
                nomorSK: data.nomorSK?.value,
                periodeMenjabat: data.periodeMenjabat?.value,
                skPemberhentian: data.skPemberhentian?.value,
                tmtPemberhentian: data.tmtPemberhentian?.value,
                tunjanganTetap: data.tunjanganTetap?.value,
                tunjanganVariabel: data.tunjanganVariabel?.value,
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
        return jabatanStruktural;
    }

    static async getAllByUserId(userId: string) {
        const jabatanStrukturalList = await db.jabatanStruktural.findMany({
            where: {
                userId: userId
            },
            include: {
                dokumenSK: true
            }
        });
        return jabatanStrukturalList;
    }

    static async FindById(id: string) {
        const jabatanStruktural = await db.jabatanStruktural.findUnique({
            where: {
                id: id
            },
            include: {
                dokumenSK: true
            }
        });
        return jabatanStruktural;
    }

    static async Update(id: string, data: CreateJabatanStrukturalSchema, file?: FileEntries) {
        const jabatanStruktural = await db.jabatanStruktural.update({
            where: {
                id: id
            },
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                namaJabatan: data.namaJabatan.value,
                nomorSK: data.nomorSK?.value,
                periodeMenjabat: data.periodeMenjabat?.value,
                skPemberhentian: data.skPemberhentian?.value,
                tmtPemberhentian: data.tmtPemberhentian?.value,
                tunjanganTetap: data.tunjanganTetap?.value,
                tunjanganVariabel: data.tunjanganVariabel?.value,
                ...((file) && {
                    dokumenSK: {
                        upsert: {
                            where: {
                                JabatanStruktural: {
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
        return jabatanStruktural;
    }

    static async Delete(id: string) {
        const jabatanStruktural = await db.jabatanStruktural.delete({
            where: {
                id: id
            },
            include: {
                dokumenSK: true
            }
        });

        return jabatanStruktural;
    }
}

export default JabatanStrukturalRepository;