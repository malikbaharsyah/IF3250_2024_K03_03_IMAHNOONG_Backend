export type Jadwal = {
    id: number;
    namaJadwal: string;
    waktuKunjungan: string;
    kapasitas: number;
    hargaTiket: number;
    planetariumId: number;
    deskripsiJadwal: string; 
}

export type JadwalCatalog = {
    id: number;
    planetariumId: number;
}

export type jadwalDefault = {

    id: number;
    namaJadwal: string;
    waktuKunjungan: string;
    kapasitas: number;
    hargaTiket: number;
    planetariumId: number;
    deskripsiJadwal: string;
}