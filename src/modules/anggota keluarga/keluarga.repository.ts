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
        
    }
}

export default KeluargaRepository;