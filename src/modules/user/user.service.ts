import { MultipartFile } from "@fastify/multipart";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { FileEntries } from "../../utils/types";
import UserRepository from "./user.repository";
import { CreateUserInput, LoginUserInput, UpdateUserInput } from "./user.schema";
import path from "path";
import fs from "fs";

class UserService {
    static async Register(data: CreateUserInput) {
        const {
            hash,
            salt,
        } = hashPassword(data.password)

        const user = await UserRepository.Insert(data.email, hash, salt, data.username, data.role, data.unitKerjaId, data.userinfo)
        return user
    }

    static async Login(data: LoginUserInput) {
        const user = await UserRepository.FindByEmail(data.email)
        if (!user) {
            throw new Error("User not found")
        }

        const isValidPassword = verifyPassword({
            candidatePassword: data.password,
            salt: user.salt,
            hash: user.password,
        })
        if (!isValidPassword) {
            throw new Error("Invalid password")
        }

        const payload = {
            id: user.id,
            username: user.username,
        }

        return payload
    }

    static async GetAllUsers(username?: string) {
        const users = await UserRepository.FindAll(username)
        return users
    }

    static async GetUserById(id: string) {
        const user = await UserRepository.FindById(id)
        if (!user) {
            throw new Error("User not found")
        }

        return user
    }

    static async UpdateUser(id: string, data: UpdateUserInput) {
        const user = await UserRepository.Update(id, data)
        if (!user) {
            throw new Error("User not found")
        }

        return user
    }

    static async UpdateUserPhoto(userId: string, imageFile: MultipartFile) {
        const user = await UserRepository.FindById(userId)
        if (!user) {
            throw new Error("User not found")
        }

        // ensure delete old photo if exists
        if (user.photoFile) {
            await fs.promises.unlink(user.photoFile.path);
        }

        const uploadDir = path.join(__dirname, `../../../public/images/users/${user.email}`);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const clearFileName = imageFile.filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const uniqueFilename = `${Date.now()}-${clearFileName}`;
        const filePath = path.join(uploadDir, uniqueFilename);

        await fs.promises.writeFile(filePath, await imageFile.toBuffer());


        const fileData: FileEntries = {
            filename: uniqueFilename,
            originalName: imageFile.filename,
            path: filePath,
            mimetype: imageFile.mimetype,
            size: imageFile.file.bytesRead,
            extension: path.extname(imageFile.filename).toLowerCase(),
        }

        const updateUserPhoto = await UserRepository.UpdatePhoto(userId, fileData)

        if (!updateUserPhoto) {
            throw new Error("Failed to update user photo")
        }

        return updateUserPhoto
    }

    static async changePassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await UserRepository.FindByIdPrivate(userId)
        if (!user) {
            throw new Error("User not found")
        }

        const isValidPassword = verifyPassword({
            candidatePassword: oldPassword,
            salt: user.salt,
            hash: user.password,
        })
        if (!isValidPassword) {
            throw new Error("Invalid password")
        }

        const { hash, salt } = hashPassword(newPassword)
        const updatedUser = await UserRepository.UpdatePassword(userId, hash, salt)

        return updatedUser
    }

    static async deleteUser(id: string) {
        const user = await UserRepository.Delete(id)
        if (!user) {
            throw new Error("User not found")
        }

        return user
    }
}

export default UserService;