import UserInfoRepository from "./userinfo.repository";
import { CreateUserInfoInput } from "./userinfo.schema";

class UserInfoService {
    static async upsertUserInfo(data: CreateUserInfoInput) {
        const userInfo = await UserInfoRepository.Upsert(data);
        return userInfo;
    } 

    static async getUserInfoByUserId(userId: string) {
        const userInfo = await UserInfoRepository.FindByUserId(userId);
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