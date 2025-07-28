import { create } from "domain";
import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { JabatanFungsionalSchema } from "./jabatan-fungsional.schema";

class JabatanFungsionalRepository {
    static async Insert(userId: string, data:JabatanFungsionalSchema, file: FileEntries) {
        const jabatanFungsional = await db.jabatanFungsional.create({
            data: {
                userId: userId,
                jabatanFungsional: data.jabatanFungsional.value,
                nomorSK: data.nomorSK.value,
                tanggalSK: new Date(data.tanggalSK.value),
                tmt: new Date(data.tmt.value),
                jenis: data.jenis.value,
                angkaKredit: parseFloat(data.angkaKredit.value),
            },
        })

        if (file) {
            await db.jabatanFungsional.update({
                where: {
                    userId,
                    id: jabatanFungsional.id
                },
                data: {
                    dokumenSK: {
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
        }

        return jabatanFungsional;
    }

    static async FindAll() {
        const jabatanFungsional = await db.jabatanFungsional.findMany({
            include: {
                dokumenSK: true
            }
        })

        return jabatanFungsional;
    }

    static async FindById(id: string) {
        const jabatanFungsional = await db.jabatanFungsional.findUnique({
            where: {
                id
            },
            include: {
                dokumenSK: true
            }
        })

        return jabatanFungsional;
    }

    static async FindByUserId(userId: string) {
        const jabatanFungsional = await db.jabatanFungsional.findMany({
            where: {
                userId
            },
            include: {
                dokumenSK: true
            }
        })

        return jabatanFungsional;
    }

    static async Update(userId: string, jabatanFungsionalId: string, data: JabatanFungsionalSchema, file: FileEntries) {
        const jabatanFungsional = await db.jabatanFungsional.update({
            where: {
                userId,
                id: jabatanFungsionalId
            },
            data: {
                jabatanFungsional: data.jabatanFungsional.value,
                nomorSK: data.nomorSK.value,
                tanggalSK: new Date(data.tanggalSK.value),
                tmt: new Date(data.tmt.value),
                jenis: data.jenis.value,
                angkaKredit: parseFloat(data.angkaKredit.value),
            }
        })

        if (file) {
            await db.jabatanFungsional.update({
                where: {
                    userId,
                    id: jabatanFungsional.id
                },
                data: {
                    dokumenSK: {
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
        }

        return jabatanFungsional;
    }

    static async Delete(userId: string, jabatanFungsionalId: string) {
        const jabatanFungsional = await db.jabatanFungsional.delete({
            where: {
                userId,
                id: jabatanFungsionalId
            }
        })

        return jabatanFungsional;
    }
}

export default JabatanFungsionalRepository;