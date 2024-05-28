export type Tiket = {
  id: string;
  idPlanetarium: number;
  namaPemesan: string;
  jumlahTiket: number;
  noTelepon: string;
  email: string;
  statusTiket: string;
  jenis: string;
  catatan: string;
  namaJadwal: string;
  waktuKunjungan: string[];
  waktuDipesan: string[];
  waktuDibayar: string[];
  harga?: number;
};