import { db } from "../utils/dbServer";
import { Jadwal, JadwalCatalog } from "../types/jadwal";

export const getCatalogDefault = async (): Promise<JadwalCatalog[]> => {
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

    const planetariumIds = modifiedData.map(item => item.planetariumId);
    const hari = currentDate.toLocaleString('id-ID', {
        weekday: 'long',
    });

    
    const jadwalDefaults = await db.jadwalDefault.findMany({
        where: {
            hari: hari,
            NOT: {
                planetariumId: {
                    in: planetariumIds
                }
            }
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

    const modifiedDataDefault: JadwalCatalog[] = jadwalDefaults.map((jadwalItem) => {
        const { Planetarium, ...rest } = jadwalItem;
        return {
            ...rest,
            imagePath: [jadwalItem.Planetarium?.imagePath[0]],
            lokasi: jadwalItem.Planetarium?.lokasi,
            namaPlanetarium: jadwalItem.Planetarium?.namaPlanetarium,
            deskripsi: jadwalItem.Planetarium?.deskripsi,
        };
    });
    
    modifiedData.push(...modifiedDataDefault);
    
    return modifiedData;

};


export const getTiketDefault = async (): Promise<JadwalCatalog[]> => {
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

    const planetariumIds = modifiedData.map(item => item.planetariumId);
    const hari = currentDate.toLocaleString('id-ID', {
        weekday: 'long',
    });

    
    const jadwalDefaults = await db.jadwalDefault.findMany({
        where: {
            hari: hari,
            NOT: {
                planetariumId: {
                    in: planetariumIds
                }
            }
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

    const modifiedDataDefault: JadwalCatalog[] = jadwalDefaults.map((jadwalItem) => {
        const { Planetarium, ...rest } = jadwalItem;
        return {
            ...rest,
            imagePath: [jadwalItem.Planetarium?.imagePath[0]],
            lokasi: jadwalItem.Planetarium?.lokasi,
            namaPlanetarium: jadwalItem.Planetarium?.namaPlanetarium,
            deskripsi: jadwalItem.Planetarium?.deskripsi,
        };
    });
    
    modifiedData.push(...modifiedDataDefault);
    
    return modifiedData;

};

export const getListJadwal = async (planetariumId, searchDate): Promise<Jadwal[]> => {
    
    const day = searchDate.getDay();
    const dayMap = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const hari = dayMap[parseInt(day)];

    console.log(hari, planetariumId)
    const jadwalData = await db.jadwalDefault.findMany({
        where: {
            hari: hari,
            planetariumId: parseInt(planetariumId)
          },
        orderBy: {
            jam: 'asc',
          },
    });

    const modifiedData: Jadwal[] = jadwalData.map((jadwalItem) => {
        return {
            ...jadwalItem,
            waktuKunjungan: [jadwalItem.jam],
        };
    });
    
    return modifiedData;
}