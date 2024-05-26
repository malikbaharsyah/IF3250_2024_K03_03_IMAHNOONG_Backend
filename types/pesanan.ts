export type Pesanan = {
    id: number | string;
    namaPemesan: string;
    email: string;
    namaAcara: string;
    waktuAcara: string[];
    waktuDipesan: string[];
    statusTiket: string;
    jenis: string;
}

export type DetailPesanan = {
    id: number | string;
    planetariumId: number;
    namaPemesan: string;
    noTelepon: string;
    email: string;
    waktuKunjungan: string[];
    waktuDibuat: string[];
    jumlahTiket: number;
    note: string;
    statusTiket: string;
    jenis: string;

    hargaTiket: number;
    namaJadwal: string;
}

export type DetailRequest = {
    id: number;
    planetariumId: number;
    waktuKunjungan: string[];
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
    statusTiket: string;
    Request?: {
        planetariumId: number;
        waktuKunjungan: string[];
    };
    Jadwal?: {
        planetariumId: number;
        waktuKunjungan: string[];
    };
}