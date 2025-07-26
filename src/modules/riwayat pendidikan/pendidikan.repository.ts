import { db } from "../../config/prisma";
import { CreateRiwayatPendidikanSchema } from "./pendidikan.schema";

class RiwayatPendidikanRepository {
    static async Insert (data: CreateRiwayatPendidikanSchema) {
        const result = await db.riwayatPendidikan.create({
            data,
        });
        return result;
    }

    static async FindAllByUserId(userId: string) {
        const pendidikanList = await db.riwayatPendidikan.findMany({
            where: {
                userId: userId
            }
        });
        return pendidikanList;
    }

    static async FindById(id: string) {
        const pendidikan = await db.riwayatPendidikan.findUnique({
            where: {
                id: id
            }
        });
        return pendidikan;
    }

    static async Update(id: string, data: CreateRiwayatPendidikanSchema) {
        const pendidikan = await db.riwayatPendidikan.update({
            where: {
                id: id
            },
            data: data
        });
        return pendidikan;
    }

    static async Delete(id: string) {
        const pendidikan = await db.riwayatPendidikan.delete({
            where: {
                id: id
            }
        });
        return pendidikan;
    }
}

export default RiwayatPendidikanRepository;