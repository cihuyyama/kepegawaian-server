import { db } from "../../config/prisma";
import { CreateRiwayatPendidikanSchema } from "./pendidikan.schema";

class RiwayatPendidikanService {
    static async createRiwayatPendidikan(data: CreateRiwayatPendidikanSchema) {
        const pendidikan = await db.riwayatPendidikan.create({
            data: {
                userId: data.userId,
                pendidikan: data.pendidikan,
                namaInstitusi: data.namaInstitusi,
                tahunLulus: data.tahunLulus,
            }
        });

        return pendidikan;
    }

    static async getAllRiwayatPendidikanByUserId(userId: string) {
        const pendidikanList = await db.riwayatPendidikan.findMany({
            where: {
                userId: userId
            }
        });

        return pendidikanList;
    }

    static async getRiwayatPendidikanById(id: string) {
        const pendidikan = await db.riwayatPendidikan.findUnique({
            where: {
                id: id
            }
        });

        return pendidikan;
    }

    static async updateRiwayatPendidikan(id: string, data: CreateRiwayatPendidikanSchema) {
        const pendidikan = await db.riwayatPendidikan.update({
            where: {
                id: id
            },
            data: {
                pendidikan: data.pendidikan,
                namaInstitusi: data.namaInstitusi,
                tahunLulus: data.tahunLulus,
            }
        });

        return pendidikan;
    }

    static async deleteRiwayatPendidikan(id: string) {
        const pendidikan = await db.riwayatPendidikan.delete({
            where: {
                id: id
            }
        });

        return pendidikan;
    }
}

export default RiwayatPendidikanService;