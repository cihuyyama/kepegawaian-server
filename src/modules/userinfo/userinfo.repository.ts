import { db } from "../../config/prisma";
import { CreateUserInfoInput } from "./userinfo.schema";

class UserInfoRepository {
    static async Upsert(data: CreateUserInfoInput) {
        const userInfo = await db.userInfo.upsert({
            where: {
                userId: data.userId,
            },
            update: {
                NIP: data.NIP,
                GelarDepan: data.GelarDepan,
                GelarBelakang: data.GelarBelakang,
                TempatLahir: data.TempatLahir,
                TanggalLahir: data.TanggalLahir,
                JenisKelamin: data.JenisKelamin,
                Alamat: data.Alamat,
                Phone: data.Phone,
                NBM: data.NBM,
                NIDN: data.NIDN,
                NIDK: data.NIDK,
                NUPTK: data.NUPTK,
                IDScholar: data.IDScholar,
                IDScopus: data.IDScopus,
                IDShinta: data.IDShinta,
                IDGaruda: data.IDGaruda,
                NPWP: data.NPWP,
                NIK: data.NIK,
                JabatanStruktural: data.JabatanStruktural,
                JabatanFungsional: data.JabatanFungsional,
                WorkEmail: data.WorkEmail,
            },
            create: {
                userId: data.userId,
                NIP: data.NIP,
                GelarDepan: data.GelarDepan,
                GelarBelakang: data.GelarBelakang,
                TempatLahir: data.TempatLahir,
                TanggalLahir: data.TanggalLahir,
                JenisKelamin: data.JenisKelamin,
                Alamat: data.Alamat,
                Phone: data.Phone,
                NBM: data.NBM,
                NIDN: data.NIDN,
                NIDK: data.NIDK,
                NUPTK: data.NUPTK,
                IDScholar: data.IDScholar,
                IDScopus: data.IDScopus,
                IDShinta: data.IDShinta,
                IDGaruda: data.IDGaruda,
                NPWP: data.NPWP,
                NIK: data.NIK,
                JabatanStruktural: data.JabatanStruktural,
                JabatanFungsional: data.JabatanFungsional,
                WorkEmail: data.WorkEmail,

            },
        });

        return userInfo;
    }

    static async FindAll(search?: string) {
        const userInfos = await db.userInfo.findMany({
            where: {
                
            }
        });
        return userInfos;
    }

    static async FindByUserId(userId: string) {
        const userInfo = await db.userInfo.findUnique({
            where: {
                userId,
            },
            select: {
                id: true,
                userId: true,
                NIP: true,
                GelarDepan: true,
                GelarBelakang: true,
                TempatLahir: true,
                TanggalLahir: true,
                JenisKelamin: true,
                Alamat: true,
                Phone: true,
                NBM: true,
                NIDN: true,
                NIDK: true,
                NUPTK: true,
                IDScholar: true,
                IDScopus: true,
                IDShinta: true,
                IDGaruda: true,
                NPWP: true,
                NIK: true,
                JabatanStruktural: true,
                JabatanFungsional: true,
                WorkEmail: true,
                KTP: true,
                DocNBM: true,
                DocNIDN: true,
                BPJSKesehatan: true,
                BPJSKetenagakerjaan: true,
                Passport: true,
                SertifikasiDosen: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        role: true,
                        imgUrl: true,
                    }
                }
            }
        });

        return userInfo;
    }

    static async FindById(id: string) {
        const userInfo = await db.userInfo.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                userId: true,
                NIP: true,
                GelarDepan: true,
                GelarBelakang: true,
                TempatLahir: true,
                TanggalLahir: true,
                JenisKelamin: true,
                Alamat: true,
                Phone: true,
                NBM: true,
                NIDN: true,
                NIDK: true,
                NUPTK: true,
                IDScholar: true,
                IDScopus: true,
                IDShinta: true,
                IDGaruda: true,
                NPWP: true,
                NIK: true,
                JabatanStruktural: true,
                JabatanFungsional: true,
                WorkEmail: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        role: true,
                        imgUrl: true,
                    }
                }
            }
        });

        return userInfo;
    }

    static async DeleteByUserId(userId: string) {
        const userInfo = await db.userInfo.delete({
            where: {
                userId,
            },
        });

        return userInfo;
    }
}

export default UserInfoRepository;