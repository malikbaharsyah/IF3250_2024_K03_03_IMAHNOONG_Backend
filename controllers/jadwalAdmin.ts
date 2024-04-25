import { db } from "../utils/dbServer";
import { JadwalAdmin, JadwalAdminSorted } from "../types/jadwal";
import { formatIndonesianDate } from "./jadwalController";

export const getListJadwal = async (
  planetariumId: number
): Promise<JadwalAdminSorted[]> => {
  const kunjungan = await db.jadwal.findMany({
    where: {
      planetariumId: planetariumId,
    },
    select: {
      id: true,
      namaJadwal: true,
      waktuKunjungan: true,
      kapasitas: true,
      planetariumId: true,
      deskripsiJadwal: true,
      imagePath: true,
    },
  });

  const request = await db.tiket.findMany({
    where: {
        Request: {
            planetariumId: planetariumId,
        }
    },
    select: {
        id: true,
        Request: {
            select: {
                namaPemesan: true,
                waktuKunjungan: true,
                jumlahTiket: true,
                planetariumId: true,
                note: true,
            }
        }
    }
  })

  const modifiedKunjungan: JadwalAdmin[] = kunjungan.map((item) => {
    return {
        ...item,
        jenis: "Kunjungan"
    }
  });

  const modifiedRequests: JadwalAdmin[] = request.map((item) => {
    const { Request, ...rest} = item
    return {
        ...rest,
        jenis: "Request",
        imagePath: [],
        namaJadwal: Request.namaPemesan,
        deskripsiJadwal: Request.note,
        waktuKunjungan: Request.waktuKunjungan,
        kapasitas: Request.jumlahTiket,
    }
  });

  const pesanan = modifiedRequests
    .concat(modifiedKunjungan)
    .sort((a, b) => a.waktuKunjungan.getTime() - b.waktuKunjungan.getTime());

    const modifiedData: JadwalAdminSorted[] = pesanan.map((item) => {
        const stringWaktuKunjungan = formatIndonesianDate(item.waktuKunjungan)
        return {
            ...item,
            tanggal: stringWaktuKunjungan[2],
            waktu: stringWaktuKunjungan[1],
        }
    })

  return modifiedData;

};
