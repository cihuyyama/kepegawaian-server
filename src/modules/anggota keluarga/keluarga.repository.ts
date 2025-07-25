import { db } from "../../config/prisma";
import { CreateKeluargaSchema } from "./keluarga.schema";

class KeluargaRepository {
    static async Insert(userId: string, data: CreateKeluargaSchema) {
        const keluarga = await db.anggotaKeluarga.create({
            data: {
                userId: userId,
                nama: data.nama,
                hubunganKeluarga: data.hubunganKeluarga,
                tempatLahir: data.tempatLahir,
                agama: data.agama,
                jenisKelamin: data.jenisKelamin,
                nik: data.nik,
                pendidikan: data.pendidikan,
                tunjanganBeras: data.tunjanganBeras,
                tunjanganKeluarga: data.tunjanganKeluarga,
                potonganAsuransi: data.potonganAsuransi,
                tanggunganPajak: data.tanggunganPajak,
            }
        });

        return keluarga;
    }

    static async FindAllByUserId(userId: string) {
        const keluargaList = await db.anggotaKeluarga.findMany({
            where: {
                userId: userId
            }
        });

        return keluargaList;
    }

    static async FindById(id: string) {
        const keluarga = await db.anggotaKeluarga.findUnique({
            where: {
                id: id
            }
        });

        return keluarga;
    }

    static async Update(id: string, data: CreateKeluargaSchema) {
        const keluarga = await db.anggotaKeluarga.update({
            where: {
                id: id
            },
            data: {
                nama: data.nama,
                hubunganKeluarga: data.hubunganKeluarga,
                tempatLahir: data.tempatLahir,
                agama: data.agama,
                jenisKelamin: data.jenisKelamin,
                nik: data.nik,
                pendidikan: data.pendidikan,
                tunjanganBeras: data.tunjanganBeras,
                tunjanganKeluarga: data.tunjanganKeluarga,
                potonganAsuransi: data.potonganAsuransi,
                tanggunganPajak: data.tanggunganPajak,
            }
        });

        return keluarga;
    }

    static async Delete(id: string) {
        const keluarga = await db.anggotaKeluarga.delete({
            where: {
                id: id
            }
        });

        return keluarga;
    }


}

export default KeluargaRepository;