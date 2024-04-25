import { db } from "../utils/dbServer";
import { Planetarium } from "../types/planetarium";

// ngambil semua planetarium
export const getCatalog = async (): Promise<Planetarium[]> => {
  return db.planetarium.findMany({
    select: {
      id: true,
      namaPlanetarium: true,
      deskripsi: true,
      imagePath: true,
      lokasi: true,
      rating: true,
    },
  });
};

//onclick satu planetarium, triggers query 1 planetarium
export const getPlanetariumById = async (id : number): Promise<Planetarium> => {
  return db.planetarium.findFirst({
    select: {
      id: true,
      namaPlanetarium: true,
      deskripsi: true,
      imagePath: true,
      lokasi: true,
      rating: true,
    },
    where: {
      id: id
    }
  })
};

export const editPlanetarium = async (
  planetariumId: number,
  namaPlanetarium: string,
  deskripsi: string,
  imagePath: string[],
  lokasi: string,
  rating: string | null,
  prosedurPendaftaran: string,
  tataTertib: string,
  noTelepon: string
): Promise<void> => {
  await db.planetarium.update({
      where: { id: planetariumId },
      data: {
          namaPlanetarium,
          deskripsi,
          imagePath,
          lokasi,
          rating,
          prosedurPendaftaran,
          tataTertib,
          noTelepon,
      },
  });
}
