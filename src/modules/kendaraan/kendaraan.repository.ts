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
}

export default KendaraanRepository;