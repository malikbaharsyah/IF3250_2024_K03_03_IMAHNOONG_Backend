import express from 'express';
import 'dotenv/config'

import { catalogRouter } from './routes/catalogRouter';
import { jadwalRouter } from './routes/jadwalRouter';

import { registerAdminRouter } from './routes/registerAdminRouter';
import { loginRouter, logoutRouter } from './routes/loginRouter';
import { authRouter } from './routes/authRouter';
// import { pesanTiketRouter } from './routes/pesanTiketRouter';
import { detailsRouter } from './routes/detailsRouter';
import { mailRouter } from './routes/mailRouter';
import { insertJadwal } from "./utils/InsertData";
import { pesananRouter } from './routes/listPesananRouter';
import { dashboardRouter } from './routes/dashboardRouter';
import { jadwalDefaultRouter } from './routes/jadwalDefaultRouter';
import { jadwalAdminRouter } from './routes/jadwalAdminRouter'
import { reviewRouter } from './routes/reviewRouter';


const app = express();
const port = process.env.PORT;

// REMINDER NEED TO CONFIG THE CORS OPTION. * origin is not recommended for deployment
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
app.use(cors());

app.use(express.json());
app.use("/api/catalog", catalogRouter);
app.use("/api/jadwal", jadwalRouter);
app.use("/api/registerAdmin", registerAdminRouter);
app.use("/api/login", loginRouter);
app.use("/api/auth", authRouter);
app.use("/api/logout", logoutRouter);
// app.use("/api/pesanTiket", pesanTiketRouter);
app.use("/api/details", detailsRouter)
app.use("/api/email", mailRouter);
app.use("/api/pesanan", pesananRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/jadwalDefault", jadwalDefaultRouter);
app.use("/api/jadwalAdmin", jadwalAdminRouter);
app.use("/api/review", reviewRouter);

app.get('/', (req, res) => {
  res.send('Hello world!, api jadwaladmin is available');
});

// async function insertJadwalTenTimes() {
//   for (let i = 0; i < 10; i++) {
//       await insertJadwal();
//   }
// }
// insertJadwalTenTimes();

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});

