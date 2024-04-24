import { db } from "../utils/dbServer";
import { NotifikasiRequest, RequestPesanan } from "../types/request";
import { Pesanan, DetailPesanan, DetailRequest, DetailTiket } from "../types/pesanan";
import { formatIndonesianDate } from "./jadwalController";

// ngambil semua request buat notifikasi
export const getRequestsByPlanetariumId = async (
  planetariumId: number
): Promise<NotifikasiRequest[]> => {
  const requests = await db.request.findMany({
    select: {
      id: true,
      waktuKunjungan: true,
      namaPemesan: true,
      jumlahTiket: true,
      note: true,
    },
    where: {
      planetariumId: planetariumId,
    },
  });

  const modifiedData: NotifikasiRequest[] = requests.map((items) => {
    return {
      ...items,
      waktuKunjungan: items.waktuKunjungan,
    };
  });

  return modifiedData;
};

//ngambil satu request by id buar detail pesanan
export const getPesananById = async (id: number | string): Promise<DetailPesanan> => {
  let detailPesanan: DetailRequest | DetailTiket = null;

  if (typeof id === "number") {
    detailPesanan = await db.request.findFirst({
      select: {
        id: true,
        planetariumId: true,
        waktuKunjungan: true,
        namaPemesan: true,
        jumlahTiket: true,
        noTelepon: true,
        email: true,
        konfirmasi: true,
        note: true,
      },
      where: {
        id: id,
      },
    });
  } else {
    detailPesanan = await db.tiket.findFirst({
      select: {
        id: true,
        namaPemesan: true,
        jumlahTiket: true,
        noTelepon: true,
        email: true,
        statusTiket: true,
        Request: {
          select: {
            planetariumId: true,
            waktuKunjungan: true,
          },
        },
        Jadwal: {
          select: {
            planetariumId: true,
            waktuKunjungan: true,
          },
        },
      },
      where: {
        id: id,
      },
    });
  }

  const modifiedData: DetailPesanan =
    "konfirmasi" in detailPesanan
      ? {
          ...detailPesanan,
          statusTiket: detailPesanan.konfirmasi ? "Ditolak" : "Disetujui",
        }
      : {
          ...detailPesanan,
          waktuKunjungan: 
            detailPesanan.Jadwal.waktuKunjungan !== null
              ? formatIndonesianDate(detailPesanan.Jadwal.waktuKunjungan)
              : detailPesanan.Request.waktuKunjungan
          ,
          planetariumId:
            detailPesanan.Jadwal.planetariumId !== null
              ? detailPesanan.Jadwal.planetariumId
              : detailPesanan.Request.planetariumId,
          note: "",
        };

  return modifiedData;
};

// get list pesanan

export const getListPesananByPlanetariumId =  async (planetariumId: number): Promise<Pesanan[]> => {
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
      waktuAcara: items.waktuKunjungan,
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
      waktuAcara: items.waktuAcara[2],
      waktuDipesan: formatIndonesianDate(items.waktuDipesan)[2],
    };
  });

  return modifiedData;
};
