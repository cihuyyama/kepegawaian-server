import { MultipartFile } from "@fastify/multipart";
import { FileEntries, UserDocuments } from "../../utils/types";
import UserInfoRepository from "./userinfo.repository";
import { CreateUserInfoInput } from "./userinfo.schema";
import UserRepository from "../user/user.repository";
import path from "path";
import fs from "fs";

class UserInfoService {
    static async upsertUserInfo(data: CreateUserInfoInput) {
        const userInfo = await UserInfoRepository.Upsert(data);
        return userInfo;
    }

    static async upsertDocuments(userId: string, documents: UserDocuments, file: MultipartFile) {
        const user = await UserRepository.FindById(userId)
        if (!user) {
            throw new Error("User not found")
        }

        // ensure delete old documents if exists
        switch (documents) {
            case "KTP":
                if (user.UserInfo?.KTP) {
                    await fs.promises.unlink(user.UserInfo.KTP.path);
                }
                break;
            case "DocNBM":
                if (user.UserInfo?.DocNBM) {
                    await fs.promises.unlink(user.UserInfo.DocNBM.path);
                }
                break;
            case "DocNIDN":
                if (user.UserInfo?.DocNIDN) {
                    await fs.promises.unlink(user.UserInfo.DocNIDN.path);
                }
                break;
            case "SertifikasiDosen":
                if (user.UserInfo?.SertifikasiDosen) {
                    await fs.promises.unlink(user.UserInfo.SertifikasiDosen.path);
                }
                break;
            case "Passport":
                if (user.UserInfo?.Passport) {
                    await fs.promises.unlink(user.UserInfo.Passport.path);
                }
                break;
            case "BPJSKesehatan":
                if (user.UserInfo?.BPJSKesehatan) {
                    await fs.promises.unlink(user.UserInfo.BPJSKesehatan.path);
                }
                break;
            case "BPJSKetenagakerjaan":
                if (user.UserInfo?.BPJSKetenagakerjaan) {
                    await fs.promises.unlink(user.UserInfo.BPJSKetenagakerjaan.path);
                }
                break;
        }

        const uploadDir = path.join(__dirname, `../../../public/images/users/${user.email}`);
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

        const newFile = await UserInfoRepository.UpsertDocuments(userId, documents, fileData);
        if (!newFile) {
            throw new Error("Failed to upload document");
        }
        
        return newFile;
    }

    static async streamUserDocument(userId: string, documentType: UserDocuments) {
        const userInfo = await UserInfoRepository.FindByUserId(userId);
        if (!userInfo) {
            throw new Error("User info not found");
        }

        const document = userInfo[documentType];
        if (!document) {
            throw new Error(`Document type ${documentType} not found for user ${userId}`);
        }

        const filePath = document.path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }
        return { filePath, document};
    }

    static async getUserInfoByUserId(userId: string) {
        const userInfo = await UserRepository.FindById(userId);
        if (!userInfo) {
            throw new Error("User info not found");
        }
        return userInfo;
    }

    static async getUserInfoById(id: string) {
        const userInfo = await UserInfoRepository.FindById(id);
        if (!userInfo) {
            throw new Error("User info not found");
        }
        return userInfo;
    }

    static async getAllUserInfos(search?: string) {
        const userInfos = await UserInfoRepository.FindAll(search);
        return userInfos;
    }

    static async deleteUserInfoByUserId(userId: string) {
        const userInfo = await UserInfoRepository.DeleteByUserId(userId);
        if (!userInfo) {
            throw new Error("User info not found");
        }
        return userInfo;
    }
}

export default UserInfoService;