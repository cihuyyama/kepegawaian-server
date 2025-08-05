import { MultipartFile } from "@fastify/multipart";
import { db } from "../../config/prisma";
import { FileEntries, UserDocuments } from "../../utils/types";
import { CreateUserInfoInput } from "./userinfo.schema";
import { Prisma } from "@prisma/client";

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
                agama: data.agama,
                golonganDarah: data.golonganDarah,
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
                agama: data.agama,
                golonganDarah: data.golonganDarah,
            },
        });

        return userInfo;
    }

    static async UpsertDocuments(userId: string, documentType: UserDocuments, file: FileEntries) {
        return await db.$transaction(async (tx: Prisma.TransactionClient) => {
            const newFile = await tx.file.create({
                data: {
                    filename: file.filename,
                    originalName: file.originalName,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                    extension: file.extension,
                }
            });

            let updateData: Prisma.UserInfoUpdateInput = {};
            let createData: Prisma.UserInfoCreateInput = {
                user: { connect: { id: userId } }
            };

            switch (documentType) {
                case UserDocuments.KTP:
                    updateData.KTP = { connect: { id: newFile.id } };
                    createData.KTP = { connect: { id: newFile.id } };
                    break;
                case UserDocuments.DocNBM:
                    updateData.DocNBM = { connect: { id: newFile.id } };
                    createData.DocNBM = { connect: { id: newFile.id } };
                    break;
                case UserDocuments.DocNIDN:
                    updateData.DocNIDN = { connect: { id: newFile.id } };
                    createData.DocNIDN = { connect: { id: newFile.id } };
                    break;
                case UserDocuments.Passport:
                    updateData.Passport = { connect: { id: newFile.id } };
                    createData.Passport = { connect: { id: newFile.id } };
                    break;
                case UserDocuments.BPJSKesehatan:
                    updateData.BPJSKesehatan = { connect: { id: newFile.id } };
                    createData.BPJSKesehatan = { connect: { id: newFile.id } };
                    break;
                case UserDocuments.BPJSKetenagakerjaan:
                    updateData.BPJSKetenagakerjaan = { connect: { id: newFile.id } };
                    createData.BPJSKetenagakerjaan = { connect: { id: newFile.id } };
                    break;
                case UserDocuments.SertifikasiDosen:
                    updateData.SertifikasiDosen = { connect: { id: newFile.id } };
                    createData.SertifikasiDosen = { connect: { id: newFile.id } };
                    break;
                default:
                    throw new Error(`Unsupported document type: ${documentType}`);
            }
            const userInfo = await tx.userInfo.upsert({
                where: {
                    userId,
                },
                update: updateData,
                create: createData,
                include: {
                    KTP: true,
                    DocNBM: true,
                    DocNIDN: true,
                    Passport: true,
                    BPJSKesehatan: true,
                    BPJSKetenagakerjaan: true,
                    SertifikasiDosen: true,
                }
            });

            return userInfo;
        });
    }

    static async FindAll(search?: string) {
        const userInfos = await db.userInfo.findMany({
            where: {
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
                agama: true,
                golonganDarah: true,
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
                agama: true,
                golonganDarah: true,
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
                agama: true,
                golonganDarah: true,
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