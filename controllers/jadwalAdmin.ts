import { db } from "../utils/dbServer";
import { JadwalAdmin, JadwalAdminSorted } from "../types/jadwal";
import { formatIndonesianDate } from "./jadwalController";

export const getListJadwal = async (
  planetariumId: number,
  isDefault: boolean
): Promise<JadwalAdminSorted[]> => {
  const kunjungan = await db.jadwal.findMany({
    where: {
      planetariumId: planetariumId,
      isDefault: isDefault,
    },
    select: {
      id: true,
      namaJadwal: true,
      waktuKunjungan: true,
      kapasitas: true,
      planetariumId: true,
      deskripsiJadwal: true,
      imagePath: true,
      durasi: true,
      hargaTiket: true,
      jadwalDefault: {
        select: {
          hari: true,
        },
      },
    },
  });

  const modifiedKunjungan: JadwalAdminSorted[] = kunjungan.map((item) => {
    return {
      ...item,
      jenis: "Kunjungan",
      tanggal: formatIndonesianDate(item.waktuKunjungan)[2],
      waktu: formatIndonesianDate(item.waktuKunjungan)[1],
      hari: isDefault ? item.jadwalDefault.hari : '', 
    };
  });

  return modifiedKunjungan;
};
