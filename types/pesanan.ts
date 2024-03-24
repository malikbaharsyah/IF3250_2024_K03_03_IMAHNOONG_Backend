export type Pesanan = {
    id: number | string;
    namaPemesan: string;
    email: string;
    namaAcara: string;
    waktuAcara: string;
    waktuDipesan: string;
    status: string;
}

export type DetailPesanan = {
    id: number | string;
    planetariumId: number;
    namaPemesan: string;
    noTelepon: string;
    email: string;
    waktuKunjungan: string[];
    jumlahTiket: number;
    note: string;
    status: string;
}

export type DetailRequest = {
    id: number;
    planetariumId: number;
    waktuKunjungan: Date;
    namaPemesan: string;
    jumlahTiket: number;
    noTelepon: string;
    email: string;
    konfirmasi: boolean;
    note: string;
}

export type DetailTiket = {
    id: string;
    namaPemesan: string;
    jumlahTiket: number;
    noTelepon: string;
    email: string;
    status: string;
    Request?: {
        planetariumId: number;
        waktuKunjungan: Date;
    };
    Jadwal?: {
        planetariumId: number;
        waktuKunjungan: Date;
    };
}