import { db } from "../utils/dbServer";
import { Request } from "../types/request";
import { formatIndonesianDate } from "./jadwalController";

// ngambil semua request buat notifikasi
export const getRequestsByPlanetariumId = async (idPlanetarium: number): Promise<Request[]> => {
    return db.request.findMany({
      select: {
        id: true,
        waktuKunjungan: true,
        namaPemesan: true,
        jumlahTiket: true,
        note: true,
      },
      where: {
        idPlanetarium: idPlanetarium,
      },
    });
  };

//ngambil satu request by id buar detail request
export const getRequestById = async (id: number): Promise<Request> => {
  return db.request.findFirst({
    select: {
        id: true,
        idPlanetarium: true,
        waktuKunjungan: true,
        namaPemesan: true,
        jumlahTiket: true,
        noTelpon: true,
        email: true,
        note: true,
    },
    where: {
      id: id,
    },
  });
};