-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "imageProfilePath" TEXT,
    "email" TEXT NOT NULL,
    "planetariumId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planetarium" (
    "id" SERIAL NOT NULL,
    "namaPlanetarium" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "imagePath" TEXT[],
    "lokasi" TEXT NOT NULL,
    "rating" TEXT,
    "prosedurPendaftaran" TEXT NOT NULL DEFAULT '',
    "tataTertib" TEXT NOT NULL DEFAULT '',
    "noTelepon" TEXT NOT NULL DEFAULT '+62 812-3456-7890',

    CONSTRAINT "Planetarium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tiket" (
    "id" TEXT NOT NULL,
    "namaPemesan" TEXT NOT NULL,
    "jumlahTiket" INTEGER NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idJadwal" INTEGER,
    "idRequest" INTEGER,
    "waktuDibayar" TIMESTAMP(3),
    "waktuDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusTiket" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "Tiket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" SERIAL NOT NULL,
    "namaJadwal" TEXT NOT NULL,
    "waktuKunjungan" TIMESTAMP(3) NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "hargaTiket" INTEGER NOT NULL,
    "planetariumId" INTEGER NOT NULL,
    "deskripsiJadwal" TEXT NOT NULL,
    "imagePath" TEXT[],
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "durasi" INTEGER NOT NULL DEFAULT 60,
    "jadwalDefaultId" INTEGER,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewId" SERIAL NOT NULL,
    "komentar" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "nama" TEXT,
    "planetariumId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Log" (
    "logId" SERIAL NOT NULL,
    "waktuPencatatan" TIMESTAMP(3) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("logId")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "planetariumId" INTEGER NOT NULL,
    "namaPemesan" TEXT NOT NULL,
    "jumlahTiket" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "konfirmasi" BOOLEAN NOT NULL DEFAULT false,
    "noTelepon" TEXT NOT NULL,
    "waktuDibuat" TIMESTAMP(3) NOT NULL,
    "waktuKunjungan" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jadwalDefault" (
    "id" SERIAL NOT NULL,
    "namaJadwal" TEXT NOT NULL,
    "hari" TEXT NOT NULL,
    "jam" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "hargaTiket" INTEGER NOT NULL,
    "planetariumId" INTEGER NOT NULL,
    "deskripsiJadwal" TEXT NOT NULL,
    "durasi" INTEGER NOT NULL DEFAULT 60,
    "imagePath" TEXT[],

    CONSTRAINT "jadwalDefault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moetodePembayaran" (
    "id" SERIAL NOT NULL,
    "idPlanetarium" INTEGER NOT NULL,
    "metode" TEXT NOT NULL,
    "nomor" TEXT NOT NULL,

    CONSTRAINT "moetodePembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Tiket_id_key" ON "Tiket"("id");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_planetariumId_fkey" FOREIGN KEY ("planetariumId") REFERENCES "Planetarium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_idJadwal_fkey" FOREIGN KEY ("idJadwal") REFERENCES "Jadwal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_idRequest_fkey" FOREIGN KEY ("idRequest") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_planetariumId_fkey" FOREIGN KEY ("planetariumId") REFERENCES "Planetarium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_jadwalDefaultId_fkey" FOREIGN KEY ("jadwalDefaultId") REFERENCES "jadwalDefault"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_planetariumId_fkey" FOREIGN KEY ("planetariumId") REFERENCES "Planetarium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_planetariumId_fkey" FOREIGN KEY ("planetariumId") REFERENCES "Planetarium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwalDefault" ADD CONSTRAINT "jadwalDefault_planetariumId_fkey" FOREIGN KEY ("planetariumId") REFERENCES "Planetarium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moetodePembayaran" ADD CONSTRAINT "moetodePembayaran_idPlanetarium_fkey" FOREIGN KEY ("idPlanetarium") REFERENCES "Planetarium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
