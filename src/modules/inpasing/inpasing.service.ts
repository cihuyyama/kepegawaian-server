import { MultipartFile } from "@fastify/multipart";
import { CreateInpasingSchema } from "./inpasing.schema";
import fs from "fs";
import path from "path";
import { FileEntries } from "../../utils/types";
import InpasingRepository from "./inpasing.repository";

class InpasingService {
    static async createInpasing(data: CreateInpasingSchema, file?: MultipartFile) {
        let fileData: FileEntries | undefined;

        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/inpasing/${data.userId.value}`);
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

        const inpasing = await InpasingRepository.Insert(data, file && fileData);
        return inpasing;
    }

    static async streamInpasingDocument(id: string) {
        const inpasing = await InpasingRepository.FindById(id);
        if (!inpasing) {
            throw new Error("Inpasing not found");
        }

        if (!inpasing.dokumenSK) {
            throw new Error("Dokumen SK not found for this inpasing");
        }

        const filePath = inpasing.dokumenSK.path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }
        return { filePath, document: inpasing.dokumenSK };
    }

    static async getAllInpasingByUserId(userId: string) {
        const inpasingList = await InpasingRepository.getAllByUserId(userId);
        return inpasingList;
    }

    static async getInpasingById(id: string) {
        const inpasing = await InpasingRepository.FindById(id);
        if (!inpasing) {
            throw new Error("Inpasing not found");
        }
        return inpasing;
    }

    static async updateInpasing(id: string, data: CreateInpasingSchema, file?: MultipartFile) {
        const existingInpasing = await InpasingRepository.FindById(id);
        if (!existingInpasing) {
            throw new Error("Inpasing not found");
        }
        if (existingInpasing.dokumenSK) {
            const existingFilePath = existingInpasing.dokumenSK.path;
            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        }

        let fileData: FileEntries | undefined;

        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/inpasing/${data.userId}`);
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

        const inpasing = await InpasingRepository.Update(id, data, file && fileData);
        return inpasing;
    }

    static async deleteInpasing(id: string) {
        const inpasing = await InpasingRepository.FindById(id);
        if (!inpasing) {
            throw new Error("Inpasing not found");
        }

        if (inpasing.dokumenSK) {
            const filePath = inpasing.dokumenSK.path;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const deletedInpasing = await InpasingRepository.Delete(id);
        return deletedInpasing;
    }
}

export default InpasingService;