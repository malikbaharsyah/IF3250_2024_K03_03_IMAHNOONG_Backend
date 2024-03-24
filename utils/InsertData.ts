import { db } from "../utils/dbServer";

export async function insertJadwal() {
    // const newJadwalData = {
    //   namaJadwal: 'Example Jadwal',
    //   waktuKunjungan: new Date(),
    //   kapasitas: 100,
    //   hargaTiket: 20,
    //   planetariumId: 1,
    //   deskripsiJadwal: 'Description of the Jadwal',
    // };
    const newJadwalData = {
      namaJadwal: 'Example Jadwal',
      hari: 'Senin',
      jam: '10:00',
      kapasitas: 100,
      hargaTiket: 20,
      planetariumId: 1,
      deskripsiJadwal: 'Description of the Jadwal',
    };
  
    try {
      const createdJadwal = await db.jadwalDefault.create({
        data: newJadwalData,
        include: { Planetarium: true },
      });
  
      console.log('New Jadwal created:', createdJadwal);
    } catch (error) {
      console.error('Error creating Jadwal:', error);
    } finally {
      await db.$disconnect();
    }
  }
  
// async function insertJadwalTenTimes() {
//   for (let i = 0; i < 10; i++) {
//       await insertJadwal();
//   }
// }
// insertJadwalTenTimes();




