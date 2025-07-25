import { create } from "domain";
import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { KepangkatanSchema } from "./kepangkatan.schema";

class KepangkatanRepository {
    static async Insert(userId: string, data: KepangkatanSchema) {
        const kepangkatan = await db.kepangkatan.create({
            data: {
                userId: userId,
                nama: data.nama.value,
                NomorSK: data.NomorSK.value,
                TanggalSK: new Date(data.TanggalSK.value),
                TMT: new Date(data.TMT.value),
                TanggalAkhirKontrak: new Date(data.TanggalAkhirKontrak.value),
                JenisSK: data.JenisSK.value,
                GajiPokok: parseFloat(data.GajiPokok.value),
            }
        })

        return kepangkatan;
    }

    static async InsertDocumentSK(userId: string, file: FileEntries, kepangkatanId: string) {
        const kepangkatan = await db.kepangkatan.update({
            where: {
                userId,
                id: kepangkatanId
            },
            data: {
                DokumenSK: {
                    create: {
                        filename: file.filename,
                        originalName: file.originalName,
                        path: file.path,
                        mimetype: file.mimetype,
                        size: file.size,
                        extension: file.extension,
                    }
                }
            }
        })

        return kepangkatan;
    }

    static async FindAll() {
        const kepangkatan = await db.kepangkatan.findMany({
            include: {
                DokumenSK: true
            }
        })

        return kepangkatan;
    }

    static async FindById(id: string) {
        const kepangkatan = await db.kepangkatan.findUnique({
            where: {
                id
            },
            include: {
                DokumenSK: true
            }
        })

        return kepangkatan;
    }

    static async FindByUserId(userId: string) {
        const kepangkatan = await db.kepangkatan.findUnique({
            where: {
                userId
            },
            include: {
                DokumenSK: true
            }
        })

        return kepangkatan;
    }

    static async Update(id: string, data: KepangkatanSchema, file: FileEntries) {
        const kepangkatan = await db.kepangkatan.update({
            where: {
                id
            },
            data: {
                nama: data.nama.value,
                NomorSK: data.NomorSK.value,
                TanggalSK: data.TanggalSK.value,
                TMT: data.TMT.value,
                TanggalAkhirKontrak: data.TanggalAkhirKontrak.value,
                JenisSK: data.JenisSK.value,
                DokumenSK: {
                    update: {
                        filename: file.filename,
                        originalName: file.originalName,
                        path: file.path,
                        mimetype: file.mimetype,
                        size: file.size,
                        extension: file.extension,
                    }
                }
            }
        })

        return kepangkatan;
    }

    static async Delete(id: string) {
        const kepangkatan = await db.kepangkatan.delete({
            where: {
                id
            }
        })

        return kepangkatan;
    }
}

export default KepangkatanRepository;