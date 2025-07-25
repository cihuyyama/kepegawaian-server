import { db } from "../../config/prisma";
import KeluargaRepository from "./keluarga.repository";
import { CreateKeluargaSchema } from "./keluarga.schema";

class KeluargaService {
    static async createKeluarga(userId: string, data: CreateKeluargaSchema) {
        const keluarga = KeluargaRepository.Insert(userId, data)

        return keluarga
    }

    static async getAllKeluargaByUserId(userId: string) {
        const keluarga = KeluargaRepository.FindAllByUserId(userId)

        return keluarga
    }

    static async getKeluargaById(id: string) {
        const keluarga = KeluargaRepository.FindById(id)

        return keluarga
    }
    
    static async updateKeluarga (id: string, data: CreateKeluargaSchema) {
        const keluarga = KeluargaRepository.Update(id, data)

        return keluarga
    }

    static async deleteKeluarga (id: string) {
        const keluarga = KeluargaRepository.Delete(id)

        return keluarga
    }
}

export default KeluargaService