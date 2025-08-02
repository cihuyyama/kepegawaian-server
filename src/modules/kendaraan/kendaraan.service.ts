import { MultipartFile } from "@fastify/multipart";
import { CreateKendaraanSchema } from "./kendaraan.schema";
import { FileEntries } from "../../utils/types";
import path from "path";
import fs from "fs";
import KendaraanRepository from "./kendaraan.repository";

class KendaraanService {
    static async createKendaraan(data: CreateKendaraanSchema, file?: MultipartFile) {
        let fileData: FileEntries | undefined;

        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/kendaraan/${data.userId.value}`);
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const clearFileName = file.filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
            const uniqueFilename = `${Date.now()}-${clearFileName}`;
            const filePath = path.join(uploadDir, uniqueFilename);

            await fs.promises.writeFile(filePath, await file.toBuffer());


            fileData = {
                filename: uniqueFilename,
                originalName: file.filename,
                path: filePath,
                mimetype: file.mimetype,
                size: file.file.bytesRead,
                extension: path.extname(file.filename).toLowerCase(),
            }
        }

        const kendaraan = await KendaraanRepository.Insert(data, file && fileData);
        return kendaraan;
    }

    static async getAllKendaraanByUserId(userId: string) {
        const kendaraanList = await KendaraanRepository.FindAllByUserId(userId);
        return kendaraanList;
    }

    static async getKendaraanById(id: string) {
        const kendaraan = await KendaraanRepository.FindById(id);
        if (!kendaraan) {
            throw new Error("Kendaraan not found");
        }
        return kendaraan;
    }

    static async updateKendaraan(id: string, data: CreateKendaraanSchema, file?: MultipartFile) {
        const existingKendaraan = await KendaraanRepository.FindById(id);
        if (!existingKendaraan) {
            throw new Error("Kendaraan not found");
        }
        if (existingKendaraan.dokumen) {
            const existingFilePath = existingKendaraan.dokumen.path;
            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        }

        let fileData: FileEntries | undefined;
        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/kendaraan/${data.userId.value}`);
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const clearFileName = file.filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
            const uniqueFilename = `${Date.now()}-${clearFileName}`;
            const filePath = path.join(uploadDir, uniqueFilename);

            await fs.promises.writeFile(filePath, await file.toBuffer());

            fileData = {
                filename: uniqueFilename,
                originalName: file.filename,
                path: filePath,
                mimetype: file.mimetype,
                size: file.file.bytesRead,
                extension: path.extname(file.filename).toLowerCase(),
            }
        }

        const kendaraan = await KendaraanRepository.Update(id, data, file && fileData);
        return kendaraan;
    }

    static async deleteKendaraan(id: string) {
        const existingKendaraan = await KendaraanRepository.FindById(id);
        if (!existingKendaraan) {
            throw new Error("Kendaraan not found");
        }
        if (existingKendaraan.dokumen) {
            const existingFilePath = existingKendaraan.dokumen.path;
            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        }

        await KendaraanRepository.Delete(id);
    }
}

export default KendaraanService;