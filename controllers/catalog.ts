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
