import { MultipartFile } from "@fastify/multipart";
import { KepangkatanSchema } from "./kepangkatan.schema";
import KepangkatanRepository from "./kepangkatan.repository";
import fs from "fs";
import path from "path";
import { FileEntries } from "../../utils/types";

class KepangkatanService {
    static async createKepangkatan(userId: string, data: KepangkatanSchema, file: MultipartFile) {

        const uploadDir = path.join(__dirname, `../../../public/dokumen/kepangkatan/${userId}`);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const clearFileName = file.filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const uniqueFilename = `${Date.now()}-${clearFileName}`;
        const filePath = path.join(uploadDir, uniqueFilename);

        await fs.promises.writeFile(filePath, await file.toBuffer());


        const fileData: FileEntries = {
            filename: uniqueFilename,
            originalName: file.filename,
            path: filePath,
            mimetype: file.mimetype,
            size: file.file.bytesRead,
            extension: path.extname(file.filename).toLowerCase(),
        }

        const newKepangkatan = await KepangkatanRepository.Insert(userId, data);
        if (!newKepangkatan) {
            throw new Error("Failed to create kepangkatan");
        }

        const updatedKepangkatan = await KepangkatanRepository.InsertDocumentSK(userId, fileData, newKepangkatan.id);
        if (!updatedKepangkatan) {
            throw new Error("Failed to upload document SK");
        }
        
        return updatedKepangkatan;
    }

    static async streamDokumenSK(id: string) {
            const kepangkatan = await KepangkatanRepository.FindById(id);
            if (!kepangkatan) {
                throw new Error("Kepangkatan not found");
            }
            
            if (!kepangkatan.DokumenSK) {
                throw new Error("Dokumen SK not found for this kepangkatan");
            }

            const filePath = kepangkatan.DokumenSK.path;
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found at path: ${filePath}`);
            }
            return { filePath, document: kepangkatan.DokumenSK };
        }

    static async getAllKepangkatan() {
        const kepangkatanList = await KepangkatanRepository.FindAll();
        return kepangkatanList;
    }

    static async getKepangkatanById(id: string) {
        const kepangkatan = await KepangkatanRepository.FindById(id);
        if (!kepangkatan) {
            throw new Error("Kepangkatan not found");
        }
        return kepangkatan;
    }

    static async getKepangkatanByUserId(userId: string) {
        const kepangkatan = await KepangkatanRepository.FindByUserId(userId);
        if (!kepangkatan) {
            throw new Error("Kepangkatan not found for this user");
        }
        return kepangkatan;
    }

    static async updateKepangkatan(userId: string, data: KepangkatanSchema, file: MultipartFile) {
        const kepangkatan = await KepangkatanRepository.FindByUserId(userId);
        if (!kepangkatan) {
            throw new Error("Kepangkatan does not exist for this user");
        }

        if (kepangkatan.DokumenSK) {
            await fs.promises.unlink(kepangkatan.DokumenSK.path);
        }

        const uploadDir = path.join(__dirname, `../../../public/dokumen/kepangkatan/${userId}`);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const clearFileName = file.filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const uniqueFilename = `${Date.now()}-${clearFileName}`;
        const filePath = path.join(uploadDir, uniqueFilename);

        await fs.promises.writeFile(filePath, await file.toBuffer());


        const fileData: FileEntries = {
            filename: uniqueFilename,
            originalName: file.filename,
            path: filePath,
            mimetype: file.mimetype,
            size: file.file.bytesRead,
            extension: path.extname(file.filename).toLowerCase(),
        }

        const updatedKepangkatan = await KepangkatanRepository.Update(userId, data, fileData);
        if (!updatedKepangkatan) {
            throw new Error("Failed to update kepangkatan");
        }

        return updatedKepangkatan;
    }

    static async deleteKepangkatan(id: string) {
        const kepangkatan = await KepangkatanRepository.FindById(id);
        if (!kepangkatan) {
            throw new Error("Kepangkatan not found");
        }

        if (kepangkatan.DokumenSK) {
            await fs.promises.unlink(kepangkatan.DokumenSK.path);
        }

        const deletedKepangkatan = await KepangkatanRepository.Delete(id);
        return deletedKepangkatan;
    }
}

export default KepangkatanService;