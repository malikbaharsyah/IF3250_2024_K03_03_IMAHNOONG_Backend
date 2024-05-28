import { db } from "../utils/dbServer";
import { Tiket } from "../types/tiket";
import { error } from "console";
import { Jadwal, jadwalDefault } from "../types/jadwal";
import { formatIndonesianDate } from "./jadwalController";

export const getTicketData = async (
  planetariumId: number,
  id: number
): Promise<Jadwal> => {
  let jadwalData = await db.jadwalDefault.findFirst({
    where: {
      id: id,
      planetariumId: planetariumId,
    },
  });

  if (!jadwalData) {
    let jadwalData = await db.jadwal.findFirst({
      where: {
        id: id,
        planetariumId: planetariumId,
      },
    });

    const modifiedData: Jadwal = {
      ...jadwalData,
      date: jadwalData.waktuKunjungan,
      waktuKunjungan: [formatIndonesianDate(jadwalData.waktuKunjungan)[1]],
    };

    return modifiedData;
  }

  const modifiedData: Jadwal = {
    ...jadwalData,
    waktuKunjungan: [jadwalData.jam],
  };

  return modifiedData;
};

export const pesanTiket = async (
  namaPemesan: string,
  jumlahTiket: number,
  noTelepon: string,
  email: string,
  idJadwal: number,
  idPlanetarium: number,
  note: string,
  tanggalTiket: Date
): Promise<string> => {
  try {
    let jadwalSelected = await db.jadwal.findFirst({
      where: {
        jadwalDefaultId: idJadwal,
        planetariumId: idPlanetarium,
      },
    });
    if (!jadwalSelected) {
      console.log("Jadwal tidak ditemukan");
      const jadwalDefault = await db.jadwalDefault.findFirst({
        where: {
          id: idJadwal,
        },
      });

      if (!jadwalDefault) {
        throw new Error("Jadwal not found");
      }

      if (jadwalDefault.kapasitas < jumlahTiket) {
        throw new Error("Kapasitas tidak cukup");
      }

      jadwalSelected = await db.jadwal.create({
        data: {
          namaJadwal: jadwalDefault.namaJadwal,
          waktuKunjungan: new Date(tanggalTiket),
          kapasitas: jadwalDefault.kapasitas - jumlahTiket,
          hargaTiket: jadwalDefault.hargaTiket,
          planetariumId: idPlanetarium,
          deskripsiJadwal: jadwalDefault.deskripsiJadwal,
          imagePath: [],
          durasi: jadwalDefault.durasi,
          isDefault: true,
          jadwalDefaultId: idJadwal,
        },
      });
    } else {
      console.log("Jadwal ditemukan");
      if (jadwalSelected.kapasitas < jumlahTiket) {
        throw new Error("Kapasitas tidak cukup");
      }
      await db.jadwal.update({
        where: {
          id: jadwalSelected.id,
        },
        data: {
          kapasitas: jadwalSelected.kapasitas - jumlahTiket,
        },
      });
    }
    const newTiket = await db.tiket.create({
      data: {
        namaPemesan: namaPemesan,
        jumlahTiket: jumlahTiket,
        noTelepon: noTelepon,
        email: email,
        idJadwal: jadwalSelected.id,
        waktuDibayar: new Date(),
        note: note,
        statusTiket: "Proses Bayar",
      },
    });

    console.log(newTiket.id);
    return newTiket.id;
  } catch (error) {
    console.log("Tiket gagal dipesan. " + error.code);
    return "";
  }
};

export const requestTiket = async (
  planetariumId: number,
  namaPemesan: string,
  jumlahTiket: number,
  email: string,
  note: string,
  konfirmasi: boolean,
  noTelepon: string,
  waktuKunjungan: Date,
  durasi: number
): Promise<number> => {
  try{
    const request = await db.request.create({
      data: {
        planetariumId: planetariumId,
        namaPemesan: namaPemesan,
        jumlahTiket: jumlahTiket,
        email: email,
        note: note,
        konfirmasi: konfirmasi,
        noTelepon: noTelepon,
        waktuDibuat: new Date(),
        waktuKunjungan: waktuKunjungan,
        durasi: durasi,
      }
    }) 
    return request.id;
  } catch (error){
    console.log("Request gagal dibuat. " + error.message);
  }
}

export const getTiket = async (idTiket: string): Promise<Tiket> => {
  const tiket = await db.tiket.findFirst({
      where: {
          id: idTiket
      },
  });
  let jadwal
  if (tiket.idJadwal) {
      jadwal = await db.jadwal.findFirst({
          where: {
              id: tiket.idJadwal
          },
          select: {
              namaJadwal: true,
              waktuKunjungan: true,
              hargaTiket: true,
              planetariumId: true,
          }
      });
  }
  if (tiket.idRequest) {
      jadwal = await db.request.findFirst({
          where: {
              id: tiket.idRequest
          },
          select: {
              planetariumId: true,
              waktuKunjungan: true,
          }
      });
  }
  const modifiedData: Tiket = {
    ...tiket,
    idPlanetarium: jadwal.planetariumId,
    namaJadwal: tiket.idJadwal ? jadwal.namaJadwal : "-",
    jenis: tiket.idJadwal ? "Reguler" : "Request",
    catatan: tiket.note,
    waktuDibayar: formatIndonesianDate(tiket.waktuDibayar),
    waktuKunjungan: formatIndonesianDate(jadwal.waktuKunjungan),
    waktuDipesan: formatIndonesianDate(tiket.waktuDibuat),
    harga: tiket.idJadwal ? jadwal.hargaTiket : "-",
  }

  console.log(modifiedData)
  return modifiedData;
}

export const getPayment