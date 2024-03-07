import { db } from "../utils/dbServer";
import { Jadwal } from "../types/jadwal";


const formatIndonesianDate = (dateString: Date) => {
    return new Date(dateString).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
    });
};

// ngambil 1 jadwal
export const getjadwalById = async (jadwalId): Promise<Jadwal> => {
    const jadwalData = await db.jadwal.findFirst({
        where: {
            id: jadwalId,
        },
        select: {
            id: true,
            namaJadwal: true,
            waktuKunjungan: true,
            kapasitas: true,
            hargaTiket: true,
            planetariumId: true,
            deskripsiJadwal: true,
        },
    });
    
    const modifiedData: Jadwal = {
        ...jadwalData,
        waktuKunjungan: formatIndonesianDate(jadwalData.waktuKunjungan),
    };
    return modifiedData;
}

// ngambil jadwal di landing page
export const getjadwal = async (page: number): Promise<Jadwal[]> => {
    const skip = (page - 1) * 6;
    const take = 6;

    const jadwalData = await db.jadwal.findMany({
        select: {
            id: true,
            namaJadwal: true,
            waktuKunjungan: true,
            kapasitas: true,
            hargaTiket: true,
            planetariumId: true,
            deskripsiJadwal: true,
            Planetarium: {
                select: {
                    imagePath: true,  
                },
            },
        },
        skip,
        take,
    });

    const modifiedData: Jadwal[] = jadwalData.map((jadwalItem) => {
        const { Planetarium, ...rest } = jadwalItem;
        return {
            ...rest,
            waktuKunjungan: formatIndonesianDate(jadwalItem.waktuKunjungan),
            imagePath: jadwalItem.Planetarium?.imagePath[0],
        };
    });
    return modifiedData;
};