import { db } from "../utils/dbServer";
import { Tiket } from "../types/tiket";
import { error } from "console";
import { Jadwal, jadwalDefault } from '../types/jadwal';
import { formatIndonesianDate } from "./jadwalController";

export const getTicketData = async (planetariumId: number, id: number): Promise<Jadwal> => {
  const jadwalData = await db.jadwalDefault.findFirst({
    where: {
      id: id,
      planetariumId: planetariumId,
    },
  });

  if (!jadwalData) {
    throw new Error("Jadwal not found");
  }

  const modifiedData: Jadwal = {
        ...jadwalData,
        waktuKunjungan: [jadwalData.jam],
    };

  return modifiedData;
}

export const pesanTiket = async (
  namaPemesan: string,
  jumlahTiket: number,
  noTelepon: string,
  email: string,
  idJadwal: number,
  idPlanetarium: number,
  note: string
  // tanggalTiket: Date
): Promise<string> => {
  try {
    var jadwalSelected = await db.jadwal.findFirst({
      where: {
        jadwalDefaultId: idJadwal,
        planetariumId: idPlanetarium,
      },
    });
    if (!jadwalSelected) {
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
          waktuKunjungan: new Date(),
          kapasitas: jadwalDefault.kapasitas-jumlahTiket,
          hargaTiket: jadwalDefault.hargaTiket,
          planetariumId: idPlanetarium,
          deskripsiJadwal: jadwalDefault.deskripsiJadwal,
          imagePath: [],
          durasi: jadwalDefault.durasi,
          isDefault: true,
          jadwalDefaultId: idJadwal,
        },
      });
    }
    else {
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
        statusTiket: "Proses Bayar"
      },
    });

    console.log(newTiket.id);
    return (newTiket.id);
  } catch (error) {
    console.log("Tiket gagal dipesan. " + error.code);
    return "";
  }
};

// export const cekStok = async (
//   jumlahTiket: number,
//   idJadwal: number
// ): Promise<string> => {
//   try {
//     const jadwalDipesan = await db.jadwal.findFirst({
//       select: {
//         kapasitas: true,
//       },
//       where: {
//         id: {
//           equals: idJadwal,
//         },
//       },
//     });
//     if (jadwalDipesan.kapasitas >= jumlahTiket) {
//       await db.jadwal.update({
//         where: {
//           id: idJadwal,
//         },
//         data: {
//           kapasitas: jadwalDipesan.kapasitas - jumlahTiket,
//         },
//       });
//       return "Stok berhasil dikurangi";
//     } else {
//       // console.log("Kapasitas tidak cukup");
//       return "";
//     }
//   } catch (error) {
//     // console.log("Tiket gagal dipesan. " + error.code);
//     return "";
//   }
// };
