import { db } from "../utils/dbServer";
import { EditPlanetarium, Planetarium } from "../types/planetarium";

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
export const getPlanetariumById = async (id : number): Promise<EditPlanetarium> => {
  return db.planetarium.findFirst({
    select: {
      id: true,
      namaPlanetarium: true,
      deskripsi: true,
      prosedurPendaftaran: true,
      tataTertib: true,
      noTelepon: true,
      imagePath: true,
      lokasi: true,
      
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
  prosedurPendaftaran: string,
  tataTertib: string,
  noTelepon: string,
  imagePath: string[],
  lokasi: string,
): Promise<void> => {
  await db.planetarium.update({
      where: { id: planetariumId },
      data: {
          namaPlanetarium,
          deskripsi,
          imagePath,
          lokasi,
          prosedurPendaftaran,
          tataTertib,
          noTelepon,
      },
  });
}

export const createPlanetarium = async (
  namaPlanetarium: string,
  deskripsi: string,
  prosedurPendaftaran: string,
  tataTertib: string,
  noTelepon: string,
  imagePath: string[],
  lokasi: string,
): Promise<void> => {
  await db.planetarium.create({
      data: {
          namaPlanetarium,
          deskripsi,
          imagePath,
          lokasi,
          prosedurPendaftaran,
          tataTertib,
          noTelepon,
      },
  });
}