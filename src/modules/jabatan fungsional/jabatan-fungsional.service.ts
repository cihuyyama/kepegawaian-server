import { MultipartFile } from "@fastify/multipart";
import { JabatanFungsionalSchema } from "./jabatan-fungsional.schema";
import path from "path";
import { FileEntries } from "../../utils/types";
import fs from "fs";
import JabatanFungsionalRepository from "./jabatan-fungsional.repository";

class JabatanFungsionalService {
    static async createJabatanFungsional(userId: string, data: JabatanFungsionalSchema, file: MultipartFile) {
        const uploadDir = path.join(__dirname, `../../../public/dokumen/jabatan-fungsional/${userId}`);
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

        const newJabatanFungsional = await JabatanFungsionalRepository.Insert(userId, data, fileData);

        if (!newJabatanFungsional) {
            throw new Error("Failed to create jabatan fungsional");
        }

        return newJabatanFungsional;
    }

    static async streamDokumenSK(id: string) {
        const jabatanFungsional = await JabatanFungsionalRepository.FindById(id);
        if (!jabatanFungsional) {
            throw new Error("Jabatan Fungsional not found");
        }

        if (!jabatanFungsional.dokumenSK) {
            throw new Error("Dokumen SK not found for this jabatan fungsional");
        }

        const filePath = jabatanFungsional.dokumenSK.path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }
        return { filePath, document: jabatanFungsional.dokumenSK };
    }

    static async getAllJabatanFungsional() {
        const jabatanFungsional = await JabatanFungsionalRepository.FindAll();
        return jabatanFungsional;
    }

    static async getJabatanFungsionalById(id: string) {
        const jabatanFungsional = await JabatanFungsionalRepository.FindById(id);
        if (!jabatanFungsional) {
            throw new Error("Jabatan Fungsional not found");
        }
        return jabatanFungsional;
    }

    static async getJabatanFungsionalByUserId(userId: string) {
        const jabatanFungsional = await JabatanFungsionalRepository.FindByUserId(userId);
        return jabatanFungsional;
    }

    static async updateJabatanFungsional(id: string, data: JabatanFungsionalSchema, file: MultipartFile) {
        const jabatanFungsional = await JabatanFungsionalRepository.FindById(id);
        if (!jabatanFungsional) {
            throw new Error("Jabatan Fungsional not found");
        }

        const uploadDir = path.join(__dirname, `../../../public/dokumen/kepangkatan/${jabatanFungsional.userId}`);
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

        const updatedJabatanFungsional = await JabatanFungsionalRepository.Update(jabatanFungsional.userId, id, data, fileData);

        if (!updatedJabatanFungsional) {
            throw new Error("Failed to update jabatan fungsional");
        }

        return updatedJabatanFungsional;
    }

    static async deleteJabatanFungsional(id: string) {
        const jabatanFungsional = await JabatanFungsionalRepository.FindById(id);
        if (!jabatanFungsional) {
            throw new Error("Jabatan Fungsional not found");
        }

        if (jabatanFungsional.dokumenSK) {
            await fs.promises.unlink(jabatanFungsional.dokumenSK.path);
        }

        const deletedJabatanFungsional = await JabatanFungsionalRepository.Delete(jabatanFungsional.userId, id);
        if (!deletedJabatanFungsional) {
            throw new Error("Failed to delete jabatan fungsional");
        }

        return deletedJabatanFungsional;
    }

}

export default JabatanFungsionalService;