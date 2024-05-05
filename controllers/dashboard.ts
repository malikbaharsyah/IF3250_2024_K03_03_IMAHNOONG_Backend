import { db } from "../utils/dbServer";
import { Tiket } from "../types/tiket";
import { formatIndonesianDate } from "./jadwalController";
import { Pesanan } from "../types/pesanan";

export const getPesananHariIni = async (
  planetariumId: number
): Promise<Pesanan[]> => {
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setHours(23, 59, 59, 999);
  const tiket = await db.tiket.findMany({
    select: {
      id: true,
      namaPemesan: true,
      email: true,
      waktuDibuat: true,
      statusTiket: true,
      idRequest: true,
      Jadwal: {
        select: {
          namaJadwal: true,
          waktuKunjungan: true,
        },
      },
    },
    where: {
      waktuDibuat: {
        gte: currentDate,
        lte: endDate,
      },
      Jadwal: {
        planetariumId: planetariumId,
      },
    },
  });

  const requestIds = tiket
    .filter((item) => item.idRequest !== null)
    .map((item) => item.idRequest);

  const requests = await db.request.findMany({
    select: {
      id: true,
      namaPemesan: true,
      email: true,
      waktuKunjungan: true,
      waktuDibuat: true,
      konfirmasi: true,
    },
    where: {
      planetariumId: planetariumId,
      waktuDibuat: {
        gte: currentDate,
        lte: endDate,
      },
      id: {
        notIn: requestIds,
      },
    },
  });

  const modifiedRequests = requests.map((items) => {
    return {
      id: items.id.toString(),
      namaPemesan: items.namaPemesan,
      email: items.email,
      namaAcara: "",
      waktuAcara: formatIndonesianDate(items.waktuKunjungan),
      waktuDipesan: items.waktuDibuat,
      statusTiket: items.konfirmasi ? "Ditolak" : "Disetujui",
    };
  });

  const modifiedTiket = tiket.map((items) => {
    const { Jadwal, ...rest } = items;
    return {
      id: items.id,
      namaPemesan: items.namaPemesan,
      email: items.email,
      namaAcara: items.Jadwal.namaJadwal,
      waktuAcara: formatIndonesianDate(items.Jadwal.waktuKunjungan),
      waktuDipesan: items.waktuDibuat,
      statusTiket: items.statusTiket,
    };
  });

  const pesanan = modifiedRequests
    .concat(modifiedTiket)
    .sort((a, b) => a.waktuDipesan.getTime() - b.waktuDipesan.getTime());

  const modifiedData: Pesanan[] = pesanan.map((items) => {
    return {
      ...items,
      waktuAcara: items.waktuAcara[2] + " " + items.waktuAcara[1],
      waktuDipesan: formatIndonesianDate(items.waktuDipesan)[2] + " " + formatIndonesianDate(items.waktuDipesan)[1],
    };
  });

  return modifiedData;

};
