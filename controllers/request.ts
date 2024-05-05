import { db } from "../utils/dbServer";
import { NotifikasiRequest, RequestPesanan } from "../types/request";
import { Pesanan, DetailPesanan } from "../types/pesanan";
import { formatIndonesianDate } from "./jadwalController";
import { Prisma } from "@prisma/client";

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
      waktuKunjungan: formatIndonesianDate(items.waktuKunjungan),
    };
  });

  return modifiedData;
};

//ngambil satu request by id buar detail pesanan
export const getPesananById = async (
  id: number | string
): Promise<DetailPesanan> => {
  if (typeof id === "number") {
    const detailPesanan = await db.request.findFirst({
      select: {
        id: true,
        planetariumId: true,
        waktuKunjungan: true,
        waktuDibuat: true,
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

    const modifiedData: DetailPesanan = {
      ...detailPesanan,
      waktuDibuat:
        detailPesanan.waktuDibuat !== null
          ? formatIndonesianDate(detailPesanan.waktuDibuat)
          : ["", "", ""],
      waktuKunjungan: formatIndonesianDate(detailPesanan.waktuKunjungan),
      statusTiket: detailPesanan.konfirmasi ? "Ditolak" : "Disetujui",
      jenis: "Permintaan Kunjungan",
      hargaTiket: 0,
      namaJadwal: "Permintaan Kunjungan" + detailPesanan.namaPemesan,
    };

    return modifiedData;
  } else {
    const detailPesanan = await db.tiket.findFirst({
      select: {
        id: true,
        namaPemesan: true,
        jumlahTiket: true,
        noTelepon: true,
        email: true,
        statusTiket: true,
        waktuDibuat: true,
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
            isDefault: true,
            hargaTiket: true,
            namaJadwal: true,
          },
        },
      },
      where: {
        id: id,
      },
    });

    const modifiedData: DetailPesanan = {
      ...detailPesanan,
      waktuDibuat: formatIndonesianDate(detailPesanan.waktuDibuat) || [
        "",
        "",
        "",
      ],
      waktuKunjungan:
        detailPesanan.Jadwal !== null
          ? formatIndonesianDate(detailPesanan.Jadwal.waktuKunjungan)
          : formatIndonesianDate(detailPesanan.Request.waktuKunjungan),
      planetariumId:
        detailPesanan.Jadwal !== null
          ? detailPesanan.Jadwal.planetariumId
          : detailPesanan.Request.planetariumId,
      note: "",
      jenis:
        detailPesanan.Jadwal !== null
          ? detailPesanan.Jadwal.isDefault
            ? "Kunjungan"
            : "Acara"
          : "Permintaan Kunjungan",
      hargaTiket:
        detailPesanan.Jadwal !== null ? detailPesanan.Jadwal.hargaTiket : 0,
      namaJadwal:
        detailPesanan.Jadwal !== null
          ? detailPesanan.Jadwal.namaJadwal
          : "Permintaan Kunjungan" + detailPesanan.namaPemesan,
    };

    return modifiedData;
  }
};

// get list pesanan

export const getListPesananByPlanetariumId = async (
  planetariumId: number,
  isReguler: boolean | null
): Promise<Pesanan[]> => {
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
          isDefault: true,
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
      planetariumId: {
        equals: planetariumId,
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
      jenis: "Request",
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
      jenis: items.Jadwal.isDefault ? "Kunjungan" : "Acara",
    };
  });

  const pesanan = modifiedRequests
    .concat(modifiedTiket)
    .sort((a, b) => a.waktuDipesan.getTime() - b.waktuDipesan.getTime());

  if (isReguler) {
    return modifiedTiket.map((items) => {
      return {
        ...items,
        waktuAcara: items.waktuAcara,
        waktuDipesan: formatIndonesianDate(items.waktuDipesan),
      };
    });
  }
  else if (isReguler===null) {
    return pesanan.map((items) => {
      return {
        ...items,
        waktuAcara: items.waktuAcara,
        waktuDipesan: formatIndonesianDate(items.waktuDipesan),
      };
    });
  }
  else {
    return modifiedRequests.map((items) => {
      return {
        ...items,
        waktuAcara: items.waktuAcara,
        waktuDipesan: formatIndonesianDate(items.waktuDipesan),
      };
    });
  }

};
