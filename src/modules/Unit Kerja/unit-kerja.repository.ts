import { db } from "../../config/prisma";
import { CreateUnitKerjaInput } from "./unit-kerja.schema";

class UnitKerjaRepository {
    static async Insert(data: CreateUnitKerjaInput) {
        const {
            name,
            kepalaUnitKerjaId,
            anggota,
        } = data
        const unitKerja = await db.unitKerja.create({
            data: {
                name,
                kepalaUnitKerjaId,
                ...(anggota && {
                    Anggota: {
                        connect: anggota.map((id)=> ({ id })),
                    }
                })
            }
        })
    }

    static async ConnectAnggota(
        unitKerjaId: string,
        anggotaId: string[],
    ) {
        const unitKerja = await db.unitKerja.update({
            where: {
                id: unitKerjaId,
            },
            data: {
                Anggota: {
                    connect: anggotaId.map((id) => ({ id })),
                }
            }
        })

        return unitKerja;
    }

    static async DisconnectAnggota(
        unitKerjaId: string,
        anggotaId: string[],
    ) {
        const unitKerja = await db.unitKerja.update({
            where: {
                id: unitKerjaId,
            },
            data: {
                Anggota: {
                    disconnect: anggotaId.map((id) => ({ id })),
                }
            }
        })

        return unitKerja;
    }

    static async ConnectKepalaUnitKerja(
        unitKerjaId: string,
        kepalaUnitKerjaId: string,
    ) {
        const unitKerja = await db.unitKerja.update({
            where: {
                id: unitKerjaId,
            },
            data: {
                KepalaUnitKerja: {
                    connect: { id: kepalaUnitKerjaId },
                }
            }
        })

        return unitKerja;
    }
    
    static async DisconnectKepalaUnitKerja(
        unitKerjaId: string,
    ) {
        const unitKerja = await db.unitKerja.update({
            where: {
                id: unitKerjaId,
            },
            data: {
                KepalaUnitKerja: {
                    disconnect: true,
                }
            }
        })

        return unitKerja;
    }

    static async FindAll(
        search?: string,
    ) {
        const unitKerja = await db.unitKerja.findMany({
            where: {
                name: {
                    contains: search,
                }
            },
            include: {
                KepalaUnitKerja: true,
                Anggota: true,
            },
        })

        return unitKerja;
    }

    static async FindById(id: string) {
        const unitKerja = await db.unitKerja.findUnique({
            where: {
                id
            },
            include: {
                KepalaUnitKerja: true,
                Anggota: true,
            },
        })

        return unitKerja;
    }

    static async Update(id: string, data: CreateUnitKerjaInput) {
        const {
            name,
            kepalaUnitKerjaId,
            anggota,
        } = data

        const unitKerja = await db.unitKerja.update({
            where: {
                id
            },
            data: {
                name,
                kepalaUnitKerjaId,
                ...(anggota && {
                    Anggota: {
                        set: anggota.map((id)=> ({ id })),
                    }
                })
            }
        })

        return unitKerja;
    }

    static async Delete(id: string) {
        const unitKerja = await db.unitKerja.delete({
            where: {
                id
            }
        })

        return unitKerja;
    }
}

export default UnitKerjaRepository;