export type RequestPesanan = {
  id: number;
  planetariumId: number;
  waktuKunjungan: string[];
  namaPemesan: string;
  jumlahTiket: number;
  noTelepon: string;
  email: string;
  note: string;
  statusTiket: string;
};

export type NotifikasiRequest = {
  id: number;
  waktuKunjungan: string[];
  namaPemesan: string;
  jumlahTiket: number;
  note: string;
}