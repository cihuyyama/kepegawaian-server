import { MultipartFile } from "@fastify/multipart";
import { CreateJabatanStrukturalSchema } from "./jabatan-struktural.schema";
import { FileEntries } from "../../utils/types";
import path from "path";
import fs from "fs";
import JabatanStrukturalRepository from "./jabatan-struktural.repository";

class JabatanStrukturalService {
    static async createJabatanStruktural(data: CreateJabatanStrukturalSchema, file?: MultipartFile) {
        let fileData: FileEntries | undefined;

        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/jabatan-struktural/${data.userId}`);
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

        const jabatanStruktural = await JabatanStrukturalRepository.Insert(data, file && fileData);
        return jabatanStruktural;
    }

    static async streamDokumenSK(id: string) {
        const jabatanStruktural = await JabatanStrukturalRepository.FindById(id);
        if (!jabatanStruktural) {
            throw new Error("Jabatan Struktural not found");
        }

        if (!jabatanStruktural.dokumenSK) {
            throw new Error("Dokumen SK not found for this jabatan struktural");
        }

        const filePath = jabatanStruktural.dokumenSK.path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }
        return { filePath, document: jabatanStruktural.dokumenSK };
    }

    static async getAllJabatanStrukturalByUserId(userId: string) {
        const jabatanStrukturalList = await JabatanStrukturalRepository.getAllByUserId(userId);
        return jabatanStrukturalList;
    }

    static async getJabatanStrukturalById(id: string) {
        const jabatanStruktural = await JabatanStrukturalRepository.FindById(id);
        if (!jabatanStruktural) {
            throw new Error("Jabatan Struktural not found");
        }
        return jabatanStruktural;
    }

    static async updateJabatanStruktural(id: string, data: CreateJabatanStrukturalSchema, file?: MultipartFile) {
        const existingJabatanStruktural = await JabatanStrukturalRepository.FindById(id);
        if (!existingJabatanStruktural) {
            throw new Error("Jabatan Struktural not found");
        }
        if (existingJabatanStruktural.dokumenSK) {
            const existingFilePath = existingJabatanStruktural.dokumenSK.path;
            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        }

        let fileData: FileEntries | undefined;

        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/jabatan-struktural/${data.userId}`);
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

        const jabatanStruktural = await JabatanStrukturalRepository.Update(id, data, file && fileData);
        return jabatanStruktural;
    }

    static async deleteJabatanStruktural(id: string) {
        const existingJabatanStruktural = await JabatanStrukturalRepository.FindById(id);
        if (!existingJabatanStruktural) {
            throw new Error("Jabatan Struktural not found");
        }
        if (existingJabatanStruktural.dokumenSK) {
            const existingFilePath = existingJabatanStruktural.dokumenSK.path;
            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        }

        const result = await JabatanStrukturalRepository.Delete(id);
        return result;
    }

}

export default JabatanStrukturalService;