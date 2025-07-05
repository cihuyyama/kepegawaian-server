import UnitKerjaRepository from "./unit-kerja.repository";
import { CreateUnitKerjaInput } from "./unit-kerja.schema";

class UnitKerjaService {
    static async createUnitKerja(data: CreateUnitKerjaInput) {
        const unitKerja = await UnitKerjaRepository.Insert(data);
        return unitKerja;
    }

    static async connectAnggota(unitKerjaId: string, anggotaId: string[]) {
        const unitKerja = await UnitKerjaRepository.ConnectAnggota(unitKerjaId, anggotaId);
        return unitKerja;
    }

    static async disconnectAnggota(unitKerjaId: string, anggotaId: string[]) {
        const unitKerja = await UnitKerjaRepository.DisconnectAnggota(unitKerjaId, anggotaId);
        return unitKerja;
    }

    static async connectKepalaUnitKerja(unitKerjaId: string, kepalaUnitKerjaId: string) {
        const unitKerja = await UnitKerjaRepository.ConnectKepalaUnitKerja(unitKerjaId, kepalaUnitKerjaId);
        return unitKerja;
    }

    static async disconnectKepalaUnitKerja(unitKerjaId: string) {
        const unitKerja = await UnitKerjaRepository.DisconnectKepalaUnitKerja(unitKerjaId);
        return unitKerja;
    }

    static async getAllUnitKerja(name?: string) {
        const unitKerja = await UnitKerjaRepository.FindAll(name);
        return unitKerja;
    }

    static async getUnitKerjaById(id: string) {
        const unitKerja = await UnitKerjaRepository.FindById(id);
        if (!unitKerja) {
            throw new Error("Unit Kerja not found");
        }
        return unitKerja;
    }

    static async updateUnitKerja(id: string, data: CreateUnitKerjaInput) {
        const unitKerja = await UnitKerjaRepository.Update(id, data);
        if (!unitKerja) {
            throw new Error("Unit Kerja not found");
        }
        return unitKerja;
    }

    static async deleteUnitKerja(id: string) {
        const unitKerja = await UnitKerjaRepository.Delete(id);
        if (!unitKerja) {
            throw new Error("Unit Kerja not found");
        }
        return unitKerja;
    }
}

export default UnitKerjaService;