export type Request = {
  id: number;
  planetariumId: number;
  waktuKunjungan: string[];
  namaPemesan: string;
  jumlahTiket: number;
  noTelepon: string;
  email: string;
  note: string;
  status: string;
};

export type NotifikasiRequest = {
  id: number;
  waktuKunjungan: string[];
  namaPemesan: string;
  jumlahTiket: number;
  note: string;
}