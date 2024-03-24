import { db } from "../utils/dbServer";
import { Jadwal, JadwalCatalog } from "../types/jadwal";

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