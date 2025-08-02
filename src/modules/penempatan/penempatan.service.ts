import { MultipartFile } from "@fastify/multipart";
import { CreatePenempatanSchema } from "./penempatan.schema";
import { FileEntries } from "../../utils/types";
import path from "path";
import fs from "fs";
import PenempatanRepository from "./penempatan.repository";

class PenempatanService {
    static async createPenempatan(data: CreatePenempatanSchema, file?: MultipartFile) {
        let fileData: FileEntries | undefined;

        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/penempatan/${data.userId.value}`);
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

        const penempatan = await PenempatanRepository.Insert(data, file && fileData);
        return penempatan;
    }

    static async getAllPenempatanByUserId(userId: string) {
        const penempatanList = await PenempatanRepository.FindAllByUserId(userId);
        return penempatanList;
    }

    static async getPenempatanById(id: string) {
        const penempatan = await PenempatanRepository.FindById(id);
        return penempatan;
    }

    static async updatePenempatan(id: string, data: CreatePenempatanSchema, file?: MultipartFile) {
        const existingPenempatan = await PenempatanRepository.FindById(id);
        if (!existingPenempatan) {
            throw new Error("Penempatan not found");
        }
        if (existingPenempatan.dokumenSK) {
            const existingFilePath = existingPenempatan.dokumenSK.path;
            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        }

        let fileData: FileEntries | undefined;

        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/penempatan/${data.userId}`);
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

        const penempatan = await PenempatanRepository.Update(id, data, file && fileData);
        return penempatan;
    }

    static async deletePenempatan(id: string) {
        const existingPenempatan = await PenempatanRepository.FindById(id);
        if (!existingPenempatan) {
            throw new Error("Penempatan not found");
        }
        if (existingPenempatan.dokumenSK) {
            const existingFilePath = existingPenempatan.dokumenSK.path;
            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        }

        const penempatan = await PenempatanRepository.Delete(id);
        return penempatan;
    }
}

export default PenempatanService;