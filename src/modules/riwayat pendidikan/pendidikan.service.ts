import path from "path";
import { db } from "../../config/prisma";
import { CreateDokumenRiwayatPendidikanSchema, CreateRiwayatPendidikanSchema } from "./pendidikan.schema";
import fs from "fs";
import { FileEntries } from "../../utils/types";
import { MultipartFile } from "@fastify/multipart";
import RiwayatPendidikanRepository from "./pendidikan.repository";

class RiwayatPendidikanService {
    static async createRiwayatPendidikan(data: CreateRiwayatPendidikanSchema, file?: MultipartFile) {
        let fileData: FileEntries | undefined
        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/riwayat-pendidikan/${data.userId.value}`);
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

        const pendidikan = await RiwayatPendidikanRepository.Insert(data, file && fileData);

        return pendidikan;
    }

    static async createDokumenRiwayatPendidikan(file: MultipartFile, pendidikanId: string, data: CreateDokumenRiwayatPendidikanSchema) {
        const pendidikan = await RiwayatPendidikanRepository.FindById(pendidikanId);
        if (!pendidikan) {
            throw new Error("Riwayat Pendidikan not found");
        }

        const uploadDir = path.join(__dirname, `../../../public/dokumen/riwayat-pendidikan/${pendidikan.userId}`);
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

        const updatedPendidikan = await RiwayatPendidikanRepository.InsertDocument(fileData, pendidikanId, data);

        if (!updatedPendidikan) {
            throw new Error("Failed to update riwayat pendidikan with document");
        }

        return updatedPendidikan;
    }

    static async streamDokumenRiwayatPendidikan(dokumenId: string) {
        const document = await RiwayatPendidikanRepository.FindDocumentById(dokumenId);
        if (!document) {
            throw new Error("Dokumen Riwayat Pendidikan not found");
        }

        const filePath = document.dokumen.path;
        if (!fs.existsSync(filePath)) {
            throw new Error("File not found");
        }

        return { filePath, document: document.dokumen };
    }

    static async getAllRiwayatPendidikanByUserId(userId: string) {
        const pendidikan = await RiwayatPendidikanRepository.FindAllByUserId(userId);
        return pendidikan;
    }

    static async getRiwayatPendidikanById(id: string) {
        const pendidikan = await RiwayatPendidikanRepository.FindById(id);
        return pendidikan;
    }


    static async updateRiwayatPendidikan(id: string, data: CreateRiwayatPendidikanSchema, file?: MultipartFile) {
        const pendidikan = await RiwayatPendidikanRepository.FindById(id);
        if (!pendidikan) {
            throw new Error("Riwayat Pendidikan not found");
        }
        if (pendidikan.DokumenRiwayatPendidikan && Array.isArray(pendidikan.DokumenRiwayatPendidikan)) {
            for (const dokumen of pendidikan.DokumenRiwayatPendidikan) {
                const filePath = dokumen.dokumen.path;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        let fileData: FileEntries | undefined
        if (file) {
            const uploadDir = path.join(__dirname, `../../../public/dokumen/riwayat-pendidikan/${data.userId}`);
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

        const updatedPendidikan = await RiwayatPendidikanRepository.Update(id, data, file && fileData);

        return updatedPendidikan;
        
    }

    static async deleteRiwayatPendidikan(id: string) {
        const pendidikan = await RiwayatPendidikanRepository.FindById(id);
        if (!pendidikan) {
            throw new Error("Riwayat Pendidikan not found");
        }

        if (pendidikan.DokumenRiwayatPendidikan && Array.isArray(pendidikan.DokumenRiwayatPendidikan)) {
            for (const dokumen of pendidikan.DokumenRiwayatPendidikan) {
                const filePath = dokumen.dokumen.path;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        } else if (pendidikan.DokumenRiwayatPendidikan) {
            // Handle case when it's a single document object
            const dokumen = pendidikan.DokumenRiwayatPendidikan as any;
            const filePath = dokumen.dokumen?.path;
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const deletedData = await RiwayatPendidikanRepository.Delete(id);

        return deletedData;
    }

    static async deleteDokumenRiwayatPendidikan(documentId: string) {
        const document = await RiwayatPendidikanRepository.FindDocumentById(documentId);
        if (!document) {
            throw new Error("Dokumen Riwayat Pendidikan not found");
        }

        const filePath = document.dokumen.path;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        const deletedDocument = await RiwayatPendidikanRepository.DeleteDocument(documentId);

        return deletedDocument;
    }
}

export default RiwayatPendidikanService;