export type Jadwal = {
    id: number;
    namaJadwal: string;
    waktuKunjungan: string[];
    kapasitas: number;
    hargaTiket: number;
    planetariumId: number;
    deskripsiJadwal: string; 
    imagePath: string[];
    durasi: number;
    date?: Date;
}

export type JadwalCatalog = {
    id: number;
    planetariumId: number;
}

export type JadwalEdit = {
    id: number;
    namaJadwal: string;
    waktuKunjungan: string;
    kapasitas: number;
    hargaTiket: number;
    planetariumId: number;
    deskripsiJadwal: string; 
    durasi: number;
    imagePath: string[];
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

export type JadwalAdminSorted = {
    id: number | String;
    jenis: String;
    imagePath: String[];
    namaJadwal: String;
    deskripsiJadwal: String;
    tanggal: String;
    waktu: String;
    kapasitas: number;
    durasi: number;
    hargaTiket: number;
    hari: String;
}

export type JadwalAdmin = {
    id: number | String;
    jenis: String;
    imagePath: String[];
    namaJadwal: String;
    deskripsiJadwal: String;
    waktuKunjungan: Date;
    kapasitas: number;
}