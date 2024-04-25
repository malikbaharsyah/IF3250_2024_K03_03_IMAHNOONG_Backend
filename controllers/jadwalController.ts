import { db } from "../utils/dbServer";
import { Jadwal, JadwalCatalog } from "../types/jadwal";



export const formatIndonesianDate = (date: Date) => {
    const formattedDateWithDay = date.toLocaleString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedTime = date.toLocaleString('id-ID', {
        hour: 'numeric',
        minute: 'numeric',
    });

    const formattedDate = date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    
    return [formattedDateWithDay, formattedTime, formattedDate];

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

// ngambil catalog di landingpage
export const getCatalog = async (): Promise<JadwalCatalog[]> => {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
    const catalogData = await db.jadwal.findMany({
        where: {
            waktuKunjungan: {
              gte: currentDate,
                lte: endDate,
            },
          },
          distinct: ['planetariumId'],
          select: {
            id: true,
            planetariumId: true,
            Planetarium: {
                select: {
                    namaPlanetarium: true,
                    deskripsi: true,
                    imagePath: true, 
                    lokasi: true, 
                },
            },
        },
    });

    const modifiedData: JadwalCatalog[] = catalogData.map((jadwalItem) => {
        const { Planetarium, ...rest } = jadwalItem;
        return {
            ...rest,
            imagePath: [jadwalItem.Planetarium?.imagePath[0]],
            lokasi: jadwalItem.Planetarium?.lokasi,
            namaPlanetarium: jadwalItem.Planetarium?.namaPlanetarium,
            deskripsi: jadwalItem.Planetarium?.deskripsi,
        };
    });
    return modifiedData;

};


// ngambil event di landing page
export const getjadwal = async (): Promise<Jadwal[]> => {
    const take = 3;
    const currentDate = new Date();
    const jadwalData = await db.jadwal.findMany({
        where: {
            waktuKunjungan: {
              gte: currentDate,
            },
          },
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
                    lokasi: true, 
                },
            },
        },
        orderBy: {
            waktuKunjungan: 'asc',
          },

        take,
    });

    const modifiedData: Jadwal[] = jadwalData.map((jadwalItem) => {
        const { Planetarium, ...rest } = jadwalItem;
        return {
            ...rest,
            waktuKunjungan: formatIndonesianDate(jadwalItem.waktuKunjungan),
            imagePath: jadwalItem.Planetarium?.imagePath[0],
            lokasi: jadwalItem.Planetarium?.lokasi,
        };
    });
    return modifiedData;
};

// ngambil jadwal di list jadwal
export const getListJadwal = async (searcDate): Promise<Jadwal[]> => {
    
    const endDate = new Date(searcDate);
    endDate.setDate(endDate.getDate() + 1);
    

    const jadwalData = await db.jadwal.findMany({
        where: {
            waktuKunjungan: {
              gte: searcDate,
                lt: endDate,
            },
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
        orderBy: {
            waktuKunjungan: 'asc',
          },
    });

    const modifiedData: Jadwal[] = jadwalData.map((jadwalItem) => {
        return {
            ...jadwalItem,
            waktuKunjungan: formatIndonesianDate(jadwalItem.waktuKunjungan),
        };
    });
    
    return modifiedData;
}

