import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { CreateDokumenRiwayatPendidikanSchema, CreateRiwayatPendidikanSchema } from "./pendidikan.schema";

class RiwayatPendidikanRepository {
    static async Insert (data: CreateRiwayatPendidikanSchema, file?: FileEntries) {
        const result = await db.riwayatPendidikan.create({
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                pendidikan: data.pendidikan.value,
                namaInstitusi: data.namaInstitusi?.value,
                tahunLulus: data.tahunLulus?.value,
            }
        });

        if (file) {
            await db.riwayatPendidikan.update({
                where: {
                    id: result.id
                },
                data: {
                    DokumenRiwayatPendidikan: {
                        create: {
                            dokumen: {
                                create: {
                                    filename: file.filename,
                                    originalName: file.originalName,
                                    mimetype: file.mimetype,
                                    size: file.size,
                                    extension: file.extension,
                                    path: file.path
                                }
                            },
                            namaDokumen: data.namaDokumen?.value,
                        }
                    }
                }
            });
        }
        return result;
    }

    static async InsertDocument(file: FileEntries, pendidikanId: string, data: CreateDokumenRiwayatPendidikanSchema) {
        const pendidikan = await db.riwayatPendidikan.update({
            where: {
                id: pendidikanId
            },
            data: {
                DokumenRiwayatPendidikan: {
                    create: {
                        dokumen: {
                            create: {
                                filename: file.filename,
                                originalName: file.originalName,
                                mimetype: file.mimetype,
                                size: file.size,
                                extension: file.extension,
                                path: file.path
                            }
                        },
                        namaDokumen: data.namaDokumen,
                    }
                }
            }
        });
        return pendidikan;
    }

    static async FindAllByUserId(userId: string) {
        const pendidikanList = await db.riwayatPendidikan.findMany({
            where: {
                userId: userId
            },
            include: {
                DokumenRiwayatPendidikan: {
                    include: {
                        dokumen: true
                    }
                }
            }
        });
        return pendidikanList;
    }

    static async FindById(id: string) {
        const pendidikan = await db.riwayatPendidikan.findUnique({
            where: {
                id: id
            },
            include: {
                DokumenRiwayatPendidikan: {
                    include: {
                        dokumen: true
                    }
                }
            }
        });
        return pendidikan;
    }

    static async FindDocumentById(documentId: string) {
        const document = await db.dokumenRiwayatPendidikan.findUnique({
            where: {
                id: documentId
            },
            include: {
                dokumen: true
            }
        });
        return document;
    }

    static async Update(id: string, data: CreateRiwayatPendidikanSchema) {
        const pendidikan = await db.riwayatPendidikan.update({
            where: {
                id: id
            },
            data: {
                user: {
                    connect: {
                        id: data.userId.value
                    }
                },
                pendidikan: data.pendidikan.value,
                namaInstitusi: data.namaInstitusi?.value,
                tahunLulus: data.tahunLulus?.value,
            }
        });
        return pendidikan;
    }

    static async Delete(id: string) {
        const pendidikan = await db.riwayatPendidikan.delete({
            where: {
                id: id
            }
        });
        return pendidikan;
    }

    static async DeleteDocument(documentId: string) {
        const document = await db.dokumenRiwayatPendidikan.delete({
            where: {
                id: documentId
            }
        });
        return document;
    }
}

export default RiwayatPendidikanRepository;