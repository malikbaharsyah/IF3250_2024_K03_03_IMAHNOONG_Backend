import { db } from "../utils/dbServer";
import { Tiket } from "../types/tiket";
import { error } from "console";

export const pesanTiket = async (
  namaPemesan: string,
  jumlahTiket: number,
  noTelpon: string,
  email: string,
  idJadwal: number
): Promise<string> => {
  try {
    const newTiket = await db.tiket.create({
      data: {
        namaPemesan: namaPemesan,
        jumlahTiket: jumlahTiket,
        noTelepon: noTelpon,
        email: email,
        idJadwal: idJadwal,
      },
    });
    return (
      "Tiket untuk " + idJadwal + " berhasil dipesan dengan id: " + newTiket.id
    );
  } catch (error) {
    console.log("Tiket gagal dipesan. " + error.code);
    return "";
  }
};

export const cekStok = async (
  jumlahTiket: number,
  idJadwal: number
): Promise<string> => {
  try {
    const jadwalDipesan = await db.jadwal.findFirst({
      select: {
        kapasitas: true,
      },
      where: {
        id: {
          equals: idJadwal,
        },
      },
    });
    if (jadwalDipesan.kapasitas >= jumlahTiket) {
      await db.jadwal.update({
        where: {
          id: idJadwal,
        },
        data: {
          kapasitas: jadwalDipesan.kapasitas - jumlahTiket,
        },
      });
      return "Stok berhasil dikurangi";
    } else {
      console.log("Kapasitas tidak cukup");
      return "";
    }
  } catch (error) {
    console.log("Tiket gagal dipesan. " + error.code);
    return "";
  }
};

export const revertStok = async (
  jumlahTiket: number,
  idJadwal: number
): Promise<string> => {
  try {
    const res = await db.jadwal.update({
      where: {
        id: idJadwal,
      },
      data: {
        kapasitas: {
          increment: jumlahTiket,
        },
      },
    });
    return "Stok berhasil di kembalikan";
  } catch (error) {
    console.log("Stok gagal di kembalikan. " + error.code);
    return "";
  }
};
