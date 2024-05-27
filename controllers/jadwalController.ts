import { db } from "../utils/dbServer";
import { Jadwal, JadwalCatalog, JadwalEdit } from "../types/jadwal";



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
export const getjadwalById = async (jadwalId): Promise<JadwalEdit> => {
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
            durasi: true,
            imagePath: true
        },
    });
    
    const modifiedData: JadwalEdit = {
        ...jadwalData,
        waktuKunjungan: jadwalData.waktuKunjungan.toISOString(),
    };
    return modifiedData;
}

// ngambil catalog di landingpage
export const getCatalog = async (): Promise<JadwalCatalog[]> => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)
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
    currentDate.setHours(0, 0, 0, 0)
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
            imagePath: true,
            durasi: true,
            Planetarium: {
                select: {
                    // imagePath: true, 
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
            date: jadwalItem.waktuKunjungan,
            waktuKunjungan: formatIndonesianDate(jadwalItem.waktuKunjungan),
        };
    });
    return modifiedData;
};

export const getClosestJadwal = async (id): Promise<Jadwal[]> => {
    const take = 3;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)
    const jadwalData = await db.jadwal.findMany({
        where: {
            waktuKunjungan: {
              gte: currentDate,
            },
            planetariumId: id
          },
        select: {
            id: true,
            namaJadwal: true,
            waktuKunjungan: true,
            kapasitas: true,
            hargaTiket: true,
            planetariumId: true,
            deskripsiJadwal: true,
            imagePath: true,
            durasi: true,
            Planetarium: {
                select: {
                    // imagePath: true, 
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
            date: jadwalItem.waktuKunjungan,
            waktuKunjungan: formatIndonesianDate(jadwalItem.waktuKunjungan),
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
            imagePath: true,
            durasi: true,
            
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


export const addJadwal = async (title: string, date: string, kapasitas: number, hargaTiket: number, planetariumId: number, deskripsiJadwal: string, isKunjungan: boolean, durasi: number, imagePath: string): Promise<void> => {
    await db.jadwal.create({
        data: {
            namaJadwal: title,
            waktuKunjungan: new Date(date),
            kapasitas,
            hargaTiket,
            planetariumId,
            deskripsiJadwal,
            isDefault : isKunjungan,
            durasi,
            imagePath : [imagePath],
        },
    });
    
}

export const editJadwal = async (jadwalId: number, title: string, date: string, kapasitas: number, hargaTiket: number, planetariumId: number, deskripsiJadwal: string, isKunjungan: boolean, durasi: number, imagePath: string): Promise<void> => {
    await db.jadwal.update({
        where: { id: jadwalId },
        data: {
            namaJadwal: title,
            waktuKunjungan: new Date(date),
            kapasitas,
            hargaTiket,
            planetariumId,
            deskripsiJadwal,
            isDefault : isKunjungan,
            durasi,
            imagePath : [imagePath],
        },
    });
    
}

export const deleteJadwal = async (jadwalId: number): Promise<void> => {
    await db.jadwal.delete({ where: { id: jadwalId } });
    
}

