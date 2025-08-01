import { db } from "../../config/prisma";
import { FileEntries } from "../../utils/types";
import { CreateInpasingSchema } from "./inpasing.schema";

class InpasingRepository {
    static async Insert(data: CreateInpasingSchema, file?: FileEntries) {
        const inpasing = await db.inpasing.create({
            data: {
                ...data,
                ...((file) && {
                    DokumenInpasing: {
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
                ...data,
                ...((file) && {
                    DokumenInpasing: {
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