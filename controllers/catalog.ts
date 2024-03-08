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
