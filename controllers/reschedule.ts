import { Jadwal, Tiket } from "@prisma/client";
import { db } from "../utils/dbServer";


export const rescheduleTiket = async (idTiket, newDate, newTime): Promise<Tiket> => {
    const currentTiket = await getTiket(idTiket);
    
}

const getTiket = async (idTiket): Promise<Tiket> => {
    const tiket = await db.tiket.findFirst({
        where: {
            id: idTiket
        }
    });
    return tiket;
}

const getJadwalByTiket = async (idTiket): Promise<Jadwal> => {
    const jadwal = await db.jadwal.findFirst({
        where: {
            id: idTiket
        }
    });
    return jadwal;
}