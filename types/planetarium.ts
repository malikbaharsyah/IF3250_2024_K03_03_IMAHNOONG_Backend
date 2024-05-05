export type Planetarium = {
  id: number;
  namaPlanetarium: string;
  deskripsi: string;
  imagePath: string[];
  lokasi: string;
  rating?: string;
};

export type EditPlanetarium = {
  id: number;
  namaPlanetarium: string;
  deskripsi: string;
  prosedurPendaftaran: string;
  tataTertib: string;
  noTelepon: string;
  imagePath: string[];
  lokasi: string;
}
