import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { CreateJabatanStrukturalSchema } from "./jabatan-struktural.schema";

class JabatanStrukturalRepository {
    static async Insert(data: CreateJabatanStrukturalSchema, file?: FileEntries) {
        const jabatanStruktural = await db.jabatanStruktural.create({
            data: {
                ...data,
                ...((file) && {
                    DokumenJabatan: {
                        create: {
                            dokumen: {
                                create: {
                                    filename: file.filename,
                                    originalName: file.originalName,
                                    mimetype: file.mimetype,
                                    size: file.size,
                                    extension: file.extension,
                                }
                            }
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
                ...data,
                ...((file) && {
                    DokumenJabatan: {
                        update: {
                            dokumen: {
                                update: {
                                    filename: file.filename,
                                    originalName: file.originalName,
                                    mimetype: file.mimetype,
                                    size: file.size,
                                    extension: file.extension,
                                }
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